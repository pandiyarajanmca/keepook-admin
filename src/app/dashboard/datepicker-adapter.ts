import {Component, NgModule, Injectable} from '@angular/core';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "datepicker-adapter",
  template: `
  <div class="input-group d-inline-flex w-auto">
  <input class="form-control w-auto" placeholder="yyyy-mm-dd"
         name="d2" #c2="ngModel" [(ngModel)]="model2" ngbDatepicker #d2="ngbDatepicker">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary calendar" (click)="d2.toggle()" type="button"><i class="fa fa-calendar"
    aria-hidden="true"></i> </button>
  </div>
</div>
  `,
})
export class NgbdDatepickerAdapter {
  model2: Date;
  get today() {
    return new Date();
  }
}

