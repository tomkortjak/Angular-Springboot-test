import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {NewProjectComponent} from './new-project.component';

fdescribe('NewProjectComponent', () => {
  let component: NewProjectComponent;
  let fixture: ComponentFixture<NewProjectComponent>;
  let componentHTML: HTMLElement;
  let isNewProject: Boolean = false;
  let latX:string = "52.406823";
  let longY:string = "4.82336";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewProjectComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NewProjectComponent);
    componentHTML = fixture.nativeElement;

    if (component.service.currentProject.id != null) {
      isNewProject = true;
    }
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //written by Wilco Spruijt
  it('should have a marker in map', () => {
    expect(componentHTML.querySelectorAll('agm-marker').length)
      .toEqual(1);
  });

  //written by Wilco Spruijt
  it("new project should have current dates", () => {
    if (!isNewProject) {
      checkDatesCurrent();
    }
  });

  function checkDatesCurrent() {
    expect(componentHTML.querySelector("#startDate").nodeValue)
      .toEqual(new Date().toISOString().split("T")[0])
    expect(componentHTML.querySelector("#endDate").nodeValue)
      .toEqual(new Date().toISOString().split("T")[0])
  }


  //written by Wilco Spruijt
  it("there should be 6 type options", () => {
    expect(componentHTML.querySelector("select").childNodes.length)
      .toEqual(6);
  });

  //written by Wilco Spruijt
  it("should reset dates after reset method is used", () => {
    let startDate = componentHTML.querySelector("#startDate");
    let endDate = componentHTML.querySelector("#endDate");
    let tenDaysLater = new Date();
    tenDaysLater = new Date(tenDaysLater.getDate() + 10);

    startDate.nodeValue = tenDaysLater.toISOString().split("T")[0];
    endDate.nodeValue = tenDaysLater.toISOString().split("T")[0];

    component.resetProject(true);

    checkDatesCurrent();
  });

  //written by Wilco Spruijt
  it("should clear the project title when resetting", () => {
    component.resetProject(true);

    expect(componentHTML.querySelector(".input-title").nodeValue)
      .toEqual("");
  })

  //written by Wilco Soruijt
  it("should clear description when resetting", () => {
    component.resetProject(true);

    expect(componentHTML.querySelector("textarea").nodeValue)
      .toEqual("");
  })

  //writren by Wilco Spruijt
  // it("should  reset textfield cord. when reseting", () => {
  //
  //   component.resetProject(true);
  //
  //   expect(componentHTML.querySelector(".x-as").nodeValue)
  //     .toEqual(latX);
  //
  //   expect(componentHTML.querySelector(".y-as").nodeValue)
  //     .toEqual(longY);
  // });

  //written by Wilco Spruijt
  // it("should reset marker cord. when reseting", () => {
  //
  //   component.resetProject(true);
  //
  //   var agmMarkerAttributes = componentHTML.querySelector("agm-marker").attributes
  //   expect(agmMarkerAttributes[1].value)
  //     .toEqual(latX);
  //
  //   expect(agmMarkerAttributes[2].value)
  //     .toEqual(longY);
  // });

  //written by Wilco Spruijt
  // it("should reset map cord. when reseting", () => {
  //
  //   component.resetProject(true);
  //
  //   var agmMarkerAttributes = componentHTML.querySelector("agm-map").attributes
  //   expect(agmMarkerAttributes[4].value)
  //     .toEqual(latX);
  //
  //   expect(agmMarkerAttributes[5].value)
  //     .toEqual(longY);
  // });

  //written by Wilco Spruijt
  it("textvalues should be empty after reset", () => {
    let selector = componentHTML.querySelector;
    component.resetProject(true);

    expect(componentHTML.querySelector(".status").nodeValue)
      .toEqual("");

    expect(componentHTML.querySelector(".area").nodeValue)
      .toEqual("");


    expect(componentHTML.querySelector(".buurt").nodeValue)
      .toEqual("");
  });


});
