import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  base_url = environment.base_url;


  login(article: any): Observable<any> {
    console.log(this.base_url);
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };
    return this.http.post<any>(this.base_url + '/auth/login', article, options);
  }

  resetPassword(data: any): Observable<any> {
    // let obj = {
    //   'password' : data
    // }
    // return this.http.post<any>(this.base_url + '/resetPassword', obj);


    return this.http.post(this.base_url + '/registration/resetPassword', data).pipe(map((res) => res),
      catchError((error) => {
        console.log(error)
        return throwError(error);
      })
    )
  }

  forgetPassword(data: any): Observable<any> {
    // return this.http.post<any>(this.base_url + '/forgotPasswordregistration/forgotPassword/',data);

    return this.http.post(this.base_url + '/registration/forgotPassword', data).pipe(map((res) => res),
      catchError((error) => {
        console.log(error)
        return throwError(error);
      })
    )
  }

}
