import { Component, OnInit } from '@angular/core';
import { StudentpaymentService } from '../studentpayment/studentpayment.service';
@Component({
  selector: 'app-studentdraft',
  templateUrl: './studentdraft.component.html',
  styleUrls: ['./studentdraft.component.scss']
})
export class StudentdraftComponent implements OnInit {

  draftlist : any;
  constructor(private _student : StudentpaymentService) {
    this._student.getStudentDraftCode().subscribe(data=>{
      this.draftlist = data;
    })
  }

  ngOnInit(): void {
  }

}
