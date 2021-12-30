import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment'
@Injectable()
export class SaveProceedService {
    // Variable for handleError
    [x: string]: any;
    url = environment.base_url;

    constructor(private http: HttpClient) { }
    getBankData(): Observable<any> {
        return this.http.get(this.url + '/payment/bankList').pipe(catchError(this.handleError));
    }
}