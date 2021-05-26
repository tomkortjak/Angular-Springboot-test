import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectsListComponent} from './projects-list.component';
import {FormsModule} from '@angular/forms';
import {ProjectsService} from '../../../services/projects.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

fdescribe('ProjectsListComponent', () => {
  let component: ProjectsListComponent;
  let fixture: ComponentFixture<ProjectsListComponent>;
  let testBedService: ProjectsService;
  let componentHTML: HTMLElement;
  let button: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsListComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [ProjectsService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsListComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.nativeElement;
    fixture.detectChanges();

    testBedService = fixture.debugElement.injector.get(ProjectsService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test made by Hosam Darwish
  it('Service injected via component should be and instance of ProjectsService', () => {
    // Check if the created service is of the right type
    expect(testBedService instanceof ProjectsService).toBeTruthy();
    // Check if the service is made in the constructor
    expect(component.service).toBeDefined();
  });

  // Test made by Hosam Darwish
  // it('Test if projects where recieved', function(done) {
  //   testBedService.getAllProjects();
  //   testBedService.getAllProjects();
  //   expect(testBedService.projects.length).toBeGreaterThan(1);
  //   fixture.detectChanges();
  //   console.log(testBedService.projects);
  //   done();
  // });

  // Test made by Hosam Darwish
  it('should set filter values on create', () => {
    // Check if all the values are defined in the correct way by the constructor
    expect(component.start).toBeDefined();
    expect(component.end).toBeDefined();
    expect(component.title).toBe('');
    expect(component.hood).toBe('');
  });

  // Test made by Hosam Darwish
  it('should update current project', () => {
    let newId = 1;
    // Check if the id isn't defined by the constructor
    expect(component.service.currentProjectId).toBeUndefined();
    // Update the project id by calling the update method and check for changes
    component.updateCurrentProject(newId);
    fixture.detectChanges();
    // Now expect the project id to have been changes to the given number
    expect(component.service.currentProjectId).toBe(newId);
  });

  // Test made by Hosam Darwish
  it('should call search function', () => {
    // Keep taps on the search method of the component
    spyOn(component, 'search');

    // Find the search button on the page and click it
    button = componentHTML.querySelector('input[type=\'submit\']');
    button.click();

    // When the component is ready expect the search method of the component to have been called which calls the service method
    fixture.whenStable().then(() => {
      expect(component.search).toHaveBeenCalled();
      expect(component.service.getProjectsFourFilters).toHaveBeenCalled();
    });
  });
});
