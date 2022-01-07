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
  dashboardDetails: any;
  success = new Array();
  unsccess = new Array();
  notPrinted = new Array();
  constructor(private router: Router, private _dashboard: DashboardService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    this._dashboard.getsuccessful(user.USER_ID).subscribe(data => {
      console.log(data);
      this.dashboardDetails = data;
      this.dashboardDetails.forEach(element => {
        if (element.STATUS_CODE == 0) {
          element['TRAN_DATE'] = element.TRAN_DATE.substring(6, 8) + "/" + element.TRAN_DATE.substring(4, 6) + "/" + element.TRAN_DATE.substring(0, 4)
          this.success.push(element);
        } else if (element.STATUS_CODE == 21) {
          this.unsccess.push(element)
        } else if (element.IS_PRINT != null) {
          this.notPrinted.push(element)
        }
      });
    })
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  gotoPrint(value) {
    this.router.navigateByUrl('/Payment/Receipt', { state: value });
  }

}
