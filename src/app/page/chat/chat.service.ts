import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {ChatbotService} from '../../services/chatbot.service';
import {Activity} from '../../dto/Activity';
import {ActivityType} from '../../dto/ActivityType';
import {catchError} from 'rxjs/operators';
import {throwError as observableThrowError} from 'rxjs';
import {User} from '../../dto/User';

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
    return this.http.get<User>(environment.SERVER_ADDRESS + 'api/getUserInfo',
      {withCredentials: true}).pipe(catchError(this.errorHandler));
  }

  signout() {
    return this.chatbot.get('api/logout').pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error);
  }
}
