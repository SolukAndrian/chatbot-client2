import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ChatService} from './chat.service';
import {ChatComponent} from './chat.component';
import {UserInfoModule} from '../user-info/user-info.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    UserInfoModule,
    RouterModule.forChild([
      {path: 'chat', component: ChatComponent}
    ])
  ],
  exports: [],
  declarations: [
    ChatComponent
  ],
  providers: [
    ChatService
  ],
})
export class ChatModule {
}
