import {Component, DoCheck, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QuestionsService} from '../../../services/questions.service';
import {Quest} from '../../../models/Quest';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, DoCheck {

  leftImage;
  rightImage;
  infoBubbles;
  labels;
  radios;
  topic;
  //languages;
  navigationBubbles;

  count = 0;

  results;
  listOfQuests: Quest[];
  currentQuest;
  form;

  constructor(private navigation: Router, private service: QuestionsService) {
  }

  ngOnInit() {
    this.listOfQuests = this.service.getListOfQuestions();
    this.results = this.service.getResults();

    this.leftImage = document.getElementsByClassName('left-image')[0];
    this.rightImage = document.getElementsByClassName('right-image')[0];
    this.infoBubbles = document.getElementsByClassName('information-bubble');
    this.labels = document.getElementsByClassName('label-group')[0];
    this.radios = document.getElementsByClassName('button-group')[0];
    this.topic = document.getElementsByClassName('topic');
    //this.languages = document.getElementsByClassName('language')[0];
    this.navigationBubbles = document.getElementsByClassName('navigation')[0];

    this.count = 0;
    this.form = document.forms[0];
  }

  nextQuestion() {
    this.count++;
    let i;
    for (i = 0; i < this.form.childElementCount; i++) {
      if (this.form[i].checked == true) {
        switch (this.form[i].id) {
          case 'male1':
            this.results.set(this.currentQuest._leftCategory.name, this.results.get(this.currentQuest._leftCategory.name) + 1);
            this.listOfQuests[this.count - 1].pointsLeft = 1;
            break;
          case 'male2':
            this.results.set(this.currentQuest._leftCategory.name, this.results.get(this.currentQuest._leftCategory.name) + 0.5);
            this.listOfQuests[this.count - 1].pointsLeft = 0.5;
            break;
          case 'male3':
            this.results.set(this.currentQuest._leftCategory.name, this.results.get(this.currentQuest._leftCategory.name) + 1);
            this.listOfQuests[this.count - 1].pointsLeft = 1;
            this.results.set(this.currentQuest._rightCategory.name, this.results.get(this.currentQuest._rightCategory.name) + 1);
            this.listOfQuests[this.count - 1].pointsRight = 1;
            break;
          case 'male4':
            this.results.set(this.currentQuest._rightCategory.name, this.results.get(this.currentQuest._rightCategory.name) + 0.5);
            this.listOfQuests[this.count - 1].pointsRight = 0.5;
            break;
          case 'male5':
            this.results.set(this.currentQuest._rightCategory.name, this.results.get(this.currentQuest._rightCategory.name) + 1);
            this.listOfQuests[this.count - 1].pointsRight = 1;
            break;
        }
      }
    }

    if (this.count === 10) {
      this.service.calcPercenteges();
      this.navigation.navigate(['thanks']);
    }
  }

  previousQuestion() {
    if (this.count > 0) {
      --this.count;
      this.currentQuest = this.listOfQuests[this.count];
      this.results.set(this.currentQuest._leftCategory.name, this.results.get(this.currentQuest._leftCategory.name) - this.currentQuest._pointsLeft);
      this.results.set(this.currentQuest._rightCategory.name, this.results.get(this.currentQuest._rightCategory.name) - this.currentQuest._pointsRight);
    }
  }


  quest(button) {
    this.labels.classList.toggle('none');
    this.radios.classList.toggle('none');
    //this.languages.classList.toggle('none');
    this.navigationBubbles.classList.toggle('none');
    if (button === 'left') {
      this.leftImage.classList.toggle('grow');
      this.topic[0].classList.toggle('top');
      this.infoBubbles[0].classList.toggle('info-clicked');
      document.getElementById('info1').classList.toggle('padding');
      this.leftImage.setAttribute('style', 'z-index: 2');
      this.rightImage.setAttribute('style', 'z-index: 1');
      if (this.infoBubbles[0].innerHTML === 'X') {
        this.infoBubbles[0].innerHTML = '?';
      } else {
        this.infoBubbles[0].innerHTML = 'X';
      }
    } else {
      this.rightImage.classList.toggle('grow');
      this.infoBubbles[1].classList.toggle('info-clicked');
      this.topic[1].classList.toggle('top');
      this.topic[1].classList.toggle('toggle-right');
      document.getElementById('info2').classList.toggle('padding');
      this.rightImage.setAttribute('style', 'z-index: 2');
      this.leftImage.setAttribute('style', 'z-index: 1');
      if (this.infoBubbles[1].innerHTML === 'X') {
        this.infoBubbles[1].innerHTML = '?';
      } else {
        this.infoBubbles[1].innerHTML = 'X';
      }

    }
  }

  ngDoCheck() {
    this.currentQuest = this.listOfQuests[this.count];
    this.leftImage.style.backgroundImage = this.currentQuest._leftCategory.image;
    this.rightImage.style.backgroundImage = this.currentQuest._rightCategory.image;


    if (this.currentQuest._pointsLeft >= 0 && this.currentQuest._pointsRight >= 0) {
      this.form[2].checked = true;
    }
    if (this.currentQuest._pointsLeft == 0.5 && this.currentQuest._pointsRight == 0) {
      this.form[1].checked = true;
    }
    if (this.currentQuest._pointsLeft == 0 && this.currentQuest._pointsRight == 0.5) {
      this.form[3].checked = true;
    }
    if (this.currentQuest._pointsLeft == 1 && this.currentQuest._pointsRight == 0) {
      this.form[0].checked = true;
    }
    if (this.currentQuest._pointsLeft == 0 && this.currentQuest._pointsRight == 1) {
      this.form[4].checked = true;
    }

  }


}
