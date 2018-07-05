import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ChatbotService} from '../../services/chatbot.service';
import {MessageDTO} from '../../dto/MessageDTO';

@Injectable()
export class ChatService {
  constructor(private chatbot: ChatbotService, private http: HttpClient) {
  }

  getAnswer(value: string) {
    return this.http.post<MessageDTO>(environment.SERVER_ADDRESS + 'api/message', value);
  }
}
