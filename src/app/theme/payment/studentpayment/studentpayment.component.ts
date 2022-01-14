import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgSelectConfig } from '@ng-select/ng-select';
import Swal from 'sweetalert2';
import { StudentpaymentService } from './studentpayment.service'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-studentpayment',
  templateUrl: './studentpayment.component.html',
  styleUrls: ['./studentpayment.component.scss']
})
export class StudentpaymentComponent implements OnInit {
  url = environment.base_url;

  Department: Observable<any>;
  selectDepartment: any = null
  minLengthTerm = 2;

  Challan: Observable<any>;
  selectChallan: any = null

  Purpose: Observable<any>;
  selectPurpose: any = null
  hideColumn: boolean = true;

  selectedBank: any = null

  stringArray: any = [];

  singleSelect: any = [];
  applicationDate: any;
  bankDetails: any;

  studentDescriptionDetails: any;
  totalAmount: any = 0
  chalanID: any
  isTutionFee: boolean = false
  challanlist = new Array();
  noDataFound: boolean = false
  // Created Form Group
  angForm: FormGroup;
  datemax: string;
  routerPathID: any;

  showSaveasDraft : boolean = true;
  showSaveAsProcess: boolean = true;
  showProccedToPay: boolean = false;

  myDisabledCondition: boolean = true;


  // constructor(private fb: FormBuilder,) { }
  constructor(private fb: FormBuilder, private router: Router, private config: NgSelectConfig, private _student: StudentpaymentService, private http: HttpClient,private route: ActivatedRoute
    ) {
    this.datemax = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2);

    //get parameter details
    this.routerPathID= this.route.snapshot.paramMap.get('id');
    console.log('paramsId', this.routerPathID);
    if(this.routerPathID > 4){
      this.showSaveasDraft = false;
      this.showSaveAsProcess = false;
      this.showProccedToPay = true;

     
    }
  }

  //dropdown bind
  trackByFn(item: any) {
    return item.imdbID;
  }

  selectedPurpose : any;
  getChallanDropdown(event) {
    debugger
    if(this.pageloadStatus == 1){
      return 0;
    }
    this.selectDepartment = null
    this.selectPurpose = event;
    if (event == 104) {
      this.hideColumn = true;
      this.isTutionFee = true
    }
    else {
      let TotalAmt = 0;
      this.hideColumn = false;
      this._student.StudentTableListViaDept(event).subscribe(data => {
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
          this.totalAmount = TotalAmt.toFixed(2)
        }
      })
      this.isTutionFee = false
    }
  }


  getDepartmentCode(term: string = null) {
    debugger
    this.selectChallan = null
    if(this.pageloadStatus == 1){
      return 0;
    }
    if(this.selectPurpose == 104){
      this.studentDescriptionDetails = [];
    }
    // this.studentDescriptionDetails = 
    this._student.getChallandata(term).subscribe(data => {
      this.challanlist = data
      console.log(this.challanlist)
    })
  }

  pageloadStatus = 0;
  ngAfterViewInit(): void {
    this._student.getPurposeData(this.routerPathID).subscribe(data => {
      this.Purpose = data
      this._student.getDepartmentData().subscribe(data => {
        this.Department = data
      })
    })
    if(this.routerPathID >4){
      debugger
      this.pageloadStatus = 1;
    this._student.getStudentDraftData(this.routerPathID).subscribe(data=>{
      
      console.log('data',data);
      debugger
      let TotalAmt = 0;
      console.log(data.main[0].PURPOSE_CODE)
      this.selectPurpose =  data.main[0].PURPOSE_CODE;
      this.selectDepartment = data.main[0].DEPT_NAME;
      this.selectChallan    = data.main[0].SUB_GLACNO;
      this.studentDescriptionDetails = data.details;
      this.studentDescriptionDetails.forEach(element => {
        TotalAmt = TotalAmt + Number(element.AMOUNT)
      });
      this.totalAmount = TotalAmt.toFixed(2);
      this.noDataFound = false;

      this.angForm.patchValue({
        'Enter_Particular' : data.main[0].REMARK
      })
    });
  }
  }

   
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('stud payment', user)
    this.createForm();
    this.applicationDate = moment().format('YYYY-MM-DD');
    this._student.getDepartmentData().subscribe(data => {
      this.Department = data
    })
    this._student.getPurposeData(this.routerPathID).subscribe(data => {
      this.Purpose = data
      this._student.getBankCodeDetails().subscribe(data => {
        this.bankDetails = data;
        this.selectedBank = data[0].ID
      })
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
      console.log('pay data', dataToSend)
      this._student.postData(dataToSend).subscribe(
        (data) => {
          // Swal.fire("Success!", "Data Added Successfully !", "success");
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

  decimalAllContent($event) {
    let value = Number($event.target.value);
    let data = value.toFixed(2);
    $event.target.value = data;
  }

  getStudentTableDetails(ele) {
    this.chalanID = ele
    let TotalAmt = 0;
    this._student.StudentTableList(ele).subscribe(data => {
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
        this.totalAmount = TotalAmt.toFixed(2);
      }
    })
  }

  //when change amount this time call below function
  changeAmt(ele, index) {
    let TotalAmt = 0;
    let amount = ele.target.value;
    this.studentDescriptionDetails[index].AMOUNT = Number(amount);
    this.studentDescriptionDetails.forEach(element => {
      TotalAmt = TotalAmt + Number(element.AMOUNT)
    });
    this.totalAmount = TotalAmt.toFixed(2)
  }

  saveAsDraft() {
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
      (data => {
        console.log('save data', data)
        Swal.fire("Success!", "Data Added Successfully !", "success");
        this.router.navigateByUrl('/dashboard');
      }),
      (error) => {
        console.log(error);
      }
    );
  }

  updatepay(){
    console.log(this.studentDescriptionDetails);
    let CRN = this.studentDescriptionDetails[0].TRAN_NO;
    this._student.updateStudentDetails(this.studentDescriptionDetails).subscribe(data=>{
      console.log(data);
      // Swal.fire("Success!", "Data Added Successfully !", "success");
          var userData = JSON.parse(localStorage.getItem('user'));
          var date = moment().format('DD-MM-YYYY');
          // let ppi = userData.NAME + '|' + date + '|' + userData.CELL_NO + '|' + userData.EMAIL_ID + '|' + this.totalAmount;
         
          let ppi = CRN + '|' + CRN + '|' + userData.NAME + '|' + userData.CELL_NO + '|' + userData.EMAIL_ID + '|' + '-' + '|' + '-' + '|' + this.totalAmount + '|' + CRN + '|' + CRN + '|' + this.totalAmount;

          window.open('http://210.212.190.40/PHP_Algo/Formdata.php?ppi=' + ppi + '&CRN=' + CRN + '&Amt=' + this.totalAmount + '&user_id=' + userData.USER_ID,"_self");
          // window.open('http://localhost/PHP_Algo/Formdata.php?ppi=' + ppi + '&CRN=' + CRN + '&Amt=' + this.totalAmount + '&user_id=' + userData.USER_ID);

          this.router.navigateByUrl('/dashboard');
    },err=>{

    })
  }
}
