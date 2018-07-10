import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HeaderComponent} from './page/main/header/header.component';
import {HeaderService} from './page/main/header/header.service';
import {HomeModule} from './page/home/home.module';
import {RouterModule} from '@angular/router';
import {RegistrationService} from './page/registration/registration.service';
import {HttpClientModule} from '@angular/common/http';
import {ChatbotService} from './services/chatbot.service';
import {RegistrationModule} from './page/registration/registration.module';
import {ChatModule} from './page/chat/chat.module';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    HomeModule,
    RegistrationModule,
    ChatModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: '**', redirectTo: 'home', pathMatch: 'full'}
    ])
  ],
  providers: [HeaderService, RegistrationService, ChatbotService],
  bootstrap: [HeaderComponent]
})
export class AppModule { }
