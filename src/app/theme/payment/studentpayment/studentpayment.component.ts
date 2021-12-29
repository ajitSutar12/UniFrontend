import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgSelectConfig } from '@ng-select/ng-select';
import Swal from 'sweetalert2';
import{StudentpaymentService} from './studentpayment.service'


@Component({
  selector: 'app-studentpayment',
  templateUrl: './studentpayment.component.html',
  styleUrls: ['./studentpayment.component.scss']
})
export class StudentpaymentComponent implements OnInit {
  selectedCar: number;
  selectedCar1:number;
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
  stringArray: any = [];
  
  singleSelect: any = [];

 
 // Created Form Group
 angForm: FormGroup;
  datemax: string;
  // constructor(private fb: FormBuilder,) { }
  constructor(private fb: FormBuilder, private config: NgSelectConfig, private _student :StudentpaymentService) {
    this.datemax = new Date().getFullYear()+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+("0"+new Date().getDate()).slice(-2);
    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    // set the bindValue to global config when you use the same 
    // bindValue in most of the place. 
    // You can also override bindValue for the specified template 
    // by defining `bindValue` as property
    // Eg : <ng-select bindValue="some-new-value"></ng-select>
    this.config.bindValue = 'value';
}

  ngOnInit(): void {
    this.createForm();
  }
  dropdownOptions =[
    1,2
  ]
   //disabledate on keyup
   disabledate(data:any){
    
    console.log(data);
    if(data != ""){
      if(data > this.datemax){
        Swal.fire("Invalid Input", "Please insert valid date ", "warning");
        (document.getElementById("Application_Date")as HTMLInputElement).value = ""
            
      }
    } 
  }
  createForm() {
    this.angForm = this.fb.group({
      Application_Date:['',[Validators.required]],
      Received_From:['',[Validators.required]],
      Examination:['',[Validators.required]],
      Select_Department:['Select Department',[Validators.required]],
      Challan_Structure:['',[Validators.required]],
      Total_Amount:[''],
      Enter_Particular:['',[Validators.required]],
     
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
     
    }


    this._student.postData(dataToSend).subscribe(
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

  pay(){
    this._student.pay().subscribe(data=>{
      console.log(data);
      window.open(data.msg)
    },err=>{
      console.log(err);
    })
  }
}
