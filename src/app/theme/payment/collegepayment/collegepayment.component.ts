import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { CollegepaymentService } from './collegepayment.service'
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
  selector: 'app-collegepayment',
  templateUrl: './collegepayment.component.html',
  styleUrls: ['./collegepayment.component.scss']
})
export class CollegepaymentComponent implements OnInit {
  //envirnoment variable
  url = environment.base_url;
  // dropdown variables
  Department = []
  purpose = []
  selectDepartment
  selectPurpose
  selectChallan
  //Budget table variable
  studentDescriptionDetails: any;
  // Created Form Group
  angForm: FormGroup;
  //application date variables
  datemax: string;
  applicationDate: string;

  constructor(private fb: FormBuilder, private _college: CollegepaymentService) {
    this.datemax = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2);
  }

  ngOnInit(): void {
    this.createForm();
    this.applicationDate = moment().format('YYYY-MM-DD');
    this._college.getPurposeData().subscribe(data => {
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
      Examination: ['', [Validators.required, Validators.pattern]],
      Select_Department: ['',],
      Challan_Structure: ['',],
      Total_Amount: [''],
      Enter_Particular: ['', [Validators.required]],
      purpose: ['', [Validators.required]]
    });
  }

  //load budget table based on purpose code
  getCollegeTableDetails(event) {
    this._college.collegeTableListViaDept(event).subscribe(data => {
      this.studentDescriptionDetails = data;
    })
  }

  //method for save and draft 
  saveAsDraft() {
    const formVal = this.angForm.value;
    const dataToSend = {
      'Application_Date': formVal.Application_Date,
      'Received_From': formVal.Received_From,
      'Exam': formVal.Examination,
      'purpose': formVal.purpose,
      'Select_Department': formVal.Select_Department.ID,
      'Challan_Structure': formVal.Challan_Structure.ID,
      'Total_Amount': formVal.Total_Amount,
      'studentDescriptionDetails': this.studentDescriptionDetails,
      'Dept_NAME': '',
      'Challan_NAME': '',
      'Particular': formVal.Enter_Particular
    }
    this._college.postData(dataToSend).subscribe(
      (data) => {
        Swal.fire("Success!", "Data Added Successfully !", "success");
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //method for save and proceed
  submit() {
    const formVal = this.angForm.value;
    const dataToSend = {
      'Application_Date': formVal.Application_Date,
      'Received_From': formVal.Received_From,
      'Exam': formVal.Examination,
      'purpose': formVal.purpose,
      'Select_Department': formVal.Select_Department.ID,
      'Challan_Structure': formVal.Challan_Structure.ID,
      'Total_Amount': formVal.Total_Amount,
      'studentDescriptionDetails': this.studentDescriptionDetails,
      'Dept_NAME': '',
      'Challan_NAME': '',
      'Particular': formVal.Enter_Particular
    }
    this._college.postData(dataToSend).subscribe(
      (data) => {
        Swal.fire("Success!", "Data Added Successfully !", "success");
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Reset Function
  resetForm() {
    this.createForm();
  }
}
