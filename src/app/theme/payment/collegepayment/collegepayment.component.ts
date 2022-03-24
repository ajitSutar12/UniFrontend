import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { CollegepaymentService } from './collegepayment.service'
import { environment } from '../../../../environments/environment'
import * as moment from 'moment';
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
  bankDetails = []
  selectDepartment: any = null
  selectPurpose: any = null
  selectChallan: any = null
  chalanID = null;
  selectedBank: any;
  totalAmount: any = 0
  noDataFound: boolean = false
  //Budget table variable
  studentDescriptionDetails: any;
  // Created Form Group
  angForm: FormGroup;
  //application date variables
  datemax: string;
  applicationDate: string;
  routerPathID: any;
  showSaveasDraft: boolean = true;
  showSaveAsProcess: boolean = true;
  showProccedToPay: boolean = false;


  constructor(private fb: FormBuilder, private _college: CollegepaymentService, private router: Router, private route: ActivatedRoute) {
    this.datemax = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2);
    this.routerPathID = this.route.snapshot.paramMap.get('id');
    if (this.routerPathID > 4) {
      this.showSaveasDraft = false;
      this.showSaveAsProcess = false;
      this.showProccedToPay = true;
    }
  }

  ngOnInit(): void {
    this.createForm();
    this.applicationDate = moment().format('YYYY-MM-DD');
    this._college.getPurposeData().subscribe(data => {
      this.purpose = data
    })
    //Bank details master
    this._college.getBankCodeDetails().subscribe(data => {
      this.bankDetails = data;
      this.selectedBank = data[0].ID
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
    const userData = JSON.parse(localStorage.getItem('user'));
    this.angForm = this.fb.group({
      Application_Date: ['', [Validators.required]],
      Received_From: [userData.NAME, [Validators.required]],
      Examination: [null],
      Select_Department: ['',],
      Challan_Structure: ['',],
      Total_Amount: [''],
      Enter_Particular: ['', [Validators.pattern]],
      purpose: ['', [Validators.required]],
      bank_code: ['']
    });
  }

  //load budget table based on purpose code
  getCollegeTableDetails(event) {
    let TotalAmt = 0
    if (this.isPageLoad == 1) {
      // return 0;
    }
    this._college.collegeTableListViaDept(event).subscribe(data => {
      if (data.length == 0) {
        this.noDataFound = true
        this.studentDescriptionDetails = []
        this.totalAmount = 0
      }
      else {
        this.noDataFound = false
        this.studentDescriptionDetails = data;
        this.studentDescriptionDetails.forEach(element => {
          TotalAmt = TotalAmt + Number(element.AMOUNT)
        });
        this.totalAmount = TotalAmt;
      }
    })
  }
  isPageLoad = 0;
  ngAfterViewInit() {
    if (this.routerPathID > 0) {
      this.isPageLoad = 1;
      this._college.getStudentDraftData(this.routerPathID).subscribe(data => {
        let TotalAmt = 0;
        this.selectPurpose = data.main[0].PURPOSE_CODE;
        this.selectDepartment = data.main[0].DEPT_NAME;
        // this.selectChallan    = data.main[0].SUB_GLACNO;
        this.studentDescriptionDetails = data.details;
        this.studentDescriptionDetails.forEach(element => {
          TotalAmt = TotalAmt + Number(element.AMOUNT)
        });
        this.totalAmount = TotalAmt.toFixed(2);
        this.noDataFound = false;

        this.angForm.patchValue({
          'Enter_Particular': data.main[0].REMARK
        })
      });
    }
  }
  ///when change amount this time call below function
  changeAmt(ele, index) {
    let TotalAmt = 0;
    let amount = ele.target.value;
    this.studentDescriptionDetails[index].AMOUNT = amount;
    this.studentDescriptionDetails.forEach(element => {
      TotalAmt = TotalAmt + Number(element.AMOUNT)
    });
    this.totalAmount = TotalAmt.toFixed(2)
  }

  selectAllContent($event) {
    $event.target.select();
  }

  decimalAllContent($event) {

    let value = Number($event.target.value);
    let data = value.toFixed(2);
    $event.target.value = data;
  }

  //method for save and draft 
  pay() {
    const formVal = this.angForm.value;
    let collegeCode = JSON.parse(localStorage.getItem('user'))
    const dataToSend = {
      'Application_Date': formVal.Application_Date,
      'Received_From': formVal.Received_From,
      'Exam': formVal.Examination,
      'purpose': formVal.purpose,
      'Select_Department': formVal.Select_Department?.ID == "" ? null : formVal.Select_Department?.ID,
      'Challan_Structure': formVal.Challan_Structure?.ID == "" ? null : formVal.Challan_Structure?.ID,
      'Total_Amount': this.totalAmount,
      'studentDescriptionDetails': this.studentDescriptionDetails,
      'Dept_NAME': this.selectDepartment?.NAME == "" ? null : this.selectDepartment?.NAME,
      'Challan_NAME': this.selectChallan?.NAME == "" ? null : this.selectChallan?.NAME,
      'Particular': formVal.Enter_Particular,
      'bank_code': formVal.bank_code,
      'fees_code': this.chalanID == "" ? null : this.chalanID,
      'College_Code': collegeCode.COLLEGE_CODE,
      'user_id': collegeCode.USER_ID,
      'user_name': collegeCode.USER_NAME
    }
    this._college.postData(dataToSend).subscribe(
      (data) => {
        // Swal.fire("Success!", "Data Added Successfully !", "success");
        var userData = JSON.parse(localStorage.getItem('user'));
        var date = moment().format('DD-MM-YYYY');
        let CRN = data;
        let userName = userData.USER_ID + '/' + userData.NAME
        let uname = userName.substring(0, 74)
        // let ppi = userData.NAME + '|' + date + '|' + userData.CELL_NO + '|' + userData.EMAIL_ID + '|' + this.totalAmount;
        // window.open('http://localhost/PHP_Algo/Formdata.php?ppi=' + ppi + '&CRN=' + CRN + '&Amt=' + this.totalAmount + '&user_id=' + userData.USER_ID, '_self');

        let ppi = CRN + '|' + CRN + '|' + uname + '|' + userData.CELL_NO + '|' + userData.EMAIL_ID + '|' + '-' + '|' + '-' + '|' + formVal.Enter_Particular + '|' + CRN + '|' + CRN + '|' + this.totalAmount;
        window.open('http://210.212.190.40/PHP_Algo/Formdata.php?ppi=' + ppi + '&CRN=' + CRN + '&Amt=' + this.totalAmount + '&user_id=' + userData.USER_ID, '_self');

        this.router.navigateByUrl('/dashboard');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveAsDraft() {
    const formVal = this.angForm.value;
    let collegeCode = JSON.parse(localStorage.getItem('user'))
    const dataToSend = {
      'Application_Date': formVal.Application_Date,
      'Received_From': formVal.Received_From,
      'Exam': formVal.Examination,
      'purpose': formVal.purpose,
      'Select_Department': formVal.Select_Department?.ID == "" ? null : formVal.Select_Department?.ID,
      'Challan_Structure': formVal.Challan_Structure?.ID == "" ? null : formVal.Challan_Structure?.ID,
      'Total_Amount': this.totalAmount,
      'studentDescriptionDetails': this.studentDescriptionDetails,
      'Dept_NAME': this.selectDepartment?.NAME == "" ? null : this.selectDepartment?.NAME,
      'Challan_NAME': this.selectChallan?.NAME == "" ? null : this.selectChallan?.NAME,
      'Particular': formVal.Enter_Particular,
      'bank_code': formVal.bank_code,
      'fees_code': this.chalanID == "" ? null : this.chalanID,
      'College_Code': collegeCode.COLLEGE_CODE,
      'user_id': collegeCode.USER_ID,
      'user_name': collegeCode.USER_NAME
    }
    this._college.postData(dataToSend).subscribe(
      (data) => {
        Swal.fire("Success!", "Data Added Successfully !", "success");
        this.router.navigateByUrl('/dashboard');
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

  //update collage details
  updatepay() {
    let CRN = this.studentDescriptionDetails[0].TRAN_NO;
    this._college.updateStudentDetails(this.studentDescriptionDetails).subscribe(data => {
      // Swal.fire("Success!", "Data Added Successfully !", "success");
      var userData = JSON.parse(localStorage.getItem('user'));
      let userName = userData.USER_ID + '/' + userData.NAME
      let uname = userName.substring(0, 74)
      var date = moment().format('DD-MM-YYYY');
      // let ppi = userData.NAME + '|' + date + '|' + userData.CELL_NO + '|' + userData.EMAIL_ID + '|' + this.totalAmount;
      // window.open('http://localhost/PHP_Algo/Formdata.php?ppi=' + ppi + '&CRN=' + CRN + '&Amt=' + this.totalAmount + '&user_id=' + userData.USER_ID);

      let ppi = CRN + '|' + CRN + '|' + uname + '|' + userData.CELL_NO + '|' + userData.EMAIL_ID + '|' + '-' + '|' + '-' + '|' + this.totalAmount + '|' + CRN + '|' + CRN + '|' + this.totalAmount;
      window.open('http://210.212.190.40/PHP_Algo/Formdata.php?ppi=' + ppi + '&CRN=' + CRN + '&Amt=' + this.totalAmount + '&user_id=' + userData.USER_ID, "_self");
      this.router.navigateByUrl('/dashboard');
    }, err => {

    })
  }
}
