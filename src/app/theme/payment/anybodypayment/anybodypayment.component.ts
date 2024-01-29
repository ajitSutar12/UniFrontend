import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from "@angular/forms";
import { NgSelectConfig } from '@ng-select/ng-select';
import Swal from 'sweetalert2';
import { AnybodyService } from './anybodypayment.service'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import * as moment from 'moment';
import { StudentpaymentService } from '../studentpayment/studentpayment.service';
import { ActivatedRoute, Router } from '@angular/router';


interface AnybodyInterface {
  Application_Date: Date;
  Received_From: String;
  Exam: String,
  Select_Department: string
  Challan_Structure: string
  Total_Amount: number
  Enter_Particular: string,
}
@Component({
  selector: 'app-anybodypayment',
  templateUrl: './anybodypayment.component.html',
  styleUrls: ['./anybodypayment.component.scss']
})

export class AnybodypaymentComponent implements OnInit, AfterViewInit {

  url = environment.base_url;
  purpose = []
  selectPurpose: any = null
  selectDepartment: any = null
  selectChallan: any = null
  selectedBank: any = null
  bankDetails: any = null
  anyoneDescriptionDetails: any
  studentDescriptionDetails: any;
  totalAmount: any = 0
  chalanID = null;
  noDataFound: boolean = false
  // Created Form Group
  angForm: FormGroup;
  datemax: string;
  applicationDate: string;
  routerPathID: any;
  showSaveasDraft: boolean = true;
  showSaveAsProcess: boolean = true;
  showProccedToPay: boolean = false;

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
        // this.selectedBank = data[0].ID
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


  getAnyoneTableDetails(event) {

    // if (this.isPageLoad == 1) {
    //   // return 0;
    // }

    if (this.routerPathID == 0) {

      this._anybody.anyoneTableListViaDept(event).subscribe(data => {

        if (data.length == 0) {
          this.noDataFound = true
          this.anyoneDescriptionDetails = []
          this.totalAmount = 0
        }
        else {
          this.noDataFound = false
          this.anyoneDescriptionDetails = data;
          let TotalAmt = 0;
          this.anyoneDescriptionDetails.forEach(element => {
            TotalAmt = TotalAmt + Number(element.AMOUNT)
          });
          this.totalAmount = TotalAmt
        }
      })
    }
  }

  submit() {
    const formVal = this.angForm.value;
    const dataToSend = {
      'Application_Date': formVal.Application_Date,
      'Received_From': formVal.Received_From,
      'Exam': formVal.Exam,
      'Select_Department': formVal.Select_Department,
      'Challan_Structure': formVal.Challan_Structure,
      'Total_Amount': formVal.Total_Amount,
      'Enter_Particular': formVal.Enter_Particular,
    }
    this._anybody.postData(dataToSend).subscribe(
      (data) => {
        Swal.fire("Success!", "Data Added Successfully !", "success");
      },
      (error) => {
        console.log(error);
      }
    );
    //To clear form
    this.resetForm();
  }

  // Reset Function
  resetForm() {
    this.createForm();
  }
  isPageLoad = 0;
  bankCode
  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
    if (this.routerPathID > 0) {
      this.isPageLoad = 1;
      this._anybody.getStudentDraftData(this.routerPathID).subscribe(data => {

        let TotalAmt = 0;
        this.selectPurpose = data.main[0].PURPOSE_CODE;
        this.selectDepartment = data.main[0].DEPT_NAME;
        this.selectChallan = data.main[0].SUB_GLACNO;
        this.anyoneDescriptionDetails = data.details;
        this.anyoneDescriptionDetails.forEach(element => {
          TotalAmt = TotalAmt + Number(element.AMOUNT)
        });
        this.totalAmount = TotalAmt.toFixed(2);
        this.noDataFound = false;
        this.angForm.patchValue({
          'Enter_Particular': data.main[0].REMARK,
          'bank_code': data.main[0].BANK_CODE
        })
        this.selectedBank = data.main[0].BANK_CODE
        this.bankCode = data.main[0].BANK_CODE
      });
      this.angForm.controls['Received_From'].enable()
      this.angForm.controls['purpose'].disable()
      this.angForm.controls['Select_Department'].disable()
      this.angForm.controls['Challan_Structure'].disable()
    }
  }


  changeAmt(ele, index) {
    let TotalAmt = 0;
    let amount = ele.target.value;
    this.anyoneDescriptionDetails[index].AMOUNT = amount;
    this.anyoneDescriptionDetails.forEach(element => {
      TotalAmt = TotalAmt + Number(element.AMOUNT)
    });
    this.totalAmount = TotalAmt
  }


  saveAsDraft() {
    if (Number(this.totalAmount) <= 0) {
      Swal.fire("Info!", "Please Input Proper Amount !", "info");
    }
    else if (this.selectedBank == null) {
      Swal.fire("Info!", "Please Select Bank !", "info");
    }
    else {
      const formVal = this.angForm.value;
      let collegeCode = JSON.parse(localStorage.getItem('user'))
      const dataToSend = {
        'Application_Date': formVal.Application_Date,
        'Received_From': formVal.Received_From,
        'Exam': formVal.Exam,
        'purpose': formVal.purpose,
        'Select_Department': formVal.Select_Department.ID,
        'Challan_Structure': formVal?.Challan_Structure.ID == "" ? "" : formVal?.Challan_Structure.ID,
        'Total_Amount': this.totalAmount,
        'Enter_Particular': formVal.Enter_Particular,
        'studentDescriptionDetails': this.anyoneDescriptionDetails,
        'Dept_NAME': this.selectDepartment?.NAME == "" ? "" : this.selectDepartment?.NAME,
        'Challan_NAME': this.selectChallan?.NAME == "" ? "" : this.selectChallan?.NAME,
        'Particular': formVal.Enter_Particular,
        'bank_code': formVal.bank_code,
        'fees_code': this.chalanID == "" ? null : this.chalanID,
        'user_id': collegeCode.USER_ID,
        'user_name': collegeCode.USER_NAME
      }
      this._anybody.postData(dataToSend).subscribe(
        (data) => {
          if (data > 0) {
            Swal.fire("Success!", "Data Added Successfully !", "success");
            this.router.navigateByUrl('/dashboard');
          }
          else {
            Swal.fire('Error!', data.message, 'error');
            this.router.navigateByUrl('/dashboard');
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  pay() {
    if (Number(this.totalAmount) <= 0) {
      Swal.fire("Info!", "Please Input Proper Amount !", "info");
    }
    else if (this.selectedBank == null) {
      Swal.fire("Info!", "Please Select Bank !", "info");
    }
    else {
      const formVal = this.angForm.value;
      let collegeCode = JSON.parse(localStorage.getItem('user'))
      const dataToSend = {
        'Application_Date': formVal.Application_Date,
        'Received_From': formVal.Received_From,
        'Exam': formVal.Exam,
        'purpose': formVal.purpose,
        'Select_Department': formVal.Select_Department.ID,
        'Challan_Structure': formVal?.Challan_Structure.ID == "" ? "" : formVal?.Challan_Structure.ID,
        'Total_Amount': this.totalAmount,
        'Enter_Particular': formVal.Enter_Particular,
        'studentDescriptionDetails': this.anyoneDescriptionDetails,
        'Dept_NAME': this.selectDepartment?.NAME == "" ? "" : this.selectDepartment?.NAME,
        'Challan_NAME': this.selectChallan?.NAME == "" ? "" : this.selectChallan?.NAME,
        'Particular': formVal.Enter_Particular,
        'bank_code': formVal.bank_code,
        'fees_code': this.chalanID == "" ? null : this.chalanID,
        'user_id': collegeCode.USER_ID,
        'user_name': collegeCode.USER_NAME
      }
      this._anybody.postData(dataToSend).subscribe(
        (data) => {
          // Swal.fire("Success!", "Data Added Successfully !", "success");
          var userData = JSON.parse(localStorage.getItem('user'));
          let userName = userData.USER_ID + '/' + userData.NAME
          let uname = userName.substring(0, 74)
          var date = moment().format('DD-MM-YYYY');
          let CRN = data;
          if (dataToSend.bank_code == '103') {
            let obj = {
              tranNo: CRN,
              amt: this.totalAmount,
              name: userData.NAME,
              mobile: userData.CELL_NO,
              email: userData.EMAIL_ID
            }
            //Dispatch an event
            var evt = new CustomEvent("billdesk", { detail: obj });
            window.dispatchEvent(evt);
          }
          else if (dataToSend.bank_code == '104') {
            let data = {
              txnid: CRN + '',
              amount: Number(this.totalAmount).toFixed(2),
              name: userData.NAME,
              email: userData.EMAIL_ID,
              phone: userData.CELL_NO,
              productinfo: 'FeeColleection',
              surl: this.url + '/payment/easebuzz',
              furl: this.url + '/payment/easebuzz',
              udf1: '',
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
            // console.log(data)
            this._anybody.easebuzz(data).subscribe(data1 => {
              window.open(data1.url, "_self");
            })
          }
          else if (dataToSend.bank_code == '102') {
            let obj = {
              crn: CRN,
              amt: this.totalAmount,
              name: userData.NAME,
              mobile: userData.CELL_NO,
              email: userData.EMAIL_ID
            }
            this._anybody.boipaymentGetway(obj).subscribe(data => {
              window.open(data.msg, "_self");
            })
          }
          else {

            let ppi = CRN + '|' + CRN + '|' + uname + '|' + userData.CELL_NO + '|' + userData.EMAIL_ID + '|' + '-' + '|' + '-' + '|' + 116 + '|' + CRN + '|' + CRN + '|' + this.totalAmount;
            window.open('http://210.212.172.137/PHP_Algo/Formdata.php?ppi=' + ppi + '&CRN=' + CRN + '&Amt=' + this.totalAmount + '&user_id=' + userData.USER_ID, '_self');

            // let ppi = userData.NAME + '|' + date + '|' + userData.CELL_NO + '|' + userData.EMAIL_ID + '|' + this.totalAmount;
            // window.open('http://localhost/PHP_Algo/Formdata.php?ppi=' + ppi + '&CRN=' + CRN + '&Amt=' + this.totalAmount + '&user_id=' + userData.USER_ID, '_self');
          }


          this.router.navigateByUrl('/dashboard');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  selectAllContent($event) {
    $event.target.select();
  }

  decimalAllContent($event) {
    let value = Number($event.target.value);
    let data = value.toFixed(2);
    $event.target.value = data;
  }

  updatepay() {
    if (Number(this.totalAmount) <= 0) {
      Swal.fire("Info!", "Please Input Proper Amount !", "info");
    }
    else if (this.selectedBank == null) {
      Swal.fire("Info!", "Please Select Bank !", "info");
    }
    else {
      let CRN = this.anyoneDescriptionDetails[0].TRAN_NO;
      let objOnline = {
        tran_no: CRN,
        amount: this.totalAmount,
        particular: this.angForm.controls['Enter_Particular'].value,
        tableArr: this.studentDescriptionDetails
      }
      this._student.updateStudentDetails(objOnline).subscribe(data => {
        // Swal.fire("Success!", "Data Added Successfully !", "success");
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
            email: userData.EMAIL_ID
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
            udf1: '',
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
            email: userData.EMAIL_ID
          }
          this._anybody.boipaymentGetway(obj).subscribe(data => {
            window.open(data.msg, "_self");
          })
        }
        else {
          // let ppi = userData.NAME + '|' + date + '|' + userData.CELL_NO + '|' + userData.EMAIL_ID + '|' + this.totalAmount;
          // window.open('http://localhost/PHP_Algo/Formdata.php?ppi=' + ppi + '&CRN=' + CRN + '&Amt=' + this.totalAmount + '&user_id=' + userData.USER_ID);

          let ppi = CRN + '|' + CRN + '|' + uname + '|' + userData.CELL_NO + '|' + userData.EMAIL_ID + '|' + '-' + '|' + '-' + '|' + this.totalAmount + '|' + CRN + '|' + CRN + '|' + this.totalAmount;
          window.open('http://210.212.172.137/PHP_Algo/Formdata.php?ppi=' + ppi + '&CRN=' + CRN + '&Amt=' + this.totalAmount + '&user_id=' + userData.USER_ID, "_self");
        }
        this.router.navigateByUrl('/dashboard');
      }, err => {

      })
    }
  }
  BOIMsg
  IsShowBOImsg = false
  getBank() {
    if (this.selectedBank == 102) {
      this.IsShowBOImsg = true
      this.BOIMsg = `Note: 1) Transaction fee is applicable for BOI payment gateway
                           2) For NEFT/Cash payments, a receipt will generate after 24 hours.`
    }
    else {
      this.IsShowBOImsg = false
      this.BOIMsg = ''
    }
  }
}
