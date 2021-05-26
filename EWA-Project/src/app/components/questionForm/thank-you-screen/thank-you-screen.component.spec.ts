import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {ThankYouScreenComponent} from './thank-you-screen.component';

import {RouterTestingModule} from '@angular/router/testing';
import {By} from "@angular/platform-browser";
import {PersonalInformationFormComponent} from "../personal-information-form/personal-information-form.component";
import {Router} from "@angular/router";


describe('ThankYouScreenComponent', () => {
  let component: ThankYouScreenComponent;
  let fixture: ComponentFixture<ThankYouScreenComponent>;
  let componentHTML;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThankYouScreenComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankYouScreenComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.nativeElement;
    fixture.detectChanges();
  });

  // Test created by Yan Lanna Alexandre
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test created by Yan Lanna Alexandre
  it('should render title texts', () => {
    let title = componentHTML.querySelectorAll('h1');

    expect(title[0].textContent).toContain('Thank you for voting!');
    expect(title[1].textContent).toContain('At the end of the form you can see your results');
  });

  // Test created by Yan Lanna Alexandre
  it('should navigate to personal information screen when next button is clicked', inject([Router], (router: Router) => {
    spyOn(router, 'navigate').and.stub();
    let nextButton: HTMLButtonElement = componentHTML.querySelector('button');
    nextButton.click();
    expect(router.navigate).toHaveBeenCalledWith(['personal-information']);
  }));
});
