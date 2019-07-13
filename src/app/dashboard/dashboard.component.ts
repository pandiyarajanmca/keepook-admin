import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../_service/auth.service";
import { ISlimScrollOptions, SlimScrollEvent } from "ngx-slimscroll";
import {  NgbDateAdapter,  NgbDateStruct, NgbCalendar} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(public authService: AuthService, private calendar: NgbCalendar) {}
  page = 0;
  owlOptions: any;
  perpage = 10;
  total = 0;
  model2: any;
  date: {year: number, month: number};

  opts: ISlimScrollOptions;
  defaultBindingsList = [
    { value: 1, label: "Vilnius" },
    { value: 2, label: "Kaunas" },
    { value: 3, label: "Pavilnys" }
  ];
  transactions: any = [
    {
      WishType: "Payment",
      Description: "Transfer BTC to the following wallet add...",
      Date: "12-12-2018",
      TrusteeFee: "00.00",
      Status: "Submitted"
    },
    {
      WishType: "Payment",
      Description: "Transfer BTC to the following wallet add...",
      Date: "12-12-2018",
      TrusteeFee: "00.00",
      Status: "Submitted"
    },
    {
      WishType: "Payment",
      Description: "Transfer BTC to the following wallet add...",
      Date: "12-12-2018",
      TrusteeFee: "00.00",
      Status: "Submitted"
    },
    {
      WishType: "Payment",
      Description: "Transfer BTC to the following wallet add...",
      Date: "12-12-2018",
      TrusteeFee: "00.00",
      Status: "Submitted"
    },
    {
      WishType: "Payment",
      Description: "Transfer BTC to the following wallet add...",
      Date: "12-12-2018",
      TrusteeFee: "00.00",
      Status: "Submitted"
    }
  ];

  ngOnInit() {
    this.opts = {
      position: "right",
      barBackground: "#c2c7e3",
      gridBackground: "#f5f5f5",
      barWidth: "8"
    };
    this.owlOptions = {
      nav: true,
      slideBy: 2,
      navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
      ],
      margin: 0,
      responsive: {
        "0": { items: 1, margin: 0 },
        "575": { items: 2, margin: 0 },
        "767": { items: 2, margin: 0 },
        "991": { items: 3, margin: 0 },
        "1200": { items: 4, margin: 0 }
      }
    };
  }

  paginate(page) {
    console.log(page);
  }

}
