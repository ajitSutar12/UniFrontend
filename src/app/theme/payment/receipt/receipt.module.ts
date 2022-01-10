import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptComponent } from './receipt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReceiptService } from './receipt.service'
import { NgxNumToWordsModule } from 'ngx-num-to-words';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [ReceiptComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxNumToWordsModule,
    RouterModule
  ],
  providers: [ReceiptService]
})
export class ReceiptModule { }
