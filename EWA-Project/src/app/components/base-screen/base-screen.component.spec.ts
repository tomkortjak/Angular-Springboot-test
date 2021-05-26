import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseScreenComponent } from './base-screen.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {SessionService} from "../../services/session.service";
import {Employee} from "../../models/Employee";

fdescribe('BaseScreenComponent', () => {
  let component: BaseScreenComponent;
  let componentHTML: HTMLElement;
  let fixture: ComponentFixture<BaseScreenComponent>;
  let service: SessionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ BaseScreenComponent ],
      providers: [SessionService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseScreenComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.nativeElement;
    service = fixture.debugElement.injector.get(SessionService);
    service.setCurrentUser(new Employee('test', 'test', 'test', 'test', null, true,
      '1', 'test', 'test'));
    fixture.detectChanges();
  });

  //Test written by Safak Inan
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Test written by Safak Inan
  it('should clear sessionStorage',  () => {
    let button: HTMLAnchorElement = componentHTML.querySelector('a.logOut');
    button.click();
    fixture.detectChanges();
    expect(sessionStorage.length).toEqual(0);
  });
});
