# Event Enums -- snowdrop-resources-be

**Generated file -- do not hand-edit.** Produced by `generate-enums.py` from this repo's own `references/Events.md`. Regenerate by re-running the script against a refreshed `Events.md`; never patch this file directly, same convention as every other file under `references/`.

Last generated: 2026-09-24. Source: `references/Events.md` (format 1 of 3 -- see the generator script's own docstring for what that means).

## Index

- [`AcceptorType`](#acceptortype)
- [`AcceptorStatus`](#acceptorstatus)
- [`Month`](#month)
- [`PaymentDeviceCreated.PaymentDeviceType`](#paymentdevicecreatedpaymentdevicetype)
- [`PaymentVendorConfiguration.VendorOption`](#paymentvendorconfigurationvendoroption)

---

## `AcceptorType`

(`Contracts/Companies/WorldPay/MerchantAcceptor.cs`)

`CardPresent`, `CardNotPresent`

---

## `AcceptorStatus`

(`Contracts/Companies/WorldPay/MerchantAcceptor.cs`)

`NotUsed`, `InUse`

---

## `Month`

(`Events/MonthlyClose/Month.cs`)

`NotSet = 0`, `January = 1`, `February = 2`, `March = 3`, `April = 4`, `May = 5`, `June = 6`, `July = 7`, `August = 8`, `September = 9`, `October = 10`, `November = 11`, `December = 12`

---

## `PaymentDeviceCreated.PaymentDeviceType`

(`Events/Payments/PaymentDeviceCreated.cs`)

`WorldPay = 0`, `Stripe = 1`

---

## `PaymentVendorConfiguration.VendorOption`

(`Contracts/Payments/PaymentVendorConfiguration.cs`)

`WorldPay = 0`, `Stripe = 1`

---
