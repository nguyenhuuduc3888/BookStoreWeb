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
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {BookManagerModule} from './manager-book/book-manager.module';

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
    HttpClientModule,
    BookManagerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ToastrModule.forRoot({
        timeOut: 800,
        progressBar: true,
        onActivateTick: true,
        enableHtml: true,
      messageClass: 'center',
      positionClass: 'toast-top-center'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
