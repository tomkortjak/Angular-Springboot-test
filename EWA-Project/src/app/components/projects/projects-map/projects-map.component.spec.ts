import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectsMapComponent} from './projects-map.component';
import {ProjectsService} from '../../../services/projects.service';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';

fdescribe('ProjectsMapComponent', () => {
  let component: ProjectsMapComponent;
  let fixture: ComponentFixture<ProjectsMapComponent>;
  let componentHTML: HTMLElement;
  let http: HttpClient;
  let createBtn: HTMLElement;
  let searchBtn: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsMapComponent],
      imports: [HttpClientModule, RouterTestingModule, FormsModule, AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDESEjVn6ARtJ3J2OXbhtJ3-jpUwX3wjD8'
      })],
      providers: [ProjectsService, HttpClient, HttpHandler]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsMapComponent);
    component = fixture.componentInstance;
    component.service.getAllProjects();
    fixture.detectChanges();
    componentHTML = fixture.nativeElement;
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  // Test made by Hosam Darwish
  it('should do something', () => {
    let service = new ProjectsService(http);

    // Wait till the projects are retrieved
    // and check if the amount of markers on the page and the amount of projects in the service are equal
    async(() => {
      service.getAllProjects();
      console.log(service.projects.length);

      let amountOfMarkers = componentHTML.querySelectorAll('agm-marker').length;
      let amountOfProjects = service.projects.length;

      console.log('projects: ' + amountOfProjects);
      console.log('markers: ');
      expect(amountOfProjects).toEqual(amountOfMarkers);
    });
  });

  // Test made by Hosam Darwish
  it('should call search function', async(() => {
    // Keep taps on the searchButton method of the component
    spyOn(component, 'searchButton');

    // Find the search button on the page and click it
    searchBtn = componentHTML.querySelector('.filters .btn');
    searchBtn.click();

    // When the component is ready expect the searchButton method of the component to have been called
    fixture.whenStable().then(() => {
      expect(component.searchButton).toHaveBeenCalled();
    });
  }));

  // Test made by Hosam Darwish
  // it('should call projectButton function and search in service', () => {
    // spyOn(component, 'projectButton');
    //
    // createBtn = componentHTML.querySelector('#projectBtn');
    // console.log("createBtn");
    // console.log(createBtn);
    // createBtn.click();
    //
    // fixture.whenStable().then(() => {
    //   expect(component.projectButton).toHaveBeenCalled();
    //   expect(component.service.getProjectsThreeFilters).toHaveBeenCalled();
    // });
  // });

  // Test made by Hosam Darwish
  it('should set filter values on create', () => {
    // Check if all the values are defined in the correct way by the constructor
    expect(component.lat).toBe(52.3569703);
    expect(component.lon).toBe(4.9028214);
    expect(component.fromDate).toBeDefined();
    expect(component.toDate).toBeDefined();
    expect(component.selectedType).toBe('Park');
  });

  // Test made by Hosam Darwish
  it('Service injected via component should be and instance of ProjectsService', () => {
    // Check if the created service is of the right type
    expect(component.service instanceof ProjectsService).toBeTruthy();
    // Check if the service is being defined in the constructor
    expect(component.service).toBeDefined();
  });

  // Test made by Hosam Darwish
  // it('should have correct amount of markers', () => {
  //   console.log("amount of projects:");
  //   async(() => {
  //     component.service.getAllProjects();
  //     console.log(component.service.projects.length);
  //
  //     let amountOfMarkers = componentHTML.querySelectorAll("agm-marker").length;
  //     let amountOfProjects = component.service.projects.length;
  //
  //     console.log("projects: " + amountOfProjects);
  //     console.log("markers: " + amountOfMarkers);
  //   });
  // });
});
