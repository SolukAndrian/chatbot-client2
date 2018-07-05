import {Injectable} from '@angular/core';
import {ChatbotService} from '../../services/chatbot.service';
import {UserDTO} from '../../dto/UserDTO';

@Injectable()
export class RegistrationService {
  constructor(private chatbotService: ChatbotService) {
  }

  public registerUser(user: UserDTO) {
    return this.chatbotService.post('api/registration', user);
  }
}
