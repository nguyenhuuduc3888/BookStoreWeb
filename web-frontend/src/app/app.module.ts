import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomesModule} from './home/homes.module';
import {ContactsModule} from './contact/contacts.module';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {CartsModule} from './cart/carts.module';
import {LoginsModule} from './login/logins.module';
import {BookDetailsModule} from './book-detail/book-details.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomesModule,
    ContactsModule,
    CartsModule,
    LoginsModule,
    BookDetailsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
