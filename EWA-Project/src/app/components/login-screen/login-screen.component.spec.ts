import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginScreenComponent} from './login-screen.component';
import {SessionService} from '../../services/session.service';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

fdescribe('LoginScreenComponent', () => {
  let component: LoginScreenComponent;
  let componentHtml: HTMLElement;
  let fixture: ComponentFixture<LoginScreenComponent>;
  let session: SessionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, RouterTestingModule],
      declarations: [LoginScreenComponent],
      providers: [HttpClient, HttpHandler, SessionService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginScreenComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    session = fixture.debugElement.injector.get(SessionService);
    fixture.detectChanges();
  });

  // Test by Tom Kwarten
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test by Tom Kwarten
  it('should deny empty credentials', () => {
    let loginButton: HTMLButtonElement = componentHtml.querySelector('button');
    loginButton.click();
    fixture.detectChanges();

    let alertDiv: HTMLDivElement = componentHtml.querySelector('.alert');

    expect(component.alertstatus).toBeTruthy();
    expect(component.status).toBe('Graag alle inlog gegevens invullen');
    expect(alertDiv).toBeTruthy()
  });
});
