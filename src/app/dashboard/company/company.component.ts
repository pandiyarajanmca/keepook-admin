import { Component, OnInit, ViewChild } from '@angular/core';
import { ISlimScrollOptions } from 'ngx-slimscroll';
import { AuthService } from '../../_service/auth.service';
import { UserService } from '../../_service/user.service';
import { TokenService } from '../../_service/token.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit {
  opts: ISlimScrollOptions;
  businessActivityFlag = false;
  skypeFlag = false;
  passwordFlag = false;
  PreferredCurrencyFlag=false;
  successMsg;
  errMsg;
  userData;


  @ViewChild('successSwal') private successSwal: SwalComponent;
  @ViewChild('errorSwal') private errorSwal: SwalComponent;

  constructor(public authService: AuthService,
    public userService: UserService,
    private tokenService: TokenService,) { }

  ngOnInit() {
    this.opts = {
      position: 'right',
      barBackground: "#c2c7e3",
      gridBackground: "#f5f5f5",
      barWidth: '8',
    };
    this.getProfile();
  }

  getProfile() {
    this.userService.getProfile().subscribe((response) => {
      this.userData = response.result
    },
      (err) => {
        this.tokenService.processError('[getProfile]', err)
      });
  }

  updateData(data,type){
    console.log(data,type);
    let obj = {};
    if(type == 'preferredCurrency'){
       obj["preferredCurrency"] = data;
    }
    if(type == 'password' && data){
      obj["password"] = data;
    }
    if(type == 'businessActivity'){
      obj["businessActivity"] = data;
    }
    if(type == 'skypeId'){
      obj["skypeId"] = data;
    }


    this.userService.updateProfile(obj).subscribe((response) => {
      if(response.status){
        this.successMsg = type + " updated successfully";
        setTimeout(() => {
          this.successSwal.show();
        }, 300);
      }else{
        this.errMsg = response.message;
        setTimeout(() => {
          this.errorSwal.show();
        }, 300);
      }
    },
      (err) => {
        this.tokenService.processError('[updateProfile]', err)
      });

  }
  

}
