import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../_service/auth.service';

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})


export class LeftmenuComponent implements OnInit {

  constructor( public authService: AuthService) { }
  public innerWidth: any;
  ngOnInit() {
      this.innerWidth = window.innerWidth;
  }

  logoutDashboard() {
     this.authService.logout();
  }

}
