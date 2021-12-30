import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SaveProceedComponent } from './save-proceed.component';
import { SaveProceedRoutingModule } from './save-proceed-routing.module'
import { SaveProceedService } from './save-proceed.service'
@NgModule({
  // declarations: [SaveProceedComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SaveProceedRoutingModule
  ],
  providers: [SaveProceedService]
})
export class SaveProceedModule { }
