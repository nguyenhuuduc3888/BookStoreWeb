import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContactComponent} from './contact.component';
import {ListComponent} from './list/list.component';

const routes: Routes = [
  {path: 'contact', component: ContactComponent},
  {path: 'list/contact', component: ListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule {
}
