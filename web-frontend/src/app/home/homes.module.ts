import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomesRoutingModule } from './homes-routing.module';
import {HomeComponent} from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomesRoutingModule
  ]
})
export class HomesModule { }
