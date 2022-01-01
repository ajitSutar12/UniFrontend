import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgSelectConfig } from '@ng-select/ng-select';
import { BasicRegService } from '../registration/basic-reg/basic-reg.service';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  forgotAnswer: any;
  email: any;
  forgetPassword: boolean = false;
  forgetAnswer: boolean = true;
  password: any;
  confirmpassword: any;
  selectQue: any
  angForm: FormGroup;
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

}
