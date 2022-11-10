import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddRoomComponent} from './addroom/addroom.component';
import {LoginChatComponent} from './login-chat/login-chat.component';
import {RoomlistComponent} from './room-list/room-list.component';
import {ChatroomComponent} from './chatroom/chatroom.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ChatsRoutingModule} from './chats-routing.module';


@NgModule({
  declarations: [
    AddRoomComponent,
    LoginChatComponent,
    RoomlistComponent,
    ChatroomComponent
  ],
  imports: [
    CommonModule,
    ChatsRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ChatsModule { }
