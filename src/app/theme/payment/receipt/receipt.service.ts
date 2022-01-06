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

    // getReceiptData(applicationID: any): Observable<any> {
    //     console.log('service', applicationID)
    //     // localhost:3000/payment/getPrintData19201110000386
    //     return this.http.get(this.url + 'payment/getPrintData' + applicationID).pipe(catchError(this.handleError));
    // }

    getReceiptData(id: any): Observable<any> {
        return this.http.get(this.url + '/payment/getPrintData' + id).pipe(catchError(this.handleError));
    }

    //Updation Operation
    updateData(data): Observable<any> {
        return this.http.post(this.url + '/payment/receiptupdate', data);
    }
}