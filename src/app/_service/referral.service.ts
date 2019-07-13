import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {TokenService} from './token.service';
import {HttpClient} from '@angular/common/http';
import {Message} from '../_models/message';
import {Observable} from 'rxjs/Observable';
import {ToastrService} from 'ngx-toastr';
import {User} from '../_models/user';
import {BehaviorSubject} from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class ReferralService {

  private static referralListUrl = environment.apiURL + '/auth/my-referrals';
  user$: BehaviorSubject<User[]> = new BehaviorSubject([]);
  public socket: any = null;

  constructor(private http: HttpClient,
              private tokenService: TokenService,
              private toastr: ToastrService) {

    this.tokenService.socket.on('referralJoinReload', (user) => {
      this.user$.next(user);
    });

    this.http.get<User[]>(ReferralService.referralListUrl, TokenService.jwt())
      .subscribe(
        (user) => {
          this.user$.next(user);
        }, (error) => {
          this.tokenService.processError('[User]', error);
        }
      );
  }

  getList(): Observable<User[]> {
    return this.user$.asObservable();
  }
}
