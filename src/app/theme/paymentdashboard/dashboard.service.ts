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
}