import {Component, OnInit} from '@angular/core';
import {UserInfoService} from './user-info.service';
import {User} from '../../dto/User';
import {Router} from '@angular/router';

/**
 * Provides current user information
 *
 * See {@link ../modules/UserInfoModule.html|UserInfoModule}
 */
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  /** Full user information */
  public user: User;
  /** For showing/hiding user info */
  public show = false;

  /**
   *  Injects {UserInfoService} and {Router}
   *
   *  @constructor
   *  @param {UserInfoService} userInfoService - To communicate with server
   *  @param {Router} router - To navigate via components
   */
  constructor(private userInfoService: UserInfoService, private router: Router) {
  }

  /**
   *  Loads current user information
   *  If any error occurs, return to home page
   */
  ngOnInit() {
    this.userInfoService.getUserInfo()
      .subscribe((response) => {
          this.user = new User(response.fullName, response.email,
            response.phone, response.position, response.department);
        },
        /* returns to home page in case of error occurrence */
        () => {
          this.router.navigate(['home']);
        });
  }

  /**
   *  Shows and hides information about the current user
   */
  toggle() {
    this.show = !this.show;
  }

  /**
   *  Clears user session and redirects to home page
   */
  public signOut(): void {
    this.userInfoService.signOut().subscribe(
      () => {
        this.router.navigate(['home']);
      },
      () => {
        this.router.navigate(['home']);
      });
  }

}
