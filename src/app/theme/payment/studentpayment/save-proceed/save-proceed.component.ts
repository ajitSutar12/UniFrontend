import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SaveProceedService } from './save-proceed.service'
@Component({
  selector: 'app-save-proceed',
  templateUrl: './save-proceed.component.html',
  styleUrls: ['./save-proceed.component.scss']
})
export class SaveProceedComponent implements OnInit {
  // Created Form Group
  angForm: FormGroup;
  banks
  selectBank

  constructor(private fb: FormBuilder, private _saveProceed: SaveProceedService) { }

  ngOnInit(): void {
    this._saveProceed.getBankData().subscribe(data => {
      this.banks = data
    })
  }

  createForm() {
    this.angForm = this.fb.group({
      BANK: ['', [Validators.required]]
    })
  }
}
