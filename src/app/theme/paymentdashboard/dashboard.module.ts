import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DataTablesModule } from "angular-datatables";
import { DashboardService } from './dashboard.service'
import { DashboardComponent } from './dashboard.component';
import { UtilityModule } from './utility/utility.module'
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    DataTablesModule,
    UtilityModule,
  ],
  providers: [DashboardService]
})
export class DashboardModule { }
