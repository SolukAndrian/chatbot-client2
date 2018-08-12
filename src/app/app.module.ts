import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HeaderComponent} from './page/main/header/header.component';
import {HeaderService} from './page/main/header/header.service';
import {HomeModule} from './page/home/home.module';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {ChatbotService} from './services/chatbot.service';
import {ChatModule} from './page/chat/chat.module';
import {UserInfoModule} from './page/user-info/user-info.module';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    HomeModule,
    ChatModule,
    UserInfoModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: '**', redirectTo: 'home', pathMatch: 'full'}
    ])
  ],
  providers: [HeaderService, ChatbotService],
  bootstrap: [HeaderComponent]
})
export class AppModule {
}
