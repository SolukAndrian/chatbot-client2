import {Component, OnInit} from '@angular/core';
import {ChatService} from './chat.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MessageDTO} from '../../dto/MessageDTO';

@Component({
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public messages: string[] = new Array();

  constructor(private chatService: ChatService, private http: HttpClient) {
  }

  ngOnInit() {
  }

  addMessage(value: string) {
    this.getAnswer(value).subscribe(message => this.messages.push(message.value));
  }

  getAnswer(value: string): Observable<MessageDTO> {
    this.messages.push(value);
    return this.chatService.getAnswer(value);
  }
}
