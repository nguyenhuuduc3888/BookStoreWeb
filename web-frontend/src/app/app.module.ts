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
import {StatisticalModule} from './statistical/statistical.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {DatePipe} from '@angular/common';
import {ChatsModule} from './chats/chats.module';
import {FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';


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
    ChatsModule,
    ContactsModule,
    CartsModule,
    LoginsModule,
    BookDetailsModule,
    HttpClientModule,
    BookManagerModule,
    StatisticalModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule.initializeApp(environment.firebaseConfigs),
    AngularFirestoreModule,
    ToastrModule.forRoot({
      timeOut: 800,
      progressBar: true,
      onActivateTick: true,
      enableHtml: true,
      messageClass: 'center',
      positionClass: 'toast-top-center'
    }),
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1142867386344013'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
