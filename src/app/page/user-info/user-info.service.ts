import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {ChatbotService} from '../../services/chatbot.service';
import {catchError} from 'rxjs/operators';
import {throwError as observableThrowError} from 'rxjs';
import {User} from '../../dto/User';

@Injectable()
export class UserInfoService {

  /**
   *  Injects {ChatbotService} and {HttpClient}
   *
   *  @constructor
   */
  constructor(private chatbot: ChatbotService, private http: HttpClient) {
  }

  /**
   *  Calls server to get current user info
   *
   *  @returns User info from the server
   */
  getUserInfo() {
    return this.http.get<User>(environment.SERVER_ADDRESS + 'api/getUserInfo',
      {withCredentials: true}).pipe(catchError(this.errorHandler));
  }

  /**
   *  Calls server to interrupt the session
   */
  signOut() {
    return this.chatbot.get('api/logout').pipe(catchError(this.errorHandler));
  }

  /**
   *  Handles errors
   */
  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error);
  }

}
