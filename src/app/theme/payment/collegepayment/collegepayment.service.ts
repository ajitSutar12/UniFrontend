import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment'
@Injectable()
export class CollegepaymentService {
    // Variable for handleError
    [x: string]: any;
    // API 
    // // customer-id";
    url = environment.base_url;

    constructor(private http: HttpClient) { }

    //Insertion Operation
    postData(data: any): Observable<any> {
        return this.http.post(this.url + '/payment/draft', data).pipe(map((res) => res),
            catchError((error) => {
                Swal.fire('Please Input Proper Data!');
                return throwError(error);
            })
        )
    }
    // For append data
    getFormData(id: any): Observable<any> {
        return this.http.get(this.url + '/customer-id/' + id).pipe(catchError(this.handleError));
    }
    //Updation Operation
    updateData(data): Observable<any> {
        return this.http.put(this.url + '/customer-id/update', data);
    }
    //Deletion Operation
    deleteData(id: any): Observable<any> {
        return this.http.delete(this.url + '/customer-id/delete/' + id).pipe(catchError(this.handleError));
    }
    getPurposeData(): Observable<any> {
        return this.http.get(this.url + '/payment/collegepurpose').pipe(catchError(this.handleError));
    }

    collegeTableListViaDept(id: any): Observable<any> {
        return this.http.get(this.url + '/payment/ListCollegePurpose' + id).pipe(catchError(this.handleError));
    }

    getBankCodeDetails(): Observable<any> {
        return this.http.get(this.url + '/payment/bankList').pipe(catchError(this.handleError));
    }

    getStudentDraftData(id): Observable<any> {
        return this.http.get(this.url + '/payment/getStudentDraftData' + id).pipe(catchError(this.handleError));
    }

    updateStudentDetails(data): Observable<any> {
        return this.http.post(this.url + '/payment/StudentUpdateDetails', data).pipe(catchError(this.handleError));
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////--------Bank Of India PaymentGetWay-----------////////////////////////////////
    boipaymentGetway(data): Observable<any> {
        return this.http.post('http://210.212.190.40:89/getpath', data).pipe(catchError(this.handleError));
        // return this.http.post('http://localhost:5000/getpath', data).pipe(catchError(this.handleError));
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////--------Easebuzz PaymentGetWay-----------////////////////////////////////
    easebuzz(data): Observable<any> {
        return this.http.post('http://localhost:3000/initiate_payment', data).pipe(catchError(this.handleError));
        // return this.http.post('http://210.212.190.40:90/initiate_payment', data).pipe(catchError(this.handleError));
    }
}

