#!/usr/bin/env python3
"""Replay how remittance processing builds charge payments from a RemittanceCreatedEvent.

Mirrors Snowdrop.RemittanceProcessing.Runtime.Mediators.ClaimBuilder:
  BuildClaimPayment(Claim) -> BuildChargePayment(Service) -> FindChargeOnClaim
  -> AggregateSameChargeId -> OrderChargePayments
and compares the result with the charge payments in the RemittanceInitialized event.

Inputs (all JSON exports; patient identifiers are not needed):
  --remit-be-events   snowdrop-remittance stream export (contains RemittanceCreatedEvent)
  --rp-events         snowdrop-remittanceprocessing stream export (contains RemittanceInitialized)
  --claims            one or more files of claim charges from GET /claims?claimId=... (ClaimDetails).
                      Either a single claim object or an object keyed by claim id.
  --catalogs          directory holding the CatalogCacheProjection exports
                      (contractualadjustmentreasons, transferreasons, remarkcodes, modifiers)
  --ignore-control-number   set when PayerLiteralSettings.IgnorePayerControlNumber is true
Run with: python3 -I replay_charge_payments.py ...
"""
import argparse
import glob
import json
import os
import sys
from decimal import Decimal as D, ROUND_HALF_EVEN

FLAG_NAMES = {0x1: "IsDisputed", 0x2: "IsVoided", 0x4: "WasFuzzyMatch", 0x8: "AmbiguousAdjustmentCode",
              0x10: "DenialDispute", 0x20: "UnderpaymentDispute", 0x40: "TransferDispute", 0x80: "NotOnEob",
              0x100: "IsDisputedUserSet", 0x200: "ExcludeFromPosting", 0x400: "TransferToGuarantor"}
AGG_FLAG_MASK = 0x1 | 0x2 | 0x4 | 0x8 | 0x100
# Flags set while building; dispute flags are applied later by RemittanceDisputes, so only these are compared.
BUILD_FLAG_MASK = 0x2 | 0x4 | 0x8 | 0x80 | 0x200


def load(path):
    with open(path, encoding="utf-8-sig") as f:
        return json.load(f, parse_float=D)


def flag_text(v):
    names = [n for b, n in FLAG_NAMES.items() if v & b]
    return "+".join(names) if names else "None"


def money(v):
    return "-" if v is None else f"{D(v):.2f}"


def dec(v):
    return None if v is None else D(str(v))


# ----------------------------------------------------------------------------- matching
def control_number(service):
    for r in service.get("References") or []:
        if r.get("IDQualifier") == "6R":
            return r.get("ID")
    return None


def find_charge(service, charges, ctl, service_modifiers, ignore_ctl):
    """FindChargeOnClaim(service). Returns (charge, step, was_fuzzy)."""
    if not charges:
        return None, "no claim", False
    if not ignore_ctl and ctl is not None:
        for c in charges:
            if c["serviceLineNumber"] == ctl:
                return c, "1 control number", False
    code = (service.get("SentProcedure") or service["Procedure"]).lower()
    by_code = [c for c in charges if c["chargeCode"].lower() == code]
    if len(by_code) == 1:
        return by_code[0], "2 charge code", False
    if len(by_code) > 1:
        qty = service.get("SentQuantity") if service.get("SentQuantity") is not None else service["Qty"]
        m = [c for c in by_code if D(str(c["billingUnits"])) == D(str(qty))]
        if len(m) == 1:
            return m[0], "2 code+quantity", False
        m = [c for c in by_code if sorted(c["modifiers"]) == sorted(service_modifiers)]
        if len(m) == 1:
            return m[0], "2 code+modifiers", False
        m = [c for c in by_code if c["dateOfService"] == service.get("ServiceDate")]
        if len(m) == 1:
            return m[0], "2 code+date of service", False
    m = [c for c in charges if D(str(c["fee"])) == D(str(service["Billed"]))]
    if len(m) == 1:
        return m[0], "3 fuzzy billed amount", True
    return None, "unmatched", False


# ----------------------------------------------------------------------------- charge payment
class Catalogs:
    def __init__(self, directory):
        self.c = {}
        for name in ("contractualadjustmentreasons", "transferreasons", "remarkcodes", "modifiers"):
            files = sorted(glob.glob(os.path.join(directory, f"*CatalogCacheProjection_{name}_*.json")))
            self.c[name] = load(files[-1])["Elements"] if files else {}
            if not files:
                print(f"WARNING: no catalog file for {name}", file=sys.stderr)

    def get(self, name, key):
        return self.c[name].get(key)


def payments_from(payments, paid, interest):
    """Payment.Payments(payments, paid, interest)."""
    if payments is None:
        if paid is None and interest is None:
            return []
        return [(paid or D(0), interest or D(0))]
    nonzero = [p for p in payments if p[0] != 0 or p[1] != 0]
    return nonzero if nonzero else [(D(0), D(0))]


def build_charge_payment(service, charges, cats, ignore_ctl):
    ctl = control_number(service)
    mods = [cats.get("modifiers", service[k]) for k in ("Modifier1", "Modifier2", "Modifier3", "Modifier4")
            if service.get(k) is not None and cats.get("modifiers", service[k])]
    charge, step, fuzzy = find_charge(service, charges, ctl, sorted(mods), ignore_ctl)
    flags = 0
    if fuzzy:
        flags |= 0x4
    if charge and charge["chargeStatus"] == 100:
        flags |= 0x2
    transfers, adjustments, unknown_adj = [], [], []
    for a in service.get("Adjustments") or []:
        name = f'{a["GroupCode"]}-{a["ReasonCode"]}'
        t = cats.get("transferreasons", name)
        adj = cats.get("contractualadjustmentreasons", name)
        amount = a.get("Amount") if a.get("Amount") is not None else D(0)
        if t and adj:
            flags |= 0x8
        elif t:
            transfers.append({"Reason": t, "Amount": amount, "GroupCode": a["GroupCode"], "ReasonCode": a["ReasonCode"]})
        elif adj:
            adjustments.append({"Reason": adj, "Amount": amount, "GroupCode": a["GroupCode"], "ReasonCode": a["ReasonCode"]})
        else:
            unknown_adj.append({"GroupCode": a["GroupCode"], "ReasonCode": a["ReasonCode"], "Amount": amount})
    remarks, unknown_remarks = [], []
    for r in service.get("Remarks") or []:
        g = cats.get("remarkcodes", r["RemarkCode"])
        if g:
            remarks.append(g)
        else:
            unknown_remarks.append(r["RemarkCode"])
    sent = service.get("SentProcedure")
    code = charge["chargeCode"] if charge else ((sent if sent and sent.strip() else service["Procedure"]) or "")
    allowed = service.get("Allowed")
    cp = {
        "ChargeId": charge["chargeId"] if charge else None,
        "ChargeCode": code,
        "ControlNumber": ctl,
        "Flags": flags,
        "DateOfService": service.get("ServiceDate") or (charge["dateOfService"] if charge else None),
        "BillingUnits": service.get("Qty"),
        "BilledAmount": D(str(charge["fee"])) if charge else service.get("Billed"),
        "AllowedAmount": [] if allowed is None else [allowed],
        "ExpectedAmount": D(str(charge["allowed"])) if charge else None,
        "EobAllowedAmount": allowed,
        "Payments": payments_from(None, service.get("ProviderPaid"), D(0)),
        "SentCode": sent,
        "SentQuantity": service.get("SentQuantity"),
        "Modifiers": mods,
        "Transfers": sorted(transfers, key=lambda x: x["Reason"]),
        "Adjustments": sorted(adjustments, key=lambda x: x["Reason"]),
        "UnknownAdjudicationCodes": sorted(unknown_adj, key=lambda x: (x["GroupCode"], x["ReasonCode"])),
        "RemarkCodes": list(dict.fromkeys(remarks)),
        "UnknownRemarkCodes": list(dict.fromkeys(unknown_remarks)),
        "_step": step,
        "_service": service,
    }
    return cp


def paid(cp):
    return sum((p[0] for p in cp["Payments"]), D(0))


def aggregate_flags(group):
    r = 0
    for cp in group:
        r |= cp["Flags"]
    r &= AGG_FLAG_MASK
    if all(cp["Flags"] & 0x80 for cp in group):
        r |= 0x80
    return r


def sum_list(vals):
    vals = [v for v in vals if v is not None]
    return sum(vals, D(0)) if vals else None


def aggregate_same_charge_id(charges, cps):
    """AggregateSameChargeId(claimProjection, chargePayments)."""
    order = []
    groups = {}
    for cp in cps:
        if cp["ChargeId"] is not None:
            if cp["ChargeId"] not in groups:
                order.append(cp["ChargeId"])
            groups.setdefault(cp["ChargeId"], []).append(cp)
    todos = [g for g in order if len(groups[g]) > 1]
    if not todos:
        return cps
    result = [cp for cp in cps if cp["ChargeId"] is None or cp["ChargeId"] not in todos]
    for cid in todos:
        grp = groups[cid]
        first = next((c for c in grp if not c["Flags"] & 0x200), grp[0])
        charge = next((c for c in charges if c["chargeId"] == cid), None) if charges else None
        agg = {
            "ChargeId": cid,
            "ChargeCode": charge["chargeCode"] if charge else first["ChargeCode"],
            "ControlNumber": first["ControlNumber"],
            "Flags": aggregate_flags(grp),
            "DateOfService": charge["dateOfService"] if charge else first["DateOfService"],
            "BillingUnits": charge["billingUnits"] if charge else first["BillingUnits"],
            "BilledAmount": D(str(charge["fee"])) if charge else first["BilledAmount"],
            "AllowedAmount": [a for cp in grp for a in cp["AllowedAmount"]],
            "ExpectedAmount": D(str(charge["allowed"])) if charge else first["ExpectedAmount"],
            "EobAllowedAmount": sum_list([cp["EobAllowedAmount"] for cp in grp]),
            "Payments": payments_from([p for cp in grp for p in cp["Payments"]], None, None),
            "SentCode": first["SentCode"],
            "SentQuantity": sum((cp["SentQuantity"] or D(0) for cp in grp), D(0)),
            "Modifiers": list(dict.fromkeys(m for cp in grp for m in cp["Modifiers"])),
            "Transfers": sorted((t for cp in grp for t in cp["Transfers"]), key=lambda x: x["Reason"]),
            "Adjustments": sorted((a for cp in grp for a in cp["Adjustments"]), key=lambda x: x["Reason"]),
            "UnknownAdjudicationCodes": sorted((u for cp in grp for u in cp["UnknownAdjudicationCodes"]),
                                               key=lambda x: (x["GroupCode"], x["ReasonCode"])),
            "RemarkCodes": list(dict.fromkeys(r for cp in grp for r in cp["RemarkCodes"])),
            "UnknownRemarkCodes": list(dict.fromkeys(r for cp in grp for r in cp["UnknownRemarkCodes"])),
            "_step": "aggregated " + str(len(grp)) + " lines",
            "_lines": grp,
        }
        result.append(agg)
    return result


def placeholder(charge):
    """BuildFromClaim(claimCharge): claim charge with no payment on the EOB."""
    return {
        "ChargeId": charge["chargeId"], "ChargeCode": charge["chargeCode"],
        "ControlNumber": charge["serviceLineNumber"], "Flags": 0x80 | 0x200,
        "DateOfService": charge["dateOfService"], "BillingUnits": charge["billingUnits"],
        "BilledAmount": D(str(charge["fee"])), "AllowedAmount": [D(str(charge["allowed"]))],
        "ExpectedAmount": D(str(charge["allowed"])), "EobAllowedAmount": None,
        "Payments": [(D(0), D(0))], "SentCode": charge["chargeCode"], "SentQuantity": D(str(charge["billingUnits"])),
        "Modifiers": list(charge["modifiers"]), "Transfers": [], "Adjustments": [], "UnknownAdjudicationCodes": [],
        "RemarkCodes": [], "UnknownRemarkCodes": [], "_step": "placeholder (not on EOB)",
    }


def order_charge_payments(cps, charges):
    noinvoice = [c for c in cps if c["ChargeId"] is None]
    oninvoice = [c for c in cps if c["ChargeId"] is not None]
    out = []
    for charge in charges:
        m = [c for c in oninvoice if c["ChargeId"] == charge["chargeId"]]
        out.extend(m if m else [placeholder(charge)])
    return out + noinvoice


def replay_claim(claim835, charges, cats, ignore_ctl):
    cps = [build_charge_payment(s, charges, cats, ignore_ctl) for s in claim835.get("Services") or []]
    lines = list(cps)
    cps = aggregate_same_charge_id(charges, cps)
    interest = sum((a["Amount"] for a in (claim835.get("SupplementalAmounts") or [])
                    if a.get("Amount") is not None and a.get("QualifierCode") == "I"), D(0))
    if interest != 0:
        print(f"WARNING: claim has interest {interest}; interest distribution is not replayed", file=sys.stderr)
    if charges:
        cps = order_charge_payments(cps, charges)
    return lines, cps


# ----------------------------------------------------------------------------- comparison
def norm_actual(p):
    return {
        "ChargeId": p.get("ChargeId"), "ChargeCode": p.get("ChargeCode"), "ControlNumber": p.get("ControlNumber"),
        "Flags": p.get("Flags", 0), "DateOfService": p.get("DateOfService"), "BilledAmount": dec(p.get("BilledAmount")),
        "AllowedAmount": [dec(a) for a in p.get("AllowedAmount") or []], "ExpectedAmount": dec(p.get("ExpectedAmount")),
        "Payments": [(dec(x["PaidAmount"]), dec(x["Interest"])) for x in p.get("Payments") or []],
        "Modifiers": list(p.get("Modifiers") or []),
        "Transfers": [(t["Reason"], dec(t["Amount"]), t["GroupCode"], t["ReasonCode"]) for t in p.get("Transfers") or []],
        "Adjustments": [(t["Reason"], dec(t["Amount"]), t["GroupCode"], t["ReasonCode"]) for t in p.get("Adjustments") or []],
        "UnknownAdjudicationCodes": [(u["GroupCode"], u["ReasonCode"], dec(u["Amount"])) for u in p.get("UnknownAdjudicationCodes") or []],
        "RemarkCodes": list(p.get("RemarkCodes") or []), "UnknownRemarkCodes": [u if isinstance(u, str) else u.get("RemarkCode") for u in p.get("UnknownRemarkCodes") or []],
    }


def norm_replay(c):
    return {
        "ChargeId": c["ChargeId"], "ChargeCode": c["ChargeCode"], "ControlNumber": c["ControlNumber"],
        "Flags": c["Flags"], "DateOfService": c["DateOfService"], "BilledAmount": dec(c["BilledAmount"]),
        "AllowedAmount": [dec(a) for a in c["AllowedAmount"]], "ExpectedAmount": dec(c["ExpectedAmount"]),
        "Payments": [(dec(a), dec(b)) for a, b in c["Payments"]], "Modifiers": list(c["Modifiers"]),
        "Transfers": [(t["Reason"], dec(t["Amount"]), t["GroupCode"], t["ReasonCode"]) for t in c["Transfers"]],
        "Adjustments": [(t["Reason"], dec(t["Amount"]), t["GroupCode"], t["ReasonCode"]) for t in c["Adjustments"]],
        "UnknownAdjudicationCodes": [(u["GroupCode"], u["ReasonCode"], dec(u["Amount"])) for u in c["UnknownAdjudicationCodes"]],
        "RemarkCodes": list(c["RemarkCodes"]), "UnknownRemarkCodes": list(c["UnknownRemarkCodes"]),
    }


def compare(replayed, actual):
    diffs = []
    if len(replayed) != len(actual):
        diffs.append(f"charge payment count: replay {len(replayed)} vs actual {len(actual)}")
    for i, (r, a) in enumerate(zip(replayed, actual)):
        r, a = norm_replay(r), norm_actual(a)
        for k in r:
            rv, av = r[k], a[k]
            if k == "Flags":
                rv, av = rv & BUILD_FLAG_MASK, av & BUILD_FLAG_MASK
            if rv != av:
                diffs.append(f"[{i}] {r['ChargeCode']} {k}: replay={rv} actual={av}")
    return diffs


# ----------------------------------------------------------------------------- output
TOLERANCE = D("0.01")


def consistency(lines, cps):
    """Payer-data consistency checks (see business-logic/PayerServiceLineMislabeling).

    Per charge payment: billed - (paid + adjustments + transfers + unknown codes). A healthy line set
    reconciles to 0 on every charge. Lines the payer attributed to the wrong service line leave some charges
    over-adjusted and others under-adjusted while the claim as a whole still reconciles.
    Per line matched by control number: the line's Billed should equal the charge's fee.
    """
    rows = []
    for c in cps:
        if c["_step"].startswith("placeholder") or c["BilledAmount"] is None:
            continue
        adj = sum((a["Amount"] for a in c["Adjustments"]), D(0))
        trn = sum((t["Amount"] for t in c["Transfers"]), D(0))
        unk = sum((u["Amount"] for u in c["UnknownAdjudicationCodes"]), D(0))
        pd = paid(c)
        rows.append((c["ChargeCode"], c["BilledAmount"], pd, adj, trn + unk, c["BilledAmount"] - (pd + adj + trn + unk)))
    line_mismatches = []
    for i, c in enumerate(lines):
        s = c["_service"]
        if c["ChargeId"] and c["_step"].startswith("1") and c["BilledAmount"] is not None and s.get("Billed") is not None \
                and abs(D(str(s["Billed"])) - c["BilledAmount"]) > TOLERANCE:
            line_mismatches.append((i, c["ControlNumber"], s.get("Billed"), c["ChargeCode"], c["BilledAmount"]))
    return rows, line_mismatches


def print_consistency(lines, cps):
    rows, line_mismatches = consistency(lines, cps)
    if not rows:
        return
    print("\nPayer data consistency (billed - paid - adjustments - transfers, per charge)")
    print(f"{'Charge':<8} {'Billed':>9} {'Paid':>9} {'Adjust':>9} {'Transfer':>9} {'Unreconciled':>13}")
    for code, billed, pd, adj, trn, diff in rows:
        mark = "  <-- does not reconcile" if abs(diff) > TOLERANCE else ""
        print(f"{code:<8} {money(billed):>9} {money(pd):>9} {money(adj):>9} {money(trn):>9} {money(diff):>13}{mark}")
    net = sum((r[5] for r in rows), D(0))
    off = [r for r in rows if abs(r[5]) > TOLERANCE]
    for i, ctl, billed, code, fee in line_mismatches:
        print(f"    line {i} (control {ctl}) billed {money(billed)} but its charge {code} has fee {money(fee)}")
    if off and abs(net) <= TOLERANCE:
        print(f"    SIGNATURE: {len(off)} charge(s) do not reconcile but the claim reconciles as a whole (net {money(net)}). "
              f"The payer likely attributed amounts to the wrong service lines; see business-logic/PayerServiceLineMislabeling.")
    elif off:
        print(f"    {len(off)} charge(s) do not reconcile and the claim does not reconcile either (net {money(net)}); "
              f"unmatched lines, adjustments in both catalogs, or unreplayed claim-level amounts may explain it.")
    else:
        print("    All charges reconcile.")


def print_claim(claim835, charges, lines, cps, diffs, actual):
    print(f"\n=== Claim {claim835['ClaimId']}  ClaimPaymentId {claim835['ClaimPaymentId']}  "
          f"835 TotalPayment {money(claim835.get('TotalPayment'))}  ICN {claim835.get('ICN')}")
    if not charges:
        print("    (no claim charge data supplied; services are not matched to charges)")
    print("\nStep 1 - service line to charge")
    print(f"{'#':>2} {'Control':<10} {'Procedure':<12} {'Sent':<12} {'Qty':>4} {'Billed':>9} {'Paid':>9}  "
          f"{'Step':<24} {'Charge':<8} Adjustments")
    for i, c in enumerate(lines):
        s = c["_service"]
        adj = ", ".join(f'{a["GroupCode"]}-{a["ReasonCode"]} {money(a.get("Amount"))}' for a in s.get("Adjustments") or [])
        print(f"{i:>2} {(c['ControlNumber'] or '-'):<10} {s['Procedure']:<12} {(s.get('SentProcedure') or '-'):<12} "
              f"{str(s.get('Qty')):>4} {money(s.get('Billed')):>9} {money(s.get('ProviderPaid')):>9}  "
              f"{c['_step']:<24} {(c['ChargeCode'] if c['ChargeId'] else '-'):<8} {adj}")
    print("\nStep 2 - aggregated charge payments (replay)")
    print(f"{'Charge':<8} {'Control':<10} {'Lines':>5} {'Paid':>9}  Flags / adjustments / transfers")
    for c in cps:
        n = len(c.get("_lines", [])) or (0 if c["_step"].startswith("placeholder") else 1)
        parts = [f'{x["GroupCode"]}-{x["ReasonCode"]} {money(x["Amount"])}' for x in c["Adjustments"]]
        parts += [f'{x["GroupCode"]}-{x["ReasonCode"]} {money(x["Amount"])} (transfer)' for x in c["Transfers"]]
        print(f"{c['ChargeCode']:<8} {(c['ControlNumber'] or '-'):<10} {n:>5} {money(paid(c)):>9}  "
              f"{flag_text(c['Flags'])}; {', '.join(parts) if parts else 'no adjustments'}")
    print_consistency(lines, cps)
    print("\nComparison with RemittanceInitialized")
    if actual is None:
        print("    claim payment not found in RemittanceInitialized")
    elif not diffs:
        print(f"    MATCH: {len(cps)} charge payments agree on charge, code, control number, build flags, dates, "
              f"billed/allowed/expected, payments, modifiers, adjustments, transfers, unknown codes, remark codes, order")
    else:
        for d in diffs:
            print("    DIFF", d)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--remit-be-events", required=True)
    ap.add_argument("--rp-events", required=True)
    ap.add_argument("--claims", nargs="+", required=True)
    ap.add_argument("--catalogs", required=True)
    ap.add_argument("--ignore-control-number", action="store_true")
    ap.add_argument("--claim-payment-id")
    a = ap.parse_args()

    be = load(a.remit_be_events)
    created = next(e for e in be if (e.get("EventType") or e.get("SubEventType")) == "RemittanceCreatedEvent")
    msg = created["Data"].get("RemittanceMessage")
    if msg is None:
        sys.exit("RemittanceMessage is not in the event (RemittanceMessageStoredInBlobStorage="
                 f"{created['Data'].get('RemittanceMessageStoredInBlobStorage')}); fetch it from blob storage first")
    claim_charges = {}
    for path in a.claims:
        d = load(path)
        if "claimId" in d:
            d = {d["claimId"]: d}
        for k, v in d.items():
            claim_charges[k] = v["charges"]
    cats = Catalogs(a.catalogs)
    rp = load(a.rp_events)
    init = next(e for e in rp if e.get("EventType") == "RemittanceInitialized")["Data"]
    actual_by_cp = {c["ClaimPaymentId"]: c["ChargePayments"] for c in init["ClaimPayments"]}

    print(f"Remittance {created['Data']['RemittanceId']}  payer literal {created['Data'].get('PayerLiteral')}  "
          f"IgnorePayerControlNumber={a.ignore_control_number}")
    total, bad = 0, 0
    for c in msg["Claims"]:
        if a.claim_payment_id and c["ClaimPaymentId"] != a.claim_payment_id:
            continue
        charges = claim_charges.get(c.get("ClaimId")) or []
        lines, cps = replay_claim(c, charges, cats, a.ignore_control_number)
        actual = actual_by_cp.get(c["ClaimPaymentId"])
        diffs = compare(cps, actual) if actual is not None else ["claim payment missing"]
        print_claim(c, charges, lines, cps, diffs, actual)
        total += 1
        bad += 1 if diffs else 0
    print(f"\nSummary: {total - bad} of {total} claim payments reproduced exactly")


if __name__ == "__main__":
    main()
