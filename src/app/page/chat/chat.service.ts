import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {Activity} from '../../dto/Activity';
import {ActivityType} from '../../dto/ActivityType';

@Injectable()
export class ChatService {

  /**
   *  Injects {HttpClient}
   *
   *  @constructor
   */
  constructor(private http: HttpClient) {
  }

  /**
   *  Sends user message to the server
   *
   *  @returns  Bot response from the server
   */
  getAnswer(value: string) {
    const message = new Activity(value, '', false, ActivityType.MESSAGE);
    return this.http.post<Activity>(environment.SERVER_ADDRESS + 'api/messages',
      message, {withCredentials: true});
  }

}
