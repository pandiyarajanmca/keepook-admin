import { Country } from './country';

export class KYC {
  _id: number;
  userId: string;
  name: string;
  first_name: string;
  last_name: string;
  address: string;
  contactNo: string;
  state: string;
  countryId: Country;
  status: string;
  timestmap: Date;
  passport: boolean;
  passportImageURL: string;
  utility: boolean;
  utilityImageURL: string;
  proof: boolean;
  proofImageURL: string;
  identity: boolean;
  identityImageURL: string;
  dateOfBirth: Date;
  issue_date: Date;
  expiry_date: Date;
  SSN: string;
  passportNumber: string;
  proofType: string;
  identityType: string;
  political: boolean;

  nationality: string;
  country_of_residence: string;
  ssic_code: string;
  ssoc_code: string;
  onboarding_mode: string;
  payment_mode: string;
  product_service_complexity: string;
  source_of_funds: string;
  identification_number: string;
  personalImageURL: string;
  walletAddress: string;
  levels: number;

  document_type: string;
  existing_entity: boolean;
  entity_type: string;
  country_of_incorporation: string;
  country_of_operations: string;
  biz_activity: string;
  please_mention: string;
  companyImageURL: string;
  commercialRegistryDocURL: string;
  boardOfDirectorsDocURL: string;
  beneficialOwnersDocURL: string;
  fundOrAuditBookDocURL: string;
  videoVerificationUrl: string;
}
