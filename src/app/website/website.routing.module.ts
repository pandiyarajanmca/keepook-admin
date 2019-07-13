import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteComponent } from './website.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerificationComponent } from './verification/verification.component';
import { ServiceUnavailableComponent } from './service-unavailable/service-unavailable.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
    { path: '', redirectTo: '/landing', pathMatch: 'full'},
    { path: 'landing', component: WebsiteComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'register-verification', component: VerificationComponent},
    { path: 'service-unavailable', component: ServiceUnavailableComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent},
    { path: 'reset-password', component: ResetPasswordComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class WebsiteRoutingModule { }
