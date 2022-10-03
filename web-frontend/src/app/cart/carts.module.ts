import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartsRoutingModule} from './carts-routing.module';
import {CartComponent} from './cart.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartsRoutingModule,
    HttpClientModule

  ]
})
export class CartsModule {
}
