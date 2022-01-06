import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
@Injectable()
export class UserProfileService {
    // Variable for handleError
    [x: string]: any;
    // API 
    // // customer-id";
    url = environment.base_url;

    constructor(private http: HttpClient) { }

    //Updation Operation
    updateData(data): Observable<any> {
        return this.http.post(this.url + '/registration/updateprofile', data);
    }

}

