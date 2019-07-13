import { Component, OnInit } from '@angular/core';
import { ISlimScrollOptions } from 'ngx-slimscroll';
import { AuthService } from '../../../_service/auth.service';

@Component({
  selector: 'app-trust-document',
  templateUrl: './trust-document.component.html',
  styleUrls: ['./trust-document.component.css']
})
export class TrustDocumentComponent implements OnInit {
  opts: ISlimScrollOptions ;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.opts = {
      position: 'right',
      barBackground: "#c2c7e3",
      gridBackground: "#f5f5f5",
      barWidth: '8',
    };
  }

}
