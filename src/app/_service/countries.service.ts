import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Country } from '../_models/country';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/share';


@Injectable()
export class CountriesService {

  private static countriesURL = environment.apiURL + '/auth/countries';
  private countries$: BehaviorSubject<Country[]>;

  constructor(private http: HttpClient,
              private tokenService: TokenService) {
    if (!this.countries$) {
      this.countries$ = new BehaviorSubject(null);

      this.http.get<any[]>(CountriesService.countriesURL, TokenService.jwt())
        .subscribe(
          (countriesData) => {
            this.countries$.next(countriesData);
          }, (err) => {
            this.tokenService.processError('[GetCountries]', err);
          }
        );
    }
  }

  getAllCountries(): Observable<any[]> {
    return this.countries$.asObservable().share();
  }
}
