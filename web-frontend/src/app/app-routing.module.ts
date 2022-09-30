import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home/home'},
  // {path: 'home', loadChildren: () => import('./homes/homes.module').then(module => module.HomesModule)},
  // {path: 'cart', loadChildren: () => import('./cart/cart.module').then(module => module.CartModule)},
  // {path: 'bookDetail', loadChildren: () => import('./book-detail/book-detail.module').then(module => module.BookDetailModule)},
  // {path: 'login', loadChildren: () => import('./login/login.module').then(module => module.LoginModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
