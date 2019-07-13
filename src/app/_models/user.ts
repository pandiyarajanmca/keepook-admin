export interface User {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  timestamp: Date;
  token: string;
  expiresIn: Date;
  balanceTKN: number;
  referralTKN: number;
  purchasedTKN: number;
  status: boolean,
  code: number,
  message: string,
  appVersion: string,
  result: any
}
