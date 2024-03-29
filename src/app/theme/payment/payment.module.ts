import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{DataTablesModule} from 'angular-datatables';
import {StudentpaymentModule} from './studentpayment/studentpayment.module'
import { PaymentRoutingModule } from './payment-routing.module';
import { StudentpaymentComponent } from './studentpayment/studentpayment.component';
import { CollegepaymentComponent } from './collegepayment/collegepayment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnybodypaymentComponent } from './anybodypayment/anybodypayment.component';
import{CollegepaymentModule} from './collegepayment/collegepayment.module'
import{AnybodypaymentModule} from './anybodypayment/anybodypayment.module'
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    DataTablesModule,
    StudentpaymentModule,
    FormsModule,
    ReactiveFormsModule,
    CollegepaymentModule,
    AnybodypaymentModule
  ]
})
export class PaymentModule { }
