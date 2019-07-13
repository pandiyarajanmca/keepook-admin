import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { AuthService } from '../../_service/auth.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from '../../_service/token.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: any;
  successMsg;
  errMsg = "Something went wrong";
  code = String;

  @ViewChild('successSwal') private successSwal: SwalComponent;
  @ViewChild('errorSwal') private errorSwal: SwalComponent;


  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService, ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.code = params['activationCode'];
    });
  }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      robotCheck: ['', Validators.required]
    });
  }
  resetPassword(data) {
    if (this.code) {
      data.activationCode = this.code;
      this.authService.changePassword(data)
        .subscribe(
          (response) => {
            if (response.status === true) {
              this.successMsg = response.message;
              this.resetPasswordForm.reset();
              setTimeout(() => {
                this.successSwal.show();
                this.router.navigate(['/login']);
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
          }
        )
    }

  }

}
