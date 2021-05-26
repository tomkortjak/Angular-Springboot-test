import {Injectable} from '@angular/core';
import {Quest} from '../models/Quest';
import {Category} from '../models/Category';
import {Project} from '../models/Project';
import {HttpClient} from '@angular/common/http';
import {SessionService} from './session.service';
import {QuestionaireResult} from '../models/QuestionaireResult';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  BASE_URL: string;
  foundProject: Project;
  projectResults: QuestionaireResult[];

  constructor(private http?: HttpClient,
              private session?: SessionService) {
    this.BASE_URL = 'http://localhost:8081';
  }


  private listOfCategories = [
    new Category('Experience nature', 'Spending time in nature is a great way to relax and come to your senses. It also make for a good way to find exercise.', 'url(/assets/Images/nature.jpg)'),
    new Category('Gardening', 'Gardening gives people of all ages the opportunity to learn a little more about nature. It also make for a beautiful scenery.', 'url(/assets/Images/gardening.jpeg)'),
    new Category('Rest & Relaxation', 'Rest & Relaxation is for finding peace in busy places. Or just making the neighbourhood a bit more relaxing.', 'url(/assets/Images/zenn.jpg)'),
    new Category('Exercise', 'Exercise is important for all of us I mean who doesn\'t want to enhances or maintain a great physique', 'url(/assets/Images/exercise.jpeg)'),
    new Category('Meet new people', 'Meeting people is about creating a social place for people to gather. Whether it will be a few benches in a park or a community center.', 'url(/assets/Images/meeting.jpg)'),
  ];

  private listOfQuestions = [
    new Quest(1, this.listOfCategories[0], this.listOfCategories[1], 0, 0),
    new Quest(2, this.listOfCategories[2], this.listOfCategories[4], 0, 0),
    new Quest(3, this.listOfCategories[0], this.listOfCategories[3], 0, 0),
    new Quest(4, this.listOfCategories[1], this.listOfCategories[2], 0, 0),
    new Quest(5, this.listOfCategories[4], this.listOfCategories[3], 0, 0),
    new Quest(6, this.listOfCategories[1], this.listOfCategories[4], 0, 0),
    new Quest(7, this.listOfCategories[2], this.listOfCategories[0], 0, 0),
    new Quest(8, this.listOfCategories[3], this.listOfCategories[1], 0, 0),
    new Quest(9, this.listOfCategories[0], this.listOfCategories[4], 0, 0),
    new Quest(10, this.listOfCategories[3], this.listOfCategories[2], 0, 0),
  ];

  private mapOfResults = new Map()
    .set('Gardening', 0)
    .set('Experience nature', 0)
    .set('Rest & Relaxation', 0)
    .set('Exercise', 0)
    .set('Meet new people', 0);

  private mapOfAverages = new Map();

  getListOfQuestions(): Quest[] {
    return this.listOfQuestions;
  }

  getResults() {
    return this.mapOfResults;
  }

  getProjectAverages() {
    return this.mapOfAverages;
  }

  projectPercentagesParam(id){
    return this.http.get<QuestionaireResult[]>(this.BASE_URL + '/projects/results/' + id);
  }


  projectPercentages() {
    this.http.get<QuestionaireResult[]>(this.BASE_URL + '/projects/results/' + this.foundProject.id)
      .subscribe(
        results =>
          this.projectResults = results ? results : []
      );

    setTimeout(() => {
      let totalGard = 0;
      let totalExp = 0;
      let totalRest = 0;
      let totalExe = 0;
      let totalMeet = 0;
      for (let result of this.projectResults.values()) {
        totalGard += result.gardening;
        totalExp += result.experiencingNature;
        totalRest += result.restAndRelaxation;
        totalExe += result.exercise;
        totalMeet += result.meetingPeople;
      }
      for (let result of this.mapOfResults.values()) {
        this.mapOfAverages = this.mapOfAverages
          .set('Gardening', (totalGard / this.projectResults.length).toFixed(1))
          .set('Experience nature', (totalExp / this.projectResults.length).toFixed(1))
          .set('Rest & Relaxation', (totalRest / this.projectResults.length).toFixed(1))
          .set('Exercise', (totalExe / this.projectResults.length).toFixed(1))
          .set('Meet new people', (totalMeet / this.projectResults.length).toFixed(1));
      }
    }, 500);
  }

  calcPercenteges() {
    let totalValue = 0;
    for (let value of this.mapOfResults.values()) {
      totalValue += value;
    }
    for (let [key, value] of this.mapOfResults) {
      let newValue = value * 100.0 / totalValue;
      this.mapOfResults.set(key, newValue.toFixed(1));
    }
  }

  getProject(code: string): Project {
    this.session.setToken('test');
    this.http.get<Project>(this.BASE_URL + '/projects/codes/' + code)
      .subscribe(
        project =>
          this.foundProject = project
      );
    return this.foundProject;

  }

  calcPercentegesOfGiven(newMap) {
    let totalValue = 0;
    for (let value of newMap.values()) {
      totalValue += value;
    }
    for (let [key, value] of newMap) {
      let newValue = value * 100.0 / totalValue;
      newMap.set(key, newValue.toFixed(1));
    }
    return newMap;
  }

  postQuestionaireResults(questionaireResult: QuestionaireResult) {
    this.http.post<QuestionaireResult>(this.BASE_URL + '/projects/results', questionaireResult)
      .subscribe();
  }
}
