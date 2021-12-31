import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptComponent } from './receipt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ReceiptComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReceiptModule { }
