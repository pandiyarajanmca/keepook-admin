import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: ' ',
    loadChildren: '../app/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'dashboard',
    loadChildren: '../app/dashboard/dashboard.module#DashboardModule'
  },
  // {
  //   path: 'admin',
  //   loadChildren: '../app/admin/admin.module#AdminModule'
  // },     
  // {
  //   path: '',
  //   loadChildren: '../app/website/website.module#WebsiteModule'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
