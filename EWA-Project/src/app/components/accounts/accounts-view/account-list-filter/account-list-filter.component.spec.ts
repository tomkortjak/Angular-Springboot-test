import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountListFilterComponent} from './account-list-filter.component';
import {HttpClient, HttpClientModule, HttpErrorResponse, HttpHandler, HttpHeaders, HttpResponse} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AccountService} from '../../../../services/account.service';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthInterceptor} from '../../../../auth-interceptor';
import {HttpClientTestingModule} from '@angular/common/http/testing';

// Tests by Tom Kwarten
fdescribe('AccountListFilterComponent', () => {
  let component: AccountListFilterComponent;
  let fixture: ComponentFixture<AccountListFilterComponent>;
  let service: AccountService;
  let componentHtml: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [AccountListFilterComponent],
      providers: [AccountService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountListFilterComponent);
    component = fixture.debugElement.componentInstance;
    service = fixture.debugElement.injector.get(AccountService);
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  // Test by Tom Kwarten
  it('should uncheck previous district filter radio', () => {
    let nieuwWestButton: HTMLInputElement = componentHtml.querySelector('#nieuw-westKnop');
    let noordButton: HTMLInputElement = componentHtml.querySelector('#noordKnop');

    //check if the button is checked after clicking
    nieuwWestButton.click();
    fixture.detectChanges();
    expect(nieuwWestButton.checked).toBeTruthy();

    //click new filter button and check if nieuw-west button is unchecked
    noordButton.click();
    fixture.detectChanges();
    expect(nieuwWestButton.checked).toBeFalsy();
    expect(noordButton.checked).toBeTruthy();
  });

  // Test by Tom Kwarten
  it('should create component', () => {
    expect(component).toBeTruthy();
    expect(componentHtml).toBeTruthy();
  });

});
