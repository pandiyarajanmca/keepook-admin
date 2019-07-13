import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {User} from '../_models/user';
import {environment} from '../../environments/environment';
import {TokenService} from './token.service';
import {HttpClient} from '@angular/common/http';
import {Message} from '../_models/message';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Balances} from '../_models/balances';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {

  private static modifyPasswordURL = environment.apiURL + '/auth/modify-password';
  private static getProfileURL = environment.apiURL + '/user/profile';
  private static sendOtpURL = environment.apiURL + '/user/send-otp';
  private static verifyOtpURL = environment.apiURL + '/user/verify-otp';
  private static updateProfileURL = environment.apiURL + '/user/profile';
  
  userBalances$: BehaviorSubject<Balances> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private tokenService: TokenService) {

    this.tokenService.socket.on('balance-changed-' + TokenService.hash(), (userBalances) => {
      if (localStorage.getItem('_u')) {
        const userData = JSON.parse(localStorage.getItem('_u'));
        userData.balanceTKN = userBalances.balanceTKN;
        userData.referralTKN = userBalances.referralTKN;
        userData.purchasedTKN = userBalances.purchasedTKN;
        localStorage.setItem('_u', JSON.stringify(userData));
        this.userBalances$.next(userBalances);
      }
    });

    this.tokenService.socket.on('update-kyc-status-' + TokenService.hash(), (userKycStatus) => {
      if (localStorage.getItem('_u')) {
        const kycData = JSON.parse(localStorage.getItem('_u'));
        kycData.kycStatus = userKycStatus.kycStatus;
        localStorage.setItem('_u', JSON.stringify(kycData));
      }
    });

  }

  // getUserBalances(): Observable<Balances> {
  //   return this.userBalances$.asObservable();
  // }

  // modifyPassword(data) {
  //   return this.http.post<Message>(UserService.modifyPasswordURL, data, TokenService.jwt());
  // }

  // modifyPasswordwith2FA(data, code, twoFactorEnabled) {
  //   return this.http.post<Message>(UserService.modifyPasswordURL, {data, code, twoFactorEnabled}, TokenService.jwt());
  // }

  getProfile() {
    return this.http.get<any>(UserService.getProfileURL, TokenService.jwt());
  };

  sendotp(data) {
    return this.http.post<any>(UserService.sendOtpURL, data, TokenService.jwt());
  }

  verifyOtp(data) {
    return this.http.post<any>(UserService.verifyOtpURL, data, TokenService.jwt());
  }

  updateProfile(data) {
    return this.http.patch<any>(UserService.updateProfileURL, data, TokenService.jwt());
  }
}
