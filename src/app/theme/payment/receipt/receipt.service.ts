import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment'
@Injectable()
export class ReceiptService {
    // Variable for handleError
    [x: string]: any;
    // API
    url = environment.base_url;

    constructor(private http: HttpClient) { }

    getReceiptData(id: any): Observable<any> {
        return this.http.get(this.url + '/payment/getPrintData' + id).pipe(catchError(this.handleError));
    }

    updateData(data: any): Observable<any> {
        return this.http.get(this.url + '/payment/receiptupdate' + data);
    }
}