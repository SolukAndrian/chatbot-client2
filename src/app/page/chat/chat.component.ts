import {Component, OnInit} from '@angular/core';
import {ChatService} from './chat.service';
import {Activity} from '../../dto/Activity';
import {HomeService} from '../home/home.service';
import {Router} from '@angular/router';
import {User} from '../../dto/User';
import {ActivityType} from '../../dto/ActivityType';

@Component({
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  // for user input verification
  public readonly ENTER_CODE_OLD = 10;
  public readonly ENTER_CODE_NEW = 13;

  // user input message
  public input = '';
  // all messages from user and bot
  public messages: Activity[] = [];
  // user full information
  public user: User;
  // for showing/hiding user info
  public show = false;
  // for checking if bot mresponse contains link
  public spliterator = 'https://';

  constructor(private chatService: ChatService,
              private homeService: HomeService, private router: Router) {
  }

  // loads current user info
  ngOnInit() {
    this.chatService.getUserInfo()
      .subscribe((response) => {
          this.user = new User(response.fullName, response.email,
            response.phone, response.position, response.department);
        },
        /* if any errors occurs, return to home page */
        () => {
          this.router.navigate(['home']);
        });
  }

  // responsible for displaying and hiding information about the current user
  toggle() {
    this.show = !this.show;
  }

  // adds a new message from the user to messages array of Activity type
  private addUserMessage(value: string): void {
    this.messages.unshift(
      new Activity(value, this.getCurrentTime(), false, ActivityType.MESSAGE)
    );
  }

  // adds response message from the bot to messages array of Activity type
  private addBotAnswer(value: string): void {
    // calls server for bot response
    this.chatService.getAnswer(value).subscribe(
      message => {
        if (message.text.includes(this.spliterator)) {
          // if bot response contains a link
          const linkText = message.text.substring(0, message.text.indexOf(this.spliterator));
          const activity = new Activity(linkText, this.getCurrentTime(), true, ActivityType.LINK);
          activity.link =  message.text.substring(message.text.indexOf(this.spliterator));
          this.messages.unshift(activity);
        } else {
          // if bot response doesn't contains a link
          this.messages.unshift(new Activity(message.text, this.getCurrentTime(), true, ActivityType.MESSAGE));
        }
      });
  }

  // returns current time in custom representation
  private getCurrentTime(): string {
    const date = new Date();
    return (((date.getHours() < 10) ? '0' : '') + date.getHours() + ':'
      + ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes());
  }

  // manipulates with user/bot messages and clears user input area
  public addMessages(event): void {
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

  // deletes user session and redirects to home page
  public signOut(): void {
    this.chatService.signOut().subscribe(
      () => {
        this.router.navigate(['home']);
      },
      () => {
      });
  }

}
