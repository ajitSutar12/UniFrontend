import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment'
@Injectable()
export class BasicRegService {
    // Variable for handleError
    [x: string]: any;
    // API 
    // // customer-id";
    url = environment.base_url;

    constructor(private http: HttpClient) { }

    //Insertion Operation
    postData(data: any): Observable<any> {
        return this.http.post(this.url + '/registration/insert', data).pipe(map((res) => res),
            catchError((error) => {
                console.log('error', error)
                Swal.fire('Username Already Exists!');
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

    getQuestionData(): Observable<any> {
        return this.http.get(this.url + '/registration/QUESTIONS').pipe(catchError(this.handleError));
    }

    getCollegeList(): Observable<any> {
        return this.http.get(this.url + '/registration/collegecode').pipe(catchError(this.handleError));
    }


}

