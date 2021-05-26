import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QuestionsService} from '../../../services/questions.service';

@Component({
  selector: 'app-explanation',
  templateUrl: './explanation.component.html',
  styleUrls: ['./explanation.component.css']
})
export class ExplanationComponent implements OnInit {

  lat;
  lon;

  description;
  currentSituation;

  map: any;

  constructor(private navigation: Router,
              private service: QuestionsService) { }

  ngOnInit() {
    this.lat = this.service.foundProject.xCordinate;
    this.lon = this.service.foundProject.yCordinate;

    this.description = "Something fun is happening";
    this.currentSituation = "../../../../assets/Images/exercise.jpeg";

  }

  startButton() {
    this.navigation.navigate(['/form']);
  }

}
