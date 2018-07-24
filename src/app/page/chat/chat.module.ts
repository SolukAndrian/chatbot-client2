import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ChatService} from './chat.service';
import {ChatComponent} from './chat.component';
import {Autosize} from 'ngx-autosize';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {path: 'chat', component: ChatComponent}
    ])
  ],
  exports: [],
  declarations: [
    Autosize,
    ChatComponent
  ],
  providers: [
    ChatService
  ],
})
export class ChatModule {
}
