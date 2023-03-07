import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";
import { UtilityRoutingModule } from './utility-routing.module'
import { UtilityComponent } from './utility.component';
import { SharedModule } from '../../../shared/shared.module'
@NgModule({
  declarations: [UtilityComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    UtilityRoutingModule,
    SharedModule
  ],
  providers: []
})
export class UtilityModule { }
