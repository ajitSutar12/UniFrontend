import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger1: Subject<any> = new Subject<any>();
  dashboardDetails: any;
  success = new Array();
  unsccess = new Array();
  notPrinted = new Array();
  invoiceList = new Array();
  showUnsuccessful: boolean = true;
  showStudentButton: boolean = false;
  showCollegeButton: boolean = false;
  showAnyButton: boolean = false;
  showPendingInvoice: boolean = false;
  userType: any;
  applicationId: number = 0
  constructor(private router: Router, private _dashboard: DashboardService) {
    const user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    this.userType = user.USER_TYPE;
    if (user.USER_TYPE == 0) {
      this.showCollegeButton = false;
      this.showAnyButton = false;
      this.showStudentButton = true;
    }
    if (user.USER_TYPE == 1) {
      this.showStudentButton = false;
      this.showCollegeButton = true;
      this.showAnyButton = false;
    }
    if (user.USER_TYPE == 2) {
      this.showStudentButton = false;
      this.showCollegeButton = false;
      this.showAnyButton = true;
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      dom: 'ftip'
    };
    this._dashboard.getsuccessful(user.USER_ID).subscribe(data => {
      this.dashboardDetails = data;
      this.dashboardDetails.forEach(element => {
        if (element.STATUS_CODE == 0) {
          element['trandate'] = element.TRAN_DATE.substring(6, 8) + "/" + element.TRAN_DATE.substring(4, 6) + "/" + element.TRAN_DATE.substring(0, 4)
          let appId = element.TRAN_NO.toString()
          appId.length >= 18 ? element['applicationId'] = this.formatNumberToCode(element.TRAN_NO) : element['applicationId'] = appId.substring(0, 4) + "-" + appId.substring(7, 14)
          this.success.push(element);

        } else if (element.STATUS_CODE == 21) {
          let today = moment(new Date()).format('YYYYMMDDhh:mm:ss');
          if (today < element.EXPIRE_DATE || element.EXPIRE_DATE == null) {
            element['trandate'] = element.TRAN_DATE.substring(6, 8) + "/" + element.TRAN_DATE.substring(4, 6) + "/" + element.TRAN_DATE.substring(0, 4)
            let appId = element.TRAN_NO.toString()
            appId.length >= 18 ? element['applicationId'] = this.formatNumberToCode(element.TRAN_NO) : element['applicationId'] = appId.substring(0, 4) + "-" + appId.substring(7, 14)
            this.unsccess.push(element)
          }
        }
        else if (element.STATUS_CODE == 31 || element.STATUS_CODE == 32) {
          element['trandate'] = element.TRAN_DATE.substring(6, 8) + "/" + element.TRAN_DATE.substring(4, 6) + "/" + element.TRAN_DATE.substring(0, 4)
          let appId = element.TRAN_NO.toString()
          appId.length >= 18 ? element['applicationId'] = this.formatNumberToCode(element.TRAN_NO) : element['applicationId'] = appId.substring(0, 4) + "-" + appId.substring(7, 14)
          this.unsccess.push(element)
        }
        if (element.IS_PRINTED == null && element.STATUS_CODE == 0) {
          element['trandate'] = element.TRAN_DATE.substring(6, 8) + "/" + element.TRAN_DATE.substring(4, 6) + "/" + element.TRAN_DATE.substring(0, 4)
          let appId = element.TRAN_NO.toString()
          appId.length >= 18 ? element['applicationId'] = this.formatNumberToCode(element.TRAN_NO) : element['applicationId'] = appId.substring(0, 4) + "-" + appId.substring(7, 14)
          this.notPrinted.push(element)
        }
      });
      this.dtTrigger.next();
    })

  }

  gotoPrint(value) {
    this.router.navigateByUrl('/Payment/receipt', { state: value });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    // this.dtTrigger1.unsubscribe();
  }
  showInvoiceList() {
    this._dashboard.invoiceList().subscribe(data1 => {
      // if (this.showUnsuccessful = false)
      //   this.dtTrigger1.unsubscribe();
      for (let element of data1) {
        element['TRANFORMAT_NO'] = this.formatNumberToCode(element.TRAN_NO)
        element['TRANDATE'] = element.TRAN_DATE.substring(6, 8) + "/" + element.TRAN_DATE.substring(4, 6) + "/" + element.TRAN_DATE.substring(0, 4)
      }
      this.invoiceList = data1
      this.dtTrigger1.next();
    })
    this.showPendingInvoice = true
    // this.showUnsuccessful = false
  }
  showUnsuccess() {
    this.showPendingInvoice = false
    this.showUnsuccessful = true
  }


  formatNumberToCode(number) {
    // Convert the number to a string
    let numberStr = number.toString();
    // Extract the parts of the number
    let prefix = numberStr.slice(2, 6);
    let middle = numberStr.slice(11, 18);
    // Construct the formatted code
    let formattedCode = `SUK/${prefix}/${middle.padStart(6, '0')}`;
    return formattedCode;
  }

}
