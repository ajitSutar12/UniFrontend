import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgSelectConfig } from '@ng-select/ng-select';
import { BasicRegService } from '../registration/basic-reg/basic-reg.service';
import { NgPasswordValidatorOptions } from "ng-password-validator";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  inputValue: string;
  forgotAnswer: any;
  options: NgPasswordValidatorOptions = {
    placement: "bottom",
    "animation-duration": 500
  };
  email: any;
  forgetPassword: boolean = false;
  forgetAnswer: boolean = true;
  password: any;
  confirmpassword: any;
  selectQue: any
  angForm: FormGroup;
  form: FormGroup;
  passType: string = 'password';
  passType1: string = 'password';
  questions = []

  constructor(private _authService: AuthService, private _basicreg: BasicRegService, private router: Router, private fb: FormBuilder, private config: NgSelectConfig,
    private http: HttpClient,) { }


  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
    this._basicreg.getQuestionData().subscribe(data => {
      this.questions = data
    })
  }
  createForm() {
    this.angForm = this.fb.group({
      Type: new FormControl('Student'),
      email: [''],
      question: [''],
      answer: [''],
    });
  }
  value(event) {
    this.selectQue = event.CODE
  }
  SubmitAnswer() {
    const dataToSend = {
      'email': this.email,
      'question': this.selectQue,
      'answer': this.forgotAnswer,
    }
    this._authService.forgetPassword(dataToSend).subscribe(data => {
      if (data == true) {
        this.forgetPassword = true
        this.forgetAnswer = false
      }
      else {
        this.forgetPassword = false;
        Swal.fire("Warning!", "Please Fill Correct Data !", "error");
      }
    }, err => {
      console.log(err);
    })
  }

  resetPassword() {
    if ((this.password == this.confirmpassword) || (this.password == '' && this.confirmpassword != '')) {
      const dataToSend = {
        'email': this.email,
        'PASSWORD': this.password,
      }

      this._authService.resetPassword(dataToSend).subscribe(data => {
        Swal.fire({
          title: 'Success',
          text: "Password Reset Successfully",
          icon: 'success',
          confirmButtonColor: '#229954',
          confirmButtonText: 'OK'
        })
        this.router.navigate(['/auth/login/simple']);
      }, err => {
        console.log(err);
      })
    } else {
      Swal.fire({
        title: '',
        text: "Please Check Your Password And Confirm Password",
        icon: 'error',
        confirmButtonColor: '#229954',
        confirmButtonText: 'OK'
      })
    }

  }
  showHidePassword() {
    if (this.passType == 'password') {
      this.passType = 'text';
    }
    else {
      this.passType = 'password';
    }
  }
  showHidePassword1() {
    if (this.passType1 == 'password') {
      this.passType1 = 'text';
    }
    else {
      this.passType1 = 'password';
    }
  }
  onInput(event: any): void {
    this.inputValue = event.target.value;
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
}
