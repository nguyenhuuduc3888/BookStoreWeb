import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartsRoutingModule} from './carts-routing.module';
import {CartComponent} from './cart.component';
import {HttpClientModule} from '@angular/common/http';
import { CartDetailComponent } from './cart-detail/cart-detail.component';

@NgModule({
  declarations: [
    CartComponent,
    CartDetailComponent
  ],
  imports: [
    CommonModule,
    CartsRoutingModule,
    HttpClientModule

  ]
})
export class CartsModule {
}
