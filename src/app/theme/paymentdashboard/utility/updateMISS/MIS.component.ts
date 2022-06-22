import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment'
import { DashboardService } from '../../dashboard.service'
// Displaying Sweet Alert
import Swal from 'sweetalert2';
@Component({
  selector: 'app-MIS',
  templateUrl: './MIS.component.html',
  styleUrls: ['./MIS.component.scss']
})
export class UpdateMISComponent implements OnInit {
  angForm: FormGroup;
  url = environment.base_url;
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private _service: DashboardService) { }

  ngOnInit(): void {
  }
  status
  updateData(value) {

    if (value != '') {
      let obj = {
        data: value
      }
      this._service.updateMIS(obj).subscribe(data => {
        debugger
        this.status = data
        console.log(this.status)
        console.log(data)
      }), (error => {
        console.log(error)
      })
    }
    else {
      debugger
      Swal.fire('info', 'Please Input Transaction number', 'info')
    }
  }

  back() {
    this.router.navigateByUrl('/dashboard/Utility')
  }

}
