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

  constructor(private router: Router, private _dashboard: DashboardService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  gotoPrint(value) {

    this.router.navigateByUrl('/Payment/Receipt', { state: value });
  }
  successfulRecord
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

  unsuccessfulRecord
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
  successfulNotprint
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
