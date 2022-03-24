import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  [x: string]: any;
  // API 
  // // customer-id";
  url = environment.base_url;

  constructor(private http: HttpClient) { }
  postData(data: any): Observable<any> {
    return this.http.post(this.url + '/payment/submit_feedback', data).pipe(map((res) => res),
      catchError((error) => {
        Swal.fire('Server is busy please try again');
        return throwError(error);
      })
    ) 
  }
}
