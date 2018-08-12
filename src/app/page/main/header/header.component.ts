import {Component} from '@angular/core';
import {HeaderService} from './header.service';

/**
 * Provides Header element view
 *
 * See {@link ../modules/AppModule.html|AppModule}
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  /**
   *  Injects {HeaderService}
   *
   *  @constructor
   *  @param {HeaderService} headerService - To communicate with server
   */
  constructor(private headerService: HeaderService) {
  }

}
