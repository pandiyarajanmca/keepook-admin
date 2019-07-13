import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { ISlimScrollOptions } from 'ngx-slimscroll';
import { AuthService } from '../../_service/auth.service';
@Component({
  selector: 'app-transaction-new',
  templateUrl: './transaction-new.component.html',
  styleUrls: ['./transaction-new.component.css']
})
export class TransactionNewComponent implements OnInit {
  paymentForm: any;
  opts: ISlimScrollOptions ;
  constructor(private formBuilder: FormBuilder, public authService: AuthService) { }

  ngOnInit() {
   
  }


}
