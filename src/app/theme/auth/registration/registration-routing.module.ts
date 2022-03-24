import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicRegComponent } from './basic-reg/basic-reg.component';
import { InstructionComponent } from '../registration/instruction/instruction.component';

const routes: Routes = [
  {
    path: '',
    component: BasicRegComponent,
    data: {
      title: 'Registration',
      status: false
    },
    children: [
      {
        path: 'simple',
        loadChildren: () => import('./basic-reg/basic-reg.module').then(m => m.BasicRegModule)
      },
      {
        path: 'instruction',
        loadChildren: () => import('./instruction/instruction.module').then(m => m.InstructionModule)
        // component : InstructionComponent
      },
      {
        path: 'header-footer',
        loadChildren: () => import('./header-footer-reg/header-footer-reg.module').then(m => m.HeaderFooterRegModule)
      },
      {
        path: 'social',
        loadChildren: () => import('./social-reg/social-reg.module').then(m => m.SocialRegModule)
      },
      {
        path: 'social-header-footer',
        loadChildren: () => import('./social-header-footer-reg/social-header-footer-reg.module').then(m => m.SocialHeaderFooterRegModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }



