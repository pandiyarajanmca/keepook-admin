import { Component, OnInit, ViewChild } from '@angular/core';
import { ISlimScrollOptions } from 'ngx-slimscroll';
import { AuthService } from '../../../_service/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../_service/user.service';
import { TokenService } from '../../../_service/token.service';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
@Component({
  selector: "app-mobile",
  templateUrl: "./mobile.component.html",
  styleUrls: ["./mobile.component.css"]
})
export class MobileComponent implements OnInit {
  opts: ISlimScrollOptions ;
  myForm: any;
  errVerifyOtpMessage;
  successMsg="OTP Verified successfully"

  @ViewChild('successSwal') private successSwal: SwalComponent;

  constructor( private modalService: NgbModal,
               public authService: AuthService,
               public userService: UserService,
               private tokenService: TokenService,
               private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.opts = {
      position: "right",
      barBackground: "#c2c7e3",
      gridBackground: "#f5f5f5",
      barWidth: "8"
    };

    this.myForm = this.formBuilder.group({
      countryCode: ['', [Validators.required]],
      phoneNumber: ['', Validators.required]
    });

  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  sendOtp(data){
    let dataToSend = {
      phoneNumber: data.phoneNumber.toString(),
      countryCode: data.countryCode
    }
    this.userService.sendotp(dataToSend).subscribe((response) => {
      console.log(response)
    },
      (err) => {
        this.tokenService.processError('[register]', err)
      });
  }

  verifyOtp(data){
     let dataToSend = {
      phoneNumber: this.myForm.value.phoneNumber.toString(),
      countryCode: this.myForm.value.countryCode,
      otp: data
    }
    this.userService.verifyOtp(dataToSend).subscribe((response) => {
       if(response.status){
        document.getElementById("hidePopUp").click();
        this.successSwal.show();
       }else{
         this.errVerifyOtpMessage = "OTP has Expired"
       }
    },
      (err) => {
        this.tokenService.processError('[register]', err)
      });
  }

  resendOtp(){
    this.sendOtp(this.myForm.value);
  }

  hideModel(){
    document.getElementById("hidePopUp").click();
  }

}
