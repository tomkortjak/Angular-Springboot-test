import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsScreenComponent } from './results-screen.component';
import {ChartsModule} from "ng2-charts";
import {QuestionsService} from "../../../services/questions.service";
import {HttpClient} from "selenium-webdriver/http";
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";

fdescribe('ResultsScreenComponent', () => {
  let component: ResultsScreenComponent;
  let fixture: ComponentFixture<ResultsScreenComponent>;
  let componentHTML: HTMLElement;
  let questionService: QuestionsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsScreenComponent ],
      imports: [ChartsModule, HttpClientModule, RouterTestingModule],
      providers: [QuestionsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsScreenComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.nativeElement;
    fixture.detectChanges();
    questionService = new QuestionsService()
  });

  //Test written by Safak Inan
  it('should create',  () => {
    expect(component).toBeTruthy();
  });

  //Test written by Safak Inan
  it('should load the graphs', function () {
    componentHTML.querySelectorAll('canvas.graph').forEach(
      g =>{
        expect(g).toBeTruthy();
      }
    )
  });

  //Test written by Safak Inan
  it('should check for points', function () {
    let pointsOld = component.userChartData;

    pointsOld.forEach(p =>{
      expect(p).toEqual(0)
    });

    let questionPoints = new Map()
      .set("Gardening", 1)
      .set("Expierence nature", 1)
      .set("Rest & Relaxation", 1)
      .set("Exercise", 1)
      .set("Meet new people", 1);

    questionPoints = questionService.calcPercentegesOfGiven(questionPoints);

    pointsOld = [
      questionPoints.get("Expierence nature"),
      questionPoints.get("Gardening"),
      questionPoints.get("Rest & Relaxation"),
      questionPoints.get("Meet new people"),
      questionPoints.get("Exercise")];

    pointsOld.forEach(p => {
      expect(p).toBeGreaterThanOrEqual(20);
    });

  });
});
