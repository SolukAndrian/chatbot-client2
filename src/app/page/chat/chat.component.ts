import {Component, OnInit} from '@angular/core';
import {ChatService} from './chat.service';
import {Activity} from '../../dto/Activity';

@Component({
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  public messages: Activity[] = new Array();
  public reg = 'registration';

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
  }

  public addMessage(value: string): void {
    this.addUserMessage(value);
    this.addBotAnswer(value);
  }

  private addUserMessage(value: string): void {
    this.messages.unshift(
      new Activity(value, this.getCurrentTime(), false)
    );
  }

  private addBotAnswer(value: string): void {
    this.chatService.getAnswer(value).subscribe(
      message => this.messages.unshift(new Activity(message.text, this.getCurrentTime(), true))
    );
  }

  private getCurrentTime(): string {
    const date = new Date();
    return (((date.getHours() < 10) ? '0' : '') + date.getHours() + ':' + ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes());
  }

  public generateKey(email: string){
    return this.chatService.generateKey(email).subscribe(res => {});
  }
}
