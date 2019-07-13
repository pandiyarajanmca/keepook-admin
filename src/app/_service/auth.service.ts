import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {Message} from '../_models/message';
import {User} from '../_models/user';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import {TokenService} from './token.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Country} from '../_models/country';
import {Router} from '@angular/router';
@Injectable()
export class AuthService {
  private static activateEmailURL = environment.apiURL + '/auth/activate/';
  private static signupURL = environment.apiURL + '/auth/register';
  private static authURL = environment.apiURL + '/auth/login';
  private static changePasswordURL = environment.apiURL + '/auth/reset-password';
  private static forgotPasswordURL = environment.apiURL + '/auth/forgot-password';
  private static facebookAuthURL = environment.apiURL + '/auth/facebook';
  private static googleAuthURL = environment.apiURL + '/auth/google';
  private static validate2Fa = environment.apiURL + '/auth/validate-twofa';
  private static emailVerification = environment.apiURL + '/auth/email-verification';
  private static countryURL = environment.apiURL + '/auth/countries';

  public globalSidebarLeft  = true;
  public globalSidebarRight  = false;

  constructor(private http: HttpClient, private router: Router, ) {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getAuthStatus(): string {
    return TokenService.token();
  }

  activateEmail(email: string, activationCode: string): Observable<User> {
    return this.http.post<User>(AuthService.activateEmailURL + email + '/' + activationCode, null);
  }


  signUp(data): Observable<Message> {
    return this.http.post<Message>(AuthService.signupURL, data);
  }

  login(data): Observable<User> {
    return this.http.post<User>(AuthService.authURL, data,TokenService.jwt());
  }

  changePassword(data) {
    return this.http.post<any>(AuthService.changePasswordURL, data, TokenService.jwt());
  }

  forgotPassword(data): Observable<Message> {
    return this.http.post<any>(AuthService.forgotPasswordURL, data, TokenService.jwt());
  }



  signUpSocial(data): Observable<Message> {

    const postBody = {
      access_token: data.authToken,
      profile: data
    };

    if (data.provider === 'FACEBOOK') {
      return this.http.post<Message>(AuthService.facebookAuthURL, postBody);
    } else if (data.provider === 'GOOGLE') {
      return this.http.post<Message>(AuthService.googleAuthURL, postBody);
    }


  }

  socialSignout(){

  }

  validateTwoFa(code: string) {
    return this.http.post<Message>(AuthService.validate2Fa, {code: code}, TokenService.jwt());
  }

  // eMailVerification(email: string, isMailVerification: boolean) {
  //   return this.http.post<any>(AuthService.emailVerification, {email, isMailVerification}, TokenService.jwt());
  // }
  verifyEmail(data){
    return this.http.put<any>(AuthService.emailVerification, data, TokenService.jwt());
  }
  // getAllCountriesData() {
  //   return this.http.get<Country>(AuthService.countryURL,  TokenService.jwt());
  // }

  getAllCountries() {
    return this.http.get<any>(AuthService.countryURL,  TokenService.jwt());
  }

  public collapseBar(panel) {
    if (panel === 'right') {
      if (this.globalSidebarRight) {
        this.globalSidebarRight = false;
      } else{
        this.globalSidebarRight = true;
        this.globalSidebarLeft = false;
      }
    }
    if(panel === 'left') {
      if (this.globalSidebarLeft) {
        this.globalSidebarLeft = false;
       } else {
        this.globalSidebarLeft = true;
        this.globalSidebarRight = false;
       }
    }
  }
}
