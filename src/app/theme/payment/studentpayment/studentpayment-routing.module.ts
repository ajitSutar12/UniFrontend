import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{StudentpaymentComponent} from './studentpayment.component'
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Student',
    
    },
  component:StudentpaymentComponent ,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentpaymentRoutingModule { }
