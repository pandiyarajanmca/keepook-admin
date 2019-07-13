import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Message} from '../_models/message';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import * as io from 'socket.io-client';


import {ToastrService} from 'ngx-toastr';

@Injectable()
export class TokenService {

  public socket: any = null;
  public err = new BehaviorSubject<Message>(null);

  constructor(private router: Router,
              private toastr: ToastrService) {
    this.socket = io(environment.socketURL, {upgrade: false, transports: ['websocket'], query: {token: TokenService.token()}});
    this.socket.on('connect', () => {
      this.socket.send({token: TokenService.token()});
    });

    this.socket.on('referralJoin', (data) => {
      if (data) {
        let lst = this._u();
        if (lst && lst.hasOwnProperty('hash'))
          if (lst.referralCode === data.referralCode)
            this.toastr.success(data.message, 'Referral Joined');
      }
    });

  }

  static hash() {
    if (localStorage.getItem('_u')) {
      const _u = JSON.parse(localStorage.getItem('_u'));

      if (_u && _u.hash) {
        return _u.hash;
      }
    }

    return 0;
  }

  static id() {
    if (localStorage.getItem('_u')) {
      const _u = JSON.parse(localStorage.getItem('_u'));

      if (_u && _u.hash) {
        return _u.hash;
      }
    }

    return 0;
  }

  getFirstName() {
    if (localStorage.getItem('_u')) {
      const _u = JSON.parse(localStorage.getItem('_u'));

      if (_u && _u.firstName) {
        return _u.firstName;
      }
    }

    return 0;
  }

  static token() {
    if (localStorage.getItem('_u')) {
      const _u = JSON.parse(localStorage.getItem('_u'));

      if (_u && _u.accessToken) {
        return _u.accessToken;
      }
    }

    return null;
  }

  static jwt() {
    if (localStorage.getItem('_u')) {
      const _u = JSON.parse(localStorage.getItem('_u'));

      if (_u) {

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-access-token': _u.accessToken,
            'lang':'en'
          })
        };
        return httpOptions;
      }
    }

    //return null;
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'lang':'en'
      })
    };

  }

  static storage() {
    if (localStorage.getItem('_u')) {
      return JSON.parse(localStorage.getItem('_u'));
    }

    return null;
  }

  _u() {
    if (localStorage.getItem('_u')) {
      return JSON.parse(localStorage.getItem('_u'));
    }

    return null;
  }

  email() {
    if (localStorage.getItem('_u')) {
      const _u = JSON.parse(localStorage.getItem('_u'));

      if (_u && _u.email) {
        return _u.email;
      }
    }

    return null;
  }


  public processError(controller: string, err: HttpErrorResponse) {
    console.error(controller, err);
    if (err.status === 401 || err.status === 403) {
      localStorage.clear();
       this.router.navigate(['/login']);
    } else if (err.status === 0) {
      this.router.navigate(['/unavailable']);
    } else {
      this.err.next(err.error);
    }

  }
}
