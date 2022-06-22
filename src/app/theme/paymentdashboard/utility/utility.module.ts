import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";
import { UtilityRoutingModule } from './utility-routing.module'
import { UtilityComponent } from './utility.component';
@NgModule({
  declarations: [UtilityComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    UtilityRoutingModule
  ],
  providers: []
})
export class UtilityModule { }
