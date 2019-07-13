import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { KYC } from '../_models/kyc';
import { BehaviorSubject } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Message } from '../_models/message';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class KYCService {
  private static kycURL = environment.apiURL + '/kyc';
  private static kycCompanyURL = environment.apiURL + '/kyc/corporate';
  private static accountURL = environment.apiURL + '/bank-transaction/save';
  private static kycEnabledURL = environment.apiURL + '/kyc/enabled';
  private static userURL = environment.apiURL + '/kyc/kyc-status/';

  public kycEnabled$: BehaviorSubject<boolean>;
  kycEnabled: boolean;
  KYC$: BehaviorSubject<KYC> = new BehaviorSubject(null);

  constructor(private http: HttpClient,
              private tokenService: TokenService,
              private toastr: ToastrService) {
    if (!this.kycEnabled$) {
      this.kycEnabled$ = new BehaviorSubject(null);
      this.http.get<KYC>(KYCService.kycEnabledURL, TokenService.jwt())
        .subscribe((kycEnabled) => {
        }, (err) => {
          this.tokenService.processError('[GetKYCEnabled]', err);
        });
    }

    this.http.get<KYC>(KYCService.kycURL, TokenService.jwt())
      .subscribe(
        (KYCData) => {
          this.KYC$.next(KYCData);
        }, (err) => {
          this.tokenService.processError('[GetKYC]', err);
        }
      );
  }

  private static saveKyc = environment.apiURL + '/kyc';

  saveKYC(data, passportImage, proofImage, identityImage) {
      const fd = new FormData();
      console.log('--in here--',data)
      Object.keys(data).forEach(key=> {
        if(key =='docType1'||key=='docType2'){
          fd.append(key, data[key].value);
        }else{
          fd.append(key, data[key]);
        }
      })
      fd.append('passportImage', passportImage);
      fd.append('proofImage', proofImage);
      fd.append('identityImage', identityImage);
      // fd.append('data', JSON.stringify(data));
    return this.http.post<any>(KYCService.saveKyc, fd, TokenService.jwt());
  }



  // saveKYC(kyc, email, passportImage, utilityImage, proofImage, identityImage): Observable<Message> {
  //   const data = new FormData();
  //
  //   data.append('passportImage', passportImage);
  //   data.append('utilityImage', utilityImage);
  //   data.append('proofImage', proofImage);
  //   data.append('identityImage', identityImage);
  //   data.append('email', email);
  //   data.append('kyc', JSON.stringify(kyc));
  //   const _u = JSON.parse(localStorage.getItem('_u'));
  //     if (_u) {
  //       const httpOptions = {
  //         headers: new HttpHeaders({
  //           'x-access-token': _u.token
  //         })
  //       };
  //       return this.http.post<Message>( KYCService.kycURL, data, httpOptions );
  //     }
  // }


  // saveKYCwith2FA(kyc, email, code, twoFactorEnabled, passportImage, proofImage, identityImage): Observable<Message> {
  //   const data = new FormData();

  //   data.append('personalImage', passportImage);
  //   data.append('proofImage', proofImage);
  //   data.append('identityImage', identityImage);
  //   data.append('email', email);
  //   data.append('code', code);
  //   data.append('twoFactorEnabled', twoFactorEnabled);
  //   data.append('kyc', JSON.stringify(kyc));
  //   const _u = JSON.parse(localStorage.getItem('_u'));
  //   if (_u) {
  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //         'x-access-token': _u.token
  //       })
  //     };
  //     return this.http.post<Message>( KYCService.kycURL, data, httpOptions );
  //   }
  // }

  // saveCompanyKYC(kyc, email, passportImage, utilityImage, proofImage, identityImage): Observable<Message> {
  //   const data = new FormData();

  //   data.append('commercialRegistryDoc', passportImage);
  //   data.append('boardOfDirectorsDoc', utilityImage);
  //   data.append('beneficialOwnersDoc', proofImage);
  //   data.append('fundOrAuditBookDoc', identityImage);
  //   data.append('email', email);
  //   data.append('kyc', JSON.stringify(kyc));
  //   const _u = JSON.parse(localStorage.getItem('_u'));
  //   if (_u) {
  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //         'x-access-token': _u.token
  //       })
  //     };
  //     return this.http.post<Message>( KYCService.kycCompanyURL, data, httpOptions );
  //   }
  // }

  // saveCompanyKYCwith2FA(kyc, email, code, twoFactorEnabled, passportImage, utilityImage, proofImage, identityImage): Observable<Message> {
  //   const data = new FormData();

  //   data.append('commercialRegistryDoc', passportImage);
  //   data.append('boardOfDirectorsDoc', utilityImage);
  //   data.append('beneficialOwnersDoc', proofImage);
  //   data.append('fundOrAuditBookDoc', identityImage);
  //   data.append('email', email);
  //   data.append('code', code);
  //   data.append('twoFactorEnabled', twoFactorEnabled);
  //   data.append('kyc', JSON.stringify(kyc));
  //   const _u = JSON.parse(localStorage.getItem('_u'));
  //   if (_u) {
  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //         //'Content-Type':  'application/form-data',
  //         'x-access-token': _u.token
  //       })
  //     };
  //     return this.http.post<Message>( KYCService.kycCompanyURL, data, httpOptions );
  //   }
  // }

  saveTransaction(transaction, toAccount, currency, utilityImage): Observable<any> {
    const data = new FormData();
    data.append('utilityImage', utilityImage);
    data.append('transaction', JSON.stringify(transaction));
    data.append('toAccount', toAccount);
    data.append('currency', currency);
    const _u = JSON.parse(localStorage.getItem('_u'));
    if (_u) {
      const httpOptions = {
        headers: new HttpHeaders({
          'x-access-token': _u.token
        })
      };
      return this.http.post<Message>( KYCService.accountURL, data, httpOptions );
    }
  }

  saveKYCwith2FA(kyc, email, code, twoFactorEnabled, passportImage, utilityImage, proofImage, identityImage): Observable<Message> {
    const data = new FormData();

    data.append('passportImage', passportImage);
    data.append('utilityImage', utilityImage);
    data.append('proofImage', proofImage);
    data.append('identityImage', identityImage);
    data.append('email', email);
    data.append('code', code);
    data.append('twoFactorEnabled', twoFactorEnabled);
    data.append('kyc', JSON.stringify(kyc));
    const _u = JSON.parse(localStorage.getItem('_u'));
    if (_u) {
      const httpOptions = {
        headers: new HttpHeaders({
          //'Content-Type':  'application/form-data',
          'x-access-token': _u.token
        })
      };
      return this.http.post<Message>( KYCService.kycURL, data, httpOptions );
    }
  }


  getKYC(): Observable<KYC> {
    return this.KYC$.asObservable().share();
  }

  pullKyc() {
    return this.http.get<KYC>(KYCService.kycURL, TokenService.jwt())
      .subscribe(
        (KYCData) => {
          this.KYC$.next(KYCData);
        }, (err) => {
          this.tokenService.processError('[GetKYC]', err);
        }
      );
  }

  getKYCEnabled(): Observable<boolean> {
    return this.kycEnabled$.asObservable();
  }

  getUserByEmail(email: string) {
    return this.http.get<any>(KYCService.userURL + email,  TokenService.jwt());
  }

}
