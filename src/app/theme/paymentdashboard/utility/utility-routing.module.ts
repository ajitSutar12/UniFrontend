import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtilitydashboardComponent } from './utilitydashboard/utilitydashboard.component'
import { GenerateReceiptComponent } from './generateReceipt/generateReceipt.component'
import { UpdateMISComponent } from './updateMISS/MIS.component'
import { UtilityComponent } from './utility.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Utility',
      status: false
    },
    component:UtilityComponent
  },
  {
    path: 'excel',
    data: {
      title: 'Upload Excel',
      status: false
    },
    component: UtilitydashboardComponent
  },
  {
    path: 'generateReceipt',
    data: {
      title: 'Receipt',
      status: false
    },
    component: GenerateReceiptComponent
  },
  {
    path: 'mis',
    data: {
      title: 'Update MIS',
      status: false
    },
    component: UpdateMISComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilityRoutingModule { }
