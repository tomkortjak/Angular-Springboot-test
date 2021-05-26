import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-thank-you-screen',
  templateUrl: './thank-you-screen.component.html',
  styleUrls: ['./thank-you-screen.component.css']
})
export class ThankYouScreenComponent implements OnInit {

  constructor(private navigation: Router) { }

  ngOnInit() {
  }

  nextPage() {
    this.navigation.navigate(['personal-information']);
  }
}
