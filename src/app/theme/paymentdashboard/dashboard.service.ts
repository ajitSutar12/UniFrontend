import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment'
@Injectable()
export class DashboardService {
    // Variable for handleError
    [x: string]: any;
    // API 
    // // customer-id";
    url = environment.base_url;

    constructor(private http: HttpClient) { }

    getsuccessful(usercode: any): Observable<any> {
        return this.http.get(this.url + 'payment/success' + usercode).pipe(catchError(this.handleError));
    }
    getunsuccessful(usercode: any): Observable<any> {
        return this.http.get(this.url + 'payment/unsuccess' + usercode).pipe(catchError(this.handleError));
    }
    getsuccessfulnotprint(usercode: any): Observable<any> {
        return this.http.get(this.url + 'payment/Notprinted' + usercode).pipe(catchError(this.handleError));
    }
}