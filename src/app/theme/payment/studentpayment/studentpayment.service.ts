import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment'
@Injectable()
export class StudentpaymentService {
    // Variable for handleError
    [x: string]: any;
    // API 
    // // customer-id";
    url = environment.base_url;

    constructor(private http: HttpClient) { }

    //Insertion Operation
    // postData(data: any): Observable<any> {
    //     
    //     return this.http.post(this.url + '/payment/draft', data).pipe(map((res) => res),
    //         catchError((error) => {
    //             Swal.fire('Please Input Proper Data!');
    //             return throwError(error);
    //         })
    //     )
    // }

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

    //Call to payment method
    pay(): Observable<any> {
        let data = this.http.get('http://localhost:4000/getpath').pipe(catchError(this.handleError));
        return data;
    }

    getChallandata(id: any): Observable<any> {
        return this.http.get(this.url + '/payment/challan' + id).pipe(catchError(this.handleError));
    }

    getPurposeData(id: any): Observable<any> {
        return this.http.get(this.url + '/payment/studpurpose' + id).pipe(catchError(this.handleError));
    }

    getDepartmentData(): Observable<any> {
        return this.http.get(this.url + '/payment/department').pipe(catchError(this.handleError));
    }

    StudentTableList(id): Observable<any> {
        return this.http.get(this.url + '/payment/StudentTableList' + id).pipe(catchError(this.handleError));
    }


    StudentTableListViaDept(id: any): Observable<any> {
        return this.http.get(this.url + '/payment/getPurposeForStud' + id).pipe(catchError(this.handleError));
    }

    getBankCodeDetails(): Observable<any> {
        return this.http.get(this.url + '/payment/bankList').pipe(catchError(this.handleError));
    }

    getStudentDraftCode(): Observable<any> {
        return this.http.get(this.url + '/payment/draftList').pipe(catchError(this.handleError));
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
        return this.http.post('http://210.212.172.137:89/getpath', data).pipe(catchError(this.handleError));
        // return this.http.post('http://localhost:5000/getpath', data).pipe(catchError(this.handleError));
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////--------Easebuzz PaymentGetWay-----------////////////////////////////////
    easebuzz(data): Observable<any> {
        // return this.http.post('http://localhost:3000/initiate_payment', data).pipe(catchError(this.handleError));
        return this.http.post('http://210.212.172.137:81/initiate_payment', data).pipe(catchError(this.handleError));
    }
}


