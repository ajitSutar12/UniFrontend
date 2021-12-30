import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaveProceedComponent } from './save-proceed.component'
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Bank Payment',
    },
    component: SaveProceedComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaveProceedRoutingModule { }
