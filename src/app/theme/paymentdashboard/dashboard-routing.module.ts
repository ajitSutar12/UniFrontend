import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{DashboardComponent} from './dashboard.component'
const routes: Routes = [
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./dashboard.module').then(m => m.DashboardModule)
  // },
  {
    path: '',
    data: {
      title: 'Dashboard',
    
    },
  component: DashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
