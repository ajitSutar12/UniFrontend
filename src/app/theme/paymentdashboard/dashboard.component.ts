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
  applicationId: number = 0
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    this._dashboard.getsuccessful(user.USER_ID).subscribe(data => {
      console.log(data);
      this.dashboardDetails = data;
      this.dashboardDetails.forEach(element => {
        if (element.STATUS_CODE == 0) {
          element['trandate'] = element.TRAN_DATE.substring(6, 8) + "/" + element.TRAN_DATE.substring(4, 6) + "/" + element.TRAN_DATE.substring(0, 4)
          let appId = element.TRAN_NO.toString()
          element['applicationId'] = appId.substring(0, 4) + "-" + appId.substring(7, 14)
          this.success.push(element);
        } else if (element.STATUS_CODE == 21) {
          element['trandate'] = element.TRAN_DATE.substring(6, 8) + "/" + element.TRAN_DATE.substring(4, 6) + "/" + element.TRAN_DATE.substring(0, 4)
          let appId = element.TRAN_NO.toString()
          element['applicationId'] = appId.substring(0, 4) + "-" + appId.substring(7, 14)
          this.unsccess.push(element)
        }
        if (element.IS_PRINTED == null && element.STATUS_CODE == 0) {
          element['trandate'] = element.TRAN_DATE.substring(6, 8) + "/" + element.TRAN_DATE.substring(4, 6) + "/" + element.TRAN_DATE.substring(0, 4)
          let appId = element.TRAN_NO.toString()
          element['applicationId'] = appId.substring(0, 4) + "-" + appId.substring(7, 14)
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
