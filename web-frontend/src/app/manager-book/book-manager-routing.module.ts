import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookManagerComponent} from './list/book-manager.component';
import {CreateComponent} from './create/create.component';
import {EditComponent} from './edit/edit.component';


const routes: Routes = [
  {path: 'manager', component: BookManagerComponent},
  {path: 'create', component: CreateComponent},
  {path: 'edit/:id', component: EditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookManagerRoutingModule {
}
