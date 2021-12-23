import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistrationRoutingModule} from './registration-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import{BasicRegModule} from './basic-reg/basic-reg.module'
@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    SharedModule,
    BasicRegModule
    
  ],
  declarations: []
})
export class RegistrationModule { }
