import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ChatbotService} from '../../services/chatbot.service';
import {Activity} from '../../dto/Activity';
import {ActivityType} from '../../dto/ActivityType';

@Injectable()
export class ChatService {
  constructor(private chatbot: ChatbotService, private http: HttpClient) {
  }

  getAnswer(value: string) {
    const message = new Activity(value, '', false);
    message.type = ActivityType.MESSAGE;
    return this.http.post<Activity>(environment.SERVER_ADDRESS + 'api/messages', message);
  }

  generateKey(accountDto: string) {
    return this.chatbot.get('api/message/key?email=' + accountDto);
  }
}
