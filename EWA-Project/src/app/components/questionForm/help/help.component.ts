import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  slideIndex = 0;
  slideButtons;
  count = 1;

  part = [
    "Fill in the form by giving your preference to a given subject, If you're unsure about what the subject contains, click the '?' bubble for a short explanation.",
    "Once you're done filling in the form, you have the option to also fill in some of your personal information. Take note that this is optional.",
    "Finally you can review your results with the results of people around your environment. You may start the questionnaire",
  ];

  constructor(private navigation: Router) {
  }

  ngOnInit() {
    this.slideButtons = document.getElementsByClassName("slide");
    this.showDivs(this.slideIndex);
  }

  backButton() {
    this.navigation.navigate(['/explanation']);
  }

  plusDivs(n) {
    this.showDivs(this.slideIndex += n);
    this.count += n;
    if (this.count >= 3){
      this.count = 3;
    }
    if (this.count <= 1){
      this.count = 1;
    }
  }

  showDivs(n) {
    if (n > 2) {
      this.slideIndex = 2;
      n = 2;
    }
    if (n < 0) {
      this.slideIndex = 0;
      n = 0;
    }
    let x = document.getElementsByClassName("gif");
    for (let i = 0; i < x.length; i++) {
      x[i].setAttribute("style", "display: none;")
    }
    x[n].setAttribute("style", "display: block;")

  }


}
