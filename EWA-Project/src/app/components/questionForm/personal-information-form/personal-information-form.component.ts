import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {QuestionaireResult} from "../../../models/QuestionaireResult";
import {QuestionsService} from "../../../services/questions.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-personal-information-form',
  templateUrl: './personal-information-form.component.html',
  styleUrls: ['./personal-information-form.component.css']
})
export class PersonalInformationFormComponent{

  @ViewChild('editForm', {static: false}) public detailForm: NgForm;
  checkForm: boolean;
  dateOfBirth;
  gender = [
    "Male",
    "Female",
    "Other"
];
  selectedGender;
  email;
  zipcode;

  constructor(private navigation: Router, private service: QuestionsService, private http: HttpClient) { }

  nextButton(){
    if (this.detailForm.invalid) {
      this.checkForm = true;
    } else {
      this.service.projectPercentages();
      let results = this.service.getResults();
      let questionaireResult = new QuestionaireResult(parseInt(results.get("Gardening")), parseInt(results.get("Experience nature")),
        parseInt(results.get("Rest & Relaxation")),parseInt(results.get("Exercise")),parseInt(results.get("Meet new people")),
        this.zipcode, this.selectedGender, this.dateOfBirth, this.email, this.service.foundProject);
      if(this.service.foundProject != null){
        this.service.postQuestionaireResults(questionaireResult);
      }
      setTimeout(() => {
        this.navigation.navigate(['results']);
      }, 1500)
    }
  }

  focus(){
    this.checkForm = false;
  }



}
