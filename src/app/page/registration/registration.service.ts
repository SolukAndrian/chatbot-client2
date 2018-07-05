import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
// import {Observable} from 'rxjs/Observable';
import {ChatbotService} from "../../services/chatbot.service";
import {UserDTO} from "../../dto/UserDTO";
import {Router} from "@angular/router";
import {catchError, map, takeUntil, tap} from 'rxjs/operators';
import {Observable} from "rxjs/internal/Observable";


@Injectable()
export class RegistrationService {
  constructor(private chatbotService: ChatbotService) {
  }

  public registerUser(user: UserDTO): Observable<UserDTO> {
    return this.chatbotService.post('api/registration', user)
      .pipe(map((response: any) => response.json()));
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
