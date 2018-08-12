import {Component, OnInit} from '@angular/core';
import {HomeService} from './home.service';
import {Router} from '@angular/router';
import {OK, UNAUTHORIZED} from '../../services/chatbot.setting';

/**
 * Provides authorization page view
 *
 * See {@link ../modules/HomeModule.html|HomeModule}
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /** Pattern for verifying user email */
  public emailPattern = '^[\\w.+\\-]+@epam.com$';
  /** Pattern for verifying user password */
  public passwordPattern = '^(((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]))|' +
    '((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]))|' +
    '((?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]))|' +
    '((?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?=.*?[A-Z])))' +
    '.{9,}$';

  /** Uses for displaying error message */
  public isError = false;
  /** Uses for saving error message content */
  public errorMessage: string;

  /**
   *  Injects {HomeService) and {Router}
   *
   *  @constructor
   *  @param {HomeService} homeService - To communicate with server
   *  @param {Router} router - To navigate via components
   */
  constructor(private homeService: HomeService, private router: Router) {
  }

  /**
   *  Checks if user is already authorized.
   *  If yes, user will be redirected to chat page
   */
  ngOnInit() {
    this.homeService.ping().subscribe(
      () => {
      },
      (error) => {
        if (error.status === OK) {
          this.router.navigate(['chat']);
        }
      });
  }

  /**
   *  Calls home servise for authorizing the current user.
   *  Redirects to chat page in case data entered correctly
   *  Reports an error otherwise
   */
  private authorization(login: string, password: string, rememberMe: boolean): void {
    this.homeService.authorization(login, password, rememberMe)
      .subscribe(() => {
          this.router.navigate(['chat']);
        },
        (error) => {
          this.isError = true;
          this.errorMessage = (error.status === UNAUTHORIZED
            ? 'Incorrect username or password' : 'Server error');
        });
  }

  /**
   *  Checks whether the email address and the password match the patterns
   */
  private isValid(email: string, password: string): boolean {
    const emailRegex = new RegExp(this.emailPattern);
    const isEmailValid = emailRegex.test(email);
    const passwordRegex = new RegExp(this.passwordPattern);
    const isPasswordValid = passwordRegex.test(password);
    return isEmailValid && isPasswordValid;
  }

  /**
   *  Authorize in case email address and password match the patterns
   */
  submitted(email: string, password: string, checked: boolean): void {
    if (this.isValid(email, password)) {
      this.authorization(email, password, checked);
    }
  }

}
