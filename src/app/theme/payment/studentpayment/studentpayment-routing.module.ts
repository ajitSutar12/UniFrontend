import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentpaymentComponent } from './studentpayment.component'
import { SaveProceedComponent } from './save-proceed/save-proceed.component'
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Student',

    },
    children: [
      {
        path: 'studPayment',
        data: {
          title: 'studPayment',
          status: false
        },
        // loadChildren: () => import('./save-proceed/save-proceed.module').then(m => m.SaveProceedModule),
        component: SaveProceedComponent
      },
    ],

    component: StudentpaymentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentpaymentRoutingModule { }
