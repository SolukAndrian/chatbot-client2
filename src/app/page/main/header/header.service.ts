import {Injectable} from '@angular/core';
import {throwError as observableThrowError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class HeaderService {

  constructor() {
  }

  /**
   *  Handles errors
   */
  static errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error);
  }

}
