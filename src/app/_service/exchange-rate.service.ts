import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';
import { ExchangeRate } from '../_models/exchange-rate';
import { Observable , BehaviorSubject } from 'rxjs';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ExchangeRateService {
  private static exchangeRateURL = environment.apiURL + '/exchange-rate';
  private static bonusPercentageURL = environment.apiURL + '/bonus/bonusPercentage';
  private static tknInUsdURL = environment.apiURL + '/exchange-rate/tknInUSD';

  public socket: any = null;

  exchangeRates$: BehaviorSubject<ExchangeRate[]> = new BehaviorSubject(null);

  bonusPercentage$: BehaviorSubject<any> = new BehaviorSubject(null);
  tknInUSD$: BehaviorSubject<any> = new BehaviorSubject(null);

  exchangeETH_BTC$: BehaviorSubject<number> = new BehaviorSubject(null);
  exchangeETH_USD$: BehaviorSubject<number> = new BehaviorSubject(null);
  exchangeBTC_USD$: BehaviorSubject<number> = new BehaviorSubject(null);


  constructor(private http: HttpClient,
    private tokenService: TokenService,
  ) {
    //  exchange rates updated
    this.tokenService.socket.on('exchange-rates-updated', (exchangeRates) => {
      this.exchangeRates$.next(exchangeRates);
    });


    this.http.get<ExchangeRate[]>(ExchangeRateService.exchangeRateURL, TokenService.jwt())
      .subscribe((exchangeRates) => {
        this.exchangeRates$.next(exchangeRates);
      }, (error) => {
        this.tokenService.processError('[ExchangeRates]', error);
      });

    this.http.get<any>(ExchangeRateService.bonusPercentageURL, TokenService.jwt())
      .subscribe((bonusPercent) => {
        this.bonusPercentage$.next(bonusPercent);
      }, (error) => {
        this.tokenService.processError('[bonusPercent]', error);
      });

    this.http.get<any>(ExchangeRateService.tknInUsdURL, TokenService.jwt())
      .subscribe((tknInUSD) => {
        this.tknInUSD$.next(tknInUSD);
      }, (error) => {
        this.tokenService.processError('[tknInUSD]', error);
      });

  }

  getExchangeRates(): Observable<ExchangeRate[]> {
    return this.exchangeRates$.asObservable();
  }

  getBonusPercentage(): Observable<any> {
    return this.bonusPercentage$.asObservable();
  }

  getTknInUSD(): Observable<any> {
    return this.tknInUSD$.asObservable();
  }

}
