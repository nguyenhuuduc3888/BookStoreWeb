import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginChatComponent} from './login-chat/login-chat.component';
import {RoomlistComponent} from './room-list/room-list.component';
import {AddRoomComponent} from './addroom/addroom.component';
import {ChatroomComponent} from './chatroom/chatroom.component';


const routes: Routes = [
  { path: 'login/chat', component: LoginChatComponent },
  { path: 'room/list', component: RoomlistComponent },
  { path: 'add/room', component: AddRoomComponent },
  { path: 'chat/:roomname', component: ChatroomComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatsRoutingModule { }
