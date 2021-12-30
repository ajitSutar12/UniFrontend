import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentpaymentRoutingModule } from './studentpayment-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { StudentpaymentComponent } from './studentpayment.component';
import { StudentpaymentService } from './studentpayment.service';
import { SaveProceedModule } from './save-proceed/save-proceed.module'
import { SaveProceedComponent } from './save-proceed/save-proceed.component'
@NgModule({
  declarations: [StudentpaymentComponent, SaveProceedComponent],
  imports: [
    CommonModule,
    StudentpaymentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SaveProceedModule
  ],
  providers: [StudentpaymentService]
})
export class StudentpaymentModule { }
