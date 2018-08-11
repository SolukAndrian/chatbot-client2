import {Component, OnInit} from '@angular/core';
import {HomeService} from './home.service';
import {Router} from '@angular/router';
import {OK, UNAUTHORIZED} from '../../services/chatbot.setting';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // patterns for verifying user input
  public emailPattern = '^[\\w.+\\-]+@epam.com$';
  public passwordPattern = '^(((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]))|' +
    '((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]))|' +
    '((?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]))|' +
    '((?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?=.*?[A-Z])))' +
    '.{9,}$';

  // uses for displaying error message
  public isError = false;
  // uses for saving error message content
  public errorMessage: string;

  constructor(private homeService: HomeService, private router: Router) {
  }

  // checks if user already authorized
  ngOnInit() {
    this.homeService.ping().subscribe(
      () => {
      },
      // if authorized, redirects to chat page
      (error) => {
        if (error.status === OK) {
          this.router.navigate(['chat']);
        }
      });
  }

  // calls server for creating session for current user
  private authorization(login: string, password: string, rememberMe: boolean): void {
    this.homeService.authorization(login, password, rememberMe)
    // redirects to chat page in case data entered correctly
      .subscribe(() => {
          this.router.navigate(['chat']);
        },
        // reports an error in case the data entered incorrectly
        (error) => {
          this.isError = true;
          this.errorMessage = (error.status === UNAUTHORIZED
            ? 'Incorrect username or password' : 'Server error');
        });
  }

  // checks whether the email address and the password match the patterns
  private isValid(email: string, password: string): boolean {
    const emailRegex = new RegExp(this.emailPattern);
    const isEmailValid = emailRegex.test(email);
    const passwordRegex = new RegExp(this.passwordPattern);
    const isPasswordValid = passwordRegex.test(password);
    return isEmailValid && isPasswordValid;
  }

  // authorize if email address and password match the patterns
  submitted(email: string, password: string, checked: boolean): void {
    if (this.isValid(email, password)) {
      this.authorization(email, password, checked);
    }
  }
}
