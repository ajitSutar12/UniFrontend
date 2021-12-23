import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollegepaymentComponent } from './collegepayment/collegepayment.component';
import {AnybodypaymentComponent} from './anybodypayment/anybodypayment.component'
import { StudentpaymentComponent } from './studentpayment/studentpayment.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component:DashboardComponent,
  //   data: {
  //     title: 'Dashboard',
  //     status: false
  //   },
  //   children: [
  //     {
  //       path: 'default',
  //       component:DashboardComponent
  //     },

  //   ]
  
  // },
  {
    path:'',
    data: {
      title: 'Payment',
      status: false
    },
    children: [ 
      {
        path: 'studentpayment',
        loadChildren: () => import('./studentpayment/studentpayment.module').then(m => m.StudentpaymentModule)
      },
      {
        path: 'collegepayment',
        data: {
          title: 'College',
        
        },
        component:CollegepaymentComponent
      },
      {
        path: 'anybodypayment',
        data: {
          title: 'Anybody Payment',
        
        },
        component:AnybodypaymentComponent
      },
      // {
      //   path: 'dashboard',
      //   loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      // },
      // {
      //   path: 'studentpayment',
      //   loadChildren: () => import('./studentpayment/studentpayment.module').then(m => m.StudentpaymentModule)
      // },
    ]
    
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
