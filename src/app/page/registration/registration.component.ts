import {Component, OnInit} from '@angular/core';
import {RegistrationService} from "./registration.service";
import {Router} from "@angular/router";
import {UserDTO} from "../../dto/UserDTO";

@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  errorMessage: string;

  constructor(private registrationService: RegistrationService, private router: Router) {
  }

  ngOnInit() {
  }

  register(){
    console.log("Register")
    this.registrationService.registerUser(
      new UserDTO(this.username, this.password, this.firstName, this.lastName))
      .subscribe(() => this.router.navigate(['/']));
  }
}
