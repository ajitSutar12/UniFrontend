import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgSelectConfig } from '@ng-select/ng-select';
import Swal from 'sweetalert2';
import { StudentpaymentService } from './studentpayment.service'
import { concat, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';
import { every } from 'rxjs-compat/operator/every';

@Component({
  selector: 'app-studentpayment',
  templateUrl: './studentpayment.component.html',
  styleUrls: ['./studentpayment.component.scss']
})
export class StudentpaymentComponent implements OnInit {
  url = environment.base_url;

  Department: Observable<any>;
  DepartmentLoading = false;
  DepartmentInput = new Subject<string>();
  selectDepartment: any;
  minLengthTerm = 2;

  Challan: Observable<any>;
  ChallanLoading = false;
  ChallanInput = new Subject<string>();
  selectChallan: any;

  Purpose: Observable<any>;
  PurposeLoading = false;
  PurposeInput = new Subject<string>();
  selectPurpose: any;
  hideColumn: boolean = true;

  selectedBank: any;

  stringArray: any = [];

  singleSelect: any = [];
  applicationDate: any;
  bankDetails: any;

  // Created Form Group
  angForm: FormGroup;
  datemax: string;
  // constructor(private fb: FormBuilder,) { }
  constructor(private fb: FormBuilder, private config: NgSelectConfig, private _student: StudentpaymentService, private http: HttpClient) {
    this.datemax = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2);
  }


  //dropdown bind
  trackByFn(item: any) {
    return item.imdbID;
  }

  loadDepartment() {
    this.Department = concat(
      of([]), // default items
      this.DepartmentInput.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.DepartmentLoading = true),
        switchMap(term => {
          return this.getDepartment(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => this.DepartmentLoading = false)
          )
        })
      )
    );

  }

  getDepartment(term: string = null): Observable<any> {
    return this.http
      .get<any>(this.url + '/payment/department' + term)
      .pipe(map(resp => {
        if (resp.Error) {
          throwError(resp.Error);
        } else {
          return resp;
        }
      })
      );
  }

  loadChallan() {
    this.Challan = concat(
      of([]), // default items
      this.ChallanInput.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.ChallanLoading = true),
        switchMap(term => {
          return this.getChallan(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => this.ChallanLoading = false)
          )
        })
      )
    );
  }

  getChallan(term: string = null): Observable<any> {
    return this.http
      .get<any>(this.url + '/payment/challan' + term)
      .pipe(map(resp => {
        if (resp.Error) {
          throwError(resp.Error);
        } else {
          return resp;
        }
      })
      );
  }

  loadPurpose() {
    this.Purpose = concat(
      of([]), // default items
      this.PurposeInput.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.PurposeLoading = true),
        switchMap(term => {
          return this.getPurpose(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => this.PurposeLoading = false)
          )
        })
      )
    );
  }

  getPurpose(term: string = null): Observable<any> {
    return this.http
      .get<any>(this.url + '/payment/purpose' + term)
      .pipe(map(resp => {
        if (resp.Error) {
          throwError(resp.Error);
        } else {
          return resp;
        }
      })
      );
  }

  isTutionFee: boolean = false
  getChallanDropdown(event) {
    console.log('event in getchalln', event)
    if (event == 104) {
      this.hideColumn = true;
      this.isTutionFee = true
    }
    else {
      let TotalAmt = 0;
      this.hideColumn = false;
      this._student.StudentTableListViaDept(event).subscribe(data => {
        this.studentDescriptionDetails = data;
        this.studentDescriptionDetails.forEach(element => {
          TotalAmt = TotalAmt + Number(element.AMOUNT)
        });
        this.totalAmount = TotalAmt
      })
      this.isTutionFee = false

      console.log('in getchallan amount', this.totalAmount)
    }
  }

  challanlist = new Array();
  getDepartmentCode(term: string = null) {
    this._student.getChallandata(term).subscribe(data => {
      this.challanlist = data
    })
  }

  ngAfterViewInit(): void {


    this._student.getPurposeData().subscribe(data => {
      this.Purpose = data
      this._student.getDepartmentData().subscribe(data => {
        this.Department = data
      })
    })
  }



  ngOnInit(): void {
    this.createForm();
    this.applicationDate = moment().format('YYYY-MM-DD');
    this._student.getDepartmentData().subscribe(data => {
      this.Department = data
    })

    //Bank details master
    this._student.getBankCodeDetails().subscribe(data => {
      this.bankDetails = data;
    })

    this._student.getPurposeData().subscribe(data => {
      this.Purpose = data
    })
  }
  dropdownOptions = [
    1, 2
  ]
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
      Examination: ['', [Validators.required]],
      Select_Department: ['Select Department', [Validators.required]],
      Challan_Structure: ['', [Validators.required]],
      Total_Amount: [''],
      Enter_Particular: ['', [Validators.required]],
      purpose: ['', [Validators.required]],
      bank_code: ['']
    });
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
      'bank_code': formVal.bank_code
    }
    this._student.postData(dataToSend).subscribe(
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

  pay() {
    this._student.pay().subscribe(data => {
      console.log(data);
      window.open(data.msg)
    }, err => {
      console.log(err);
    })
  }
  studentDescriptionDetails: any;
  totalAmount: any = 0
  getStudentTableDetails(ele) {
    debugger
    let TotalAmt = 0;
    this._student.StudentTableList(ele).subscribe(data => {
      this.studentDescriptionDetails = data;
      console.log('getstudtable', data)
      this.studentDescriptionDetails.forEach(element => {
        TotalAmt = TotalAmt + Number(element.AMOUNT)
      });
      this.totalAmount = TotalAmt;
    })

  }

  ///when change amount this time call below function
  changeAmt(ele, index) {
    let TotalAmt = 0;
    let amount = ele.target.value;
    this.studentDescriptionDetails[index].AMOUNT = amount;
    this.studentDescriptionDetails.forEach(element => {
      TotalAmt = TotalAmt + Number(element.AMOUNT)
    });
    this.totalAmount = TotalAmt
  }

  saveAsDraft() {
    debugger
    const formVal = this.angForm.value;
    const dataToSend = {
      'Application_Date': formVal.Application_Date,
      'Received_From': formVal.Received_From,
      'Exam': formVal.Examination,
      'purpose': formVal.purpose,
      'Select_Department': formVal.Select_Department.ID,
      'Challan_Structure': formVal?.Challan_Structure.ID == "" ? "" : formVal?.Challan_Structure.ID,
      'Total_Amount': this.totalAmount,
      'Enter_Particular': formVal.Enter_Particular,
      'studentDescriptionDetails': this.studentDescriptionDetails,
      'Dept_NAME': this.selectDepartment.NAME,
      'Challan_NAME': '',
      'Particular': formVal.Enter_Particular,
      'bank_code': formVal.bank_code
    }
    console.log('dataToSend', dataToSend)
    this._student.postData(dataToSend).subscribe(
      (data) => {

        Swal.fire("Success!", "Data Added Successfully !", "success");
        window.open('http://localhost/Axis_bank?')
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
