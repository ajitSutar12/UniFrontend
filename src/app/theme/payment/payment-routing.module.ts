import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollegepaymentComponent } from './collegepayment/collegepayment.component';
import { AnybodypaymentComponent } from './anybodypayment/anybodypayment.component'
import { StudentpaymentComponent } from './studentpayment/studentpayment.component';
import { StudentdraftComponent } from './studentdraft/studentdraft.component'
import { CollegedraftComponent } from './collegedraft/collegedraft.component'
import { AnybodydraftComponent } from './anybodydraft/anybodydraft.component';
import { ReceiptComponent } from './receipt/receipt.component'
const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Payment',
      status: false
    },

    children: [
      {
        path: 'student',
        data: {
          title: 'Student',
          status: false
        },

        children: [
          {
            path: 'studentpayment',
            loadChildren: () => import('./studentpayment/studentpayment.module').then(m => m.StudentpaymentModule)
          },
          {
            path: 'studentdraft',
            data: {
              title: 'Studentdraft',

            },
            component: StudentdraftComponent
          },
          // {
          //   path: 'collegepayment',
          //   data: {
          //     title: 'College',

          //   },
          //   component: CollegepaymentComponent
          // },
          // {
          //   path: 'anybodypayment',
          //   data: {
          //     title: 'Anybody Payment',

          //   },
          //   component: AnybodypaymentComponent
          // },
        ]

      },
      {
        path: 'college',
        data: {
          title: 'College',
          status: false
        },
        children: [
          {
            path: 'collegepayment',
            data: {
              title: 'College',

            },
            component: CollegepaymentComponent
          },
          {
            path: 'collegedraft',
            data: {
              title: 'Collegedraft',

            },
            component: CollegedraftComponent
          },


        ]

      },
      {
        path: 'anybody',
        data: {
          title: 'Anybody',
          status: false
        },
        children: [
          {
            path: 'anybodypayment',
            data: {
              title: 'Anybody Payment',

            },
            component: AnybodypaymentComponent
          },
          {
            path: 'anybodydraft',
            data: {
              title: 'Anybody Draft',

            },
            component: AnybodydraftComponent
          },

        ]

      },
      {
        path: 'Receipt',
        data: {
          title: 'receipt',
          status: false
        },
        component: ReceiptComponent
      }

    ],


  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
