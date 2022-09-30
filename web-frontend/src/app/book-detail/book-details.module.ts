import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsRoutingModule } from './book-details-routing.module';
import {BookDetailComponent} from './book-detail.component';

@NgModule({
  declarations: [
    BookDetailComponent
  ],
  imports: [
    CommonModule,
    BookDetailsRoutingModule
  ]
})
export class BookDetailsModule { }
