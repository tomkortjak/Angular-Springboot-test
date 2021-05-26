import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplanationComponent } from './explanation.component';

import { RouterTestingModule } from '@angular/router/testing';
import {AgmCoreModule, AgmMap, MapsAPILoader} from "@agm/core";
import {HttpClientModule} from "@angular/common/http";
import {SessionService} from "../../../services/session.service";
import {QuestionsService} from "../../../services/questions.service";
import {Project} from "../../../models/Project";


fdescribe('ExplanationComponent', () => {
  let component: ExplanationComponent;
  let fixture: ComponentFixture<ExplanationComponent>;
  let componentHTML: HTMLElement;
  let questionSerrvice: QuestionsService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplanationComponent ],
      imports: [RouterTestingModule, AgmCoreModule, HttpClientModule],
      providers: [
        QuestionsService,
        {
          provide: MapsAPILoader,
          useValue: {
            load: jasmine.createSpy('load').and.returnValue(new Promise(() => true))
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplanationComponent);
    component = fixture.debugElement.componentInstance;
    componentHTML = fixture.debugElement.nativeElement;
    questionSerrvice = fixture.debugElement.injector.get(QuestionsService);
    questionSerrvice.foundProject = new Project("test", "test", "test", null, null, 10, 10);
    fixture.detectChanges();
  });

  //Test written by Safak Inan
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Test written by Safak Inan
  it('should load the map', () => {
    let map: HTMLElement = componentHTML.querySelector('agm-map.map');
    expect(map).toBeTruthy();
  });

});
