import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment'
@Injectable()
export class AnybodyService {
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

    //Call to payment method
    pay(): Observable<any> {
        let data = this.http.get('http://localhost:4000/getpath').pipe(catchError(this.handleError));
        console.log(data)
        return data;
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
        return this.http.get(this.url + '/payment/anyonepurpose').pipe(catchError(this.handleError));
    }

    anyoneTableListViaDept(id: any): Observable<any> {
        console.log('anyone service', id)
        return this.http.get(this.url + '/payment/TableOfAnyone' + id).pipe(catchError(this.handleError));
    }
}

