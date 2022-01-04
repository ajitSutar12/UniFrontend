import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { DashboardService } from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  application_id = 19201110000386
  dashboardDetails: any;
  success = new Array();
  unsccess = new Array();
  notPrinted = new Array();
  constructor(private router: Router, private _dashboard: DashboardService) {

    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);

    this._dashboard.getsuccessful(user.USER_ID).subscribe(data => {
      console.log(data);
      this.dashboardDetails = data;
      this.dashboardDetails.forEach(element => {
        if (element.STATUS_CODE == 0) {
          this.success.push(element);
        } else if (element.STATUS_CODE == 21) {
          this.unsccess.push(element)
        } else if (element.IS_PRINT != null) {
          this.notPrinted.push(element)
        }
      });
      console.log(this.success);
    })
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };



  }

  gotoPrint(value) {

    this.router.navigateByUrl('/Payment/Receipt', { state: value });
  }
  successfulRecord = {
    srno: 1,
    applicationno: 112311,
    applicationDate: 12 / 12 / 2020,
    amount: 100
  }
  getSuccessfulRecord(usercode) {
    this._dashboard.getsuccessful(usercode).subscribe(
      (data) => {
        console.log(data)
        this.successfulRecord = data
      },
      (error) => {
        console.log(error);
      })
  }

  unsuccessfulRecord = {
    srno: 1,
    applicationno: 112311,
    applicationDate: 12 / 12 / 2020,
    amount: 100
  }
  getUnSuccessfulRecord(usercode) {
    this._dashboard.getunsuccessful(usercode).subscribe(
      (data) => {
        console.log(data)
        this.unsuccessfulRecord = data
      },
      (error) => {
        console.log(error);
      })
  }
  successfulNotprint = {
    srno: 1,
    applicationno: 112311,
    applicationDate: 12 / 12 / 2020,
    amount: 100
  }
  getSuccessfulnotprintRecord(usercode) {
    this._dashboard.getsuccessfulnotprint(usercode).subscribe(
      (data) => {
        console.log(data)
        this.successfulNotprint = data
      },
      (error) => {
        console.log(error);
      })
  }

}
