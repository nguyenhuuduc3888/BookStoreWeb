import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CartComponent} from './cart.component';
import {CartDetailComponent} from './cart-detail/cart-detail.component';


const routes: Routes = [
  {path: 'cart', component: CartComponent},
  {path: 'cart/detail', component: CartDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartsRoutingModule {
}
