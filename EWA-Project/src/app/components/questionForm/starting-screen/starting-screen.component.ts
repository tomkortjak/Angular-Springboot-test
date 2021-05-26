import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {QuestionsService} from '../../../services/questions.service';
import {Project} from '../../../models/Project';
import {AccountService} from '../../../services/account.service';


@Component({
  selector: 'app-starting-screen',
  templateUrl: './starting-screen.component.html',
  styleUrls: ['./starting-screen.component.css']
})
export class StartingScreenComponent implements OnInit {

  @ViewChild('f', {static: false}) detailForm: NgForm;
  checkCode: boolean;
  codeValue;
  currentProject: Project;

  constructor(private navigation: Router,
              private service: QuestionsService) {
    this.checkCode = false;
  }

  ngOnInit() {
  }

  nextButton() {
    this.service.getProject(this.codeValue);
    setTimeout(() => {
      if (this.service.foundProject != null) {
        this.navigation.navigate(['help']);
      } else {
        this.checkCode = true;
        this.detailForm.reset();
      }
    }, 1000);
  }

  focus() {
    this.checkCode = false;
    this.codeValue = '';
  }
}
