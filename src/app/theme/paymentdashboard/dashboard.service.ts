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
    url = environment.base_url;

    constructor(private http: HttpClient) { }
    getsuccessful(userid): Observable<any> {
        return this.http.get(this.url + '/payment/success' + userid).pipe(catchError(this.handleError));
    }
    getunsuccessful(userid): Observable<any> {
        return this.http.get(this.url + '/payment/unsuccess' + userid).pipe(catchError(this.handleError));
    }
    getsuccessfulnotprint(userid): Observable<any> {
        return this.http.get(this.url + '/payment/Notprinted' + userid).pipe(catchError(this.handleError));
    }

    utility(data): Observable<any> {
        return this.http.post<any>(this.url + '/registration/Utility', data).pipe(catchError(this.handleError));
    }

    updateMIS(data): Observable<any> {
        return this.http.put<any>(this.url + '/payment/updateMIS', data).pipe(catchError(this.handleError));
    }
    invoiceList(): Observable<any> {
        return this.http.get<any>(this.url + '/payment/invoiceList').pipe(catchError(this.handleError));
    }

    // updateMIS(data: any): Observable<any> {
    //     return this.http.put(this.url + '/payment/updateMIS', data).pipe(map((res) => res),
    //         catchError((error) => {
    //             Swal.fire('Please Input Proper Data!');
    //             return throwError(error);
    //         })
    //     )
    // }
}