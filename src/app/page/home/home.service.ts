import {Injectable} from '@angular/core';
import {ChatbotService} from '../../services/chatbot.service';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {throwError as observableThrowError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class HomeService {

  constructor(private chatbot: ChatbotService, private http: HttpClient) {
  }

  authorization(login: string, password: string, rememberMe: boolean): Observable<Object> {
    const body = new FormData();
    body.append('username', login);
    body.append('password', password);
    if (rememberMe) {
      body.append('remember-me', 'on');
    }

    return this.chatbot.post('api/login', body).pipe(catchError(this.errorHandler));
  }

  ping() {
    return this.http.get(environment.SERVER_ADDRESS + 'api/ping', {withCredentials: true})
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error);
  }
}
