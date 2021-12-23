import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CollegepaymentRoutingModule } from './collegepayment-routing.module';
import { CollegepaymentComponent } from './collegepayment.component';
import { CollegepaymentService } from './collegepayment.service';


@NgModule({
  declarations: [CollegepaymentComponent],
  imports: [
    CommonModule,
    CollegepaymentRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
    

  ],
  providers:[CollegepaymentService]
})
export class CollegepaymentModule { }
