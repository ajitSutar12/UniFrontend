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
  forgetPassword: boolean = false;
  forgetAnswer: boolean = true;
  password: any;
  confirmpassword: any;
  selectQue
  angForm: FormGroup;
  
  questions = []

  constructor(private _authService: AuthService,private _basicreg: BasicRegService, private router: Router, private fb: FormBuilder, private config: NgSelectConfig,
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
      PASSREQQUE: [" ", [Validators.required]],
      PASSREQANS: ["", [Validators.pattern, Validators.required]],
    });
  }
  SubmitAnswer() {
    let obj = {
      'answer': this.forgotAnswer
    }
    this.forgetPassword = true;
    this._authService.forgetPassword(obj).subscribe(data => {
      this.router.navigate(['/dashboard']);
    }, err => {
      console.log(err);
    })
  }

  resetPassword() {

    if (this.password != this.confirmpassword || (this.password != '' && this.confirmpassword != '')) {
      Swal.fire({
        title: '',
        text: "Please Check Your Password And Confirm Password",
        icon: 'error',
        confirmButtonColor: '#229954',
        confirmButtonText: 'OK'
      })
      this.router.navigate(['/auth/login/simple']);
    } else {
      this._authService.resetPassword(this.password).subscribe(data => {
        Swal.fire({
          title: 'Success',
          text: "Password Reset Successfully",
          icon: 'success',
          confirmButtonColor: '#229954',
          confirmButtonText: 'OK'
        })
      }, err => {
        console.log(err);
      })
    }
  }

}
