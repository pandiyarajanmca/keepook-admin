export interface Config {
  tknName: string;
  totalTokens: number;
  availableTokens: number;
  soldTokens: number;
  endDate: Date;
  bankCompanyName: string;
  bankName: string;
  bankIBAN: string;
  bankAccount: string;
  bankCountry: string;
  bankState: string;
  bankAddress: string;
  withdrawalEnabled: string;
  tkn2USD: number;
  normalBonusPercentage: number;
  isIcoEnd: boolean;
  isIcoPaused: boolean;
  normalBonus: boolean;
  stageBonus: boolean;
  ethAddressExpirationTime: number;
}
