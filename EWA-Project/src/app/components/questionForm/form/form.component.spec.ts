import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { FormComponent } from './form.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {QuestionsService} from "../../../services/questions.service";

fdescribe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let componentHTML: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.nativeElement;
    fixture.detectChanges();
  });

  //Test written by Safak Inan
  it('should create', () => {
    const service: QuestionsService = TestBed.get(QuestionsService);
    expect(component).toBeTruthy();
  });

  //Test written by Safak Inan
  it('should consist of 5 topcis', () => {
    let results = component.results as Map<string, number>;
    expect(results.size).toEqual(5);
  });

  //Test written by Safak Inan
  it('should proceed to the next question',  () => {
    let button: HTMLDivElement = componentHTML.querySelector('div.navRight');
    let questionIndex = component.count;
    button.click();
    fixture.detectChanges();
    expect(component.count).toEqual(questionIndex+1);
  });

  //Test written by Safak Inan
  it('should go back to the previous question',  () => {
    let buttonNext: HTMLDivElement = componentHTML.querySelector('div.navRight');
    let buttonPrevious: HTMLDivElement = componentHTML.querySelector('div.navLeft');
    let questionIndex = component.count;
    buttonNext.click();
    fixture.detectChanges();
    expect(component.count).toEqual(++questionIndex);
    buttonPrevious.click();
    fixture.detectChanges();
    expect(component.count).toEqual(--questionIndex);
  });

  //Test written by Safak Inan
  it('should add points to topics',  () => {
    let button: HTMLDivElement = componentHTML.querySelector('div.navRight');
    let titleLeft: string = componentHTML.querySelector('#titleLeft').textContent;
    let titleRight: string = componentHTML.querySelector('#titleRight').textContent;
    let oldLeftPoints = component.results.get(titleLeft);
    let oldRightPoints = component.results.get(titleRight);
    button.click();
    fixture.detectChanges();
    expect(component.results.get(titleLeft)).toEqual(oldLeftPoints+1);
    expect(component.results.get(titleRight)).toEqual(oldRightPoints+1);
  });

  //Test written by Safak Inan
  it('should reset the buttons', () => {
    let middleRadio: HTMLInputElement = componentHTML.querySelector('#male3');
    let button: HTMLDivElement = componentHTML.querySelector('div.navRight');
    button.click();
    fixture.detectChanges();
    expect(middleRadio.checked).toBeTruthy();
  });

  //Test written by Safak Inan
  it('should not go to -1 index', function () {
    let buttonPrevious: HTMLDivElement = componentHTML.querySelector('div.navLeft');
    let firstIndex = 0;
    buttonPrevious.click();
    fixture.detectChanges();
    expect(component.count).toEqual(firstIndex);
  });
});
