import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotComponent } from './forgot.component';
import { ForgotRoutingModule } from './forgot-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPasswordValidatorModule } from 'ng-password-validator';

import { NgSelectModule } from '@ng-select/ng-select';
import { BasicRegService } from '../../auth/registration/basic-reg/basic-reg.service';
// import { BasicRegService } from '../basic-reg.service';
@NgModule({
  imports: [
    CommonModule,
    ForgotRoutingModule,
    SharedModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgPasswordValidatorModule
  ],
  declarations: [ForgotComponent],
  providers: [BasicRegService]
})
export class ForgotModule { }
