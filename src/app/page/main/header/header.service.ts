import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {ChatbotService} from '../../../services/chatbot.service';
import {throwError as observableThrowError} from 'rxjs';

@Injectable()
export class HeaderService {

  constructor(private chatbot: ChatbotService) {
  }

  private static handleError(error: Response) {
    console.error(error);
    return observableThrowError(error.json().error || 'Server error');
  }
}
