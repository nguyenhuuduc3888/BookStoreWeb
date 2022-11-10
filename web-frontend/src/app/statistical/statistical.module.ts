import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatisticalComponent} from './statistical.component';
import {StatisticalRoutingModule} from './statistical-routing.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    StatisticalComponent
  ],
    imports: [
        CommonModule,
        StatisticalRoutingModule,
        ReactiveFormsModule
    ]
})
export class StatisticalModule {
}
