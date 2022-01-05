import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from "@angular/forms";
import { NgSelectConfig } from '@ng-select/ng-select';
import Swal from 'sweetalert2';
import { AnybodyService } from './anybodypayment.service'
import { concat, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import * as moment from 'moment';
import { StudentpaymentService } from '../studentpayment/studentpayment.service';
import { Router } from '@angular/router';

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
  selectPurpose
  selectedCar: number;
  selectedCar1: number;
  selectDepartment: any;
  selectChallan: any;
  cars1 = [
    { id: 1, name: 'Department 1' },
    { id: 2, name: 'Department 2' },
    { id: 3, name: 'Department 3' },
    { id: 4, name: 'Department 4' },
  ];
  cars = [
    { id: 1, name: 'Department 1' },
    { id: 2, name: 'Department 2' },
    { id: 3, name: 'Department 3' },
    { id: 4, name: 'Department 4' },
  ];

  selectedBank: any;
  bankDetails: any;
  // Created Form Group
  angForm: FormGroup;
  datemax: string;
  applicationDate: string;
  constructor(private fb: FormBuilder, private router: Router, private config: NgSelectConfig, private _anybody: AnybodyService, private _student: StudentpaymentService, private http: HttpClient, private elementRef: ElementRef) {
    this.datemax = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2);
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
    this.angForm = this.fb.group({
      Application_Date: ['', [Validators.required]],
      Received_From: ['', [Validators.required]],
      Exam: ['', [Validators.required, Validators.pattern]],
      Select_Department: [''],
      Challan_Structure: [''],
      Total_Amount: [''],
      Enter_Particular: ['', [Validators.required]],
      purpose: ['', [Validators.required]],
      bank_code: ['']
    });
  }

  anyoneDescriptionDetails: any

  getAnyoneTableDetails(event) {
    this._anybody.anyoneTableListViaDept(event).subscribe(data => {
      this.anyoneDescriptionDetails = data;
      let TotalAmt = 0;
      this.anyoneDescriptionDetails.forEach(element => {
        TotalAmt = TotalAmt + Number(element.AMOUNT)
      });
      this.totalAmount = TotalAmt
    })
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
        // this.custData = data1.id;
        // this.addNewCustomer(data.id);
        // to reload after insertion of data
        // this.rerender();
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

  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
  }
  studentDescriptionDetails: any;
  totalAmount: any = 0
  changeAmt(ele, index) {
    let TotalAmt = 0;
    let amount = ele.target.value;
    this.studentDescriptionDetails[index].AMOUNT = amount;
    this.studentDescriptionDetails.forEach(element => {
      TotalAmt = TotalAmt + Number(element.AMOUNT)
    });
    this.totalAmount = TotalAmt
  }
  chalanID = null;
  saveAsDraft() {
    
    const formVal = this.angForm.value;
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
    }
    console.log('dataToSend', dataToSend)
    this._anybody.postData(dataToSend).subscribe(
      (data) => {
        Swal.fire("Success!", "Data Added Successfully !", "success");
        var userData = JSON.parse(localStorage.getItem('user'));
        var date = moment().format('DD-MM-YYYY');
        let ppi = userData.NAME + '|' + date + '|' + userData.CELL_NO + '|' + userData.EMAIL_ID + '|' + this.totalAmount;
        let CRN = data;
        window.open('http://localhost/PHP_Algo/Formdata.php?ppi=' + ppi + '&CRN=' + CRN + '&Amt=' + this.totalAmount);
        this.router.navigateByUrl('/dashboard');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // saveAsDraft() {
  //   const formVal = this.angForm.value;
  //   const dataToSend = {
  //     'Application_Date': formVal.Application_Date,
  //     'Received_From': formVal.Received_From,
  //     'Exam': formVal.Examination,
  //     'purpose': formVal.purpose,
  //     'Select_Department': formVal.Select_Department.ID,
  //     'Challan_Structure': '',
  //     'Total_Amount': this.totalAmount,
  //     'Enter_Particular': formVal.Enter_Particular,
  //     'studentDescriptionDetails': this.anyoneDescriptionDetails,
  //     'Dept_NAME': '',
  //     'Challan_NAME': '',
  //     'Particular': formVal.Enter_Particular,
  //     'bank_code': formVal.bank_code
  //   }

  //     console.log('dataToSend', dataToSend)
  //     this._anybody.postData(dataToSend).subscribe(
  //       (data) => {

  //         Swal.fire("Success!", "Data Added Successfully !", "success");
  //         window.open('http://localhost/Axis_bank?')
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }


  pay() {
    this._anybody.pay().subscribe(data => {
      window.open(data.msg)
    }, err => {
      console.log(err);
    })
  }

}
