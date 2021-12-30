import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicRegComponent } from './basic-reg.component';
import { BasicRegRoutingModule } from './basic-reg-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgPasswordValidatorModule } from 'ng-password-validator';
import { BasicRegService } from './basic-reg.service';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    BasicRegRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgPasswordValidatorModule,
    NgSelectModule
  ],
  declarations: [BasicRegComponent,],
  providers: [BasicRegService]
})
export class BasicRegModule { }
