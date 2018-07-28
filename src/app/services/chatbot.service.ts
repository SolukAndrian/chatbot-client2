import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ChatbotService {

  constructor(private http: HttpClient) {
  }

  get(url: string) {
    return this.http.get(environment.SERVER_ADDRESS + url, {withCredentials: true});
  }

  post(url: string, body: any) {
    return this.http.post(environment.SERVER_ADDRESS + url, body, {withCredentials: true});
  }

  put(url: string, body: any) {
    return this.http.put(environment.SERVER_ADDRESS + url, body, {withCredentials: true});
  }

  delete(url: string) {
    return this.http.delete(environment.SERVER_ADDRESS + url, {withCredentials: true});
  }

  deleteByLongLink(url: string) {
    return this.http.delete(url, {withCredentials: true});
  }
}
