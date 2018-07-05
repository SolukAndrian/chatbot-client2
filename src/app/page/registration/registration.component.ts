import {Component, OnInit} from '@angular/core';
import {RegistrationService} from './registration.service';
import {Router} from '@angular/router';
import {UserDTO} from '../../dto/UserDTO';

@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  login: string;
  password: string;
  firstName: string;
  lastName: string;

  constructor(private registrationService: RegistrationService) {
  }

  ngOnInit() {
  }

  registration(): void {
    this.registrationService.registerUser(
      new UserDTO(this.login, this.password, this.firstName, this.lastName)).subscribe(res => {});
  }
}
