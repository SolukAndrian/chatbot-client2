import {Injectable} from '@angular/core';
import {ChatbotService} from '../../services/chatbot.service';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {throwError as observableThrowError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class HomeService {

  constructor(private chatbot: ChatbotService) {
  }

  authorization(login: string, password: string): Observable<Object> {
    const body = new FormData();
    body.append('username', login);
    body.append('password', password);
    return this.chatbot.post('api/login', body).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error);
  }
}
