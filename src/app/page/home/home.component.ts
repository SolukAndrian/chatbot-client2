import {Component, OnInit} from '@angular/core';
import {HomeService} from './home.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public emailPattern = '^[\\w.+\\-]+@epam.com$';
  public passwordPattern = '^(((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]))|' +
    '((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]))|' +
    '((?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]))|' +
    '((?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?=.*?[A-Z])))' +
    '.{9,}$';
  public isError = false;
  public errorMessage: string;

  constructor(private homeService: HomeService, private router: Router) {
  }

  ngOnInit() {
    this.homeService.ping().subscribe(
      () => {
      },
      (error) => {
        if (error.status === 200) {
          this.router.navigate(['chat']);
        }
      });
  }

  private authorization(login: string, password: string, rememberMe: boolean): void {
    this.homeService.authorization(login, password, rememberMe)
      .subscribe(() => {
          this.router.navigate(['chat']);
        },
        (error) => {
          this.isError = true;
          this.errorMessage = (error.status === 401 ? 'Incorrect username or password' : 'Server error');
        });
  }

  private isValid(email: string, password: string): boolean {
    const emailRegex = new RegExp(this.emailPattern);
    const isEmailValid = emailRegex.test(email);
    const passwordRegex = new RegExp(this.passwordPattern);
    const isPasswordValid = passwordRegex.test(password);
    return isEmailValid && isPasswordValid;
  }

  private submitted(email: string, password: string, checked: boolean): void {
    if (this.isValid(email, password)) {
      this.authorization(email, password, checked);
    }
  }
}
