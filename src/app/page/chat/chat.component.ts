import {Component, OnInit} from '@angular/core';
import {ChatService} from './chat.service';
import {Activity} from '../../dto/Activity';
import {HomeService} from '../home/home.service';
import {Router} from '@angular/router';
import {User} from '../../dto/User';

@Component({
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public readonly ENTER_CODE_OLD = 10;
  public readonly ENTER_CODE_NEW = 13;

  public input = '';
  public messages: Activity[] = [];
  public user: User;
  public show = false;

  constructor(private chatService: ChatService,
              private homeService: HomeService, private router: Router) {
  }

  ngOnInit() {
    this.chatService.getUserInfo()
      .subscribe((response) => {
          this.user = new User(response.fullName, response.email,
            response.phone, response.position, response.department);
        },
        () => {
          this.router.navigate(['home']);
        });
  }

  toggle() {
    this.show = !this.show;
  }

  private addUserMessage(value: string): void {
    this.messages.unshift(
      new Activity(value, this.getCurrentTime(), false)
    );
  }

  private addBotAnswer(value: string): void {
    this.chatService.getAnswer(value).subscribe(
      message => this.messages
        .unshift(new Activity(message.text, this.getCurrentTime(), true))
    );
  }

  private getCurrentTime(): string {
    const date = new Date();
    return (((date.getHours() < 10) ? '0' : '') + date.getHours() + ':'
      + ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes());
  }

  private addMessage(event): void {
    if (this.input === '\n') {
      this.input = '';
    } else {
      // Enter pressed
      if (!(event.ctrlKey || event.metaKey) && (event.keyCode === this.ENTER_CODE_NEW
        || event.keyCode === this.ENTER_CODE_OLD)) {
        this.addUserMessage(this.input);
        this.addBotAnswer(this.input);
        this.input = '';
        // Enter + Ctrl pressed
      } else if ((event.ctrlKey || event.metaKey) && (event.keyCode === this.ENTER_CODE_NEW
        || event.keyCode === this.ENTER_CODE_OLD)) {
        this.input += '\n';
      }
    }
  }

  private signout(): void {
    this.chatService.signout().subscribe(
      () => {
        this.router.navigate(['home']);
      },
      () => {
      });
  }
}
