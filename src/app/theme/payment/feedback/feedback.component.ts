import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FeedbackService } from './feedback.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  reasonlist = [
    { 'ID': 1, 'NAME': 'Receipt Cancel' },
    { 'ID': 2, 'NAME': 'Head Change' },
    { 'ID': 3, 'NAME': 'Double Payment' },
    { 'ID': 4, 'NAME': 'Admission Cancel' },
    { 'ID': 5, 'NAME': 'Other' }
  ]
  selectPurpose: any;
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private _feedback: FeedbackService, private router: Router,) { }

  ngOnInit(): void {
    this.angForm = this.fb.group({
      reason: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  submit() {
    if (this.angForm.valid) {
      let user = JSON.parse(localStorage.getItem('user'));
      let dataToSend = this.angForm.value;
      dataToSend['user'] = user;
      this._feedback.postData(dataToSend).subscribe(data => {
        Swal.fire("Success", "Your feedback submitted successfully", "success");
        this.selectPurpose = null
        this.angForm.controls['description'].reset()
        this.router.navigateByUrl('/dashboard');
      }, err => {

      })
    } else {
      Swal.fire("Invalid Input", "Please insert valid data ", "warning");
    }

  }

}
