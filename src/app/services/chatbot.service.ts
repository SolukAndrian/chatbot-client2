import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ChatbotService {

  constructor(private http: HttpClient) {
  }

  /** Make get call to the server */
  get(url: string) {
    return this.http.get(environment.SERVER_ADDRESS + url, {withCredentials: true});
  }

  /**  Make post call to the server */
  post(url: string, body: any) {
    return this.http.post(environment.SERVER_ADDRESS + url, body, {withCredentials: true});
  }

  /** Make put call to the server */
  put(url: string, body: any) {
    return this.http.put(environment.SERVER_ADDRESS + url, body, {withCredentials: true});
  }

  /** Make get delete to the server */
  delete(url: string) {
    return this.http.delete(environment.SERVER_ADDRESS + url, {withCredentials: true});
  }

  /** Make delete call to the server without server address prefix */
  deleteByLongLink(url: string) {
    return this.http.delete(url, {withCredentials: true});
  }

}
