import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_service/auth.service';
import { trigger, transition, state, animate, style } from '@angular/animations';

@Component({
  selector: 'app-righttmenu',
  templateUrl: './righttmenu.component.html',
  styleUrls: ['./righttmenu.component.css'],
  animations: [
    trigger('collapse', [
      state('open', style({
        opacity: '1',
        display: 'block',
        transform: 'translate3d(0, 0, 0)'
      })),
      state('closed',   style({
        opacity: '0',
        display: 'none',
        transform: 'translate3d(0, -100%, 0)'
      })),
      transition('closed => open', animate('200ms ease-in')),
      transition('open => closed', animate('100ms ease-out'))
    ])
  ]
})
export class RighttmenuComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
