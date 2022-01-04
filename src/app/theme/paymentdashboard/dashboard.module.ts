import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DataTablesModule } from "angular-datatables";
import { DashboardService } from './dashboard.service'
import { DashboardComponent } from './dashboard.component';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DataTablesModule,
  ],
  providers: [DashboardService]
})
export class DashboardModule { }
