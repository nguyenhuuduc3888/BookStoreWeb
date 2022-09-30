import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginsRoutingModule } from './logins-routing.module';
import { RestigerComponent } from './restiger.component';
import {LoginComponent} from './login.component';

@NgModule({
  declarations: [
    LoginComponent,
    RestigerComponent
  ],
  imports: [
    CommonModule,
    LoginsRoutingModule,
  ]
})
export class LoginsModule { }
