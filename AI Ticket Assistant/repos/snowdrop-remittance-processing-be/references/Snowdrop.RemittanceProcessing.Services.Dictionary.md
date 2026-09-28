﻿# Snowdrop.RemittanceProcessing.Services - API Dictionary

Repo: snowdrop-remittance-processing-be
Source: Snowdrop.RemittanceProcessing.Services.json

## Endpoints

### POST /assistance-credit-cards/payments/{remittanceId}
- Tags: AssistanceCreditCard
- Path params: remittanceId: string(uuid), required
- Request body: PostPaymentRequest
- Response 200: PostPaymentResponse
- Response 404: ProblemDetails

### GET /assistance-credit-cards/payments/{remittanceId}
- Tags: AssistanceCreditCard
- Path params: remittanceId: string(uuid), required
- Response 200: PaymentsResponse
- Response 404: ProblemDetails

### POST /assistance-credit-cards/refunds/{remittanceId}/{paymentId}
- Tags: AssistanceCreditCard
- Path params: remittanceId: string(uuid), required; paymentId: string(uuid), required
- Request body: PostRefundRequest
- Response 200: PostRefundResponse
- Response 404: ProblemDetails

### GET /claims
- Tags: Claim
- Query params: claimId: string(uuid)
- Response 200: ClaimDetails
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /claims/create-crossover-claim
- Tags: Claim
- Request body: CreateCrossoverClaimRequest
- Response 200: CreateCrossoverClaimResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /claims/search-by-claimnumber
- Tags: Claim
- Request body: ClaimNumberSearchRequest
- Response 200: ClaimSelectionDetails
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /claims/search-by-claimnumber-with-policies
- Tags: Claim
- Request body: ClaimNumberSearchRequest
- Response 200: SearchByClaimNumberResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /claims/search-by-patient
- Tags: Claim
- Request body: PatientClaimSearchRequest
- Response 200: ClaimSelectionDetails
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /insurance-credit-cards/payments/{remittanceId}
- Tags: InsuranceCreditCard
- Path params: remittanceId: string(uuid), required
- Request body: PostPaymentRequest
- Response 200: PostPaymentResponse
- Response 404: ProblemDetails

### GET /insurance-credit-cards/payments/{remittanceId}
- Tags: InsuranceCreditCard
- Path params: remittanceId: string(uuid), required
- Response 200: PaymentsResponse
- Response 404: ProblemDetails

### POST /insurance-credit-cards/refunds/{remittanceId}/{paymentId}
- Tags: InsuranceCreditCard
- Path params: remittanceId: string(uuid), required; paymentId: string(uuid), required
- Request body: PostRefundRequest
- Response 200: PostRefundResponse
- Response 404: ProblemDetails

### POST /orchestration/environment/ping
- Tags: Orchestration
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /orchestration/environment/purge
- Tags: Orchestration
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /orchestration/environment/purge-history/{hours}
- Tags: Orchestration
- Path params: hours: ['integer', 'string'](int32), required
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /orchestration/environment/state
- Tags: Orchestration
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /orchestration/organization/ping
- Tags: Orchestration
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /orchestration/organization/purge
- Tags: Orchestration
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /orchestration/organization/rules-build/rule/{netType}/{ruleId}
- Tags: Orchestration
- Path params: netType: ['integer', 'string'](int32), required; ruleId: string(uuid), required
- Response 202: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /orchestration/organization/rules-build/set/{setId}
- Tags: Orchestration
- Path params: setId: string(uuid), required
- Response 202: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /orchestration/organization/state
- Tags: Orchestration
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /orchestration/remittance/{remittanceId}/claimpayment/{claimPaymentId}/isevaluating
- Tags: Orchestration
- Path params: remittanceId: string(uuid), required; claimPaymentId: string(uuid), required
- Response 200: boolean
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /orchestration/remittance/{remittanceId}/claimpayment/{claimPaymentId}/ping
- Tags: Orchestration
- Path params: remittanceId: string(uuid), required; claimPaymentId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /orchestration/remittance/{remittanceId}/claimpayment/{claimPaymentId}/purge
- Tags: Orchestration
- Path params: remittanceId: string(uuid), required; claimPaymentId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /orchestration/remittance/{remittanceId}/claimpayment/{claimPaymentId}/state
- Tags: Orchestration
- Path params: remittanceId: string(uuid), required; claimPaymentId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /orchestration/remittance/{remittanceId}/evaluate-claimpayments
- Tags: Orchestration
- Path params: remittanceId: string(uuid), required
- Request body: ClaimPaymentsEvaluationParameters
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /orchestration/remittance/{remittanceId}/evaluate-remittance
- Tags: Orchestration
- Path params: remittanceId: string(uuid), required
- Request body: RemittanceEvaluationParameters
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /orchestration/remittance/{remittanceId}/isevaluating
- Tags: Orchestration
- Path params: remittanceId: string(uuid), required
- Response 200: boolean
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /orchestration/remittance/{remittanceId}/ping
- Tags: Orchestration
- Path params: remittanceId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /orchestration/remittance/{remittanceId}/purge
- Tags: Orchestration
- Path params: remittanceId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /orchestration/remittance/{remittanceId}/state
- Tags: Orchestration
- Path params: remittanceId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /orchestration/throttle/{name}/ping
- Tags: Orchestration
- Path params: name: string, required
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /orchestration/throttle/{name}/purge
- Tags: Orchestration
- Path params: name: string, required
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /orchestration/throttle/{name}/state
- Tags: Orchestration
- Path params: name: string, required
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /payerliterals
- Tags: PayerLiteralSetting
- Request body: SettingKey
- Response 200: SettingValues
- Response 404: ProblemDetails

### PUT /payerliterals
- Tags: PayerLiteralSetting
- Request body: Setting
- Response 200: Setting
- Response 404: ProblemDetails

### GET /payers/{payerId}/remittances/posted
- Tags: PayerRemittance
- Path params: payerId: string(uuid), required
- Response 200: RemittanceHeader[]

### GET /payers/{payerId}/remittances/posted/nothardclosed
- Tags: PayerRemittance
- Path params: payerId: string(uuid), required
- Response 200: PayerRemittance[]

### POST /payers/{payerId}/remittances/posted/search
- Tags: PayerRemittance
- Path params: payerId: string(uuid), required
- Request body: CheckPaymentSearchRequest
- Response 200: RemittanceHeader[]

### GET /payers/{payerId}/remittances/reconciled
- Tags: PayerRemittance
- Path params: payerId: string(uuid), required
- Response 200: PayerRemittance[]

### GET /remittance-processing-charge-rules
- Tags: ChargeRule
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### POST /remittance-processing-charge-rules
- Tags: ChargeRule
- Request body: CreateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /remittance-processing-charge-rules/{ruleId}
- Tags: ChargeRule
- Path params: ruleId: string(uuid), required
- Response 200: RuleDetail
- Response 404: ProblemDetails

### PUT /remittance-processing-charge-rules/{ruleId}/delete
- Tags: ChargeRule
- Path params: ruleId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /remittance-processing-charge-rules/{ruleId}/update
- Tags: ChargeRule
- Path params: ruleId: string(uuid), required
- Request body: UpdateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /remittance-processing-charge-rules/behaviors/manualreview/releaseactions
- Tags: ChargeRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /remittance-processing-charge-rules/names/isunique
- Tags: ChargeRule
- Query params: name: string
- Response 200: boolean

### GET /remittance-processing-charge-rules/qualifiers
- Tags: ChargeRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /remittance-processing-charge-rules/ruleactions
- Tags: ChargeRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /remittance-processing-claim-rules
- Tags: ClaimRule
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### POST /remittance-processing-claim-rules
- Tags: ClaimRule
- Request body: CreateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /remittance-processing-claim-rules/{ruleId}
- Tags: ClaimRule
- Path params: ruleId: string(uuid), required
- Response 200: RuleDetail
- Response 404: ProblemDetails

### PUT /remittance-processing-claim-rules/{ruleId}/delete
- Tags: ClaimRule
- Path params: ruleId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /remittance-processing-claim-rules/{ruleId}/update
- Tags: ClaimRule
- Path params: ruleId: string(uuid), required
- Request body: UpdateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /remittance-processing-claim-rules/behaviors/manualreview/releaseactions
- Tags: ClaimRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /remittance-processing-claim-rules/names/isunique
- Tags: ClaimRule
- Query params: name: string
- Response 200: boolean

### GET /remittance-processing-claim-rules/qualifiers
- Tags: ClaimRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /remittance-processing-claim-rules/ruleactions
- Tags: ClaimRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /remittance-processing-sequences
- Tags: RemittanceSequence
- Response 200: SequenceHeader[]
- Response 404: ProblemDetails

### GET /remittance-processing-sequences/{sequenceId}
- Tags: RemittanceSequence
- Path params: sequenceId: string(uuid), required
- Response 200: SequenceHeader
- Response 404: ProblemDetails

### PUT /remittance-processing-sequences/{sequenceId}/archive
- Tags: RemittanceSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /remittance-processing-sequences/{sequenceId}/behaviors
- Tags: RemittanceSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /remittance-processing-sequences/{sequenceId}/restore
- Tags: RemittanceSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /remittance-processing-sequences/{sequenceId}/rules
- Tags: RemittanceSequence
- Path params: sequenceId: string(uuid), required
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### PUT /remittance-processing-sequences/{sequenceId}/rules/reorder
- Tags: RemittanceSequence
- Path params: sequenceId: string(uuid), required
- Request body: RuleOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /remittance-processing-sequences/{sequenceId}/update
- Tags: RemittanceSequence
- Path params: sequenceId: string(uuid), required
- Request body: UpdateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /remittances/{remittanceId}
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Response 200: Remittance
- Response 404: ProblemDetails

### GET /remittances/{remittanceId}/{claimPaymentId}/disputes
- Tags: Remittance
- Path params: remittanceId: string(uuid), required; claimPaymentId: string(uuid), required
- Response 200: ClaimPaymentDisputesResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /remittances/{remittanceId}/{claimPaymentId}/EncounterNote
- Tags: Remittance
- Path params: remittanceId: string(uuid), required; claimPaymentId: string(uuid), required
- Response 200: string
- Response 400: ProblemDetails

### PUT /remittances/{remittanceId}/{claimPaymentId}/EncounterNote
- Tags: Remittance
- Path params: remittanceId: string(uuid), required; claimPaymentId: string(uuid), required
- Request body: EncounterNote
- Response 200: (no body)
- Response 400: ProblemDetails

### GET /remittances/{remittanceId}/{claimPaymentId}/ExceptionToolTips
- Tags: Remittance
- Path params: remittanceId: string(uuid), required; claimPaymentId: string(uuid), required
- Response 200: object
- Response 400: ProblemDetails

### PUT /remittances/{remittanceId}/{claimPaymentId}/reevaluate
- Tags: Remittance
- Path params: remittanceId: string(uuid), required; claimPaymentId: string(uuid), required
- Response 200: Remittance
- Response 404: ProblemDetails

### PUT /remittances/{remittanceId}/archive
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Response 200: (no body)

### PUT /remittances/{remittanceId}/assign
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Response 200: (no body)

### PUT /remittances/{remittanceId}/assign/{assignedTo}
- Tags: Remittance
- Path params: remittanceId: string(uuid), required; assignedTo: string(uuid), required
- Response 200: (no body)

### PUT /remittances/{remittanceId}/assign/clear
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Response 200: (no body)

### GET /remittances/{remittanceId}/assignedTo
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Response 200: ['null', 'string'](uuid)

### PUT /remittances/{remittanceId}/checkadjustmentsamount/update
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Request body: ['number', 'string'](double)
- Response 200: (no body)
- Response 400: ProblemDetails

### PUT /remittances/{remittanceId}/checknumber/update
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Request body: string
- Response 200: (no body)
- Response 400: ProblemDetails

### POST /remittances/{remittanceId}/claimpaymentlist/post
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Request body: ClaimPaymentsPostRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /remittances/{remittanceId}/claimpaymentlist/post/stats
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Request body: ClaimPaymentsPostRequest
- Response 200: ChargePostingInfo
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /remittances/{remittanceId}/claimpayments
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Request body: string(uuid)[]
- Response 200: ClaimPayment[]

### POST /remittances/{remittanceId}/claimpayments/{claimPaymentId}/claim/update
- Tags: Remittance
- Path params: remittanceId: string(uuid), required; claimPaymentId: string(uuid), required
- Request body: UpdateClaimPaymentClaimRequest
- Response 200: (no body)
- Response 400: ProblemDetails

### POST /remittances/{remittanceId}/claimpayments/{claimPaymentId}/discard
- Tags: Remittance
- Path params: remittanceId: string(uuid), required; claimPaymentId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /remittances/{remittanceId}/claimpayments/{claimPaymentId}/discard/reverse
- Tags: Remittance
- Path params: remittanceId: string(uuid), required; claimPaymentId: string(uuid), required
- Response 200: Remittance
- Response 404: ProblemDetails

### POST /remittances/{remittanceId}/claimpayments/{claimPaymentId}/post
- Tags: Remittance
- Path params: remittanceId: string(uuid), required; claimPaymentId: string(uuid), required
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /remittances/{remittanceId}/claimpayments/{claimPaymentId}/post/reverse
- Tags: Remittance
- Path params: remittanceId: string(uuid), required; claimPaymentId: string(uuid), required
- Response 200: Remittance
- Response 404: ProblemDetails

### POST /remittances/{remittanceId}/claimpayments/{claimPaymentId}/remove
- Tags: Remittance
- Path params: remittanceId: string(uuid), required; claimPaymentId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /remittances/{remittanceId}/claimpayments/{claimPaymentId}/remove/reverse
- Tags: Remittance
- Path params: remittanceId: string(uuid), required; claimPaymentId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /remittances/{remittanceId}/claimpayments/{claimPaymentId}/update
- Tags: Remittance
- Path params: remittanceId: string(uuid), required; claimPaymentId: string(uuid), required
- Request body: UpdateClaimPaymentRequest
- Response 200: (no body)
- Response 400: ProblemDetails

### POST /remittances/{remittanceId}/claimpayments/add
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Request body: AddClaimPaymentRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails

### POST /remittances/{remittanceId}/claimpayments/post
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /remittances/{remittanceId}/claimpayments/post/reverse
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Response 200: Remittance
- Response 404: ProblemDetails

### GET /remittances/{remittanceId}/claimpayments/post/stats
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Response 200: ChargePostingInfo
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /remittances/{remittanceId}/claimpayments/posted
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Response 200: PostedClaimsResponse[]

### POST /remittances/{remittanceId}/claimpayments/posted/download
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails

### POST /remittances/{remittanceId}/claimpayments/search
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Request body: ClaimPaymentSearchRequest
- Response 200: ClaimPayment[]

### GET /remittances/{remittanceId}/exception/stats
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Response 200: RemittanceExceptionInfo
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /remittances/{remittanceId}/processingmode
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Response 200: Remittance
- Response 404: ProblemDetails

### PUT /remittances/{remittanceId}/rebalance
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Response 200: Remittance
- Response 404: ProblemDetails

### PUT /remittances/{remittanceId}/reevaluate
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Response 200: Remittance
- Response 404: ProblemDetails

### PUT /remittances/{remittanceId}/snooze/{snoozeTill}
- Tags: Remittance
- Path params: remittanceId: string(uuid), required; snoozeTill: ['number', 'string'](double), required
- Response 200: (no body)

### PUT /remittances/{remittanceId}/unarchive
- Tags: Remittance
- Path params: remittanceId: string(uuid), required
- Response 200: (no body)

### GET /remittances/assigned-users
- Tags: Remittance
- Query params: remittanceId: string(uuid)
- Response 200: string(uuid)[]

### POST /remittances/checknumbersearch
- Tags: Remittance
- Request body: CheckSearchRequestByCheckNumber
- Response 200: CheckSearchResultByCheckNumber[]

### POST /remittances/claimidsearch
- Tags: Remittance
- Request body: CheckSearchRequestByClaimId
- Response 200: CheckSearchResultByClaimId[]

### POST /remittances/claimnumbersearch
- Tags: Remittance
- Request body: CheckSearchRequestByClaimNumber
- Response 200: CheckSearchResultByClaimNumber[]

### GET /remittances/exceptions
- Tags: Remittance
- Response 200: PaymentExceptionInfo[]
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /remittances/exceptions/blocking
- Tags: Remittance
- Query params: remittanceId: string(uuid)
- Response 200: PaymentExceptionInfo[]
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /remittances/payer-for-remittances
- Tags: Remittance
- Request body: string(uuid)[]
- Response 200: PayerByRemittanceResponse[]

### POST /remittances/policyidsearch
- Tags: Remittance
- Request body: CheckSearchRequestByPolicyId
- Response 200: CheckSearchResultByPolicyId[]

### PUT /remittances/reevaluate-status
- Tags: Remittance
- Request body: EvaluateRemitStatusRequest[]
- Response 200: EvaluateRemitStatusResponse[]
- Response 400: ProblemDetails

### GET /remittances/reserved-funds/{remittanceId}
- Tags: ReservedFunds
- Path params: remittanceId: string(uuid), required
- Response 200: Remittance
- Response 404: ProblemDetails

### POST /remittances/reserved-funds/{remittanceId}
- Tags: ReservedFunds
- Path params: remittanceId: string(uuid), required
- Request body: ReservedFundsAddRequest
- Response 200: Remittance
- Response 404: ProblemDetails

### GET /remittances/reserved-funds/{remittanceId}/{reservedfundsId}
- Tags: ReservedFunds
- Path params: remittanceId: string(uuid), required; reservedfundsId: string(uuid), required
- Response 200: ReservedFundGridDetail
- Response 404: ProblemDetails

### PUT /remittances/reserved-funds/{remittanceId}/{reservedfundsId}/Amount/{Amount}
- Tags: ReservedFunds
- Path params: remittanceId: string(uuid), required; reservedFundsId: string(uuid), required; Amount: ['number', 'string'](double), required
- Response 200: Remittance
- Response 404: ProblemDetails

### PUT /remittances/reserved-funds/{remittanceId}/{reservedfundsId}/CategoryId/{CategoryId}
- Tags: ReservedFunds
- Path params: remittanceId: string(uuid), required; reservedFundsId: string(uuid), required; CategoryId: string(uuid), required
- Response 200: Remittance
- Response 404: ProblemDetails

### PUT /remittances/reserved-funds/{remittanceId}/{reservedfundsId}/DivisionId/{DivisionId}
- Tags: ReservedFunds
- Path params: remittanceId: string(uuid), required; reservedFundsId: string(uuid), required; DivisionId: string(uuid), required
- Response 200: Remittance
- Response 404: ProblemDetails

### PUT /remittances/reserved-funds/{remittanceId}/{reservedfundsId}/HICN
- Tags: ReservedFunds
- Path params: remittanceId: string(uuid), required; reservedFundsId: string(uuid), required
- Request body: SingleStreamRequest
- Response 200: Remittance
- Response 404: ProblemDetails

### PUT /remittances/reserved-funds/{remittanceId}/{reservedfundsId}/Note
- Tags: ReservedFunds
- Path params: remittanceId: string(uuid), required; reservedFundsId: string(uuid), required
- Request body: SingleStreamRequest
- Response 200: Remittance
- Response 404: ProblemDetails

### PUT /remittances/reserved-funds/{remittanceId}/{reservedfundsId}/OtherId
- Tags: ReservedFunds
- Path params: remittanceId: string(uuid), required; reservedFundsId: string(uuid), required
- Request body: SingleStreamRequest
- Response 200: Remittance
- Response 404: ProblemDetails

### PUT /remittances/reserved-funds/{remittanceId}/{reservedfundsId}/ReasonCodeId/{ReasonCodeId}
- Tags: ReservedFunds
- Path params: remittanceId: string(uuid), required; reservedFundsId: string(uuid), required; ReasonCodeId: string(uuid), required
- Response 200: Remittance
- Response 404: ProblemDetails

### PUT /remittances/reserved-funds/{remittanceId}/{reservedfundsId}/ReasonCodeId/undefined
- Tags: ReservedFunds
- Path params: remittanceId: string(uuid), required; reservedFundsId: string(uuid), required
- Response 200: Remittance
- Response 404: ProblemDetails

### PUT /remittances/reserved-funds/{remittanceId}/{reservedfundsId}/Type/{Type}
- Tags: ReservedFunds
- Path params: remittanceId: string(uuid), required; reservedFundsId: string(uuid), required; Type: ReservedFundType, required
- Response 200: Remittance
- Response 404: ProblemDetails

### PUT /remittances/reserved-funds/{remittanceId}/discard
- Tags: ReservedFunds
- Path params: remittanceId: string(uuid), required
- Request body: ReservedFundsIdList
- Response 200: Remittance
- Response 404: ProblemDetails

### PUT /remittances/reserved-funds/{remittanceId}/discard/reverse
- Tags: ReservedFunds
- Path params: remittanceId: string(uuid), required
- Request body: ReservedFundsIdList
- Response 200: Remittance
- Response 404: ProblemDetails

### GET /remittances/reserved-funds/{remittanceId}/grid
- Tags: ReservedFunds
- Path params: remittanceId: string(uuid), required
- Response 200: Remittance
- Response 404: ProblemDetails

### PUT /remittances/reserved-funds/{remittanceId}/post
- Tags: ReservedFunds
- Path params: remittanceId: string(uuid), required
- Request body: ReservedFundsIdList
- Response 200: Remittance
- Response 404: ProblemDetails

### PUT /remittances/reserved-funds/{remittanceId}/post/reverse
- Tags: ReservedFunds
- Path params: remittanceId: string(uuid), required
- Request body: ReservedFundsIdList
- Response 200: Remittance
- Response 404: ProblemDetails

### PUT /remittances/reserved-funds/{remittanceId}/post/reverseall
- Tags: ReservedFunds
- Path params: remittanceId: string(uuid), required
- Response 200: Remittance
- Response 404: ProblemDetails

### PUT /remittances/reserved-funds/{remittanceId}/remove
- Tags: ReservedFunds
- Path params: remittanceId: string(uuid), required
- Request body: ReservedFundsIdList
- Response 200: Remittance
- Response 404: ProblemDetails

### PUT /remittances/reserved-funds/{remittanceId}/remove/reverse
- Tags: ReservedFunds
- Path params: remittanceId: string(uuid), required
- Request body: ReservedFundsIdList
- Response 200: Remittance
- Response 404: ProblemDetails

### POST /remittances/support/{RemittanceId}/ChargeBalanceCheckup
- Tags: Support
- Path params: RemittanceId: string(uuid), required
- Response 200: string[]

### POST /remittances/support/{RemittanceId}/ChargeBalanceCheckup/fix
- Tags: Support
- Path params: RemittanceId: string(uuid), required
- Response 200: (no body)

### POST /remittances/support/{RemittanceId}/ChargeToChargePaymentCheckup
- Tags: Support
- Path params: RemittanceId: string(uuid), required
- Response 200: string[]

### POST /remittances/support/{RemittanceId}/ChargeToChargePaymentCheckup/fix
- Tags: Support
- Path params: RemittanceId: string(uuid), required
- Response 200: (no body)

### POST /remittances/support/{RemittanceId}/ClearClosure
- Tags: Support
- Path params: RemittanceId: string(uuid), required
- Response 200: (no body)

### POST /remittances/support/{RemittanceId}/ClearExecutionPlans
- Tags: Support
- Path params: RemittanceId: string(uuid), required
- Response 200: (no body)

### POST /remittances/support/{remittanceId}/StreamProgressDocument/unlock
- Tags: Support
- Path params: remittanceId: string(uuid), required
- Response 200: (no body)

### GET /remittances/support/PartialSuccessCandidates
- Tags: Support
- Query params: ageHours: ['integer', 'string'](int32); startHoursAgo: ['integer', 'string'](int32)
- Response 200: PartialSuccessCandidate[]
- Response 400: ProblemDetails

### POST /remittances/support/PartialSuccessCandidates/retrigger
- Tags: Support
- Request body: PartialSuccessCandidate[]
- Response 200: PartialSuccessRetriggerResult[]

### POST /remittances/workflow/search
- Tags: Remittance
- Request body: RemittanceWorkflowSearchRequest
- Response 200: RemittanceWorkflowSearchResponse[]

### POST /remittances/workflow/search/count
- Tags: Remittance
- Request body: RemittanceWorkflowSearchRequest
- Response 200: ['integer', 'string'](int32)

### POST /signalr/remittanceprocessinghub/negotiate
- Tags: SignalR
- Response 200: (no body)

### POST /signalr/remittances/{remittanceId}/{claimpaymentId}/send
- Tags: SignalR
- Path params: remittanceId: string(uuid), required; claimPaymentId: string(uuid), required
- Response 200: (no body)

### POST /signalr/remittances/{remittanceId}/add
- Tags: SignalR
- Path params: remittanceId: string(uuid), required
- Response 200: (no body)

### POST /signalr/remittances/{remittanceId}/remove
- Tags: SignalR
- Path params: remittanceId: string(uuid), required
- Response 200: (no body)

### POST /signalr/remittances/{remittanceId}/send
- Tags: SignalR
- Path params: remittanceId: string(uuid), required
- Response 200: (no body)

### POST /signalr/remittances/{remittanceId}/send/{count}
- Tags: SignalR
- Path params: remittanceId: string(uuid), required; count: ['integer', 'string'](int32), required
- Response 200: (no body)

### GET /transfer-targets/{chargeAssemblyId}
- Tags: TransferTarget
- Path params: chargeAssemblyId: string(uuid), required
- Response 200: TransferTarget[]
- Response 404: ProblemDetails

### GET /transfer-targets/{chargeAssemblyId}/next/{currentPayerAssemblyId}
- Tags: TransferTarget
- Path params: chargeAssemblyId: string(uuid), required; currentPayerAssemblyId: string(uuid), required
- Query params: chargeIds: string(uuid)[]
- Response 200: TransferTarget
- Response 204: (no body)
- Response 404: ProblemDetails

### GET /transfer-targets/claim/{claimId}
- Tags: TransferTarget
- Path params: claimId: string(uuid), required
- Response 200: TransferTargetListWithNext
- Response 404: ProblemDetails

### GET /vendor/Company/HasUnlimitedRemittances/{CompanyId}
- Tags: VendorManagement
- Path params: CompanyId: string(uuid), required
- Response 200: boolean

### PUT /vendor/Company/LimitedRemittances/{CompanyId}
- Tags: VendorManagement
- Path params: CompanyId: string(uuid), required
- Response 200: (no body)

### PUT /vendor/Company/UnlimitedRemittances/{CompanyId}
- Tags: VendorManagement
- Path params: CompanyId: string(uuid), required
- Response 200: (no body)

### PUT /vendor/ReservedFunds/disable
- Tags: VendorManagement
- Response 200: (no body)

### PUT /vendor/ReservedFunds/enable
- Tags: VendorManagement
- Response 200: (no body)

### GET /vendor/ReservedFunds/enabled
- Tags: VendorManagement
- Response 200: boolean

## Schemas

**AccountType**
  - (no properties)

**AddClaimPaymentRequest**
  - claimId: ['null', 'string'](uuid) (required)
  - claimNumber: string (required)
  - icn: ['null', 'string'] (required)
  - isCrossover: boolean
  - totalPaid: ['number', 'string'](double) (required)
  - chargePayments: ChargePaymentRequest[] (required)

**AttributeQualifiers**
  - attributeType: AttributeType (required)
  - setQualifiers: ['null', 'array']
  - elementQualifiers: ['null', 'array']

**AttributeType**
  - (no properties)

**ChargePayment**
  - chargePaymentId: string(uuid) (required)
  - chargeId: ['null', 'string'](uuid) (required)
  - activityId: ['null', 'string'](uuid) (required)
  - dateOfService: object (required)
  - billingProviderId: ['null', 'string'](uuid) (required)
  - facilityId: ['null', 'string'](uuid) (required)
  - billingUnits: ['null', 'number', 'string'](double) (required)
  - chargeCode: string (required)
  - modifiers: string(uuid)[]
  - billedAmount: ['null', 'number', 'string'](double) (required)
  - balanceAmount: ['null', 'number', 'string'](double) (required)
  - expectedAmount: ['null', 'number', 'string'](double) (required)
  - paidAmount: ['number', 'string'](double)
  - interest: ['number', 'string'](double)
  - remainingAmount: ['null', 'number', 'string'](double) (required)
  - isDisputed: boolean (required)
  - isDisputedUserSet: boolean (required)
  - excludeFromPosting: boolean (required)
  - patientResponsibilities: PaymentTransfer[]
  - adjustments: PaymentAdjustment[]
  - remarkCodes: Remark[]
  - exceptions: PaymentException[]
  - payments: Payment[]
  - transferToDetails: TransferToDetails (required)
  - failureReasons: string[]

**ChargePaymentRequest**
  - chargePaymentId: ['null', 'string'](uuid) (required)
  - chargeId: ['null', 'string'](uuid) (required)
  - chargeCode: string (required)
  - isDisputed: boolean (required)
  - isDisputedUserSet: boolean
  - excludeFromPosting: boolean
  - transfers: PaymentTransfer[] (required)
  - adjustments: PaymentAdjustment[] (required)
  - remarkCodes: Remark[] (required)
  - payments: ['null', 'array']
  - transferToDetails: object

**ChargePostingInfo**
  - remittanceId: string(uuid) (required)
  - postedAsIs: ['integer', 'string'](int32) (required)
  - postedWithDispute: ['integer', 'string'](int32) (required)
  - requireInterventions: ['integer', 'string'](int32) (required)
  - excludedFromPosting: ['integer', 'string'](int32) (required)
  - transitionEpisodes: TransitionEpisode[] (required)

**CheckPaymentSearchRequest**
  - fromDate: Date (required)
  - toDate: Date (required)

**CheckPaymentStatus**
  - (no properties)

**CheckPostingStatus**
  - (no properties)

**CheckSearchRequestByCheckNumber**
  - checkNumber: string (required)
  - includePending: boolean

**CheckSearchRequestByClaimId**
  - claimId: string(uuid) (required)

**CheckSearchRequestByClaimNumber**
  - claimNumber: string (required)

**CheckSearchRequestByPolicyId**
  - policyId: string(uuid) (required)

**CheckSearchResultByCheckNumber**
  - remittanceId: string(uuid) (required)
  - payerId: ['null', 'string'](uuid) (required)
  - checkNumber: string (required)
  - ledgerDate: object (required)
  - depositDate: object (required)
  - companyId: ['null', 'string'](uuid) (required)
  - checkAmount: ['null', 'number', 'string'](double) (required)
  - unappliedAmount: ['number', 'string'](double) (required)
  - assignedTo: ['null', 'string'](uuid) (required)
  - status: string (required)

**CheckSearchResultByClaimId**
  - remittanceId: string(uuid) (required)
  - payerId: ['null', 'string'](uuid) (required)
  - checkNumber: string (required)
  - checkDate: object (required)
  - assignedTo: ['null', 'string'](uuid) (required)
  - assignedToDate: object (required)
  - checkStatus: string (required)
  - claimPaymentId: string(uuid) (required)
  - transferToMode: TransferToMode (required)
  - nextPayerId: ['null', 'string'](uuid) (required)
  - nextPolicyId: ['null', 'string'](uuid) (required)
  - nextPlanId: ['null', 'string'](uuid) (required)
  - chargesBilled: ['integer', 'string'](int32) (required)
  - chargesPosted: ['integer', 'string'](int32) (required)
  - chargesDisputed: ['integer', 'string'](int32) (required)

**CheckSearchResultByClaimNumber**
  - remittanceId: string(uuid) (required)
  - payerId: ['null', 'string'](uuid) (required)
  - checkNumber: string (required)
  - checkDate: object (required)
  - assignedTo: ['null', 'string'](uuid) (required)
  - assignedToDate: object (required)
  - checkStatus: string (required)
  - claimPaymentId: string(uuid) (required)
  - transferToMode: TransferToMode (required)
  - nextPayerId: ['null', 'string'](uuid) (required)
  - nextPolicyId: ['null', 'string'](uuid) (required)
  - nextPlanId: ['null', 'string'](uuid) (required)
  - chargesBilled: ['integer', 'string'](int32) (required)
  - chargesPosted: ['integer', 'string'](int32) (required)
  - chargesDisputed: ['integer', 'string'](int32) (required)

**CheckSearchResultByPolicyId**
  - remittanceId: string(uuid) (required)
  - checkNumber: string (required)
  - depositDate: object (required)
  - companyId: ['null', 'string'](uuid) (required)
  - paymentType: ['integer', 'string'](int32) (required)
  - checkPaymentStatus: CheckPaymentStatus (required)
  - checkAmount: ['null', 'number', 'string'](double) (required)
  - applicable: ['number', 'string'](double) (required)
  - checkPostingStatus: CheckPostingStatus (required)

**CheckSource**
  - (no properties)

**ClaimDetails**
  - (no properties)

**ClaimNumberSearchRequest**
  - claimNumber: ['null', 'string'] (required)
  - companyId: ['null', 'string'](uuid) (required)

**ClaimPayment**
  - claimPaymentId: ['null', 'string'](uuid) (required)
  - claimId: ['null', 'string'](uuid) (required)
  - claimType: ['null', 'integer', 'string'](int32) (required)
  - status: ClaimPostingStatus (required)
  - invoiceNumber: ['null', 'string'] (required)
  - icn: ['null', 'string'] (required)
  - isCrossover: boolean (required)
  - patientId: ['null', 'string'](uuid) (required)
  - patientFan: ['null', 'string'] (required)
  - patientDob: object (required)
  - patientName: ['null', 'string'] (required)
  - policyId: ['null', 'string'](uuid) (required)
  - policyHolderName: ['null', 'string'] (required)
  - policyHolderDob: object (required)
  - planId: ['null', 'string'](uuid) (required)
  - snfId: ['null', 'string'](uuid) (required)
  - payerPosition: ['integer', 'string'](int32) (required)
  - nextPayerId: ['null', 'string'](uuid) (required)
  - nextPlanId: ['null', 'string'](uuid) (required)
  - guarantorId: ['null', 'string'](uuid) (required)
  - guarantorName: ['null', 'string'] (required)
  - reviewedBy: ['null', 'string'](uuid) (required)
  - reviewedDate: ['null', 'string'](date-time) (required)
  - discardedBy: ['null', 'string'](uuid) (required)
  - discardedDate: ['null', 'string'](date-time) (required)
  - removedBy: ['null', 'string'](uuid) (required)
  - removedDate: ['null', 'string'](date-time) (required)
  - postedBy: ['null', 'string'](uuid) (required)
  - postedDate: ['null', 'string'](date-time) (required)
  - isManuallyAdded: boolean (required)
  - totalTransferred: ['null', 'number', 'string'](double) (required)
  - totalAdjusted: ['null', 'number', 'string'](double) (required)
  - totalPaid: ['null', 'number', 'string'](double) (required)
  - isSystemHandled: boolean (required)
  - totalChargeBilledAmount: ['null', 'number', 'string'](double) (required)
  - totalChargeAllowedAmount: ['null', 'number', 'string'](double) (required)
  - totalChargeExpectedAmount: ['null', 'number', 'string'](double) (required)
  - totalChargePatientResponsibilityAmount: ['null', 'number', 'string'](double) (required)
  - totalChargeAdjustmentAmount: ['null', 'number', 'string'](double) (required)
  - totalChargePaidAmount: ['null', 'number', 'string'](double) (required)
  - totalChargeInterest: ['null', 'number', 'string'](double) (required)
  - totalChargeRemainingAmount: ['null', 'number', 'string'](double) (required)
  - claimBalance: ['number', 'string'](double)
  - chargePayments: ChargePayment[]
  - exceptions: PaymentException[]
  - failureReasons: string[]
  - division: ['null', 'string'](uuid) (required)

**ClaimPaymentDisputesResponse**
  - disputes: object (required)

**ClaimPaymentInfo**
  - (no properties)

**ClaimPaymentSearchRequest**
  - invoiceNumber: ['null', 'string']
  - status: object
  - fan: ['null', 'string']
  - patientLastName: ['null', 'string']
  - patientFirstName: ['null', 'string']
  - paymentAmountMin: ['null', 'number', 'string'](double)
  - paymentAmountMax: ['null', 'number', 'string'](double)
  - transferAmount: ['null', 'number', 'string'](double)
  - hasNoExceptions: ['null', 'boolean']
  - divisionId: ['null', 'string'](uuid)
  - startDateOfService: object
  - endDateOfService: object
  - exceptions: ['null', 'array']

**ClaimPaymentsEvaluationParameters**
  - mode: EvaluationMode
  - claimPaymentIds: string(uuid)[]
  - requestSource: RequestSource
  - simulatedEntities: boolean
  - simulatedDuration: ['integer', 'string'](int32)
  - simulatedFailure: boolean
  - simulatedRepeatCount: ['integer', 'string'](int32)

**ClaimPaymentsPostRequest**
  - (no properties)

**ClaimPostingStatus**
  - (no properties)

**ClaimSelectionDetails**
  - claimId: string(uuid) (required)
  - claimNumber: string (required)
  - claimType: ['null', 'integer', 'string'](int32) (required)
  - startDate: Date (required)
  - endDate: Date (required)
  - isPaid: boolean (required)
  - patientId: string(uuid) (required)
  - patientName: ['null', 'string'] (required)
  - patientFan: ['null', 'string'] (required)
  - patientDateOfBirth: object (required)
  - planId: ['null', 'string'](uuid) (required)
  - snfId: ['null', 'string'](uuid) (required)
  - payerId: string(uuid) (required)
  - payerPosition: ['integer', 'string'](int32) (required)
  - encounters: ClaimSelectionEncounter[] (required)
  - claimBalance: ['number', 'string'](double) (required)

**ClaimSelectionEncounter**
  - encounterNumber: string (required)
  - locationId: string(uuid) (required)

**CreateCrossoverClaimRequest**
  - primaryClaimId: string(uuid) (required)
  - portfolioId: string(uuid) (required)
  - policyId: string(uuid) (required)
  - planId: string(uuid) (required)
  - payerId: string(uuid) (required)
  - payerPosition: ['integer', 'string'](int32) (required)

**CreateCrossoverClaimResponse**
  - success: boolean (required)
  - claimSelectionDetails: object (required)

**CreateRuleRequest**
  - sequenceId: string(uuid) (required)
  - name: string (required)
  - description: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)
  - behaviorCategory: ['integer', 'string'](int32) (required)
  - startDate: object (required)
  - endDate: object (required)
  - qualifiers: AttributeQualifiers[] (required)
  - sameDateOfServiceQualifiers: AttributeQualifiers[] (required)
  - episodeQualifier: object (required)
  - ruleAction: RuleAction (required)
  - releaseType: ReleaseType (required)
  - behaviorConfiguration: object (required)
  - qualificationConfiguration: ['null', 'object'] (required)
  - createdDate: ['null', 'string'](date-time)

**Date**
  - (no properties)

**DisputeTypes**
  - (no properties)

**DivisionPostingInfo**
  - divisionId: string(uuid) (required)
  - assignedTo: ['null', 'string'](uuid) (required)
  - planned: ['number', 'string'](double) (required)
  - posted: ['number', 'string'](double) (required)

**EditableFieldOfGuid**
  - currentValue: ['null', 'string'](uuid) (required)
  - displayValue: string (required)
  - isInvalid: boolean (required)
  - custom: object (required)
  - originalValue: string (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean

**EditableFieldOfstring**
  - currentValue: ['null', 'string'] (required)
  - displayValue: string (required)
  - isInvalid: boolean (required)
  - custom: object (required)
  - originalValue: string (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean

**ElementQualifier**
  - elementId: string (required)
  - exclusionary: boolean (required)

**EncounterNote**
  - note: string (required)

**EpisodeQualifier**
  - allEpisodes: boolean (required)
  - episodeTypes: string(uuid)[] (required)
  - phases: string(uuid)[] (required)
  - exclusionary: boolean (required)

**EvaluateRemitStatusRequest**
  - remittanceId: string(uuid) (required)
  - expectedStatus: CheckPostingStatus (required)

**EvaluateRemitStatusResponse**
  - remittanceId: string(uuid) (required)
  - checkNumber: string (required)
  - checkDate: object (required)
  - payerId: ['null', 'string'](uuid) (required)
  - depositDate: object (required)
  - ledgerDate: object (required)
  - checkAmount: ['number', 'string'](double) (required)
  - unappliedAmount: ['number', 'string'](double) (required)
  - currentStatus: CheckPostingStatus (required)
  - assignedUser: ['null', 'string'](uuid) (required)

**EvaluationMode**
  - enum values: Single, Remittance

**ExceptionToolTip**
  - name: string (required)
  - userGuidance: string (required)

**KeyValuePairOfintAndstring**
  - key: ['integer', 'string'](int32) (required)
  - value: ['null', 'string'] (required)

**NetType**
  - (no properties)

**NextChargePosition**
  - chargeId: string(uuid) (required)
  - position: ['null', 'integer', 'string'](int32) (required)

**PartialSuccessCandidate**
  - organizationId: string(uuid) (required)
  - remittanceId: string(uuid) (required)
  - claimPaymentId: string(uuid) (required)
  - userId: ['null', 'string'](uuid) (required)
  - postedAt: string(date-time) (required)

**PartialSuccessRetriggerResult**
  - candidate: PartialSuccessCandidate (required)
  - outcome: string (required)
  - reason: ['null', 'string'] (required)

**PatientClaimSearchRequest**
  - lastName: ['null', 'string'] (required)
  - firstName: ['null', 'string'] (required)
  - patientFAN: ['null', 'string'] (required)
  - dateOfBirth: object (required)
  - dateOfService: Date (required)
  - companyId: ['null', 'string'](uuid) (required)

**PayerAccount**
  - accountType: AccountType (required)
  - payerId: ['null', 'string'](uuid) (required)
  - planId: ['null', 'string'](uuid) (required)
  - policyId: ['null', 'string'](uuid) (required)
  - snfId: ['null', 'string'](uuid) (required)
  - snfPatientId: ['null', 'string'](uuid) (required)
  - guarantorId: ['null', 'string'](uuid) (required)
  - isAssistanceAccount: boolean (required)

**PayerAssemblyStatus**
  - (no properties)

**PayerByRemittanceResponse**
  - remittanceId: string(uuid) (required)
  - payerId: string(uuid) (required)
  - payerType: object (required)

**PayerRemittance**
  - remittanceId: string(uuid) (required)
  - checkNumber: string (required)
  - checkDate: object (required)
  - checkAmount: ['null', 'number', 'string'](double) (required)
  - payerId: ['null', 'string'](uuid) (required)
  - companyId: ['null', 'string'](uuid) (required)
  - depositDate: object (required)
  - unappliedAmount: ['number', 'string'](double) (required)
  - status: CheckPostingStatus (required)
  - ledgerDate: object (required)
  - reconciledDate: object (required)
  - reconciledBy: ['null', 'string'](uuid) (required)
  - assignedTo: ['null', 'string'](uuid) (required)
  - noteId: ['null', 'string'](uuid) (required)
  - attachmentId: ['null', 'string'](uuid) (required)

**PayerType**
  - (no properties)

**Payment**
  - paymentId: string(uuid) (required)
  - paymentSpecificationId: string(uuid) (required)
  - stashDate: Date (required)
  - stashUserId: string(uuid) (required)
  - card: string (required)
  - integration: string (required)
  - depositDate: Date (required)
  - amount: ['number', 'string'](double) (required)
  - refunds: Refund[] (required)

**PaymentAdjustment**
  - reasonId: ['null', 'string'](uuid) (required)
  - groupCode: ['null', 'string'] (required)
  - reasonCode: ['null', 'string'] (required)
  - amount: ['number', 'string'](double) (required)

**PaymentException**
  - (no properties)

**PaymentExceptionInfo**
  - (no properties)

**PaymentsResponse**
  - transfers: Payment[] (required)

**PaymentTransfer**
  - reasonId: ['null', 'string'](uuid) (required)
  - groupCode: ['null', 'string'] (required)
  - reasonCode: ['null', 'string'] (required)
  - amount: ['number', 'string'](double) (required)

**PolicyPosition**
  - portfolioId: string(uuid) (required)
  - policyId: string(uuid) (required)
  - planId: string(uuid) (required)
  - payerId: string(uuid) (required)
  - payerPosition: ['integer', 'string'](int32) (required)
  - planName: string (required)
  - policyNumber: string (required)

**PostedClaimsResponse**
  - claims: PostedClaimsResponseClaim[] (required)
  - totalTransfers: ['number', 'string'](double)
  - totalAdjusted: ['number', 'string'](double)
  - totalPaid: ['number', 'string'](double)
  - totalRemaining: ['number', 'string'](double)

**PostedClaimsResponseClaim**
  - claimPaymentId: string(uuid) (required)
  - claimId: string(uuid) (required)
  - claimNumber: string (required)
  - claimType: ['null', 'integer', 'string'](int32) (required)
  - patientId: string(uuid) (required)
  - patientFullName: string (required)
  - patientFan: string (required)
  - beginDate: Date (required)
  - endDate: Date (required)
  - totalTransfers: ['number', 'string'](double) (required)
  - totalAdjusted: ['number', 'string'](double) (required)
  - totalPaid: ['number', 'string'](double) (required)
  - totalRemaining: ['number', 'string'](double) (required)

**PostPaymentRequest**
  - amount: ['number', 'string'](double) (required)

**PostPaymentResponse**
  - paymentSource: string (required)
  - paymentId: string(uuid) (required)

**PostRefundRequest**
  - amount: ['number', 'string'](double) (required)
  - ledgerDate: Date (required)
  - refundReasonId: string(uuid) (required)

**PostRefundResponse**
  - paymentSource: string (required)
  - refundId: string(uuid) (required)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**QualifierHeader**
  - attributeType: AttributeType (required)
  - id: string (required)
  - isSet: boolean (required)
  - exclusionary: boolean (required)

**Refund**
  - stashDate: Date (required)
  - stashUserId: string(uuid) (required)
  - card: string (required)
  - refundReason: string (required)
  - refundDate: Date (required)
  - amount: ['number', 'string'](double) (required)

**ReleaseType**
  - (no properties)

**Remark**
  - remarkCodeId: ['null', 'string'](uuid) (required)
  - remarkCode: ['null', 'string'] (required)

**Remittance**
  - remittanceId: string(uuid) (required)
  - checkNumber: string (required)
  - checkDate: object (required)
  - checkAmount: ['null', 'number', 'string'](double) (required)
  - companyId: ['null', 'string'](uuid) (required)
  - depositDate: object (required)
  - appliedAmount: ['number', 'string'](double) (required)
  - unappliedAmount: ['number', 'string'](double) (required)
  - discardedAmount: ['number', 'string'](double) (required)
  - checkAdjustmentsAmount: ['number', 'string'](double) (required)
  - status: CheckPostingStatus (required)
  - reconciledDate: object
  - reconciledBy: ['null', 'string'](uuid) (required)
  - assignedTo: ['null', 'string'](uuid) (required)
  - claimPayments: ClaimPaymentInfo[]
  - divisionPostings: DivisionPostingInfo[]
  - remittanceProcessingMode: RemittanceProcessingMode (required)
  - claimsPosted: ['integer', 'string'](int32) (required)
  - paymentType: ['integer', 'string'](int32) (required)
  - isLedgerClosed: boolean (required)
  - payerLiteral: string (required)
  - payerId: ['null', 'string'](uuid) (required)
  - payerType: object (required)
  - noteId: ['null', 'string'](uuid) (required)
  - attachmentId: ['null', 'string'](uuid) (required)

**RemittanceEvaluationParameters**
  - mode: EvaluationMode
  - requestSource: RequestSource
  - simulatedEntities: boolean
  - simulatedDuration: ['integer', 'string'](int32)
  - simulatedFailure: boolean
  - simulatedRepeatCount: ['integer', 'string'](int32)

**RemittanceExceptionDetail**
  - claimPaymentCount: ['integer', 'string'](int32) (required)
  - chargeCount: ['integer', 'string'](int32) (required)
  - amount: ['number', 'string'](double) (required)

**RemittanceExceptionInfo**
  - remittanceId: string(uuid) (required)
  - denials: RemittanceExceptionDetail (required)
  - underPayments: RemittanceExceptionDetail (required)
  - otherExceptions: RemittanceExceptionDetail (required)
  - noExceptions: RemittanceExceptionDetail (required)

**RemittanceHeader**
  - remittanceId: string(uuid) (required)
  - checkNumber: string (required)
  - checkDate: object (required)
  - checkAmount: ['null', 'number', 'string'](double) (required)
  - payerId: ['null', 'string'](uuid) (required)
  - companyId: ['null', 'string'](uuid) (required)
  - depositDate: object (required)
  - unappliedAmount: ['number', 'string'](double) (required)
  - status: CheckPostingStatus (required)
  - ledgerDate: object (required)
  - reconciledDate: object
  - reconciledBy: ['null', 'string'](uuid) (required)
  - assignedTo: ['null', 'string'](uuid) (required)
  - noteId: ['null', 'string'](uuid) (required)
  - attachmentId: ['null', 'string'](uuid) (required)
  - claimNumbers: string[]

**RemittanceProcessingMode**
  - (no properties)

**RemittanceWorkflowSearchRequest**
  - checkSources: CheckSource[]
  - remittanceQualifiers: AttributeQualifiers[]
  - assignedUsers: string(uuid)[]
  - showPosted: boolean

**RemittanceWorkflowSearchResponse**
  - remittanceId: string(uuid) (required)
  - checkNumber: string (required)
  - checkDate: object (required)
  - checkAmount: ['null', 'number', 'string'](double) (required)
  - payerId: ['null', 'string'](uuid) (required)
  - payerType: object (required)
  - companyId: ['null', 'string'](uuid) (required)
  - depositDate: object (required)
  - unappliedAmount: ['number', 'string'](double) (required)
  - status: CheckPostingStatus (required)
  - ledgerDate: object (required)
  - reconciledDate: object
  - reconciledBy: ['null', 'string'](uuid) (required)
  - assignedTo: ['null', 'string'](uuid) (required)
  - noteId: ['null', 'string'](uuid) (required)
  - attachmentId: ['null', 'string'](uuid) (required)

**RequestSource**
  - enum values: Reconciling, Reevaluating, Updated

**ReservedFundGridDetail**
  - reservedFundsId: string(uuid) (required)
  - hicn: string (required)
  - otherId: string (required)
  - type: ReservedFundType (required)
  - reasonCodeId: EditableFieldOfGuid (required)
  - divisionId: EditableFieldOfGuid (required)
  - categoryId: EditableFieldOfGuid (required)
  - amount: ['null', 'number', 'string'](double) (required)
  - note: EditableFieldOfstring (required)
  - status: ReservedFundStatus (required)

**ReservedFundsAddRequest**
  - reservedFundsId: string(uuid) (required)
  - hicn: string (required)
  - otherId: ['null', 'string'] (required)
  - type: ReservedFundType (required)
  - reasonCodeId: ['null', 'string'](uuid) (required)
  - divisionId: ['null', 'string'](uuid) (required)
  - categoryId: ['null', 'string'](uuid) (required)
  - amount: ['null', 'number', 'string'](double) (required)

**ReservedFundsIdList**
  - reservedFundsIds: string(uuid)[] (required)

**ReservedFundStatus**
  - (no properties)

**ReservedFundType**
  - (no properties)

**RuleAction**
  - (no properties)

**RuleDetail**
  - sequenceId: string(uuid) (required)
  - ruleId: string(uuid) (required)
  - name: string (required)
  - description: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)
  - behaviorCategory: ['integer', 'string'](int32) (required)
  - startDate: object (required)
  - endDate: object (required)
  - qualifiers: AttributeQualifiers[] (required)
  - sameDateOfServiceQualifiers: AttributeQualifiers[] (required)
  - episodeQualifier: object (required)
  - behaviorConfiguration: ['null', 'object'] (required)
  - qualificationConfiguration: ['null', 'object'] (required)
  - reviewRequired: boolean
  - ruleAction: RuleAction (required)
  - releaseType: ReleaseType (required)
  - netType: NetType (required)
  - createdByUserId: string(uuid) (required)
  - createdDate: string(date-time) (required)
  - lastModifiedByUserId: string(uuid) (required)
  - lastModifiedDate: string(date-time) (required)

**RuleHeader**
  - ruleId: string(uuid) (required)
  - name: string (required)

**RuleOrder**
  - ruleId: string(uuid) (required)
  - order: ['integer', 'string'](int32) (required)

**RuleSummary**
  - ruleId: string(uuid) (required)
  - sequenceId: string(uuid) (required)
  - order: ['integer', 'string'](int32) (required)
  - name: string (required)
  - description: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)
  - behaviorCategory: ['integer', 'string'](int32) (required)
  - startDate: object (required)
  - endDate: object (required)
  - qualifiers: QualifierHeader[] (required)
  - sameDateOfServiceQualifiers: QualifierHeader[] (required)
  - releaseType: ReleaseType (required)
  - behaviorConfiguration: object (required)

**SearchByClaimNumberResponse**
  - claims: ClaimSelectionDetails[] (required)
  - policies: PolicyPosition[] (required)
  - primaryClaimId: ['null', 'string'](uuid)
  - waitingOnCrossover: boolean

**SequenceHeader**
  - sequenceId: string(uuid) (required)
  - order: ['integer', 'string'](int32) (required)
  - name: string (required)
  - rules: RuleHeader[]
  - sequenceStatus: SequenceStatus (required)
  - createdByUserId: string(uuid) (required)
  - createdDate: string(date-time) (required)
  - lastModifiedByUserId: string(uuid) (required)
  - lastModifiedDate: string(date-time) (required)

**SequenceStatus**
  - (no properties)

**SetQualifier**
  - setType: string (required)
  - setId: string(uuid) (required)
  - isFactorySet: boolean (required)
  - exclusionary: boolean (required)

**Setting**
  - key: SettingKey (required)
  - values: SettingValues (required)

**SettingKey**
  - payerLiteral: string (required)

**SettingValues**
  - ignorePayerControlNumber: boolean (required)

**SingleStreamRequest**
  - text: string (required)

**TransferTarget**
  - payerAssemblyId: string(uuid) (required)
  - payerResponsibilityIndex: ['integer', 'string'](int32) (required)
  - account: PayerAccount (required)
  - coveredCharges: string(uuid)[] (required)
  - payerAssemblyNumber: string (required)
  - status: PayerAssemblyStatus (required)

**TransferTargetListWithNext**
  - portfolioId: ['null', 'string'](uuid) (required)
  - transferTargets: TransferTarget[] (required)
  - nextChargePositions: NextChargePosition[] (required)

**TransferToDetails**
  - transferToMode: TransferToMode (required)
  - account: ['null', 'string'](uuid) (required)
  - portfolioId: ['null', 'string'](uuid)
  - planId: ['null', 'string'](uuid)
  - payerId: ['null', 'string'](uuid)
  - copayAssistanceAwardId: ['null', 'string'](uuid)

**TransferToMode**
  - (no properties)

**TransitionEpisode**
  - episodeTypeId: string(uuid) (required)
  - episodeTypeName: string (required)
  - phaseId: string(uuid) (required)
  - phaseName: string (required)

**UpdateClaimPaymentClaimRequest**
  - claimId: ['null', 'string'](uuid) (required)
  - claimNumber: string (required)

**UpdateClaimPaymentRequest**
  - icn: ['null', 'string'] (required)
  - isCrossover: boolean
  - totalPaid: ['number', 'string'](double) (required)
  - chargePayments: ChargePaymentRequest[] (required)

**UpdateRuleRequest**
  - ruleId: string(uuid) (required)
  - name: string (required)
  - description: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)
  - behaviorCategory: ['integer', 'string'](int32) (required)
  - startDate: object (required)
  - endDate: object (required)
  - qualifiers: AttributeQualifiers[] (required)
  - sameDateOfServiceQualifiers: AttributeQualifiers[] (required)
  - episodeQualifier: object (required)
  - ruleAction: RuleAction (required)
  - releaseType: ReleaseType (required)
  - behaviorConfiguration: object (required)
  - qualificationConfiguration: object (required)
  - modifiedDate: ['null', 'string'](date-time)

**UpdateSequenceRequest**
  - sequenceId: string(uuid) (required)
  - name: string (required)
  - enabled: boolean (required)

