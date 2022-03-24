import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructionComponent } from './instruction.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InstructionRoutingModule } from './instruction-routing.module'
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        InstructionRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule
    ],
    declarations: [InstructionComponent],
    providers: []
})
export class InstructionModule { }
