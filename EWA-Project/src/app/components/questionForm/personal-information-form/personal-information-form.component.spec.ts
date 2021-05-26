import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {PersonalInformationFormComponent} from './personal-information-form.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {QuestionsService} from "../../../services/questions.service";
import {catchError} from "rxjs/operators";
import {By} from "@angular/platform-browser";

describe('PersonalInformationFormComponent', () => {
  let component: PersonalInformationFormComponent;
  let fixture: ComponentFixture<PersonalInformationFormComponent>;
  let componentHTML: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalInformationFormComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInformationFormComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.nativeElement;
    fixture.detectChanges();
  });

  // Test created by Yan Lanna Alexandre
  it('should create the component', () => {
    expect(component).toBeTruthy();
    expect(componentHTML).toBeTruthy();
  });

  // Test created by Yan Lanna Alexandre
  it('should load the form', () => {
    componentHTML.querySelectorAll('form').forEach(
      (form: HTMLFormElement) => {
        expect(form).toBeTruthy();
      });
  });

  // Test created by Yan Lanna Alexandre
  it('should call the nextButton() function when form is submitted', () => {
    let questionsService = fixture.debugElement.injector.get(QuestionsService);
    let nextButton: HTMLButtonElement = componentHTML.querySelector('button');
    spyOn(component, 'nextButton');
    nextButton.click();
    expect(component.nextButton).toHaveBeenCalled();
  });

  // Test created by Yan Lanna Alexandre
  it('should be a valid when empty', () => {
    expect(component.detailForm.form.valid).toBeTruthy();
  });


  // Test created by Yan Lanna Alexandre
  // it('should be a invalid when invalid zipcode is filled in', fakeAsync(() => {
  //   tick(100);
  //   let zipcode = fixture.debugElement.query(By.css('input[name="postcode"]')).nativeElement;
  //   zipcode.value = "invalidinput";
  //
  //   expect(zipcode).toHaveClass("ng-invalid")
  //
  // }));



});
