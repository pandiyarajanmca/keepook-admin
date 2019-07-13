import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "table-pagination",
  template: `
    <select (change)="pageOnChange(device.value)" #device>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
      <option value="100">100</option>
    </select>
    <button class="link-button" (click)="previousPage()">
      <i class="fa fa-angle-left"></i>
    </button>
    <button class="link-button" (click)="nextPage()">
      <i class="fa fa-angle-right"></i>
    </button>
    {{ page }} of {{ totalItems() }}
  `
})
export class TablePaginationComponent implements OnInit {
  perpage = 10;
  @Input() page = 0;
  @Input() total;

  @Output() op: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {
    console.log(this.page, this.total);
  }

  previousPage() {
    console.log(this.page, this.total);
    if (this.page > 1) {
      this.page--;
    }
    this.paginate(this.page);
  }

  nextPage() {
    console.log(this.page, this.total);
    if (this.page + 1 <= this.totalItems()) {
      this.page++;
    }
    this.paginate(this.page);
  }

  pageOnChange(perPage) {
    this.perpage = perPage;
    this.page = 1;
    this.paginate(this.page);
  }
  totalItems() {
    if (this.total > this.perpage && this.total !== 0) {
      return Math.ceil(this.total / this.perpage);
    } else {
      return 1;
    }
  }

  paginate(page) {
    const start = this.perpage * page - this.perpage;
    const end = this.perpage * page;
    this.op.emit({ start: start, end: end, perpage: this.perpage });
  }
}
