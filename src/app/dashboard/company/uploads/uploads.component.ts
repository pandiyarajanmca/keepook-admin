import { Component, OnInit } from '@angular/core';
import { ISlimScrollOptions } from 'ngx-slimscroll';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {
  opts: ISlimScrollOptions ;
  constructor() { }

  ngOnInit() {
    this.opts = {
      position: 'right',
      barBackground: "#c2c7e3",
      gridBackground: "#f5f5f5",
      barWidth: '8',
    };

  }

}
