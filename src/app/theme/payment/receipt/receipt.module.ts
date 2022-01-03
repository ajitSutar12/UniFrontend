import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptComponent } from './receipt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReceiptService } from './receipt.service'
import { NgxNumToWordsModule } from 'ngx-num-to-words';
@NgModule({
  declarations: [ReceiptComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxNumToWordsModule
  ],
  providers: [ReceiptService]
})
export class ReceiptModule { }
