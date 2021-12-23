import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../../shared/shared.module';
import{RegistrationModule} from './registration/registration.module'
@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    RegistrationModule
  ],
  declarations: []
})
export class AuthModule { }
