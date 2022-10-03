import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomesRoutingModule } from './homes-routing.module';
import {HomeComponent} from './home.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class HomesModule { }
