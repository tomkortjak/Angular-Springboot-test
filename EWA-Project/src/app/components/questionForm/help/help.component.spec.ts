import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { HelpComponent } from './help.component';

import { RouterTestingModule } from '@angular/router/testing';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {Router} from "@angular/router";


describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;
  let componentHTML: HTMLElement;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.nativeElement;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  // Test created by Yan Lanna Alexandre
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test created by Yan Lanna Alexandre
  it('should render title texts', () => {
    let title = el.query(By.css('h1')).nativeElement;
    expect(title.textContent).toContain('How to fill in the form')
  });

  // Test created by Yan Lanna Alexandre
  it('should load the three explanation images', () => {
    let image = componentHTML.querySelectorAll('img')
    image.forEach(
      (img: HTMLImageElement) => {
        expect(img).toBeTruthy();
      });
    expect(image.length).toBe(3);
  });

  // Test created by Yan Lanna Alexandre
  it('should navigate to explanation screen when next button is clicked', inject([Router], (router: Router) => {
    spyOn(router, 'navigate').and.stub();
    let nextButton: HTMLButtonElement = componentHTML.querySelector('button.back');
    nextButton.click();
    expect(router.navigate).toHaveBeenCalledWith(['/explanation']);
  }));
});
