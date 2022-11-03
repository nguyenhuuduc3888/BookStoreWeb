import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsRoutingModule } from './contacts-routing.module';
import {ContactComponent} from './contact.component';
import {HttpClientModule} from '@angular/common/http';
import { ListComponent } from './list/list.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ContactComponent,
    ListComponent
  ],
    imports: [
        CommonModule,
        ContactsRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ]
})
export class ContactsModule { }
