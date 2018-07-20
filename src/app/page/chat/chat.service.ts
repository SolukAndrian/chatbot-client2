import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ChatbotService} from '../../services/chatbot.service';
import {Activity} from '../../dto/Activity';
import {ActivityType} from '../../dto/ActivityType';
import {catchError} from 'rxjs/operators';
import {throwError as observableThrowError} from 'rxjs';

@Injectable()
export class ChatService {

  constructor(private chatbot: ChatbotService, private http: HttpClient) {
  }

  getAnswer(value: string) {
    const message = new Activity(value, '', false);
    message.type = ActivityType.MESSAGE;
    return this.http.post<Activity>(environment.SERVER_ADDRESS + 'api/messages',
      message, {withCredentials: true});
  }

  getUserInfo() {
    return this.chatbot.get('api/userDetails').pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error);
  }
}
