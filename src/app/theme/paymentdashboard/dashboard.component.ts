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
  application_id

  constructor(private router: Router,private _dashboard :DashboardService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  gotoPrint(value) {
    this.router.navigateByUrl('/Payment/Receipt', { state: value });
  }

  getSuccessfulRecord(usercode){
    this._dashboard.getsuccessful(usercode).subscribe(
      (data) => {
       console.log(data)
      },
      (error) => {
        console.log(error);
      })
  }
  getUnSuccessfulRecord(usercode){
    this._dashboard.getunsuccessful(usercode).subscribe(
      (data) => {
       console.log(data)
      },
      (error) => {
        console.log(error);
      })
  }
  getSuccessfulnotprintRecord(usercode){
    this._dashboard.getsuccessfulnotprint(usercode).subscribe(
      (data) => {
       console.log(data)
      },
      (error) => {
        console.log(error);
      })
  }

}
