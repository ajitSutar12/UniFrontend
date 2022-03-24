import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollegepaymentComponent } from './collegepayment/collegepayment.component';
import { AnybodypaymentComponent } from './anybodypayment/anybodypayment.component'
import { StudentpaymentComponent } from './studentpayment/studentpayment.component';
import { StudentdraftComponent } from './studentdraft/studentdraft.component'
import { CollegedraftComponent } from './collegedraft/collegedraft.component'
import { AnybodydraftComponent } from './anybodydraft/anybodydraft.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { FeedbackComponent } from './feedback/feedback.component';
const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Payment',
      status: false
    },
    children: [
      {
        path: 'feedback',
        data: {
          title: 'feedback',
          status: false
        },
        component: FeedbackComponent
      },
      {
        path: 'receipt',
        data: {
          title: 'Receipt',
          status: false
        },
        component: ReceiptComponent
      },
      {
        path: 'student',
        data: {
          title: 'Student',
          status: false
        },

        children: [
          {
            path: 'studentpayment/:id',
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
            path: 'collegepayment/:id',
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
          title: 'Other',
          status: false
        },
        children: [
          {
            path: 'anybodypayment/:id',
            data: {
              title: 'Other Payment',

            },
            component: AnybodypaymentComponent
          },
          {
            path: 'anybodydraft',
            data: {
              title: 'Anyone Draft',

            },
            component: AnybodydraftComponent
          },

        ]

      }


    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
