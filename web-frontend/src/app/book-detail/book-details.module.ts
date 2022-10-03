import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsRoutingModule} from './book-details-routing.module';
import {BookDetailComponent} from './book-detail.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    BookDetailComponent
  ],
  imports: [
    CommonModule,
    BookDetailsRoutingModule,
    HttpClientModule
  ]
})
export class BookDetailsModule {
}
