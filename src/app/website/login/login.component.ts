import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { AuthService } from '../../_service/auth.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { TokenService } from '../../_service/token.service';
import { Router } from '@angular/router';
import { AuthService as AuthServiceSocial, SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  successMsg;
  errMsg = "Something went wrong";

  @ViewChild('successSwal') private successSwal: SwalComponent;
  @ViewChild('errorSwal') private errorSwal: SwalComponent;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private authServiceSocial: AuthServiceSocial,
    private router: Router, ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      robotCheck: ['', Validators.required]
    });

    if (localStorage.getItem('_u')) {
      this.router.navigate(['/dashboard/home']);
    } else {
      this.authServiceSocial.authState.subscribe((user) => {
        if (user) {
          this.signOut();
         
          this.authService.signUpSocial(user)
            .subscribe((userData) => {
              localStorage.setItem('_u', JSON.stringify(userData));
              localStorage.setItem('token', userData['accessToken']);
                         

              this.router.navigate(['/dashboard/home']);
            },
              (err) => {

              
              });
        }

      });
    }

  }

  login(data) {
    this.authService.login(data).subscribe((response) => {
      if (response.status === true) {
        localStorage.setItem('_u', JSON.stringify(response.result));
        localStorage.setItem('token', response.result['accessToken']);
        this.router.navigate(['/dashboard/home']);
      } else {
        this.errMsg = response.message;
        setTimeout(() => {
          this.errorSwal.show();
        }, 300);
      }
    },
      (err) => {
        this.tokenService.processError('[register]', err)
      });
  }

  signInWithGoogle(): void {
    this.authServiceSocial.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authServiceSocial.signOut();
  }

}
