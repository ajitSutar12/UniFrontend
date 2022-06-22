import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../auth.service';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {

  isInvalidUsername: boolean = false;
  isInvalidPassword: boolean = false;
  username: string;
  password: string;
  passType: string = 'password';
  constructor(private router: Router, private _authService: AuthService) { }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  }

  login() {

    let obj = {
      "username": this.username,
      "password": this.password
    }
      this._authService.login(obj).subscribe(data => {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.user.USER_TYPE != 4) {
          this.router.navigate(['/dashboard']);
        }else{
          this.router.navigate(['/dashboard/Utility']);

        }
      }, err => {
        Swal.fire({
          title: '',
          text: "Please Check Your Username And Password",
          icon: 'error',
          confirmButtonColor: '#229954',
          confirmButtonText: 'OK'
        })
      })
  }

  showHidePassword() {
    if (this.passType == 'password') {
      this.passType = 'text';
    }
    else {
      this.passType = 'password';
    }
  }
}
