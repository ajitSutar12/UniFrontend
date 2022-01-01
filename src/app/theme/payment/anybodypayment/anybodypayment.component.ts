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
  // Created Form Group
  angForm: FormGroup;
  datemax: string;
  applicationDate: string;
  constructor(private fb: FormBuilder, private config: NgSelectConfig, private _anybody: AnybodyService, private http: HttpClient, private elementRef: ElementRef) {
    this.datemax = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2);
  }

  ngOnInit(): void {
    this.applicationDate = moment().format('YYYY-MM-DD')
    this.createForm();
    this._anybody.getPurposeData().subscribe(data => {
      this.purpose = data
    })
  }
  //disabledate on keyup
  disabledate(data: any) {
    console.log(data);
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
      Select_Department: ['', [Validators.required]],
      Challan_Structure: ['', [Validators.required]],
      Total_Amount: [''],
      Enter_Particular: ['', [Validators.required]],
      purpose: ['', [Validators.required]]
    });
  }

  anyoneDescriptionDetails: any
  getAnyoneTableDetails(event) {
    this._anybody.anyoneTableListViaDept(event).subscribe(data => {
      this.anyoneDescriptionDetails = data;
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
        console.log("submit", data);
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

  ngAfterViewInit(){
    this.elementRef.nativeElement.focus();
}

}
