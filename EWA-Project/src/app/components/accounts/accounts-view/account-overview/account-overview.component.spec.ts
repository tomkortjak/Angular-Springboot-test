import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountOverviewComponent } from './account-overview.component';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AccountService} from '../../../../services/account.service';
import {Employee} from '../../../../models/Employee';
import {SessionService} from '../../../../services/session.service';
import {BaseScreenComponent} from '../../../base-screen/base-screen.component';
import {AccountListComponent} from '../account-list/account-list.component';
import {AccountListFilterComponent} from '../account-list-filter/account-list-filter.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AccountCreateComponent} from '../../account-create/account-create.component';

fdescribe('AccountOverviewComponent', () => {
  let component: AccountOverviewComponent;
  let componentHtml: HTMLElement;
  let fixture: ComponentFixture<AccountOverviewComponent>;
  let service: AccountService;
  let session: SessionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, RouterTestingModule.withRoutes([
        {path: 'account-create', component: AccountCreateComponent}])],
      declarations: [AccountOverviewComponent, BaseScreenComponent, AccountListComponent, AccountListFilterComponent, AccountCreateComponent],
      providers: [AccountService, HttpClient, HttpHandler, SessionService]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOverviewComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(AccountService);
    session = fixture.debugElement.injector.get(SessionService);
    service.selectedAccount = new Employee('test', 'test', 'test', 'test', null, true,
      '1', 'test', 'test');
    session.currentUser = new Employee('test', 'test', 'test', 'test', null, true,
      '1', 'test', 'test');
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  // Test by Tom Kwarten
  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  // Test by Tom Kwarten
  it('Service injected via component should be and instance of AccountService', () => {
    // Check if the created service is of the right type
    expect(service instanceof AccountService).toBeTruthy();
  });

});
