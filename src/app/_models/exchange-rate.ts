import { Currency } from './currency';

export interface ExchangeRate {
  currencyIdFirst: Currency;
  currencyIdFirstAbbr: string;
  currencyIdFirstName: string;
  currencyIdFirstMinAmount: number;
  currencyIdFirstMinAmountCompany: number;
  currencyIdFirstMaxAmount: number;
  currencyIdFirstType: string;
  currencyIdSecond: Currency;
  currencyIdSecondAbbr: string;
  currencyIdSecondName: string;
  currencyIdSecondMinAmount: number;
  currencyIdSecondMinAmountCompany: number;
  currencyIdSecondMaxAmount: number;
  currencyIdSecondType: string;
  exchangeRate: number;
  type: string;
}