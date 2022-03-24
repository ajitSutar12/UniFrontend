import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RegistrationModule } from './registration/registration.module'
import { InstructionModule } from './registration/instruction/instruction.module'
@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    RegistrationModule,
    InstructionModule
  ],
  declarations: []
})
export class AuthModule { }
