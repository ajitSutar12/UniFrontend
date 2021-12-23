import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AnybodypaymentRoutingModule } from './anybodypayment-routing.module';
import{AnybodypaymentComponent} from './anybodypayment.component'
import{AnybodyService} from './anybodypayment.service'
@NgModule({
  declarations: [AnybodypaymentComponent],
  imports: [
    CommonModule,
    AnybodypaymentRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[AnybodyService]
})
export class AnybodypaymentModule { }
