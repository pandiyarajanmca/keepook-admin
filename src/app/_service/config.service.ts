import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Config } from '../_models/config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  private static configsURL = environment.apiURL + '/config';

  config$: BehaviorSubject<Config> = new BehaviorSubject(null);

  constructor(private http: HttpClient,
              private tokenService: TokenService) {
    this.http.get<Config>(ConfigService.configsURL, TokenService.jwt())
      .subscribe(
        (config) => {
          this.config$.next(config);
        }, (err) => {
          this.tokenService.processError('[Configs]', err);
        }
      );
  }

  getConfig(): Observable<Config> {
    return this.config$.asObservable();
  }
}
