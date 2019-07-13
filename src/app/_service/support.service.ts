import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SupportMailService {
    private static supportMailURL = environment.apiURL + '/support';

    constructor(
        private http: HttpClient,
        private tokeService: TokenService
    ) {}


    sendSupportMail(email: string, body) {
        return this.http.post(
            SupportMailService.supportMailURL,
            {
                email: email,
                supportIssue: body.supportIssue,
                supportDesc: body.supportDesc
            }, TokenService.jwt());
    }



}
