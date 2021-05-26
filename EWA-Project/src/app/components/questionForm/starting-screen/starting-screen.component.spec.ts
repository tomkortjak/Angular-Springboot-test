import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StartingScreenComponent} from './starting-screen.component';

import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {QuestionsService} from '../../../services/questions.service';


fdescribe('StartingScreen', () => {
  let component: StartingScreenComponent;
  let fixture: ComponentFixture<StartingScreenComponent>;
  let componentHTML: HTMLElement;
  let button: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StartingScreenComponent],
      imports: [RouterTestingModule, FormsModule],
      providers: [QuestionsService, HttpClient, HttpHandler]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    componentHTML = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test made by Hosam Darwish
  it('should load ggd logo', () => {
    // Find the GGD logo on the page and check if it is indeed on the page
    componentHTML.querySelectorAll('.image-logo img').forEach(
      (img: HTMLImageElement) => {
        expect(img).toBeTruthy();
      }
    );
  });

  // Test made by Hosam Darwish
  it('test whether code is accepted', () => {
    // Find the input field on the page and fill it with a fixed value
    let element = componentHTML.querySelector('input');
    let newValue = '65QW';
    element.value = newValue;
    element.setRangeText(newValue);

    // Detect the new changes and call the nextButton method
    fixture.detectChanges();
    component.nextButton();

    // Expect the checkCode to still be false
    expect(component.checkCode).toBeFalsy();
    // And check if the element is still true
    expect(element).toBeTruthy();
  });

  // Test made by Hosam Darwish
  it('should call function on button', async(() => {
    // Keep taps on the nextButton method of the component
    spyOn(component, 'nextButton');

    // Find the enter button on the page and click it
    button = componentHTML.querySelector('.btn');
    button.click();

    // When the component is ready expect the nextButton method of the component to have been called
    fixture.whenStable().then(() => {
      expect(component.nextButton).toHaveBeenCalled();
    });
  }));
});

