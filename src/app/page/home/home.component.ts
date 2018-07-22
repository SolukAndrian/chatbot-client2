import {Component, OnInit} from '@angular/core';
import {HomeService} from './home.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isError = false;
  public errorMessage: string;
  constructor(private homeService: HomeService, private router: Router) {
  }

  ngOnInit() {
  }

  authorization(login: string, password: string) {
    this.homeService.authorization(login, password)
      .subscribe(() => {
          this.router.navigate(['chat']);
        },
        (error) => {
          this.isError = true;
          this.errorMessage = (error.status === 401 ? 'Incorrect login or password' : 'Server error');
        });
  }
}
