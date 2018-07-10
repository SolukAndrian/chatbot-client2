import {Component, OnInit} from '@angular/core';
import {ChatService} from './chat.service';
import {Activity} from '../../dto/Activity';

@Component({
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  public readonly ENTER_CODE_OLD = 10;
  public readonly ENTER_CODE_NEW = 13;

  public reg = 'registration';
  public input: string;
  public messages: Activity[] = [];

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
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

  private addMessage(event): void {
    // Enter pressed
    if (!(event.ctrlKey || event.metaKey) && (event.keyCode === this.ENTER_CODE_NEW || event.keyCode === this.ENTER_CODE_OLD)) {
      this.addUserMessage(this.input);
      this.addBotAnswer(this.input);
      this.input = '';
      // Enter + Ctrl pressed
    } else if ((event.ctrlKey || event.metaKey) && (event.keyCode === this.ENTER_CODE_NEW || event.keyCode === this.ENTER_CODE_OLD)) {
      this.input += '\n';
    }
  }

  public generateKey(email: string) {
    return this.chatService.generateKey(email).subscribe(res => {
    });
  }
}
