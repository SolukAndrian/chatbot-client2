import {Component, OnInit} from '@angular/core';
import {HomeService} from './home.service';


@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  errorMessage: string;

  constructor(private homeService: HomeService) {
  }

  ngOnInit() {

  }

}
