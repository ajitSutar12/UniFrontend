import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { NgPasswordValidatorOptions } from "ng-password-validator";
// Displaying Sweet Alert
import Swal from "sweetalert2";
import{BasicRegService} from './basic-reg.service'

interface Basicreginterface{
  Type: boolean
  Full_Name: string,
  Mobile_No: number,
  Email_Address: string,
  College_Code: string,
  User_Name: string,
  Create_Password:string,
  Confirm_Password:string,

}

@Component({
  selector: 'app-basic-reg',
  templateUrl: './basic-reg.component.html',
  styleUrls: ['./basic-reg.component.scss']
})
export class BasicRegComponent implements OnInit {
  inputValue: string;
  form: FormGroup;
  options: NgPasswordValidatorOptions = {
    placement: "bottom",
    "animation-duration": 500
};
  select_toggle: boolean = false;
  // Created Form Group
  angForm: FormGroup;
  //password block hide and show
  hidenshow:boolean = false;
  toastr: any;

  constructor(private fb: FormBuilder, private _basicreg : BasicRegService) { }

  ngOnInit() {
    this.formInIt();
    this.createForm();
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
    
  }

  createForm() {
    this.angForm = this.fb.group({
      Type: new FormControl('Student'),
      Full_Name: ["", [Validators.required, Validators.required]],
      Mobile_No: [""],
      Email_Address: [""],
      College_Code: [""],
      User_Name: [""],
      Create_Password: [""],
      Confirm_Password: [""],

    });

  }
  onInput(event: any): void {
    this.inputValue = event.target.value;
}

  
submit() {
  const formVal = this.angForm.value;
  const dataToSend = {
    'Type':formVal.Type,
    'Full_Name': formVal.Full_Name,
    'Mobile_No': formVal.Mobile_No,
    'Email_Address': formVal.Email_Address,
    'College_Code': formVal.College_Code,
    'User_Name': formVal.User_Name,
    'Create_Password':formVal.Create_Password,
    'Confirm_Password':formVal.Confirm_Password,
   
  }


  this._basicreg.postData(dataToSend).subscribe(
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

  defaultOptions = {
    placement: "bottom",
    "z-index": 0,
    "custom-class": "custom-class",
    shadow: true,
    theme: "pro",
    offset: 8,
    heading: "Password Policy",
    successMessage: "Awesome! Password requirement fulfilled.",
    rules: {
        password: {
            type: "range",
            length: 8,
            min: 6,
            max: 10,
        },
        "include-symbol": true,
        "include-number": true,
        "include-lowercase-characters": true,
        "include-uppercase-characters": true,
    }
};
  formInIt(): void {
    this.form = this.fb.group({
        theme: ["pro"],
        placement: ["bottom"],
        shadow: [true],
        "custom-class": [""],
        "z-index": [""],
        "animation-duration": [""],
        offset: ["10"],
        width: [""],
        "max-width": [""],
        top: [""],
        left: [""],
        password: [true],
        "include-uppercase-characters": [true],
        "include-lowercase-characters": [true],
        "include-symbol": [true],
        "include-number": [true],
        type: ["range"],
        length: [""],
        min: ["6"],
        max: ["10"],
        heading: [""],
        successMessage: [""],
    });
    this.formOnChange();
  }
  isValid(event: boolean): void {
    if (this.inputValue && this.inputValue.length) {
        if (event) {
            this.toastr.success("Password is Valid.", "Successful!");
        } else {
            this.toastr.error("Password is invalid.", "Error!");
        }
    }

}

  formOnChange(): void {
    this.form.valueChanges.subscribe((value: any) => {
        this.options["rules"] = {
            "include-lowercase-characters": value["include-lowercase-characters"],
            "include-uppercase-characters": value["include-uppercase-characters"],
            "include-symbol": value["include-symbol"],
            "include-number": value["include-number"],
            password: value.password ? {
                type: value.type,
                length: value.length,
                min: value.min,
                max: value.max,
            } : false
        };

        this.updateOptions({ ...value });

    });

    this.form.get("type").valueChanges.subscribe((type: string) => {
        switch (type) {
            case "range":
                this.form.patchValue({
                    length: "",
                    min: "6",
                    max: "10",
                });
                break;
            case "number":
                this.form.patchValue({
                    length: "8",
                    min: "",
                    max: "",
                });
        }

    });

    this.form.get("top").valueChanges.subscribe((top: string) => {
        this.options["position"] = {
            top: +top,
            left: this.form.get("left").value ? +this.form.get("left").value : 0
        };
    });

    this.form.get("left").valueChanges.subscribe((left: string) => {
        this.options["position"] = {
            left: +left,
            top: this.form.get("top").value ? +this.form.get("top").value : 0
        };
    });
}
updateOptions(value: any): void {
  delete value.top;
  delete value.left;
  delete value["include-uppercase-characters"];
  delete value["include-lowercase-characters"];
  delete value["include-symbol"];
  delete value["include-number"];
  delete value.password;
  delete value.type;
  delete value.length;
  delete value.min;
  delete value.max;

  this.options = { ...this.options, ...value };
  this.applyDefault(this.options);

}
applyDefault(obj) {
  for (let propName in obj) {
      if (obj[propName] === "") {
          this.options[propName] = this.defaultOptions[propName];
      }
  }
}
 
  
  //toggle select college code
  select() {
    this.select_toggle = !this.select_toggle;
  }
  selectanybody() {
    this.select_toggle = false;
  }
  selectstudent() {
    this.select_toggle = false;
  }

//function to confirm password
checkPassword() {
 let  password1 = ((document.getElementById("Create_Password") as HTMLInputElement).value);
 let password2 = ((document.getElementById("Confirm_Password") as HTMLInputElement).value);

  // If password not entered
  if (password1 == ''){
    Swal.fire("Warning!", "Please enter Password !", "warning");

  }

        
  // If confirm password not entered
  else if (password2 == ''){
    Swal.fire("Warning!", "Please enter confirm password!", "warning");

  }
      // alert ("Please enter confirm password");
        
  // If Not same return False.    
  else if (password1 != password2) {
    Swal.fire("Warning!", "Password did not match: Please try again...!", "warning");      
  }

  // If same return True.
  // else{
  //   Swal.fire("Success!", "Password Match!", "success");

  //     // alert("Password Match: Welcome to GeeksforGeeks!")
      
  // }
}

}
