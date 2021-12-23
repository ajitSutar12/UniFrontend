import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo.component';
import { DemoRoutingModule } from './demo-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';   
import {SelectOptionService} from '../../../../shared/elements/select-option.service'
import { NgSelectModule } from '@ng-select/ng-select';
import {ColorPickerModule} from 'ngx-color-picker';
import {FormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {SharedModule} from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DemoRoutingModule,
    NgbModule,
    NgSelectModule,
    ColorPickerModule,
    FormsModule,
    DataTablesModule,
    SharedModule
  ],
  declarations: [DemoComponent],
  providers: [SelectOptionService]
})
export class DemoModule { }
