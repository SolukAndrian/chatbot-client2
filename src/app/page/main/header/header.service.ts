import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
// import {Observable} from 'rxjs/Observable';
import {ChatbotService} from "../../../services/chatbot.service";
import {Observable} from "rxjs/internal/Observable";

@Injectable()
export class HeaderService {
  constructor(private chatbot: ChatbotService) {
  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
