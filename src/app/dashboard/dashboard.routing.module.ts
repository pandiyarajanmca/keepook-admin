import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {  DashboardComponent} from './dashboard.component';
import { CompanyComponent } from './company/company.component';
import { UsergroupComponent } from './usergroup/usergroup.component';

import { TransactionNewComponent } from './transaction-new/transaction-new.component';


const routes: Routes = [
    { path: 'home', component: DashboardComponent},
    { path: '', component: DashboardComponent},
    { path: 'company', component: CompanyComponent},
    { path: 'transaction-new', component: TransactionNewComponent},
    { path: 'user-group', component: UsergroupComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class DashboardRoutingModule { }
