import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RestigerComponent} from './restiger.component';
import {LoginComponent} from './login.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'restiger', component: RestigerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginsRoutingModule {
}
