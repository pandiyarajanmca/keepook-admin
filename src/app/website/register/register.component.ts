import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { AuthService } from '../../_service/auth.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { TokenService } from '../../_service/token.service';
import { Router } from '@angular/router';
import { AuthService as AuthServiceSocial, SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: any;
  successMsg;
  errMsg = "Something went wrong";
  countries = [];

  @ViewChild('successSwal') private successSwal: SwalComponent;
  @ViewChild('errorSwal') private errorSwal: SwalComponent;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private authServiceSocial: AuthServiceSocial,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      termsCheck: ['', Validators.required]
    });
    this.authService.getAllCountries().subscribe((response) => {
      this.countries = response.result;
    });

    if (localStorage.getItem('_u')) {
      this.router.navigate(['/dashboard/home']);
    } else {
      this.authServiceSocial.authState.subscribe((user) => {
        if (user) {
          this.signOut();
         
          this.authService.signUpSocial(user)
            .subscribe((userData) => {
              localStorage.setItem('_u', JSON.stringify(userData.result));
              localStorage.setItem('token', userData.result['accessToken']);

              this.router.navigate(['/dashboard/home']);
            },
              (err) => {

              
              });
        }

      });
    }

  }
  register(data) {
    let postData = {
      legalName: data.name,
      email: data.email,
      password: data.password,
      countryId: data.country,
      type: 'INDIVIDUAL',
      provider: 'local'
    }
    this.authService.signUp(postData).subscribe((response) => {
      if (response.status === true) {
        this.successMsg = response.message;
        this.registerForm.reset();
        setTimeout(() => {
          this.successSwal.show();
          this.router.navigate(['/register-verification']);
        }, 300);
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
