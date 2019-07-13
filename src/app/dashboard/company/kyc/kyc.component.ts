import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ISlimScrollOptions } from 'ngx-slimscroll';
import { AuthService } from '../../../_service/auth.service';
import { KYCService } from '../../../_service/kyc.service';
import { TokenService } from '../../../_service/token.service';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: "app-kyc",
  templateUrl: "./kyc.component.html",
  styleUrls: ["./kyc.component.css"]
})
export class KycComponent implements OnInit {

  kycForm: FormGroup;
  opts: ISlimScrollOptions ;
  successMsg;
  errMsg = "Smothing went wrong";
  kycSave = [];

  @ViewChild('successSwal') private successSwal: SwalComponent;
  @ViewChild('errorSwal') private errorSwal: SwalComponent;
  @ViewChild('passportImage') passportImage;
  @ViewChild('proofImage') proofImage;
  @ViewChild('identityImage') identityImage;

  passportCheck = false;
  utilityCheck = false;
  proofCheck = false;
  identityCheck = false;
  passportValid = false;
  utilityValid = false;
  proofValid = false;
  identityValid = false;
  status: string = null;
  imageType1 = false;
  imageType2 = false;
  imageType3 = false;
  imageType4 = false;
  sizeLimit1 = false;
  sizeLimit2 = false;
  sizeLimit3 = false;
  sizeLimit4 = false;
  imagesTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  size = 20971520; // 20971520 bytes or 20mb

  constructor(private formBuilder: FormBuilder, public authService: AuthService, public kycService: KYCService, public tokenService: TokenService) {}

  defaultBindingsList = [
    { value: 1, label: "Vilnius" },
    { value: 2, label: "Kaunas" },
    { value: 3, label: "Pavilnys" }
  ];


  ngOnInit() {
    this.kycForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      nationality: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      country: ["", Validators.required],
      postalCode: ["", Validators.required],
      passportNumber: ["", Validators.required],
      passportExpiryDate: ["", Validators.required],
      passportImage: ["", Validators.required],
      proofImage: ["", Validators.required],
      identityImage: ["", Validators.required],
      docType1: ["", Validators.required],
      docType2: ["", Validators.required]

    });
  }
  register(data) {
    this.opts = {
      position: "right",
      barBackground: "#c2c7e3",
      gridBackground: "#f5f5f5",
      barWidth: "8"
    };
  }

  kycSubmit(){
    alert(1)
    console.log("Ankit");
    console.log(this.kycForm.value);
    if(this.kycForm){

      // this.kycService.saveKYC(this.kycForm.value, this.passportImage.nativeElement.files[0], this.proofImage.nativeElement.files[0], this.identityImage.nativeElement.files[0]).subscribe(
      this.kycService.saveKYC(this.kycForm.value, this.passportImage.nativeElement.files[0], this.proofImage.nativeElement.files[0], this.identityImage.nativeElement.files[0]).subscribe(

        response => {
          if (response.status) {
            this.kycSave = response.result
          } else {
            this.errMsg = response.message;
            setTimeout(() => {
              this.errorSwal.show();
            }, 300);
          }
        },
        err => {
          this.tokenService.processError('[getEventTypes]', err)
        })
    } else {

    }
  }

  validatePassport() {
    const imageSize = this.passportImage.nativeElement.files[0].size;
    const imgType = this.passportImage.nativeElement.files[0].type;
    if (imageSize > this.size) {
      this.imageType1 = false;
      this.sizeLimit1 = true;
      this.passportImage.nativeElement.value = '';
    } else if (this.imagesTypes.indexOf(imgType) === -1) {
      this.sizeLimit1 = false;
      this.imageType1 = true;
      this.passportImage.nativeElement.value = '';
    } else {
      this.sizeLimit1 = false;
      this.imageType1 = false;
      this.passportValid = true;
    }
  }

  validateProof() {
    const imageSize = this.proofImage.nativeElement.files[0].size;
    const imgType = this.proofImage.nativeElement.files[0].type;
    if (imageSize > this.size) {
      this.imageType3 = false;
      this.sizeLimit3 = true;
      this.proofImage.nativeElement.value = '';
    } else if (this.imagesTypes.indexOf(imgType) === -1) {
      this.sizeLimit3 = false;
      this.imageType3 = true;
      this.proofImage.nativeElement.value = '';
    } else {
      this.sizeLimit3 = false;
      this.imageType3 = false;
      this.proofValid = true;
    }
  }

  validateIdentity() {
    const imageSize = this.identityImage.nativeElement.files[0].size;
    const imgType = this.identityImage.nativeElement.files[0].type;
    if (imageSize > this.size) {
      this.imageType4 = false;
      this.sizeLimit4 = true;
      this.identityImage.nativeElement.value = '';
    } else if (this.imagesTypes.indexOf(imgType) === -1) {
      this.sizeLimit4 = false;
      this.imageType4 = true;
      this.identityImage.nativeElement.value = '';
    } else {
      this.sizeLimit4 = false;
      this.imageType4 = false;
      this.identityValid = true;
    }
  }
}
