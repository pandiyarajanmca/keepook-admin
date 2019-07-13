import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard.routing.module';
import { DashboardComponent } from './dashboard.component';
import { RighttmenuComponent } from './righttmenu/righttmenu.component';
import { LeftmenuComponent } from './leftmenu/leftmenu.component';
import { CompanyComponent } from './company/company.component'
import { HeaderComponent } from './header/header.component';
import { AuthService } from './../_service/auth.service';
import { UsergroupComponent } from './usergroup/usergroup.component';
import { TablePaginationComponent } from './table-pagination/table-pagination.component';

import { NgSlimScrollModule, SLIMSCROLL_DEFAULTS } from 'ngx-slimscroll';
import { NgbDateNativeAdapter, NgbDateAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepickerAdapter } from './datepicker-adapter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TransactionNewComponent } from './transaction-new/transaction-new.component';

import { InternationalPhoneModule } from 'ng4-intl-phone';
import { UserService } from '../_service/user.service';
import {TokenService} from '../_service/token.service';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import { KYCService } from './../_service/kyc.service';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, NgSlimScrollModule, ReactiveFormsModule ,
     NgbModule, FormsModule,  NgSelectModule, InternationalPhoneModule,  SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }), ],
  declarations: [
    DashboardComponent,
    RighttmenuComponent,
    LeftmenuComponent,
    CompanyComponent,
    NgbdDatepickerAdapter,
    HeaderComponent,
    UsergroupComponent,
    TablePaginationComponent,
    TransactionNewComponent,
  ],

  providers: [AuthService, KYCService, TokenService, {

    provide: SLIMSCROLL_DEFAULTS,
    useValue: {
      alwaysVisible : false
    }
  },
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    UserService,
    TokenService
  ]
})
export class DashboardModule {}
