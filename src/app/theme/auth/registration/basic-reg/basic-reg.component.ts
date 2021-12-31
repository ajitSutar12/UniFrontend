import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { NgPasswordValidatorOptions } from "ng-password-validator";
// Displaying Sweet Alert
import Swal from "sweetalert2";
import { BasicRegService } from './basic-reg.service'
import { NgSelectConfig } from '@ng-select/ng-select';
import { concat, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment'
import { Router } from '@angular/router';
interface Basicreginterface {
  Type: boolean
  Full_Name: string,
  Mobile_No: number,
  Email_Address: string,
  College_Code: string,
  User_Name: string,
  Create_Password: string,
  Confirm_Password: string,

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
  hidenshow: boolean = false;
  toastr: any;

  url = environment.base_url;

  collegeCodeList = []
  selectedCar1: number;

  questions = []
  selectQue
  collgeCode: Observable<any>;
  collegeCodeLoading = false;
  collegeCodeInput = new Subject<string>();
  selectedCode: any;
  minLengthTerm = 2;

  constructor(private fb: FormBuilder, private _basicreg: BasicRegService, private config: NgSelectConfig,
    private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.formInIt();
    this.createForm();
    this.loadCollegeCode();
    this._basicreg.getQuestionData().subscribe(data => {
      this.questions = data
    })
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  }

  createForm() {
    this.angForm = this.fb.group({
      Type: new FormControl('Student'),
      Full_Name: ["", [Validators.required]],
      Mobile_No: ["", [Validators.required]],
      Email_Address: ["", [Validators.required]],
      College_Code: ["",],
      User_Name: ["", [Validators.required]],
      Create_Password: ["", [Validators.required]],
      Confirm_Password: ["", [Validators.required]],
      PASSREQQUE: [" ", [Validators.required]],
      PASSREQANS: ["", [Validators.pattern, Validators.required]],
    });
  }

  onInput(event: any): void {
    this.inputValue = event.target.value;
  }

  //dropdown bind
  trackByFn(item: any) {
    return item.imdbID;
  }

  loadCollegeCode() {
    this.collgeCode = concat(
      of([]), // default items
      this.collegeCodeInput.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.collegeCodeLoading = true),
        switchMap(term => {

          return this.getCollegeCode(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => this.collegeCodeLoading = false)
          )
        })
      )
    );

  }

  getCollegeCode(term: string = null): Observable<any> {
    return this.http
      // .get<any>('http://www.omdbapi.com/?apikey=d3fb7156&s=' + term)
      .get<any>(this.url + '/registration/collegecode' + term)
      .pipe(map(resp => {
        if (resp.Error) {
          throwError(resp.Error);
        } else {
          return resp;
        }
      })
      );
  }


  submit() {
    if (this.angForm.valid) {
      const formVal = this.angForm.value;
      if (formVal.Type == 'Student') {
        formVal.Type = 0
        formVal.College_Code = 0
      }
      else if (formVal.Type == 'College') {
        formVal.Type = 1
      }
      else {
        formVal.Type = 2
        formVal.College_Code = 0
      }
      const dataToSend = {
        'USER_TYPE': formVal.Type,
        'NAME': formVal.Full_Name,
        'CELL_NO': formVal.Mobile_No,
        'EMAIL_ID': formVal.Email_Address,
        'COLLEGE_CODE': parseInt(formVal.College_Code),
        'USER_NAME': formVal.User_Name,
        'PASSWORD': formVal.Confirm_Password,
        'PASSREQQUE': formVal.PASSREQQUE,
        'PASSREQANS': formVal.PASSREQANS,
      }
      this._basicreg.postData(dataToSend).subscribe(
        (data) => {
          Swal.fire("Success!", "Data Added Successfully !", "success");
          this.router.navigate(['/auth/login/simple']);
        },
        (error) => {
          console.log(error);
        }
      );
      //To clear form
      this.resetForm();
    }
  }
  // Reset Function
  resetForm() {
    this.createForm();
    this.selectstudent()
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

  clgCode: boolean = false
  //toggle select college code
  select() {
    this.clgCode = true
    this.select_toggle = !this.select_toggle;
  }
  selectanybody() {
    this.select_toggle = false;
    this.clgCode = false
  }
  selectstudent() {
    this.select_toggle = false;
    this.clgCode = false
  }

  //function to confirm password
  checkPassword() {
    let password1 = ((document.getElementById("Create_Password") as HTMLInputElement).value);
    let password2 = ((document.getElementById("Confirm_Password") as HTMLInputElement).value);

    // If password not entered
    if (password1 == '') {
      Swal.fire("Warning!", "Please enter Password !", "warning");

    }


    // If confirm password not entered
    else if (password2 == '') {
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
