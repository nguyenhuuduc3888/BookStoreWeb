import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BookManagerRoutingModule} from './book-manager-routing.module';
import {BookManagerComponent} from './list/book-manager.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CreateComponent} from './create/create.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [BookManagerComponent, CreateComponent, EditComponent],
  imports: [
    CommonModule,
    BookManagerRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ]
})
export class BookManagerModule {
}
