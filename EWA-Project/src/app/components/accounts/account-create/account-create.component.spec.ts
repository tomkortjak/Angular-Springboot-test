import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {AccountCreateComponent} from './account-create.component';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AccountService} from '../../../services/account.service';
import {BaseScreenComponent} from '../../base-screen/base-screen.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Employee} from '../../../models/Employee';
import {SessionService} from '../../../services/session.service';


// Tests by Tom Kwarten
fdescribe('AccountCreateComponent', () => {
  let component: AccountCreateComponent;
  let baseComponent: BaseScreenComponent;
  let fixture: ComponentFixture<AccountCreateComponent>;
  let service: AccountService;
  let session: SessionService;
  let componentHtml: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, RouterTestingModule],
      declarations: [AccountCreateComponent, BaseScreenComponent],
      providers: [AccountService, HttpClient, HttpHandler, SessionService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCreateComponent);
    component = fixture.debugElement.componentInstance;
    service = fixture.debugElement.injector.get(AccountService);
    session = fixture.debugElement.injector.get(SessionService);
    componentHtml = fixture.debugElement.nativeElement;

    // Account to be selected in the form and logged in user
    service.selectedAccount = new Employee('test', 'test', 'test', 'test', null, true,
      '1', 'test', 'test');
    session.currentUser = new Employee('test', 'test', 'test', 'test', null, true,
      '1', 'test', 'test');

    //SpyOn for executeOperation and  function so that buttons calls can be checked
    spyOn(component, 'executeOperation');
    spyOn(component, 'confirmOperation');
    fixture.detectChanges();
  });

  // Test by Tom Kwarten
  it('should create component', () => {
    expect(component).toBeTruthy();
    expect(componentHtml).toBeTruthy();
  });

  // Test by Tom Kwarten
  it('should load all input fields', () => {
    // checks all input fields and checks if they are loaded in
    componentHtml.querySelectorAll('input').forEach(
      (input: HTMLInputElement) => {
        expect(input).toBeTruthy();
      }
    );
  });

  // Test by Tom Kwarten
  it('should load all buttons', () => {
    // checks all buttons if they are loaded in
    componentHtml.querySelectorAll('button').forEach(
      (button: HTMLButtonElement) => {
        expect(button).toBeTruthy();
      }
    );
  });

  // Test by Tom Kwarten
  it('should call executeOperation with opslaan?', () => {
    service.selectedAccount = new Employee('test', 'test', 'test', 'test', null, true,
      '1', 'test', 'test');
    let saveButton: HTMLButtonElement = componentHtml.querySelector('#saveButton');
    saveButton.click();
    fixture.detectChanges();

    // expect confirmation modal to be called
    expect(component.executeOperation).toHaveBeenCalledWith('opslaan?');
  });

  // Test by Tom Kwarten
  it('should call executeOperation with verwijderen?', () => {
    service.selectedAccount = new Employee('test', 'test', 'test', 'test', null, true,
      '1', 'test', 'test');
    let saveButton: HTMLButtonElement = componentHtml.querySelector('#deleteButton');
    saveButton.click();
    fixture.detectChanges();

    // expect confirmation modal to be called
    expect(component.executeOperation).toHaveBeenCalledWith('verwijderen?');
  });

  // Test by Tom Kwarten
  it('should call confirmation and save', () => {
    // All necessities for the confirmation modal to be displayed
    fixture.componentInstance.doOperation = true;
    fixture.componentInstance.operation = 'opslaan?';
    fixture.detectChanges();

    // expect confirmation modal to be displayed
    let confirmationModal: HTMLDivElement = componentHtml.querySelector(".confirm-back");
    expect(confirmationModal.hidden).toBeFalsy();

    // expect the confirmation to be called and save function to be executed
    let confirmButton: HTMLButtonElement = componentHtml.querySelector('#confirmButton');
    confirmButton.click();
    expect(component.confirmOperation).toHaveBeenCalledWith('opslaan?');
  });

  // Test by Tom Kwarten
  it('should call confirmation and delete', () => {
    // All necessities for the confirmation modal to be displayed
    fixture.componentInstance.doOperation = true;
    fixture.componentInstance.operation = 'verwijderen?';
    fixture.detectChanges();

    // expect confirmation modal to be displayed
    let confirmationModal: HTMLDivElement = componentHtml.querySelector(".confirm-back");
    expect(confirmationModal.hidden).toBeFalsy();

    // expect the confirmation to be called and save function to be executed
    let confirmButton: HTMLButtonElement = componentHtml.querySelector('#confirmButton');
    confirmButton.click();

    expect(component.confirmOperation).toHaveBeenCalledWith('verwijderen?');
  });

})
;
