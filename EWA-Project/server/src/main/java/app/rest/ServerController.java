package app.rest;

import app.entities.Employee;
import app.entities.Project;
import app.entities.QuestionnaireResult;
import app.repository.EmployeeRepositoryJpa;
import app.repository.ProjectRepositoryJpa;
import app.repository.QuestionnaireResultRepositoryJpa;
import exeptions.ForbiddenException;
import exeptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class ServerController extends ResourceConfig {
  @Autowired
  ProjectRepositoryJpa projectRepo;

  @Autowired
  EmployeeRepositoryJpa employeeRepo;

  @Autowired
  QuestionnaireResultRepositoryJpa questionnaireRepo;

  // Get project results for pie charts
  @GetMapping("/projects/results/{projectId}")
  public List<QuestionnaireResult> getProjectResults(@PathVariable long projectId) {
    if (projectId <= 0) {
      throw new NotFoundException();
    } else {
      return questionnaireRepo.findByQuery(projectId);
    }
  }

  // Get all projects
  // Get all projects with filter for startdate, endate and type.
  // Get all projects with filter for start date, end date, title and postal code.
  @GetMapping("/rest/projects")
  public List<Project> getProjects(@RequestParam(required = false) String start,
                                   @RequestParam(required = false) String end,
                                   @RequestParam(required = false) String title,
                                   @RequestParam(required = false) String type,
                                   @RequestParam(required = false) String hood) {
    if (start == null && end == null && title == null && type == null && hood == null) {
      return projectRepo.findAll();
    } else if(start != null && end != null && title != null && type == null && hood != null) {
      return projectRepo.fourFiltersFind(start, end, title, hood);
    } else if(start != null && end != null && title == null && type != null && hood == null) {
      return projectRepo.threeFiltersFind(start, end, type);
    } else if(start != null && end != null && title != null && type == null && hood == null) {
      return projectRepo.datesTitleFilters(start, end, title);
    } else if(start != null && end != null && title == null && type == null && hood != null) {
      return projectRepo.datesHoodFilters(start, end, hood);
    } else if(start != null && end != null && title == null && type == null && hood == null) {
      return projectRepo.datesFilters(start, end);
    } else {
      return null;
    }
  }

  // Get project with Id
  @GetMapping("/rest/projects/{id}")
  public Project getProject(@PathVariable long id) {
    if ( id < 0 || projectRepo.findById(id) == null) {
      throw new NotFoundException();
    } else {
      return projectRepo.findById(id);
    }
  }

  // gets information of a project for the survey
  @GetMapping("/projects/codes/{code}")
  public Project getProjectInfo(@PathVariable String code) {
    Project requestedProject = null;
    for (Project project : projectRepo.findAll()) {
      if (code.equals(project.getCode()) && requestedProject == null) {
        requestedProject = project;
      }
    }
    return requestedProject;
  }

  @GetMapping("/rest/accounts")
  public List<Employee> getAccounts(@RequestParam(required = false) String name,
                                    @RequestParam(required = false) String email,
                                    @RequestParam(required = false) String district) {
      return employeeRepo.findAll(name, email, district);
  }

  // Post questionnaire results to specific project with Id
  @PostMapping("/projects/results")
  public ResponseEntity<QuestionnaireResult> postQuestionnaire(@RequestBody QuestionnaireResult questionnaire) {
    if(questionnaire.getProject() == null){
      throw new ForbiddenException();
    } else {
      questionnaireRepo.save(questionnaire);

      URI location = ServletUriComponentsBuilder.
        fromCurrentRequest().path("/{id}").
        buildAndExpand(questionnaire.getId()).toUri();

      return ResponseEntity.created(location)
        .body(questionnaire);
    }

  }

  // Delete project with Id
  @DeleteMapping("/rest/projects/{id}")
  public ResponseEntity<Boolean> deleteProject(@PathVariable long id) {
    if (id <= 0 || projectRepo.findById(id) == null) {
      throw new NotFoundException();
    } else {
      return ResponseEntity.ok(projectRepo.deleteById(id));
    }
  }

  // Delete an account with Id
  @DeleteMapping("/rest/accounts/{id}")
  public ResponseEntity<Boolean> deleteAccount(@PathVariable long id) {
    if (id <= 0 || employeeRepo.findById(id) == null) {
      throw new NotFoundException();
    } else {
      return ResponseEntity.ok(employeeRepo.deleteById(id));
    }
  }

  // Post a new project to the backend
  @PostMapping("/rest/projects")
  public ResponseEntity<Project> postProject(@RequestBody Project project) {
    projectRepo.save(project);

    URI location = ServletUriComponentsBuilder.
      fromCurrentRequest().path("/{id}").
      buildAndExpand(project.getId()).toUri();

    return ResponseEntity.created(location)
      .body(project);
  }

  // update project
  @PutMapping("/rest/projects/{id}")
  public ResponseEntity<Project> putProject(@PathVariable int id, @RequestBody Project project) {
    if (id != project.getId()) {
      throw new ForbiddenException();
    }
    Project savedProject = projectRepo.save(project);

    URI location = ServletUriComponentsBuilder.
      fromCurrentRequest().path("/{id}").
      buildAndExpand(savedProject.getId()).toUri();

    return ResponseEntity.created(location).body(savedProject);
  }

  // get employee by Id
  @GetMapping("/rest/accounts/{id}")
  public Employee getEmployee(@PathVariable long id) {
    if (id <= 0 || employeeRepo.findById(id) == null) {
      throw new NotFoundException();
    } else {
      return employeeRepo.findById(id);
    }
  }

  // Create new Employee
  @PostMapping("/rest/accounts")
  public ResponseEntity<Employee> postEmployee(@RequestBody Employee employee) {
    Employee savedEmployee = employeeRepo.save(employee);

    URI location = ServletUriComponentsBuilder.
      fromCurrentRequest().path("/{id}").
      buildAndExpand(savedEmployee.getId()).toUri();

    return ResponseEntity.created(location)
      .body(savedEmployee);
  }

  // Update Employee
  @PutMapping("/rest/accounts/{id}")
  public ResponseEntity<Employee> putEmployee(@PathVariable int id, @RequestBody Employee employee) {
    if (id != employee.getId()) {
      throw new ForbiddenException();
    }
    Employee savedEmployee = employeeRepo.save(employee);

    URI location = ServletUriComponentsBuilder.
      fromCurrentRequest().path("/{id}").
      buildAndExpand(savedEmployee.getId()).toUri();

    return ResponseEntity.created(location)
      .body(savedEmployee);
  }
}
