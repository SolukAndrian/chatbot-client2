import {Component, OnInit} from '@angular/core';
import {ChatService} from './chat.service';
import {Activity} from '../../dto/Activity';
import {ActivityType} from '../../dto/ActivityType';

/**
 * Provides view for chatting with bot
 *
 * See {@link ../modules/ChatModule.html|ChatModule}
 */
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  /** For user input verification */
  public readonly ENTER_CODE_OLD = 10;
  /** For user input verification */
  public readonly ENTER_CODE_NEW = 13;

  /** User input message */
  public input = '';
  /** All messages from user and bot */
  public messages: Activity[] = [];
  /** For checking if bot response contains link */
  public spliterator = 'https://';

  /**
   *  Injects {ChatService} and {Router}
   *
   *  @constructor
   *  @param {ChatService} chatService - To communicate with server
   */
  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
  }

  /**
   *  Manipulates with user/bot messages
   *  Clears user input area
   */
  public addMessages(event): void {
    // Check if input isn't empty
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

  /**
   * Sets new message from the user to messages array of {Activity} type
   */
  private addUserMessage(value: string): void {
    this.messages.unshift(
      new Activity(value, this.getCurrentTime(), false, ActivityType.MESSAGE)
    );
  }

  /**
   *  Sets response message from the bot to messages array of {Activity} type
   */
  private addBotAnswer(value: string): void {
    // calls server for bot response
    this.chatService.getAnswer(value).subscribe(
      message => {
        if (message.text.includes(this.spliterator)) {
          // if bot response contains a link
          const linkText = message.text.substring(0, message.text.indexOf(this.spliterator));
          const activity = new Activity(linkText, this.getCurrentTime(), true, ActivityType.LINK);
          activity.link = message.text.substring(message.text.indexOf(this.spliterator));
          this.messages.unshift(activity);
        } else {
          // if bot response doesn't contains a link
          this.messages.unshift(new Activity(message.text, this.getCurrentTime(), true, ActivityType.MESSAGE));
        }
      });
  }

  /**
   *  Creates custom representation of current time of {string} type
   *
   *  @returns Current time in custom representation
   */
  private getCurrentTime(): string {
    const date = new Date();
    return (((date.getHours() < 10) ? '0' : '') + date.getHours() + ':'
      + ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes());
  }

}
