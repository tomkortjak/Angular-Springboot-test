import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {AccountListComponent} from './account-list.component';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AccountService} from '../../../../services/account.service';
import {RouterTestingModule} from '@angular/router/testing';
import {AccountCreateComponent} from '../../account-create/account-create.component';
import {BaseScreenComponent} from '../../../base-screen/base-screen.component';
import {SessionService} from '../../../../services/session.service';
import {Employee} from '../../../../models/Employee';

fdescribe('AccountListComponent', () => {
  let component: AccountListComponent;
  let baseComponent: BaseScreenComponent;
  let fixture: ComponentFixture<AccountListComponent>;
  let service: AccountService;
  let session: SessionService;
  let componentHtml: HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, RouterTestingModule.withRoutes([
        {path: 'account-create', component: AccountCreateComponent}])],
      declarations: [AccountListComponent, BaseScreenComponent, AccountCreateComponent],
      providers: [AccountService, HttpClient, HttpHandler, SessionService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountListComponent);
    component = fixture.debugElement.componentInstance;
    service = fixture.debugElement.injector.get(AccountService);
    session = fixture.debugElement.injector.get(SessionService);
    service.selectedAccount = new Employee('test', 'test', 'test', 'test', null, true,
      '1', 'test', 'test');
    session.currentUser = new Employee('test', 'test', 'test', 'test', null, true,
      '1', 'test', 'test');
    componentHtml = fixture.debugElement.nativeElement;

    spyOn(service, 'setSelectedAccountId');
    fixture.detectChanges();
  });

  // Test by Tom Kwarten
  it('should create component', () => {
    expect(component).toBeTruthy();
    expect(componentHtml).toBeTruthy();
  });

  // Test by Tom Kwarten
  it('should show loaded accounts',  () => {
    service.accounts[0] = new Employee ('test', 'test', 'test', 'test', null, true,
      '1', 'test', 'test');
    service.accounts[1] = new Employee ('test', 'test', 'test', 'test', null, true,
      '1', 'test', 'test');
    fixture.detectChanges();

    // retrieve list with accounts and one account
    let list: HTMLDivElement = componentHtml.querySelector('.accountsBox');
    let employeeItem: HTMLDivElement = componentHtml.querySelector('.accountInfo');

    // check if the div contains information from the object
    expect(list).toBeTruthy();
    expect(employeeItem).toBeTruthy();
    expect(employeeItem.innerText).toContain('test');
    expect(service.accounts.length).toBe(2)
  });

  // Test by Tom Kwarten
  it('should call setSelectedAccountId for account',  () => {
    service.accounts[0] = new Employee ('test', 'test', 'test', 'test', null, true,
      '1', 'test', 'test');
    fixture.detectChanges();

    // click the edit button on an account
    let editButton: HTMLDivElement = componentHtml.querySelector('.editImg');
    editButton.click();

    // check if the method corresponding to the button has been called
    expect(service.setSelectedAccountId).toHaveBeenCalled();
  });

});
