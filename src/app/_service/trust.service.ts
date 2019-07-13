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

@Injectable()
export class TrustService {
    private static trustURL = environment.apiURL + '/trust/generate-trust';

 

  constructor(private http: HttpClient ) {
  }


  trustSetup(dataToSend) {
    return this.http.post<any>(TrustService.trustURL, dataToSend, TokenService.jwt());
  }  
}
