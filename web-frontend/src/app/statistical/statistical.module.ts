import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatisticalComponent} from './statistical.component';
import {StatisticalRoutingModule} from './statistical-routing.module';


@NgModule({
  declarations: [
    StatisticalComponent
  ],
  imports: [
    CommonModule,
    StatisticalRoutingModule
  ]
})
export class StatisticalModule {
}
