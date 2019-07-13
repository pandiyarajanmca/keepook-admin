import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { variable } from '@angular/compiler/src/output/output_ast';
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
    this.paymentForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.email] ],
      field1: ['', Validators.required],
      field2: ['', Validators.required],
      field3: ['', Validators.required]
    });
    this.opts = {
      position: 'right',
      barBackground: "#c2c7e3",
      gridBackground: "#f5f5f5",
      barWidth: '8',
    };

  }


}
