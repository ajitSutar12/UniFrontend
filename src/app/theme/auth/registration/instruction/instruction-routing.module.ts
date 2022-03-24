import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructionComponent } from './instruction.component';

const routes: Routes = [
  {
    path: '',
    component: InstructionComponent,
    data: {
      title: 'Instruction'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructionRoutingModule { }
