import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
// import { MenuItems } from './shared/menu-items/menu-items';
import { BreadcrumbsComponent } from './layout/admin/breadcrumbs/breadcrumbs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentregisterationComponent } from './theme/studentregisteration/studentregisteration.component';
import { UniversityformsRoutingModule } from './theme/universityforms/universityforms-routing.module';
import { UniversityformsModule } from './theme/universityforms/universityforms.module';
import { DashboardModule } from './theme/paymentdashboard/dashboard.module';
import { PaymentModule } from './theme/payment/payment.module';
import { DataTablesModule } from 'angular-datatables';
import { NgPasswordValidatorModule } from 'ng-password-validator';
import { NgSelectModule } from '@ng-select/ng-select';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserAuthInterceptor } from './user-auth.interceptor';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    BreadcrumbsComponent,
    StudentregisterationComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgIdleKeepaliveModule.forRoot(),

    UniversityformsRoutingModule,
    UniversityformsModule,
    PaymentModule,
    DataTablesModule,
    NgPasswordValidatorModule,
    DashboardModule,
    NgSelectModule



  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserAuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

