import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentpaymentRoutingModule } from './studentpayment-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { StudentpaymentComponent } from './studentpayment.component';
import { StudentpaymentService } from './studentpayment.service';
@NgModule({
  declarations: [StudentpaymentComponent],
  imports: [
    CommonModule,
    StudentpaymentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
    

  ],providers:[StudentpaymentService]
})
export class StudentpaymentModule { }
