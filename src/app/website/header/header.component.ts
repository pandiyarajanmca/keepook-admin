import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
@Input() public verficaionPageMenu: any;  // for give active class to resgister menu for register-verificaion and service-unavailable url
status: boolean = true;
constructor() { }

  ngOnInit() {
  }
  clickEvent() {
    this.status = !this.status;
  }
}
