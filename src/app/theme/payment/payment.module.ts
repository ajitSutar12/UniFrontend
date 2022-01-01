import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { StudentpaymentModule } from './studentpayment/studentpayment.module'
import { PaymentRoutingModule } from './payment-routing.module';
import { StudentpaymentComponent } from './studentpayment/studentpayment.component';
import { CollegepaymentComponent } from './collegepayment/collegepayment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnybodypaymentComponent } from './anybodypayment/anybodypayment.component';
import { CollegepaymentModule } from './collegepayment/collegepayment.module'
import { AnybodypaymentModule } from './anybodypayment/anybodypayment.module';
import { StudentComponent } from './student/student.component';
import { CollegeComponent } from './college/college.component';
import { AnybodyComponent } from './anybody/anybody.component';
import { StudentdraftComponent } from './studentdraft/studentdraft.component';
import { CollegedraftComponent } from './collegedraft/collegedraft.component';
import { AnybodydraftComponent } from './anybodydraft/anybodydraft.component';
import { ProceedToPayComponent } from './proceed-to-pay/proceed-to-pay.component'
import { ProceedToPayModule } from './proceed-to-pay/proceed-to-pay.module'
import { ReceiptModule } from './receipt/receipt.module'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserAuthInterceptor } from 'src/app/user-auth.interceptor';
@NgModule({
  declarations: [StudentComponent, CollegeComponent, AnybodyComponent, StudentdraftComponent, CollegedraftComponent, AnybodydraftComponent, ProceedToPayComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    DataTablesModule,
    StudentpaymentModule,
    FormsModule,
    ReactiveFormsModule,
    CollegepaymentModule,
    AnybodypaymentModule,
    ProceedToPayModule,
    ReceiptModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: UserAuthInterceptor,
    multi: true
  }]
})
export class PaymentModule { }
