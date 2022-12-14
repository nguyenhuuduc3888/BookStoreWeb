import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginsRoutingModule } from './logins-routing.module';
import { RestigerComponent } from './restiger.component';
import {LoginComponent} from './login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    RestigerComponent,
    ForgotPasswordComponent
  ],
    imports: [
        CommonModule,
        LoginsRoutingModule,
        ReactiveFormsModule,
    ]
})
export class LoginsModule { }
