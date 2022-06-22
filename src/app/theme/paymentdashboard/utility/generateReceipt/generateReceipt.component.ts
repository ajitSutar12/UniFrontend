import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { environment } from '../../../../../environments/environment'
// Displaying Sweet Alert
import Swal from 'sweetalert2';
@Component({
  selector: 'app-generateReceipt',
  templateUrl: './generateReceipt.component.html',
  styleUrls: ['./generateReceipt.component.scss']
})
export class GenerateReceiptComponent implements OnInit {
  angForm: FormGroup;
  url = environment.base_url;
  constructor(private fb: FormBuilder, private router: Router,) { }

  ngOnInit(): void {
  }

  generateReceipt(value) {
    if (value != '' ) {
      this.router.navigateByUrl('/Payment/receipt', { state: value });
    }
    else {
      Swal.fire('info', 'Please Input Transaction number', 'info')
    }
  }

  back() {
    this.router.navigateByUrl('/dashboard/Utility')
  }
}
