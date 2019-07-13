import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { AuthService } from '../../_service/auth.service';
import { Router } from '@angular/router';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { TokenService } from '../../_service/token.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: any;
  successMsg;
  errMsg = "Something went wrong";

  @ViewChild('successSwal') private successSwal: SwalComponent;
  @ViewChild('errorSwal') private errorSwal: SwalComponent;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService, ) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      robotCheck: ['', Validators.required]
    });
  }

  forgotPassword(data) {
    this.authService.forgotPassword(data).subscribe((response) => {
      if (response.status === true) {
        this.successMsg = response.message;
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
      });
  }
};

