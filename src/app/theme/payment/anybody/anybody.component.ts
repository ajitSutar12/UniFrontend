import { AfterViewInit, Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgSelectConfig } from '@ng-select/ng-select';
import Swal from 'sweetalert2';
import { AnybodyService } from '../anybodypayment/anybodypayment.service'
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentpaymentService } from '../studentpayment/studentpayment.service';
import { environment } from '../../../../environments/environment'
@Component({
  selector: 'app-anybody',
  templateUrl: './anybody.component.html',
  styleUrls: ['./anybody.component.scss']
})
export class AnybodyComponent implements OnInit, AfterViewInit {
  routerPathID: any;
  url = environment.base_url;
  // Created Form Group
  angForm: FormGroup;
  isPageLoad = 0;
  bankCode
  purpose = []
  ngParticular: any = null
  selectPurpose: any = null
  selectDepartment: any = null
  selectChallan: any = null
  selectedBank: any = null
  showSaveasDraft: boolean = true;
  showSaveAsProcess: boolean = true;
  showProccedToPay: boolean = false;
  datemax: string;
  applicationDate: string;
  pageloadStatus = 0;
  anyoneDescriptionDetails: any
  studentDescriptionDetails: any;
  noDataFound: boolean = false
  totalAmount: any = 0
  bankDetails: any = null
  constructor(private fb: FormBuilder, private router: Router, private config: NgSelectConfig, private _anybody: AnybodyService, private _student: StudentpaymentService, private http: HttpClient, private elementRef: ElementRef, private route: ActivatedRoute) {
    this.datemax = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2);
    this.routerPathID = this.route.snapshot.paramMap.get('id');
    if (this.routerPathID > 4) {
      this.showSaveasDraft = false;
      this.showSaveAsProcess = false;
      this.showProccedToPay = true;
    }
  }
  ngOnInit(): void {
    this.applicationDate = moment().format('YYYY-MM-DD')
    this.createForm();
    this._anybody.getPurposeData().subscribe(data => {
      this.purpose = data
    })
    // Bank details master
    this._student.getBankCodeDetails().subscribe(data => {
      this.bankDetails = data;
      if (this.routerPathID > 0) {
        this.selectedBank = this.bankCode
      }
      else {
        this.selectedBank = null
      }
    })
  }
  //disabledate on keyup
  disabledate(data: any) {
    if (data != "") {
      if (data > this.datemax) {
        Swal.fire("Invalid Input", "Please insert valid date ", "warning");
        (document.getElementById("Application_Date") as HTMLInputElement).value = ""
      }
    }
  }

  createForm() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.angForm = this.fb.group({
      Application_Date: ['', [Validators.required]],
      Received_From: [user.NAME, [Validators.required]],
      Exam: [null],
      Select_Department: [''],
      Challan_Structure: [''],
      Total_Amount: [''],
      Enter_Particular: ['', [Validators.pattern]],
      purpose: ['', [Validators.required]],
      bank_code: ['']
    });
    this.angForm.controls['Received_From'].enable()
    this.angForm.controls['purpose'].enable()
    this.angForm.controls['Select_Department'].enable()
    this.angForm.controls['Challan_Structure'].enable()
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
    if (this.routerPathID > 0) {
      this.isPageLoad = 1;
      this._anybody.getInvoiceDetails(this.routerPathID).subscribe(data => {
        let TotalAmt = 0;
        this.anyoneDescriptionDetails = data.details;
        this.anyoneDescriptionDetails.forEach(element => {
          TotalAmt = TotalAmt + Number(element.AMOUNT)
        });
        this.totalAmount = TotalAmt.toFixed(2);
        this.noDataFound = false;
        this.angForm.patchValue({
          'Enter_Particular': null,
          'bank_code': null
        })
      });
      this.angForm.controls['Received_From'].enable()
      this.angForm.controls['purpose'].disable()
      this.angForm.controls['Select_Department'].disable()
      this.angForm.controls['Challan_Structure'].disable()
    }
  }
  BOIMsg
  IsShowBOImsg = false
  getBank() {
    if (this.selectedBank == 102) {
      this.IsShowBOImsg = true
      this.BOIMsg = 'Note: Transaction fee is applicable for BOI payment gateway'
    }
    else {
      this.IsShowBOImsg = false
      this.BOIMsg = ''
    }
  }
  updatepay() {
    if (Number(this.totalAmount) <= 0) {
      Swal.fire("Info!", "Please Input Proper Amount !", "info");
    }
    else if (this.selectedBank == null) {
      Swal.fire("Info!", "Please Select Bank !", "info");
    }
    else {
      let CRN = this.routerPathID;
      var userData = JSON.parse(localStorage.getItem('user'));
      let userName = userData.USER_ID + '/' + userData.NAME
      let uname = userName.substring(0, 74)
      var date = moment().format('DD-MM-YYYY');
      if (this.selectedBank == '103') {
        let obj = {
          tranNo: CRN,
          amt: this.totalAmount,
          name: userData.NAME,
          mobile: userData.CELL_NO,
          email: userData.EMAIL_ID,
          userid: userData.USER_ID
        }
        //Dispatch an event
        var evt = new CustomEvent("billdesk", { detail: obj });
        window.dispatchEvent(evt);
      }
      else if (this.selectedBank == '104') {
        let data = {
          txnid: CRN + '',
          amount: Number(this.totalAmount).toFixed(2),
          name: userData.NAME,
          email: userData.EMAIL_ID,
          phone: userData.CELL_NO,
          productinfo: 'FeeColleection',
          surl: this.url + '/payment/easebuzz',
          furl: this.url + '/payment/easebuzz',
          udf1: userData.USER_ID,
          udf2: '',
          udf3: '',
          udf4: '',
          udf5: '',
          address1: '',
          address2: '',
          city: '',
          state: '',
          country: '',
          zipcode: '',
          // sub_merchant_id: '',
          // unique_id: CRN,
          // split_payments: '',
          // customer_authentication_id: '',
          udf6: '',
          udf7: '',
          udf8: '',
          udf9: '',
          udf10: ''
        }
        console.log(data)
        this._anybody.easebuzz(data).subscribe(data1 => {
          window.open(data1.url, "_self");
        })
      }
      else if (this.selectedBank == '102') {
        let obj = {
          crn: CRN,
          amt: this.totalAmount,
          name: userData.NAME,
          mobile: userData.CELL_NO,
          email: userData.EMAIL_ID,
          userid: userData.USER_ID
        }
        this._anybody.boipaymentGetway(obj).subscribe(data => {
          window.open(data.msg, "_self");
        })
      }
      else {
        // let ppi = userData.NAME + '|' + date + '|' + userData.CELL_NO + '|' + userData.EMAIL_ID + '|' + this.totalAmount;
        // window.open('http://localhost/PHP_Algo/Formdata.php?ppi=' + ppi + '&CRN=' + CRN + '&Amt=' + this.totalAmount + '&user_id=' + userData.USER_ID, "_self");

        let ppi = CRN + '|' + CRN + '|' + uname + '|' + userData.CELL_NO + '|' + userData.EMAIL_ID + '|' + '-' + '|' + '-' + '|' + this.totalAmount + '|' + CRN + '|' + CRN + '|' + this.totalAmount;
        window.open('http://210.212.172.137/PHP_Algo/Formdata.php?ppi=' + ppi + '&CRN=' + CRN + '&Amt=' + this.totalAmount + '&user_id=' + userData.USER_ID, "_self");
      }
      this.router.navigateByUrl('/dashboard');

    }
  }
}
