import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website.routing.module';
import { WebsiteComponent } from './website.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { VerificationComponent } from './verification/verification.component';
import { ServiceUnavailableComponent } from './service-unavailable/service-unavailable.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AuthService } from '../_service/auth.service';
import { TokenService } from '../_service/token.service';
import { ToastrModule } from 'ngx-toastr';
import { CountriesService } from '../_service/countries.service';
import {SocialLoginModule, AuthServiceConfig} from 'angularx-social-login';
import { GoogleLoginProvider} from 'angularx-social-login';
import {environment} from '../../environments/environment';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.googleAppId)
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  imports: [CommonModule,
    WebsiteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
    SocialLoginModule
  ],
  declarations: [WebsiteComponent, LoginComponent, RegisterComponent, HeaderComponent, FooterComponent,
    VerificationComponent, ServiceUnavailableComponent, ForgotPasswordComponent, ResetPasswordComponent],
  providers: [AuthService, TokenService, CountriesService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },],
})
export class WebsiteModule { }
