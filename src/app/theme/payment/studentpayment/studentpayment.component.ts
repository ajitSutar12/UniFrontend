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
import { Router } from '@angular/router';

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
  selectDepartment: any = null
  minLengthTerm = 2;

  Challan: Observable<any>;
  ChallanLoading = false;
  ChallanInput = new Subject<string>();
  selectChallan: any = null

  Purpose: Observable<any>;
  PurposeLoading = false;
  PurposeInput = new Subject<string>();
  selectPurpose: any = null
  hideColumn: boolean = true;

  selectedBank: any = null

  stringArray: any = [];

  singleSelect: any = [];
  applicationDate: any;
  bankDetails: any;

  // Created Form Group
  angForm: FormGroup;
  datemax: string;
  // constructor(private fb: FormBuilder,) { }
  constructor(private fb: FormBuilder, private router: Router, private config: NgSelectConfig, private _student: StudentpaymentService, private http: HttpClient) {
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
    this.selectChallan = null
    this._student.getChallandata(term).subscribe(data => {
      this.challanlist = data
      console.log(this.challanlist)
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
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('stud payment', user)
    this.createForm();
    this.applicationDate = moment().format('YYYY-MM-DD');
    this._student.getDepartmentData().subscribe(data => {
      this.Department = data
    })
    this._student.getPurposeData().subscribe(data => {
      this.Purpose = data
      this._student.getBankCodeDetails().subscribe(data => {
        this.bankDetails = data;
        this.selectedBank = data[0].ID
      })
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
    const user = JSON.parse(localStorage.getItem('user'));
    this.angForm = this.fb.group({
      Application_Date: ['', [Validators.required]],
      Received_From: [user.NAME, [Validators.required]],
      Examination: [null],
      Select_Department: ['',],
      Challan_Structure: ['',],
      Total_Amount: [''],
      Enter_Particular: ['', [Validators.pattern]],
      purpose: ['', [Validators.required]],
      bank_code: ['']
    });
  }

  submit() {
    const formVal = this.angForm.value;
    const user = JSON.parse(localStorage.getItem('user'));
    const dataToSend = {
      'Application_Date': formVal.Application_Date,
      'Received_From': formVal.Received_From,
      'Exam': formVal.Exam,
      'Select_Department': formVal.Select_Department,
      'Challan_Structure': formVal.Challan_Structure,
      'Total_Amount': formVal.Total_Amount,
      'Enter_Particular': formVal.Enter_Particular,
      'bank_code': formVal.bank_code,
      'user_id': user.USER_ID,
      'user_name': user.USER_NAME
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
    debugger
    if (this.angForm.valid) {
      const formVal = this.angForm.value;
      const user = JSON.parse(localStorage.getItem('user'));
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
        'Dept_NAME': this.selectDepartment?.NAME == "" ? "" : this.selectDepartment?.NAME,
        'Challan_NAME': this.selectChallan?.NAME == "" ? "" : this.selectChallan?.NAME,
        'Particular': formVal.Enter_Particular,
        'bank_code': formVal.bank_code,
        'fees_code': this?.chalanID == "" ? "" : this?.chalanID,
        'user_id': user.USER_ID,
        'user_name': user.USER_NAME
      }
      this._student.postData(dataToSend).subscribe(
        (data) => {
          Swal.fire("Success!", "Data Added Successfully !", "success");
          var userData = JSON.parse(localStorage.getItem('user'));
          var date = moment().format('DD-MM-YYYY');
          // let ppi = userData.NAME + '|' + date + '|' + userData.CELL_NO + '|' + userData.EMAIL_ID + '|' + this.totalAmount;
          let CRN = data;

          let ppi = CRN + '|' + CRN + '|' + userData.NAME + '|' + userData.CELL_NO + '|' + userData.EMAIL_ID + '|' + '-' + '|' + '-' + '|' + formVal.Enter_Particular + '|' + CRN + '|' + CRN + '|' + this.totalAmount;

          window.open('http://210.212.190.40/PHP_Algo/Formdata.php?ppi=' + ppi + '&CRN=' + CRN + '&Amt=' + this.totalAmount + '&user_id=' + userData.USER_ID);
          // window.open('http://localhost/PHP_Algo/Formdata.php?ppi=' + ppi + '&CRN=' + CRN + '&Amt=' + this.totalAmount + '&user_id=' + userData.USER_ID);

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
  studentDescriptionDetails: any;
  totalAmount: any = 0
  chalanID: any
  getStudentTableDetails(ele) {

    this.chalanID = ele
    console.log(ele.id, "chalan")
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
      'Dept_NAME': this.selectDepartment?.NAME == "" ? "" : this.selectDepartment?.NAME,
      'Challan_NAME': this.selectChallan?.NAME == "" ? "" : this.selectChallan?.NAME,
      'Particular': formVal.Enter_Particular,
      'bank_code': formVal.bank_code,
      'fees_code': this?.chalanID == "" ? "" : this?.chalanID
    }
    console.log('dataToSend', dataToSend)

    this._student.postData(dataToSend).subscribe(
      (data => {

        console.log('save data', data)
        Swal.fire("Success!", "Data Added Successfully !", "success");
        window.open('http://localhost/Axis_bank?')
      }),
      (error) => {
        console.log(error);
      }
    );
  }
}
