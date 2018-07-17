import {Injectable} from '@angular/core';
import {ChatbotService} from '../../services/chatbot.service';
import {Observable} from 'rxjs';
import {AuthenticationDTO} from '../../dto/AuthenticationDTO';

@Injectable()
export class HomeService {

  constructor(private chatbot: ChatbotService) {
  }

  authorization(login: string, password: string): Observable<Object> {
    const authentication = new AuthenticationDTO(login, password);
    return this.chatbot.post('api/login', authentication);
  }
}
