import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {BaseScreenComponent} from "../base-screen/base-screen.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {SessionService} from "../../services/session.service";
import {Employee} from "../../models/Employee";

fdescribe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let componentHTML: HTMLElement;
  let session: SessionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ ProfileComponent , BaseScreenComponent],
      providers: [SessionService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.nativeElement;
    session = fixture.debugElement.injector.get(SessionService);
    session.setCurrentUser(new Employee('test', 'test', 'test', 'test', null, true,
      '1', 'test', 'test'));
    fixture.detectChanges();
  });

  //Test written by Safak Inan
  it('should create', () => {
    expect(component).toBeTruthy();
    expect(componentHTML).toBeTruthy();
  });

  //Test written by Safak Inan
  it('should load image correctly',  () => {
    let img = componentHTML.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.complete).toBeTruthy();
  });


});
