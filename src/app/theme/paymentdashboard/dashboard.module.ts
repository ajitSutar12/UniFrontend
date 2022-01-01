import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DataTablesModule } from "angular-datatables";
import { DashboardService } from './dashboard.service'
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DataTablesModule
  ],
  providers: [DashboardService]
})
export class DashboardModule { }
