import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';
import { TwoFactorAuthSecret } from '../_models/twoFactorAuthSecret';
import { Observable } from 'rxjs/Observable';
import { Message } from '../_models/message';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TwoFactorAuthService {
  constructor(private http: HttpClient) {
  }

  generate2FA(): Observable<TwoFactorAuthSecret> {
    return this.http.post<TwoFactorAuthSecret>(environment.apiURL + '/2fa/generate', null, TokenService.jwt());
  }

  check2FA() {
    return this.http.post<Message>(environment.apiURL + '/2fa/check', null, TokenService.jwt());
  }

  confirm2FA(secret: string, code: string): Observable<Message> {
    return this.http.post<Message>(environment.apiURL + '/2fa/confirm', {
      secret: secret,
      code: code
    }, TokenService.jwt());
  }

  disable2FA(code: string): Observable<Message> {
    return this.http.post<Message>(environment.apiURL + '/2fa/disable', {code: code}, TokenService.jwt());
  }
}
