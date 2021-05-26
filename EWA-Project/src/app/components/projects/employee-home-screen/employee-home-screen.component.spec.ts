import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeHomeScreenComponent } from './employee-home-screen.component';

describe('EmployeeHomeScreenComponent', () => {
  let component: EmployeeHomeScreenComponent;
  let fixture: ComponentFixture<EmployeeHomeScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeHomeScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeHomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
