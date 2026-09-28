﻿# Snowdrop.Catalogs.Services - API Dictionary

Repo: snowdrop-catalogs-be
Source: Snowdrop.Catalogs.Services.json

## Endpoints

### GET /00001122-6D60-46DA-9527-001122334455/{name}
- Tags: NationalDrugCodes
- Path params: name: string, required
- Response 200: NationalDrugCodeElement
- Response 404: ProblemDetails

### POST /00001122-6D60-46DA-9527-001122334455/findbyids
- Tags: NationalDrugCodes
- Request body: string[]
- Response 200: NationalDrugCodeElement
- Response 404: ProblemDetails

### POST /00001122-6D60-46DA-9527-001122334455/search
- Tags: NationalDrugCodes
- Request body: NationalDrugCodeSearchCriteria
- Response 200: NationalDrugCodeElement[]
- Response 400: ProblemDetails

### POST /00001122-6D60-46DA-9527-001122334455/search/drug
- Tags: NationalDrugCodes
- Request body: NationalDrugCodeDrugSearchCriteria
- Response 200: NationalDrugCodeElement[]
- Response 400: ProblemDetails

### POST /00001122-6D60-46DA-9527-001122334455/search/range
- Tags: NationalDrugCodes
- Request body: NationalDrugCodeRangeSearchCriteria
- Response 200: NationalDrugCodeSummaryElement[]
- Response 400: ProblemDetails

### GET /00AA3E98-BCF7-4460-AB06-9751827361CA/{code}/{icdCodeType}
- Tags: DiagnosisCodes
- Path params: code: string, required; icdCodeType: IcdCodeType, required
- Response 200: DiagnosisCodeElement
- Response 404: ProblemDetails

### POST /00AA3E98-BCF7-4460-AB06-9751827361CA/findall
- Tags: DiagnosisCodes
- Request body: IcdCodeIdentity[]
- Response 200: DiagnosisCodeElement[]
- Response 400: ProblemDetails

### POST /00AA3E98-BCF7-4460-AB06-9751827361CA/findbyids
- Tags: DiagnosisCodes
- Request body: IcdCodeIdentity[]
- Response 200: DiagnosisCodeElement
- Response 404: ProblemDetails

### POST /00AA3E98-BCF7-4460-AB06-9751827361CA/search
- Tags: DiagnosisCodes
- Request body: DiagnosisCodeSearchCriteria
- Response 200: DiagnosisCodeElement[]
- Response 400: ProblemDetails

### POST /00AA3E98-BCF7-4460-AB06-9751827361CA/search/range
- Tags: DiagnosisCodes
- Request body: DiagnosisCodeRangeSearchCriteria
- Response 200: DiagnosisCodeSummaryElement[]
- Response 400: ProblemDetails

### GET /01f21420-1d75-4923-8952-63a7720ee78e
- Tags: InterventionProgresses
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /01f21420-1d75-4923-8952-63a7720ee78e/element
- Tags: InterventionProgresses
- Query params: name: string
- Response 200: InterventionProgressElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /01f21420-1d75-4923-8952-63a7720ee78e/elements
- Tags: InterventionProgresses
- Response 200: InterventionProgressElement[]
- Response 404: ProblemDetails

### GET /01f21420-1d75-4923-8952-63a7720ee78e/elements/{elementId}
- Tags: InterventionProgresses
- Path params: elementId: string(uuid), required
- Response 200: InterventionProgressElement
- Response 404: ProblemDetails

### GET /0387b849-505b-4f37-8e1d-473e0d71c3a3
- Tags: ArrivalStatuses
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /0387b849-505b-4f37-8e1d-473e0d71c3a3/element
- Tags: ArrivalStatuses
- Query params: name: string
- Response 200: ArrivalStatusElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /0387b849-505b-4f37-8e1d-473e0d71c3a3/elements
- Tags: ArrivalStatuses
- Response 200: ArrivalStatusElement[]
- Response 404: ProblemDetails

### GET /0387b849-505b-4f37-8e1d-473e0d71c3a3/elements/{elementId}
- Tags: ArrivalStatuses
- Path params: elementId: string(uuid), required
- Response 200: ArrivalStatusElement
- Response 404: ProblemDetails

### GET /050cc506-ff9d-4438-8819-f796c788aa22
- Tags: Pronouns
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /050cc506-ff9d-4438-8819-f796c788aa22/element
- Tags: Pronouns
- Query params: name: string
- Response 200: PronounElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /050cc506-ff9d-4438-8819-f796c788aa22/elements
- Tags: Pronouns
- Response 200: PronounElement[]
- Response 404: ProblemDetails

### GET /050cc506-ff9d-4438-8819-f796c788aa22/elements/{elementId}
- Tags: Pronouns
- Path params: elementId: string(uuid), required
- Response 200: PronounElement
- Response 404: ProblemDetails

### GET /080bf638-8e7f-462d-bdda-69748ab82319
- Tags: GenderIdentities
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /080bf638-8e7f-462d-bdda-69748ab82319/element
- Tags: GenderIdentities
- Query params: name: string
- Response 200: GenderIdentityElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /080bf638-8e7f-462d-bdda-69748ab82319/elements
- Tags: GenderIdentities
- Response 200: GenderIdentityElement[]
- Response 404: ProblemDetails

### GET /080bf638-8e7f-462d-bdda-69748ab82319/elements/{elementId}
- Tags: GenderIdentities
- Path params: elementId: string(uuid), required
- Response 200: GenderIdentityElement
- Response 404: ProblemDetails

### GET /08853be8-348a-4d36-a1b1-e8714dd5de1c
- Tags: PlanTypes
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /08853be8-348a-4d36-a1b1-e8714dd5de1c/element
- Tags: PlanTypes
- Query params: name: string
- Response 200: PlanTypeElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /08853be8-348a-4d36-a1b1-e8714dd5de1c/elements
- Tags: PlanTypes
- Response 200: PlanTypeElement[]
- Response 404: ProblemDetails

### GET /08853be8-348a-4d36-a1b1-e8714dd5de1c/elements/{elementId}
- Tags: PlanTypes
- Path params: elementId: string(uuid), required
- Response 200: PlanTypeElement
- Response 404: ProblemDetails

### GET /08F7A6CA-7F32-4E98-B3F8-3DC8D1B8027E
- Tags: AppointmentCancellationReasons
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /08F7A6CA-7F32-4E98-B3F8-3DC8D1B8027E/element
- Tags: AppointmentCancellationReasons
- Query params: name: string
- Response 200: AppointmentCancellationReasonElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /08F7A6CA-7F32-4E98-B3F8-3DC8D1B8027E/elements
- Tags: AppointmentCancellationReasons
- Response 200: AppointmentCancellationReasonElement[]
- Response 404: ProblemDetails

### GET /08F7A6CA-7F32-4E98-B3F8-3DC8D1B8027E/elements/{elementId}
- Tags: AppointmentCancellationReasons
- Path params: elementId: string(uuid), required
- Response 200: AppointmentCancellationReasonElement
- Response 404: ProblemDetails

### GET /0a324885-007c-4c3a-94c0-5bf72d8db1a4
- Tags: PatientRelationships
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /0a324885-007c-4c3a-94c0-5bf72d8db1a4/element
- Tags: PatientRelationships
- Query params: name: string
- Response 200: PatientRelationshipElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /0a324885-007c-4c3a-94c0-5bf72d8db1a4/elements
- Tags: PatientRelationships
- Response 200: PatientRelationshipElement[]
- Response 404: ProblemDetails

### GET /0a324885-007c-4c3a-94c0-5bf72d8db1a4/elements/{elementId}
- Tags: PatientRelationships
- Path params: elementId: string(uuid), required
- Response 200: PatientRelationshipElement
- Response 404: ProblemDetails

### GET /0B0E3304-824B-41D4-AA6C-6445A5D13D95
- Tags: NoncontractualAdjustmentReasons
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /0B0E3304-824B-41D4-AA6C-6445A5D13D95/element
- Tags: NoncontractualAdjustmentReasons
- Query params: name: string
- Response 200: NoncontractualAdjustmentReasonElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /0B0E3304-824B-41D4-AA6C-6445A5D13D95/elements
- Tags: NoncontractualAdjustmentReasons
- Response 200: NoncontractualAdjustmentReasonElement[]
- Response 404: ProblemDetails

### GET /0B0E3304-824B-41D4-AA6C-6445A5D13D95/elements/{elementId}
- Tags: NoncontractualAdjustmentReasons
- Path params: elementId: string(uuid), required
- Response 200: NoncontractualAdjustmentReasonElement
- Response 404: ProblemDetails

### GET /0F7F0AA3-9A55-4D25-8A9B-CE492F0A60E1
- Tags: WebsiteTypes
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /0F7F0AA3-9A55-4D25-8A9B-CE492F0A60E1/element
- Tags: WebsiteTypes
- Query params: name: string
- Response 200: WebsiteTypeElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /0F7F0AA3-9A55-4D25-8A9B-CE492F0A60E1/elements
- Tags: WebsiteTypes
- Response 200: WebsiteTypeElement[]
- Response 404: ProblemDetails

### GET /0F7F0AA3-9A55-4D25-8A9B-CE492F0A60E1/elements/{elementId}
- Tags: WebsiteTypes
- Path params: elementId: string(uuid), required
- Response 200: WebsiteTypeElement
- Response 404: ProblemDetails

### GET /132fcafc-f31b-4f2f-ba39-80ae03554180
- Tags: OverbookReasons
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /132fcafc-f31b-4f2f-ba39-80ae03554180/element
- Tags: OverbookReasons
- Query params: name: string
- Response 200: OverbookReasonElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /132fcafc-f31b-4f2f-ba39-80ae03554180/elements
- Tags: OverbookReasons
- Response 200: OverbookReasonElement[]
- Response 404: ProblemDetails

### GET /132fcafc-f31b-4f2f-ba39-80ae03554180/elements/{elementId}
- Tags: OverbookReasons
- Path params: elementId: string(uuid), required
- Response 200: OverbookReasonElement
- Response 404: ProblemDetails

### GET /1BC4297B-3093-482E-88F7-664F2442B21C
- Tags: ProviderLevelAdjustmentReasons
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /1BC4297B-3093-482E-88F7-664F2442B21C/element
- Tags: ProviderLevelAdjustmentReasons
- Query params: name: string
- Response 200: ProviderLevelAdjustmentReasonElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /1BC4297B-3093-482E-88F7-664F2442B21C/elements
- Tags: ProviderLevelAdjustmentReasons
- Response 200: ProviderLevelAdjustmentReasonElement[]
- Response 404: ProblemDetails

### GET /1BC4297B-3093-482E-88F7-664F2442B21C/elements/{elementId}
- Tags: ProviderLevelAdjustmentReasons
- Path params: elementId: string(uuid), required
- Response 200: ProviderLevelAdjustmentReasonElement
- Response 404: ProblemDetails

### GET /1DE676A3-1B4F-442C-9C12-54CE6C182C0F
- Tags: VoidReasons
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /1DE676A3-1B4F-442C-9C12-54CE6C182C0F/element
- Tags: VoidReasons
- Query params: name: string
- Response 200: VoidReasonElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /1DE676A3-1B4F-442C-9C12-54CE6C182C0F/elements
- Tags: VoidReasons
- Response 200: VoidReasonElement[]
- Response 404: ProblemDetails

### GET /1DE676A3-1B4F-442C-9C12-54CE6C182C0F/elements/{elementId}
- Tags: VoidReasons
- Path params: elementId: string(uuid), required
- Response 200: VoidReasonElement
- Response 404: ProblemDetails

### GET /1fdfff4d-0bf2-42ab-8f39-d3059e8ffae8
- Tags: PrivacyPolicies
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /1fdfff4d-0bf2-42ab-8f39-d3059e8ffae8/element
- Tags: PrivacyPolicies
- Query params: name: string
- Response 200: PrivacyPolicyElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /1fdfff4d-0bf2-42ab-8f39-d3059e8ffae8/elements
- Tags: PrivacyPolicies
- Response 200: PrivacyPolicyElement[]
- Response 404: ProblemDetails

### GET /1fdfff4d-0bf2-42ab-8f39-d3059e8ffae8/elements/{elementId}
- Tags: PrivacyPolicies
- Path params: elementId: string(uuid), required
- Response 200: PrivacyPolicyElement
- Response 404: ProblemDetails

### GET /260c0395-0578-48d2-84b3-15d6de9b7877
- Tags: InterventionTypes
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /260c0395-0578-48d2-84b3-15d6de9b7877/element
- Tags: InterventionTypes
- Query params: name: string
- Response 200: InterventionTypeElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /260c0395-0578-48d2-84b3-15d6de9b7877/elements
- Tags: InterventionTypes
- Response 200: InterventionTypeElement[]
- Response 404: ProblemDetails

### GET /260c0395-0578-48d2-84b3-15d6de9b7877/elements/{elementId}
- Tags: InterventionTypes
- Path params: elementId: string(uuid), required
- Response 200: InterventionTypeElement
- Response 404: ProblemDetails

### GET /263C2E27-68AA-4A0E-8D4F-374264767756
- Tags: AlternatePortfolioTypes
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /263C2E27-68AA-4A0E-8D4F-374264767756/element
- Tags: AlternatePortfolioTypes
- Query params: name: string
- Response 200: AlternatePortfolioTypeElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /263C2E27-68AA-4A0E-8D4F-374264767756/elements
- Tags: AlternatePortfolioTypes
- Response 200: AlternatePortfolioTypeElement[]
- Response 404: ProblemDetails

### GET /263C2E27-68AA-4A0E-8D4F-374264767756/elements/{elementId}
- Tags: AlternatePortfolioTypes
- Path params: elementId: string(uuid), required
- Response 200: AlternatePortfolioTypeElement
- Response 404: ProblemDetails

### GET /2752155b-6697-44be-8cce-86112eae4fcd
- Tags: ClinicalAccessLevels
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /2752155b-6697-44be-8cce-86112eae4fcd/element
- Tags: ClinicalAccessLevels
- Query params: name: string
- Response 200: ClinicalAccessLevelElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /2752155b-6697-44be-8cce-86112eae4fcd/elements
- Tags: ClinicalAccessLevels
- Response 200: ClinicalAccessLevelElement[]
- Response 404: ProblemDetails

### GET /2752155b-6697-44be-8cce-86112eae4fcd/elements/{elementId}
- Tags: ClinicalAccessLevels
- Path params: elementId: string(uuid), required
- Response 200: ClinicalAccessLevelElement
- Response 404: ProblemDetails

### GET /27CDDA49-DDBC-4E20-9C57-0CEE3A6CB622
- Tags: RemarkCodes
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /27CDDA49-DDBC-4E20-9C57-0CEE3A6CB622/element
- Tags: RemarkCodes
- Query params: name: string
- Response 200: RemarkCodeElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /27CDDA49-DDBC-4E20-9C57-0CEE3A6CB622/elements
- Tags: RemarkCodes
- Response 200: RemarkCodeElement[]
- Response 404: ProblemDetails

### GET /27CDDA49-DDBC-4E20-9C57-0CEE3A6CB622/elements/{elementId}
- Tags: RemarkCodes
- Path params: elementId: string(uuid), required
- Response 200: RemarkCodeElement
- Response 404: ProblemDetails

### GET /2CAA9FB1-9426-4F0E-8E3E-1C2FE2CDFC14
- Tags: Extensions
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /2CAA9FB1-9426-4F0E-8E3E-1C2FE2CDFC14/element
- Tags: Extensions
- Query params: name: string
- Response 200: ExtensionElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /2CAA9FB1-9426-4F0E-8E3E-1C2FE2CDFC14/elements
- Tags: Extensions
- Response 200: ExtensionElement[]
- Response 404: ProblemDetails

### GET /2CAA9FB1-9426-4F0E-8E3E-1C2FE2CDFC14/elements/{elementId}
- Tags: Extensions
- Path params: elementId: string(uuid), required
- Response 200: ExtensionElement
- Response 404: ProblemDetails

### GET /32851526-0ceb-4c50-8584-b28aa2cbcd25
- Tags: DocumentTypes
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /32851526-0ceb-4c50-8584-b28aa2cbcd25/element
- Tags: DocumentTypes
- Query params: name: string
- Response 200: DocumentTypeElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /32851526-0ceb-4c50-8584-b28aa2cbcd25/elements
- Tags: DocumentTypes
- Response 200: DocumentTypeElement[]
- Response 404: ProblemDetails

### GET /32851526-0ceb-4c50-8584-b28aa2cbcd25/elements/{elementId}
- Tags: DocumentTypes
- Path params: elementId: string(uuid), required
- Response 200: DocumentTypeElement
- Response 404: ProblemDetails

### GET /32C97C0A-FB3F-473F-ABF6-9CEE2F224C61
- Tags: ReleaseInformations
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /32C97C0A-FB3F-473F-ABF6-9CEE2F224C61/element
- Tags: ReleaseInformations
- Query params: name: string
- Response 200: ReleaseInformationElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /32C97C0A-FB3F-473F-ABF6-9CEE2F224C61/elements
- Tags: ReleaseInformations
- Response 200: ReleaseInformationElement[]
- Response 404: ProblemDetails

### GET /32C97C0A-FB3F-473F-ABF6-9CEE2F224C61/elements/{elementId}
- Tags: ReleaseInformations
- Path params: elementId: string(uuid), required
- Response 200: ReleaseInformationElement
- Response 404: ProblemDetails

### GET /33d33d69-91fd-4f67-b99f-d4c3aaa7bf6c
- Tags: Races
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /33d33d69-91fd-4f67-b99f-d4c3aaa7bf6c/element
- Tags: Races
- Query params: name: string
- Response 200: RaceElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /33d33d69-91fd-4f67-b99f-d4c3aaa7bf6c/elements
- Tags: Races
- Response 200: RaceElement[]
- Response 404: ProblemDetails

### GET /33d33d69-91fd-4f67-b99f-d4c3aaa7bf6c/elements/{elementId}
- Tags: Races
- Path params: elementId: string(uuid), required
- Response 200: RaceElement
- Response 404: ProblemDetails

### POST /34fa5de6-1206-4341-8384-ad330c717138/elements
- Tags: Providers
- Request body: string(uuid)[]
- Response 200: ProviderElementResponse[]

### GET /34fa5de6-1206-4341-8384-ad330c717138/elements/{elementId}
- Tags: Providers
- Path params: elementId: string(uuid), required
- Response 200: ProviderElementResponse
- Response 404: ProblemDetails

### POST /34fa5de6-1206-4341-8384-ad330c717138/elements/findbyids
- Tags: Providers
- Request body: string(uuid)[]
- Response 200: ProviderSearchResponse[]
- Response 404: ProblemDetails

### GET /34fa5de6-1206-4341-8384-ad330c717138/npi/{npi}
- Tags: Providers
- Path params: npi: string, required
- Response 200: GetProviderElementResponse
- Response 404: ProblemDetails

### POST /34fa5de6-1206-4341-8384-ad330c717138/search
- Tags: Providers
- Request body: ActiveProviderSearchRequest
- Response 200: ProviderSearchResponse[]

### GET /360a68f3-9640-432c-8dfe-021a97a858f4
- Tags: PaymentPlanTerminationReasons
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /360a68f3-9640-432c-8dfe-021a97a858f4/element
- Tags: PaymentPlanTerminationReasons
- Query params: name: string
- Response 200: PaymentPlanTerminationReasonElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /360a68f3-9640-432c-8dfe-021a97a858f4/elements
- Tags: PaymentPlanTerminationReasons
- Response 200: PaymentPlanTerminationReasonElement[]
- Response 404: ProblemDetails

### GET /360a68f3-9640-432c-8dfe-021a97a858f4/elements/{elementId}
- Tags: PaymentPlanTerminationReasons
- Path params: elementId: string(uuid), required
- Response 200: PaymentPlanTerminationReasonElement
- Response 404: ProblemDetails

### GET /37C2861D-D8E6-42AF-8B9E-22A75EA169B5
- Tags: ContractualAdjustmentReasons
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /37C2861D-D8E6-42AF-8B9E-22A75EA169B5/element
- Tags: ContractualAdjustmentReasons
- Query params: name: string
- Response 200: ContractualAdjustmentReasonElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /37C2861D-D8E6-42AF-8B9E-22A75EA169B5/elements
- Tags: ContractualAdjustmentReasons
- Response 200: ContractualAdjustmentReasonElement[]
- Response 404: ProblemDetails

### GET /37C2861D-D8E6-42AF-8B9E-22A75EA169B5/elements/{elementId}
- Tags: ContractualAdjustmentReasons
- Path params: elementId: string(uuid), required
- Response 200: ContractualAdjustmentReasonElement
- Response 404: ProblemDetails

### GET /3F6645AA-08A1-456A-B50A-DD0D11AE6748
- Tags: SignatureSources
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /3F6645AA-08A1-456A-B50A-DD0D11AE6748/element
- Tags: SignatureSources
- Query params: name: string
- Response 200: SignatureSourceElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /3F6645AA-08A1-456A-B50A-DD0D11AE6748/elements
- Tags: SignatureSources
- Response 200: SignatureSourceElement[]
- Response 404: ProblemDetails

### GET /3F6645AA-08A1-456A-B50A-DD0D11AE6748/elements/{elementId}
- Tags: SignatureSources
- Path params: elementId: string(uuid), required
- Response 200: SignatureSourceElement
- Response 404: ProblemDetails

### GET /4d101c4e-23a3-42ab-9507-942563eaf5e2
- Tags: EngagementMethods
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /4d101c4e-23a3-42ab-9507-942563eaf5e2/element
- Tags: EngagementMethods
- Query params: name: string
- Response 200: EngagementMethodElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /4d101c4e-23a3-42ab-9507-942563eaf5e2/elements
- Tags: EngagementMethods
- Response 200: EngagementMethodElement[]
- Response 404: ProblemDetails

### GET /4d101c4e-23a3-42ab-9507-942563eaf5e2/elements/{elementId}
- Tags: EngagementMethods
- Path params: elementId: string(uuid), required
- Response 200: EngagementMethodElement
- Response 404: ProblemDetails

### GET /52889F29-6D60-46DA-9527-B7A67ACE6AAD/{name}
- Tags: ChargeCodes
- Path params: name: string, required
- Response 200: ChargeCodeElement
- Response 404: ProblemDetails

### GET /52889F29-6D60-46DA-9527-B7A67ACE6AAD/elements/name/{name}
- Tags: ChargeCodes
- Path params: name: string, required
- Response 200: ChargeCodeElement
- Response 404: ProblemDetails

### POST /52889F29-6D60-46DA-9527-B7A67ACE6AAD/findbyids
- Tags: ChargeCodes
- Request body: string[]
- Response 200: ChargeCodeElement
- Response 404: ProblemDetails

### POST /52889F29-6D60-46DA-9527-B7A67ACE6AAD/search
- Tags: ChargeCodes
- Request body: ChargeCodeSearchCriteria
- Response 200: ChargeCodeElement[]
- Response 400: ProblemDetails

### POST /52889F29-6D60-46DA-9527-B7A67ACE6AAD/search/range
- Tags: ChargeCodes
- Request body: ChargeCodeRangeSearchCriteria
- Response 200: ChargeCodeSummaryElement[]
- Response 400: ProblemDetails

### GET /53DA4A4E-CE82-4426-9141-C299CFCF915F
- Tags: TransferReasons
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /53DA4A4E-CE82-4426-9141-C299CFCF915F/element
- Tags: TransferReasons
- Query params: name: string
- Response 200: TransferReasonElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /53DA4A4E-CE82-4426-9141-C299CFCF915F/elements
- Tags: TransferReasons
- Response 200: TransferReasonElement[]
- Response 404: ProblemDetails

### GET /53DA4A4E-CE82-4426-9141-C299CFCF915F/elements/{elementId}
- Tags: TransferReasons
- Path params: elementId: string(uuid), required
- Response 200: TransferReasonElement
- Response 404: ProblemDetails

### GET /59047997-4341-4D72-89D2-12133A8B106F
- Tags: Units
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /59047997-4341-4D72-89D2-12133A8B106F/element
- Tags: Units
- Query params: name: string
- Response 200: UnitElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /59047997-4341-4D72-89D2-12133A8B106F/elements
- Tags: Units
- Response 200: UnitElement[]
- Response 404: ProblemDetails

### GET /59047997-4341-4D72-89D2-12133A8B106F/elements/{elementId}
- Tags: Units
- Path params: elementId: string(uuid), required
- Response 200: UnitElement
- Response 404: ProblemDetails

### GET /5A6EFD8E-33E8-40D4-96BC-C3EA7749B268
- Tags: ClaimStatusCategoryCodes
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /5A6EFD8E-33E8-40D4-96BC-C3EA7749B268/element
- Tags: ClaimStatusCategoryCodes
- Query params: name: string
- Response 200: ClaimStatusCategoryCodeElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /5A6EFD8E-33E8-40D4-96BC-C3EA7749B268/elements
- Tags: ClaimStatusCategoryCodes
- Response 200: ClaimStatusCategoryCodeElement[]
- Response 404: ProblemDetails

### GET /5A6EFD8E-33E8-40D4-96BC-C3EA7749B268/elements/{elementId}
- Tags: ClaimStatusCategoryCodes
- Path params: elementId: string(uuid), required
- Response 200: ClaimStatusCategoryCodeElement
- Response 404: ProblemDetails

### GET /5aece4ab-9415-402d-bcb8-0b497a332a5d
- Tags: ConditionCodes
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /5aece4ab-9415-402d-bcb8-0b497a332a5d/element
- Tags: ConditionCodes
- Query params: name: string
- Response 200: ConditionCodeElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /5aece4ab-9415-402d-bcb8-0b497a332a5d/elements
- Tags: ConditionCodes
- Response 200: ConditionCodeElement[]
- Response 404: ProblemDetails

### GET /5aece4ab-9415-402d-bcb8-0b497a332a5d/elements/{elementId}
- Tags: ConditionCodes
- Path params: elementId: string(uuid), required
- Response 200: ConditionCodeElement
- Response 404: ProblemDetails

### GET /5aff7783-0f87-4fd4-8dee-4e1ba929b797
- Tags: Specialties
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /5aff7783-0f87-4fd4-8dee-4e1ba929b797/element
- Tags: Specialties
- Query params: name: string
- Response 200: SpecialtyElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /5aff7783-0f87-4fd4-8dee-4e1ba929b797/elements
- Tags: Specialties
- Response 200: SpecialtyElement[]
- Response 404: ProblemDetails

### GET /5aff7783-0f87-4fd4-8dee-4e1ba929b797/elements/{elementId}
- Tags: Specialties
- Path params: elementId: string(uuid), required
- Response 200: SpecialtyElement
- Response 404: ProblemDetails

### GET /5ca22ada-75d0-4f93-aa07-0583fb497d02
- Tags: MaritalStatuses
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /5ca22ada-75d0-4f93-aa07-0583fb497d02/element
- Tags: MaritalStatuses
- Query params: name: string
- Response 200: MaritalStatusElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /5ca22ada-75d0-4f93-aa07-0583fb497d02/elements
- Tags: MaritalStatuses
- Response 200: MaritalStatusElement[]
- Response 404: ProblemDetails

### GET /5ca22ada-75d0-4f93-aa07-0583fb497d02/elements/{elementId}
- Tags: MaritalStatuses
- Path params: elementId: string(uuid), required
- Response 200: MaritalStatusElement
- Response 404: ProblemDetails

### GET /5e67f38a-f942-4e93-b592-3540f8d8125c
- Tags: RefundReasons
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /5e67f38a-f942-4e93-b592-3540f8d8125c/element
- Tags: RefundReasons
- Query params: name: string
- Response 200: RefundReasonElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /5e67f38a-f942-4e93-b592-3540f8d8125c/elements
- Tags: RefundReasons
- Response 200: RefundReasonElement[]
- Response 404: ProblemDetails

### GET /5e67f38a-f942-4e93-b592-3540f8d8125c/elements/{elementId}
- Tags: RefundReasons
- Path params: elementId: string(uuid), required
- Response 200: RefundReasonElement
- Response 404: ProblemDetails

### GET /605ecf5d-eee1-4618-804f-5d72e2d28db2
- Tags: SexualOrientations
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /605ecf5d-eee1-4618-804f-5d72e2d28db2/element
- Tags: SexualOrientations
- Query params: name: string
- Response 200: SexualOrientationElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /605ecf5d-eee1-4618-804f-5d72e2d28db2/elements
- Tags: SexualOrientations
- Response 200: SexualOrientationElement[]
- Response 404: ProblemDetails

### GET /605ecf5d-eee1-4618-804f-5d72e2d28db2/elements/{elementId}
- Tags: SexualOrientations
- Path params: elementId: string(uuid), required
- Response 200: SexualOrientationElement
- Response 404: ProblemDetails

### GET /66cf53c9-8c83-4db0-a2eb-bb913a6ad0cd
- Tags: UnderpaymentReasons
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /66cf53c9-8c83-4db0-a2eb-bb913a6ad0cd/element
- Tags: UnderpaymentReasons
- Query params: name: string
- Response 200: UnderpaymentReasonElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /66cf53c9-8c83-4db0-a2eb-bb913a6ad0cd/elements
- Tags: UnderpaymentReasons
- Response 200: UnderpaymentReasonElement[]
- Response 404: ProblemDetails

### GET /66cf53c9-8c83-4db0-a2eb-bb913a6ad0cd/elements/{elementId}
- Tags: UnderpaymentReasons
- Path params: elementId: string(uuid), required
- Response 200: UnderpaymentReasonElement
- Response 404: ProblemDetails

### GET /6939e857-66a3-4013-87c7-121d21ccc377
- Tags: Ethnicities
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /6939e857-66a3-4013-87c7-121d21ccc377/element
- Tags: Ethnicities
- Query params: name: string
- Response 200: EthnicityElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /6939e857-66a3-4013-87c7-121d21ccc377/elements
- Tags: Ethnicities
- Response 200: EthnicityElement[]
- Response 404: ProblemDetails

### GET /6939e857-66a3-4013-87c7-121d21ccc377/elements/{elementId}
- Tags: Ethnicities
- Path params: elementId: string(uuid), required
- Response 200: EthnicityElement
- Response 404: ProblemDetails

### GET /6969ac9e-a016-447b-b915-c220dc6a8413
- Tags: AppointmentTypes
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /6969ac9e-a016-447b-b915-c220dc6a8413/element
- Tags: AppointmentTypes
- Query params: name: string
- Response 200: AppointmentTypeElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /6969ac9e-a016-447b-b915-c220dc6a8413/elements
- Tags: AppointmentTypes
- Response 200: AppointmentTypeElement[]
- Response 404: ProblemDetails

### GET /6969ac9e-a016-447b-b915-c220dc6a8413/elements/{elementId}
- Tags: AppointmentTypes
- Path params: elementId: string(uuid), required
- Response 200: AppointmentTypeElement
- Response 404: ProblemDetails

### GET /78678933-b550-415e-94db-e69b6c284b68
- Tags: ActivityTypes
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### POST /78678933-b550-415e-94db-e69b6c284b68/element/cost
- Tags: ActivityTypes
- Request body: UnitCostRequest
- Response 200: ActivityTypeElement
- Response 404: ProblemDetails

### GET /78678933-b550-415e-94db-e69b6c284b68/elements
- Tags: ActivityTypes
- Response 200: ActivityTypeElement
- Response 404: ProblemDetails

### GET /78678933-b550-415e-94db-e69b6c284b68/elements/{elementId}
- Tags: ActivityTypes
- Path params: elementId: string(uuid), required
- Response 200: ActivityTypeElement
- Response 404: ProblemDetails

### GET /78678933-b550-415e-94db-e69b6c284b68/elements/appointment/{appointmentTypeId}
- Tags: ActivityTypes
- Path params: appointmentTypeId: string(uuid), required
- Response 200: ActivityTypeElement[]

### POST /78678933-b550-415e-94db-e69b6c284b68/elements/code
- Tags: ActivityTypes
- Request body: ActivityCodeRequest
- Response 200: ActivityTypeElement
- Response 404: ProblemDetails

### POST /78678933-b550-415e-94db-e69b6c284b68/elements/getorcreate
- Tags: ActivityTypes
- Request body: ActivityCodeRequest
- Response 200: ActivityTypeElement
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /78678933-b550-415e-94db-e69b6c284b68/findbycodes
- Tags: ActivityTypes
- Request body: string[]
- Response 200: ActivityTypeElement[]

### POST /78678933-b550-415e-94db-e69b6c284b68/findbyids
- Tags: ActivityTypes
- Request body: string(uuid)[]
- Response 200: ActivityTypeElement[]

### POST /78678933-b550-415e-94db-e69b6c284b68/search
- Tags: ActivityTypes
- Request body: ActivityCodeSearchCriteria
- Response 200: ActivityTypeElement[]
- Response 400: ProblemDetails

### POST /78678933-b550-415e-94db-e69b6c284b68/search/range
- Tags: ActivityTypes
- Request body: ActivityCodeRangeSearchCriteria
- Response 200: ActivityTypeElement[]
- Response 400: ProblemDetails

### GET /798073ba-fc25-4819-b80c-78bfde9be05a
- Tags: ScheduleBlockTypes
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /798073ba-fc25-4819-b80c-78bfde9be05a/element
- Tags: ScheduleBlockTypes
- Query params: name: string
- Response 200: ScheduleBlockTypeElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /798073ba-fc25-4819-b80c-78bfde9be05a/elements
- Tags: ScheduleBlockTypes
- Response 200: ScheduleBlockTypeElement[]
- Response 404: ProblemDetails

### GET /798073ba-fc25-4819-b80c-78bfde9be05a/elements/{elementId}
- Tags: ScheduleBlockTypes
- Path params: elementId: string(uuid), required
- Response 200: ScheduleBlockTypeElement
- Response 404: ProblemDetails

### GET /7982a29b-e426-41d0-a2d2-e1f98d806119
- Tags: Tags
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /7982a29b-e426-41d0-a2d2-e1f98d806119/element
- Tags: Tags
- Query params: name: string
- Response 200: TagElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /7982a29b-e426-41d0-a2d2-e1f98d806119/elements
- Tags: Tags
- Response 200: TagElement[]
- Response 404: ProblemDetails

### GET /7982a29b-e426-41d0-a2d2-e1f98d806119/elements/{elementId}
- Tags: Tags
- Path params: elementId: string(uuid), required
- Response 200: TagElement
- Response 404: ProblemDetails

### GET /7DCCD0B2-14A4-418A-88CA-379D42FE5BBA
- Tags: BenefitAssignments
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /7DCCD0B2-14A4-418A-88CA-379D42FE5BBA/element
- Tags: BenefitAssignments
- Query params: name: string
- Response 200: BenefitAssignmentElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /7DCCD0B2-14A4-418A-88CA-379D42FE5BBA/elements
- Tags: BenefitAssignments
- Response 200: BenefitAssignmentElement[]
- Response 404: ProblemDetails

### GET /7DCCD0B2-14A4-418A-88CA-379D42FE5BBA/elements/{elementId}
- Tags: BenefitAssignments
- Path params: elementId: string(uuid), required
- Response 200: BenefitAssignmentElement
- Response 404: ProblemDetails

### GET /877fbaf8-a61b-425d-96ef-436f56858415
- Tags: Modifiers
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /877fbaf8-a61b-425d-96ef-436f56858415/element
- Tags: Modifiers
- Query params: name: string
- Response 200: ModifierElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /877fbaf8-a61b-425d-96ef-436f56858415/elements
- Tags: Modifiers
- Response 200: ModifierElement[]
- Response 404: ProblemDetails

### GET /877fbaf8-a61b-425d-96ef-436f56858415/elements/{elementId}
- Tags: Modifiers
- Path params: elementId: string(uuid), required
- Response 200: ModifierElement
- Response 404: ProblemDetails

### GET /8EE44620-B3ED-4DD4-8DA3-044B768D0113
- Tags: ClaimStatusCodes
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /8EE44620-B3ED-4DD4-8DA3-044B768D0113/element
- Tags: ClaimStatusCodes
- Query params: name: string
- Response 200: ClaimStatusCodeElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /8EE44620-B3ED-4DD4-8DA3-044B768D0113/elements
- Tags: ClaimStatusCodes
- Response 200: ClaimStatusCodeElement[]
- Response 404: ProblemDetails

### GET /8EE44620-B3ED-4DD4-8DA3-044B768D0113/elements/{elementId}
- Tags: ClaimStatusCodes
- Path params: elementId: string(uuid), required
- Response 200: ClaimStatusCodeElement
- Response 404: ProblemDetails

### GET /8F67CBA4-16AC-457D-8C19-99D551083A10
- Tags: Departments
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /8F67CBA4-16AC-457D-8C19-99D551083A10/element
- Tags: Departments
- Query params: name: string
- Response 200: DepartmentElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /8F67CBA4-16AC-457D-8C19-99D551083A10/elements
- Tags: Departments
- Response 200: DepartmentElement[]
- Response 404: ProblemDetails

### GET /8F67CBA4-16AC-457D-8C19-99D551083A10/elements/{elementId}
- Tags: Departments
- Path params: elementId: string(uuid), required
- Response 200: DepartmentElement
- Response 404: ProblemDetails

### GET /9AE4022F-5CBD-4439-8853-2D327AA88D35
- Tags: ContactUses
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /9AE4022F-5CBD-4439-8853-2D327AA88D35/element
- Tags: ContactUses
- Query params: name: string
- Response 200: ContactUseElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /9AE4022F-5CBD-4439-8853-2D327AA88D35/elements
- Tags: ContactUses
- Response 200: ContactUseElement[]
- Response 404: ProblemDetails

### GET /9AE4022F-5CBD-4439-8853-2D327AA88D35/elements/{elementId}
- Tags: ContactUses
- Path params: elementId: string(uuid), required
- Response 200: ContactUseElement
- Response 404: ProblemDetails

### GET /9D2E5938-0D44-4EB1-95D0-51126257D0FB
- Tags: TestResultTypes
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /9D2E5938-0D44-4EB1-95D0-51126257D0FB/element
- Tags: TestResultTypes
- Query params: name: string
- Response 200: TestResultTypeElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /9D2E5938-0D44-4EB1-95D0-51126257D0FB/elements
- Tags: TestResultTypes
- Response 200: TestResultTypeElement[]
- Response 404: ProblemDetails

### GET /9D2E5938-0D44-4EB1-95D0-51126257D0FB/elements/{elementId}
- Tags: TestResultTypes
- Path params: elementId: string(uuid), required
- Response 200: TestResultTypeElement
- Response 404: ProblemDetails

### GET /9E388CAC-F291-4183-9D84-655FE2663484
- Tags: PlaceOfServices
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /9E388CAC-F291-4183-9D84-655FE2663484/element
- Tags: PlaceOfServices
- Query params: name: string
- Response 200: PlaceOfServiceElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /9E388CAC-F291-4183-9D84-655FE2663484/elements
- Tags: PlaceOfServices
- Response 200: PlaceOfServiceElement[]
- Response 404: ProblemDetails

### GET /9E388CAC-F291-4183-9D84-655FE2663484/elements/{elementId}
- Tags: PlaceOfServices
- Path params: elementId: string(uuid), required
- Response 200: PlaceOfServiceElement
- Response 404: ProblemDetails

### GET /ab4bfa75-5eae-4091-9c47-8d27360366f7
- Tags: SnoozeReasons
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /ab4bfa75-5eae-4091-9c47-8d27360366f7/element
- Tags: SnoozeReasons
- Query params: name: string
- Response 200: SnoozeReasonElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /ab4bfa75-5eae-4091-9c47-8d27360366f7/elements
- Tags: SnoozeReasons
- Response 200: SnoozeReasonElement[]
- Response 404: ProblemDetails

### GET /ab4bfa75-5eae-4091-9c47-8d27360366f7/elements/{elementId}
- Tags: SnoozeReasons
- Path params: elementId: string(uuid), required
- Response 200: SnoozeReasonElement
- Response 404: ProblemDetails

### GET /abcbc8fa-e827-4850-ba16-faa944ab819a
- Tags: EntityOwners
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /abcbc8fa-e827-4850-ba16-faa944ab819a/element
- Tags: EntityOwners
- Query params: name: string
- Response 200: EntityOwnerElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /abcbc8fa-e827-4850-ba16-faa944ab819a/elements
- Tags: EntityOwners
- Response 200: EntityOwnerElement[]
- Response 404: ProblemDetails

### GET /abcbc8fa-e827-4850-ba16-faa944ab819a/elements/{elementId}
- Tags: EntityOwners
- Path params: elementId: string(uuid), required
- Response 200: EntityOwnerElement
- Response 404: ProblemDetails

### GET /appointment-type-mappings
- Tags: AppointmentTypeMappings
- Response 200: AppointmentActivityTypeMappings

### GET /appointment-type-mappings/activities/{activityTypeId}/appointments
- Tags: AppointmentTypeMappings
- Path params: activityTypeId: string(uuid), required
- Response 200: string(uuid)[]
- Response 404: ProblemDetails

### GET /appointment-type-mappings/appointments/{appointmentTypeId}/activities
- Tags: AppointmentTypeMappings
- Path params: appointmentTypeId: string(uuid), required
- Response 200: string(uuid)[]
- Response 404: ProblemDetails

### GET /b4fc0ba9-7cbb-4dc0-9f65-b81da83c82be
- Tags: HumanResourceTypes
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /b4fc0ba9-7cbb-4dc0-9f65-b81da83c82be/element
- Tags: HumanResourceTypes
- Query params: name: string
- Response 200: HumanResourceTypeElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /b4fc0ba9-7cbb-4dc0-9f65-b81da83c82be/elements
- Tags: HumanResourceTypes
- Response 200: HumanResourceTypeElement[]
- Response 404: ProblemDetails

### GET /b4fc0ba9-7cbb-4dc0-9f65-b81da83c82be/elements/{elementId}
- Tags: HumanResourceTypes
- Path params: elementId: string(uuid), required
- Response 200: HumanResourceTypeElement
- Response 404: ProblemDetails

### GET /b79d0186-983d-44ae-9516-498201dc5172
- Tags: InterventionResolutionTypes
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /b79d0186-983d-44ae-9516-498201dc5172/element
- Tags: InterventionResolutionTypes
- Query params: name: string
- Response 200: InterventionResolutionTypeElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /b79d0186-983d-44ae-9516-498201dc5172/elements
- Tags: InterventionResolutionTypes
- Response 200: InterventionResolutionTypeElement[]
- Response 404: ProblemDetails

### GET /b79d0186-983d-44ae-9516-498201dc5172/elements/{elementId}
- Tags: InterventionResolutionTypes
- Path params: elementId: string(uuid), required
- Response 200: InterventionResolutionTypeElement
- Response 404: ProblemDetails

### GET /BE6A4628-F42E-4E00-8303-1025408DEED1
- Tags: ClaimUpdateReasons
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /BE6A4628-F42E-4E00-8303-1025408DEED1/element
- Tags: ClaimUpdateReasons
- Query params: name: string
- Response 200: ClaimUpdateReasonElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /BE6A4628-F42E-4E00-8303-1025408DEED1/elements
- Tags: ClaimUpdateReasons
- Response 200: ClaimUpdateReasonElement[]
- Response 404: ProblemDetails

### GET /BE6A4628-F42E-4E00-8303-1025408DEED1/elements/{elementId}
- Tags: ClaimUpdateReasons
- Path params: elementId: string(uuid), required
- Response 200: ClaimUpdateReasonElement
- Response 404: ProblemDetails

### GET /c52bf578-c7c5-4549-8c23-fa1dbf547152
- Tags: DeferReasons
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /c52bf578-c7c5-4549-8c23-fa1dbf547152/element
- Tags: DeferReasons
- Query params: name: string
- Response 200: DeferReasonElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /c52bf578-c7c5-4549-8c23-fa1dbf547152/elements
- Tags: DeferReasons
- Response 200: DeferReasonElement[]
- Response 404: ProblemDetails

### GET /c52bf578-c7c5-4549-8c23-fa1dbf547152/elements/{elementId}
- Tags: DeferReasons
- Path params: elementId: string(uuid), required
- Response 200: DeferReasonElement
- Response 404: ProblemDetails

### GET /cc095e38-a8ff-411a-8096-6b827e585f12
- Tags: FacilityResourceTypes
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /cc095e38-a8ff-411a-8096-6b827e585f12/element
- Tags: FacilityResourceTypes
- Query params: name: string
- Response 200: FacilityResourceTypeElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /cc095e38-a8ff-411a-8096-6b827e585f12/elements
- Tags: FacilityResourceTypes
- Response 200: FacilityResourceTypeElement[]
- Response 404: ProblemDetails

### GET /cc095e38-a8ff-411a-8096-6b827e585f12/elements/{elementId}
- Tags: FacilityResourceTypes
- Path params: elementId: string(uuid), required
- Response 200: FacilityResourceTypeElement
- Response 404: ProblemDetails

### GET /dc6e9634-e485-4239-a520-478ee4f1f37f
- Tags: EngagementTopics
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /dc6e9634-e485-4239-a520-478ee4f1f37f/element
- Tags: EngagementTopics
- Query params: name: string
- Response 200: EngagementTopicElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /dc6e9634-e485-4239-a520-478ee4f1f37f/elements
- Tags: EngagementTopics
- Response 200: EngagementTopicElement[]
- Response 404: ProblemDetails

### GET /dc6e9634-e485-4239-a520-478ee4f1f37f/elements/{elementId}
- Tags: EngagementTopics
- Path params: elementId: string(uuid), required
- Response 200: EngagementTopicElement
- Response 404: ProblemDetails

### GET /de624d38-4c54-4b7f-9bde-dff572f4fcc0
- Tags: FinancialAccessLevels
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /de624d38-4c54-4b7f-9bde-dff572f4fcc0/element
- Tags: FinancialAccessLevels
- Query params: name: string
- Response 200: FinancialAccessLevelElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /de624d38-4c54-4b7f-9bde-dff572f4fcc0/elements
- Tags: FinancialAccessLevels
- Response 200: FinancialAccessLevelElement[]
- Response 404: ProblemDetails

### GET /de624d38-4c54-4b7f-9bde-dff572f4fcc0/elements/{elementId}
- Tags: FinancialAccessLevels
- Path params: elementId: string(uuid), required
- Response 200: FinancialAccessLevelElement
- Response 404: ProblemDetails

### GET /de855cac-e4dc-43f9-a561-8ee71c3a09fc
- Tags: ContactRelationships
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /de855cac-e4dc-43f9-a561-8ee71c3a09fc/element
- Tags: ContactRelationships
- Query params: name: string
- Response 200: ContactRelationshipElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /de855cac-e4dc-43f9-a561-8ee71c3a09fc/elements
- Tags: ContactRelationships
- Response 200: ContactRelationshipElement[]
- Response 404: ProblemDetails

### GET /de855cac-e4dc-43f9-a561-8ee71c3a09fc/elements/{elementId}
- Tags: ContactRelationships
- Path params: elementId: string(uuid), required
- Response 200: ContactRelationshipElement
- Response 404: ProblemDetails

### GET /E0889B88-9738-430D-9B3C-FA136E427454
- Tags: MSPInsuranceTypes
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /E0889B88-9738-430D-9B3C-FA136E427454/element
- Tags: MSPInsuranceTypes
- Query params: name: string
- Response 200: MSPInsuranceTypeElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /E0889B88-9738-430D-9B3C-FA136E427454/elements
- Tags: MSPInsuranceTypes
- Response 200: MSPInsuranceTypeElement[]
- Response 404: ProblemDetails

### GET /E0889B88-9738-430D-9B3C-FA136E427454/elements/{elementId}
- Tags: MSPInsuranceTypes
- Path params: elementId: string(uuid), required
- Response 200: MSPInsuranceTypeElement
- Response 404: ProblemDetails

### GET /ed6724ec-1e3a-40ba-89f0-619bf956419d
- Tags: Languages
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /ed6724ec-1e3a-40ba-89f0-619bf956419d/element
- Tags: Languages
- Query params: name: string
- Response 200: LanguageElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /ed6724ec-1e3a-40ba-89f0-619bf956419d/elements
- Tags: Languages
- Response 200: LanguageElement[]
- Response 404: ProblemDetails

### GET /ed6724ec-1e3a-40ba-89f0-619bf956419d/elements/{elementId}
- Tags: Languages
- Path params: elementId: string(uuid), required
- Response 200: LanguageElement
- Response 404: ProblemDetails

### GET /f0f5f6b0-6693-4290-9639-eda97db5711e
- Tags: ReservedFundCategories
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /f0f5f6b0-6693-4290-9639-eda97db5711e/element
- Tags: ReservedFundCategories
- Query params: name: string
- Response 200: ReservedFundCategoryElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /f0f5f6b0-6693-4290-9639-eda97db5711e/elements
- Tags: ReservedFundCategories
- Response 200: ReservedFundCategoryElement[]
- Response 404: ProblemDetails

### GET /f0f5f6b0-6693-4290-9639-eda97db5711e/elements/{elementId}
- Tags: ReservedFundCategories
- Path params: elementId: string(uuid), required
- Response 200: ReservedFundCategoryElement
- Response 404: ProblemDetails

### GET /F4F28CCC-0EFE-4E82-B188-B69759112CCB
- Tags: ClaimStatusResponseCodes
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /F4F28CCC-0EFE-4E82-B188-B69759112CCB/element
- Tags: ClaimStatusResponseCodes
- Query params: name: string
- Response 200: ClaimStatusResponseCodeElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /F4F28CCC-0EFE-4E82-B188-B69759112CCB/elements
- Tags: ClaimStatusResponseCodes
- Response 200: ClaimStatusResponseCodeElement[]
- Response 404: ProblemDetails

### GET /F4F28CCC-0EFE-4E82-B188-B69759112CCB/elements/{elementId}
- Tags: ClaimStatusResponseCodes
- Path params: elementId: string(uuid), required
- Response 200: ClaimStatusResponseCodeElement
- Response 404: ProblemDetails

### GET /f7179087-fb3d-484d-8188-a03849f0f779
- Tags: ServiceTypes
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /f7179087-fb3d-484d-8188-a03849f0f779/element
- Tags: ServiceTypes
- Query params: name: string
- Response 200: ServiceTypeElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /f7179087-fb3d-484d-8188-a03849f0f779/elements
- Tags: ServiceTypes
- Response 200: ServiceTypeElement[]
- Response 404: ProblemDetails

### GET /f7179087-fb3d-484d-8188-a03849f0f779/elements/{elementId}
- Tags: ServiceTypes
- Path params: elementId: string(uuid), required
- Response 200: ServiceTypeElement
- Response 404: ProblemDetails

### GET /fe5dc3ef-33c4-45d1-acde-8ebb4d8fff30
- Tags: States
- Response 200: CatalogListResponse[]
- Response 404: ProblemDetails

### GET /fe5dc3ef-33c4-45d1-acde-8ebb4d8fff30/element
- Tags: States
- Query params: name: string
- Response 200: StateElement
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /fe5dc3ef-33c4-45d1-acde-8ebb4d8fff30/elements
- Tags: States
- Response 200: StateElement[]
- Response 404: ProblemDetails

### GET /fe5dc3ef-33c4-45d1-acde-8ebb4d8fff30/elements/{elementId}
- Tags: States
- Path params: elementId: string(uuid), required
- Response 200: StateElement
- Response 404: ProblemDetails

## Schemas

**ActiveProviderSearchRequest**
  - npi: ['null', 'string']
  - specialtyId: ['null', 'string'](uuid)
  - firstName: ['null', 'string']
  - lastName: ['null', 'string']
  - city: ['null', 'string']
  - stateId: ['null', 'string'](uuid)
  - zipCode: ['null', 'string']

**ActivityCodeRangeSearchCriteria**
  - fromName: ['null', 'string'] (required)
  - toName: ['null', 'string'] (required)
  - appointmentTypes: ['null', 'array'] (required)
  - includeExpired: boolean (required)

**ActivityCodeRequest**
  - code: ['null', 'string'] (required)

**ActivityCodeSearchCriteria**
  - name: ['null', 'string'] (required)
  - appointmentTypes: ['null', 'array'] (required)
  - shortDescriptionSearch: ['null', 'string']
  - includeExpired: boolean (required)
  - effectiveDate: ['null', 'string'](date-time) (required)

**ActivityTypeElement**
  - appointmentTypeId: ['null', 'string'](uuid)
  - shortDescription: ['null', 'string']
  - unitId: string(uuid)
  - departmentId: ['null', 'string'](uuid)
  - portfolioType: PortfolioType
  - chargeCode: ['null', 'string']
  - ndc: ['null', 'string']
  - modifierId: ['null', 'string'](uuid)
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**AlternatePortfolioTypeElement**
  - description: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**AppointmentActivityTypeMappings**
  - organizationId: ['null', 'string'] (required)
  - id: ['null', 'string']
  - partition: ['null', 'string']

**AppointmentCancellationReasonElement**
  - description: ['null', 'string']
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**AppointmentTypeElement**
  - description: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)
  - color: ['null', 'string'] (required)
  - durationHours: ['null', 'integer', 'string'](int32) (required)
  - durationMinutes: ['null', 'integer', 'string'](int32) (required)
  - serviceTypeId: ['null', 'string'](uuid) (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ArrivalStatusElement**
  - description: ['null', 'string'] (required)
  - intakeCategory: IntakeCategory (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**BenefitAssignmentElement**
  - description: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**CatalogListResponse**
  - label: ['null', 'string']
  - value: string(uuid)
  - replacesValues: ['null', 'array']
  - search: ['null', 'string']
  - customData: ['null', 'object']
  - removed: boolean

**ChargeCodeElement**
  - name: ['null', 'string'] (required)
  - definition: ['null', 'string'] (required)
  - type: ['null', 'string'] (required)
  - departmentId: ['null', 'string'](uuid) (required)
  - shortDescription: ['null', 'string'] (required)
  - section: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - isDisconnected: boolean (required)
  - isRemoved: boolean (required)
  - isExpired: boolean (required)
  - createdDate: string(date-time) (required)

**ChargeCodeRangeSearchCriteria**
  - fromName: ['null', 'string'] (required)
  - toName: ['null', 'string'] (required)
  - type: ['null', 'string'] (required)
  - includeExpired: boolean (required)
  - effectiveDate: ['null', 'string'](date-time) (required)

**ChargeCodeSearchCriteria**
  - name: ['null', 'string'] (required)
  - type: ['null', 'string'] (required)
  - shortDescriptionSearch: ['null', 'string']
  - includeExpired: boolean (required)
  - effectiveDate: ['null', 'string'](date-time) (required)

**ChargeCodeSummaryElement**
  - name: ['null', 'string'] (required)
  - type: ['null', 'string'] (required)
  - departmentId: ['null', 'string'](uuid) (required)
  - shortDescription: ['null', 'string'] (required)
  - section: ['null', 'string'] (required)

**ClaimStatusCategoryCodeElement**
  - definition: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ClaimStatusCodeElement**
  - definition: ['null', 'string']
  - shortDescription: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**ClaimStatusResponseCodeElement**
  - definition: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ClaimUpdateReasonElement**
  - shortDescription: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ClinicalAccessLevelElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ConditionCodeElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ContactRelationshipElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ContactUseElement**
  - description: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**ContractualAdjustmentReasonElement**
  - shortDescription: ['null', 'string'] (required)
  - definition: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**Date**
  - (no properties)

**DeferReasonElement**
  - description: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**DepartmentElement**
  - description: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**DiagnosisCodeElement**
  - id: ['null', 'string'] (required)
  - code: ['null', 'string'] (required)
  - icdCodeType: IcdCodeType (required)
  - definition: ['null', 'string'] (required)
  - category: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - isDisconnected: boolean (required)
  - isRemoved: boolean (required)
  - isExpired: boolean (required)
  - createdDate: string(date-time) (required)

**DiagnosisCodeRangeSearchCriteria**
  - fromCode: ['null', 'string'] (required)
  - toCode: ['null', 'string'] (required)
  - icdCodeType: object (required)
  - category: ['null', 'string'] (required)
  - includeExpired: boolean (required)
  - effectiveDate: ['null', 'string'](date-time) (required)

**DiagnosisCodeSearchCriteria**
  - code: ['null', 'string']
  - icdCodeType: object (required)
  - category: ['null', 'string'] (required)
  - shortDescriptionSearch: ['null', 'string']
  - includeExpired: boolean (required)
  - effectiveDate: ['null', 'string'](date-time) (required)

**DiagnosisCodeSummaryElement**
  - icdCodeIdentity: IcdCodeIdentity (required)
  - category: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)
  - itemId: ['null', 'string']

**DocumentTypeElement**
  - description: ['null', 'string'] (required)
  - expirationPeriod: ExpirationPeriods (required)
  - expirationValue: ['integer', 'string'](int32) (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**EngagementMethodElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**EngagementTopicElement**
  - color: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**EntityOwnerElement**
  - description: ['null', 'string'] (required)
  - color: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**EthnicityElement**
  - aggregateEthnicity: ['null', 'string'](uuid) (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ExpirationPeriods**
  - (no properties)

**ExtensionElement**
  - description: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**FacilityResourceTypeElement**
  - description: ['null', 'string'] (required)
  - color: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**FinancialAccessLevelElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**GenderIdentityElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**GetProviderElementResponse**
  - elementId: ['null', 'string'] (required)
  - npi: ['null', 'string'] (required)
  - specialtyId: ['null', 'string'](uuid) (required)
  - firstName: ['null', 'string'] (required)
  - middleName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - suffix: ['null', 'string'] (required)

**HumanResourceTypeElement**
  - description: ['null', 'string'] (required)
  - color: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**IcdCodeIdentity**
  - code: ['null', 'string'] (required)
  - icdCodeType: IcdCodeType (required)
  - isInvalidIcdCode: boolean

**IcdCodeType**
  - (no properties)

**IntakeCategory**
  - (no properties)

**InterventionProgressElement**
  - description: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**InterventionResolutionTypeElement**
  - definition: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**InterventionTypeElement**
  - definition: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)
  - snoozeReasonSet: object (required)
  - orderedInterventionResolutionTypes: ['null', 'array'] (required)
  - orderedProgresses: ['null', 'array'] (required)
  - autoCloseDays: ['integer', 'string'](int32) (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**LanguageElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**MaritalStatusElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ModifierElement**
  - definition: ['null', 'string']
  - shortDescription: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**MSPInsuranceTypeElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**NationalDrugCodeDrugSearchCriteria**
  - query: ['null', 'string'] (required)

**NationalDrugCodeElement**
  - name: ['null', 'string'] (required)
  - definition: ['null', 'string'] (required)
  - unit: ['null', 'string'](uuid) (required)
  - amount: ['null', 'number', 'string'](double) (required)
  - unitConversionFactor: ['null', 'number', 'string'](double) (required)
  - shortDescription: ['null', 'string'] (required)
  - brandName: ['null', 'string'] (required)
  - genericName: ['null', 'string'] (required)
  - chargeCode: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - isDisconnected: boolean (required)
  - isRemoved: boolean (required)
  - isExpired: boolean (required)
  - createdDate: string(date-time) (required)

**NationalDrugCodeRangeSearchCriteria**
  - fromName: ['null', 'string'] (required)
  - toName: ['null', 'string'] (required)
  - includeExpired: boolean (required)

**NationalDrugCodeSearchCriteria**
  - name: ['null', 'string'] (required)
  - shortDescriptionSearch: ['null', 'string']
  - includeExpired: boolean (required)

**NationalDrugCodeSummaryElement**
  - name: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)

**NoncontractualAdjustmentReasonElement**
  - shortDescription: ['null', 'string'] (required)
  - isBadDebt: boolean (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**OverbookReasonElement**
  - description: ['null', 'string']
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**PatientRelationshipElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**PaymentPlanTerminationReasonElement**
  - description: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**PlaceOfServiceElement**
  - description: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**PlanTypeElement**
  - requiresMSPInsuranceType: boolean (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**PortfolioType**
  - (no properties)

**PrivacyPolicyElement**
  - description: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**PronounElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ProviderElementResponse**
  - elementId: string(uuid) (required)
  - elementName: ['null', 'string'] (required)
  - firstName: ['null', 'string'] (required)
  - middleName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - suffix: ['null', 'string'] (required)
  - specialtyId: ['null', 'string'](uuid) (required)
  - addressLine1: ['null', 'string'] (required)
  - addressLine2: ['null', 'string'] (required)
  - addressStateId: ['null', 'string'](uuid) (required)
  - addressCity: ['null', 'string'] (required)
  - addressZipCode: ['null', 'string'] (required)
  - addressCounty: ['null', 'string'] (required)
  - contactPhoneNumber: ['null', 'string'] (required)
  - contactPhoneNumberExtension: ['null', 'string'] (required)
  - contactFaxNumber: ['null', 'string'] (required)
  - contactFaxNumberExtension: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - removed: boolean

**ProviderLevelAdjustmentReasonElement**
  - definition: ['null', 'string']
  - shortDescription: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**ProviderSearchResponse**
  - id: ['null', 'string'] (required)
  - npi: ['null', 'string'] (required)
  - specialtyId: ['null', 'string'] (required)
  - firstName: ['null', 'string'] (required)
  - middleName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - suffix: ['null', 'string'] (required)
  - addressLine1: ['null', 'string'] (required)
  - addressLine2: ['null', 'string'] (required)
  - city: ['null', 'string'] (required)
  - stateId: ['null', 'string'] (required)
  - zipCode: ['null', 'string'] (required)
  - expired: boolean (required)

**RaceElement**
  - aggregateRace: ['null', 'string'](uuid) (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**RefundReasonElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ReleaseInformationElement**
  - description: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**RemarkCodeElement**
  - definition: ['null', 'string']
  - shortDescription: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**ReservedFundCategoryElement**
  - description: ['null', 'string']
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**ScheduleBlockTypeElement**
  - description: ['null', 'string']
  - shortDescription: ['null', 'string'] (required)
  - color: ['null', 'string'] (required)
  - durationHours: ['null', 'integer', 'string'](int32) (required)
  - durationMinutes: ['null', 'integer', 'string'](int32) (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ServiceTypeElement**
  - divisionId: ['null', 'string'](uuid) (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**SetQualifier**
  - setId: string(uuid) (required)
  - isFactorySet: boolean (required)

**SexualOrientationElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**SignatureSourceElement**
  - description: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**SnoozeReasonElement**
  - description: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**SpecialtyElement**
  - taxonomyCode: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**StateElement**
  - description: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**TagElement**
  - description: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**TestResultTypeElement**
  - description: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**TransferReasonElement**
  - shortDescription: ['null', 'string'] (required)
  - description: ['null', 'string']
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**UnderpaymentReasonElement**
  - serviceType: boolean (required)
  - outstandingBalance: boolean (required)
  - nonPayment: boolean (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**UnitCostRequest**
  - code: ['null', 'string'] (required)
  - locationId: string(uuid) (required)
  - date: Date (required)

**UnitElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**VoidReasonElement**
  - description: ['null', 'string']
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**WebsiteTypeElement**
  - description: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

