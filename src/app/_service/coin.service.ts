import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {TokenService} from './token.service';
import {environment} from '../../environments/environment';
import {CoinAddress} from '../_models/coinAddress';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CoinService {
  private static generatedAddressesURL = environment.apiURL + '/coin/generated-addresses/all';
  private static deleteAddressesURL = environment.apiURL + '/coin/delete-addresses/';
  private static generatedAddressURL = environment.apiURL + '/coin/generated-address/';
  private static generateAddressURL = environment.apiURL + '/coin/generate-address';
  private static saveWithdrawalAddress = environment.apiURL + '/coin/save-withdrawal-address';
  private static accountUrl = environment.apiURL + '/bank-account/account';

  private coinAddresses$: BehaviorSubject<CoinAddress[]> = new BehaviorSubject(null);
  private coinAddress$: BehaviorSubject<CoinAddress> = new BehaviorSubject(null);

  public addressStore: CoinAddress;

  constructor(private http: HttpClient,
              private tokenService: TokenService) {

    this.tokenService.socket.on('address-balance-changed-' + TokenService.hash(), (data) => {
      this.updateObservable(data.address);
    });

    this.http.get<CoinAddress[]>(CoinService.generatedAddressesURL, TokenService.jwt())
      .subscribe((coinAddresses) => {
        this.coinAddresses$.next(coinAddresses);
      }, (err) => {
        this.tokenService.processError('[CoinAddresses]', err);
      });
  }

  saveAddressForWithdrawal(address: string) {
    return this.http.post(CoinService.saveWithdrawalAddress, {address}, TokenService.jwt());
  }

  saveAddressForWithdrawalwith2FA(address: string, code: string, twoFactorEnabled: boolean) {
    return this.http.post(CoinService.saveWithdrawalAddress, {address, code, twoFactorEnabled}, TokenService.jwt());
  }

  generateAddress(coinAmount: number, coinType: string, tknAmount: number) {
    return this.http.post<CoinAddress[]>(CoinService.generateAddressURL, {coinAmount, coinType, tknAmount}, TokenService.jwt())
      .subscribe((coinAddresses) => {
        this.coinAddresses$.next(coinAddresses);
      }, (error) => {
        this.tokenService.processError('[GenerateAddress]', error);
      });
  }

  getGeneratedAddress(address: string) {
    return this.http.get<CoinAddress>(CoinService.generatedAddressURL + address, TokenService.jwt())
      .subscribe((coinAddress) => {
        this.coinAddress$.next(coinAddress);
      }, (error) => {
        this.tokenService.processError('[GeneratedAddress]', error);
      });
  }


  generateNewAddress(coinAmount: number, coinType: string, tknAmount: number) {
    return this.http.post<CoinAddress[]>(CoinService.generateAddressURL, {coinAmount, coinType, tknAmount}, TokenService.jwt());

  }

  deleteAddress(addressId: string) {
    return this.http.post(CoinService.deleteAddressesURL, {addressId}, TokenService.jwt());
  }

  getCoinAddresses(): Observable<CoinAddress[]> {
    return this.coinAddresses$.asObservable();
  }

  setAddressStore(data) {
    this.addressStore = data;
  }

  getAddressStore() {
    return this.addressStore;
  }

  updateCoinAddressObservable() {
    this.http.get<CoinAddress[]>(CoinService.generatedAddressesURL, TokenService.jwt())
      .subscribe((coinAddresses) => {
        this.coinAddresses$.next(coinAddresses);
      }, (err) => {
        this.tokenService.processError('[CoinAddresses]', err);
      });
  }

  getAllAccount(coinType) {
    return this.http.get(CoinService.accountUrl + '/' + coinType, TokenService.jwt());
  }

  private updateObservable(newAddress: CoinAddress) {
    const coinAddresses = [];
    this.coinAddresses$.getValue().forEach((oldAddress) => {
      let address = oldAddress;
      if (oldAddress._id === newAddress._id) {
        address = newAddress;
      }
      coinAddresses.push(address);
    });
    this.coinAddresses$.next(coinAddresses);
  }

}
