import { Currency } from './currency';

export interface CoinAddress {
  _id: number;
  userId: string;
  status: string;
  found: boolean;
  coinAmount: number;
  coinResult: number;
  address: string;
  currencyId: Currency;
  exchangeRateValue: number;
  active: true;
  timestamp: Date;
  completionTime: Date; // for time counter
  tknAmount: number;
  currencyAbbr: string;
  zeroConfirmationResult: string;
}
