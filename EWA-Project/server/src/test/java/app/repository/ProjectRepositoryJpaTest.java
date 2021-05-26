package app.repository;

import app.entities.Project;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ProjectRepositoryJpaTest {

  // Injects an implementation of ProjectRepositoryJpa
  @Mock
  @Autowired
  private ProjectRepositoryJpa projectRepo;

  @Mock
  protected Project sampleProject;
  @Mock
  protected Project savedProject;
  @Mock
  protected Project foundProject;
  private final int TEST_PROJECT_ID = 9999;

  @BeforeEach
  void setUp() {
  }

  @AfterEach
  void tearDown() {
  }

  // Test by Hosam Darwish
  @Test
  void saveProjectTest() {
    // Check initial amount of projects in the database
    int beforeSave = this.projectRepo.findAll().size();
    // Create a new Project
    sampleProject = new Project("test", "9999", "test", new Date(), new Date(),
      52, 4.3, "Park", "Oost", "test", "progress",
      "test");
    // Try to save the project to the repository
    savedProject = projectRepo.save(sampleProject);

    // Check current amount of projects in the database
    int afterSave = this.projectRepo.findAll().size();

    // check the attributes of the returned project
    assertEquals("9999", savedProject.getCode());
    assertEquals("Park", savedProject.getType());
    assertEquals("Oost", savedProject.getNeighbourhood());
    // Check if the number is increased by one
    assertTrue(beforeSave + 1 == afterSave);
  }

  // Test by Hosam Darwish
  @Test
  void findProjectByIdTest() {
    // Find the dummy test event in the database
    foundProject = projectRepo.findById(TEST_PROJECT_ID);
    // Assert that there is indeed a project found and it isn't null
    assertNotNull(foundProject);
  }

  // Test by Hosam Darwish
  @Test
  void findAllProjectsTest() {
    List<Project> expected = this.projectRepo.findAll();
    // Make sure the list is not null
    assertNotNull(expected);

    // Find the dummy test event in the database
    foundProject = projectRepo.findById(TEST_PROJECT_ID);

    // Contains a specific object
    assertTrue(expected.contains(foundProject));

    // All results are of type Project and stored in a ArrayList
    assertThat(expected.getClass(), is((Object) ArrayList.class));
    assertThat(expected.get(0).getClass(), is((Object) Project.class));
  }

  // Test by Hosam Darwish
  @Test
  void threeFiltersFindProjectsTest() {
    // Find the dummy test event in the database
    foundProject = projectRepo.findById(TEST_PROJECT_ID);

    int expected = 1;
    String start = "1975-02-11";
    String end = "1995-02-11";
    String type = "Park";

    // Retrieve the dummy test event using the specific filters
    List<Project> actual = projectRepo.threeFiltersFind(start, end, type);

    // Make sure the list is not null
    assertNotNull(actual);

    // There should only be one project matching these filters
    assertEquals(expected, actual.size());

    // Test if the first project retrieved matches the filters
    assertEquals(actual.get(0).getStartDate(), foundProject.getStartDate());
    assertThat(actual.get(0).getStartDate(), equalTo(foundProject.getStartDate()));
    assertEquals(actual.get(0).getEndDate(), foundProject.getEndDate());
    assertThat(actual.get(0).getEndDate(), is(foundProject.getEndDate()));
    assertThat(actual.get(0).getEndDate().toString(), containsString(foundProject.getEndDate().toString()));
    assertThat(actual.get(0).getType(), startsWith(type));

    // Check if the code and object equals the test dummy project
    assertEquals(actual.get(0).getCode(), foundProject.getCode());
    assertEquals(actual.get(0), foundProject);
  }

  // Test by Hosam Darwish
  @Test
  void fourFiltersFindProjectsTest() {
    // Find the dummy test event in the database
    foundProject = projectRepo.findById(TEST_PROJECT_ID);

    int expected = 1;
    String start = "1975-02-11";
    String end = "1995-02-11";
    String title = "test";
    String hood = "Oost";

    // Retrieve the dummy test event using the specific filters
    List<Project> actual = projectRepo.fourFiltersFind(start, end, title, hood);

    // There should only be one project matching these filters
    assertEquals(expected, actual.size());

    // Test if the first project retrieved matches the filters
    assertEquals(actual.get(0).getStartDate(), foundProject.getStartDate());
    assertEquals(actual.get(0).getEndDate(), foundProject.getEndDate());
    assertEquals(actual.get(0).getName(), title);
    assertThat(actual.get(0).getName(), endsWith(title));
    assertEquals(actual.get(0).getNeighbourhood(), hood);

    // Check if the code and object equals the test dummy project
    assertEquals(actual.get(0).getCode(), foundProject.getCode());
    assertEquals(actual.get(0), foundProject);
  }

  // Test by Hosam Darwish
  @Test
  void datesHoodFiltersProjectsTest() {
    // Find the dummy test event in the database
    foundProject = projectRepo.findById(TEST_PROJECT_ID);

    int expected = 1;
    String start = "1975-02-11";
    String end = "1995-02-11";
    String hood = "Oost";

    // Retrieve the dummy test event using the specific filters
    List<Project> actual = projectRepo.datesHoodFilters(start, end, hood);

    // There should only be one project matching these filters
    assertEquals(expected, actual.size());

    // Test if the first project retrieved matches the filters
    assertEquals(actual.get(0).getStartDate(), foundProject.getStartDate());
    assertEquals(actual.get(0).getEndDate(), foundProject.getEndDate());
    assertEquals(actual.get(0).getNeighbourhood(), hood);

    // Check if the code and object equals the test dummy project
    assertEquals(actual.get(0).getCode(), foundProject.getCode());
    assertEquals(actual.get(0), foundProject);
  }

  // Test by Hosam Darwish
  @Test
  void datesTitleFiltersProjectsTest() {
    // Find the dummy test event in the database
    foundProject = projectRepo.findById(TEST_PROJECT_ID);

    int expected = 1;
    String start = "1975-02-11";
    String end = "1995-02-11";
    String title = "test";

    // Retrieve the dummy test event using the specific filters
    List<Project> actual = projectRepo.datesTitleFilters(start, end, title);

    // There should only be one project matching these filters
    assertEquals(expected, actual.size());

    // Test if the first project retrieved matches the filters
    assertEquals(actual.get(0).getStartDate(), foundProject.getStartDate());
    assertEquals(actual.get(0).getEndDate(), foundProject.getEndDate());
    assertEquals(actual.get(0).getName(), title);
    assertThat(actual.get(0).getName(), equalTo(title));

    // Check if the code and object equals the test dummy project
    assertEquals(actual.get(0).getCode(), foundProject.getCode());
    assertEquals(actual.get(0), foundProject);
  }

  // Test by Hosam Darwish
  @Test
  void datesFiltersProjectsTest() {
    // Find the dummy test event in the database
    foundProject = projectRepo.findById(TEST_PROJECT_ID);

    assertThat(foundProject, instanceOf(Project.class));

    int expected = 1;
    String start = "1975-02-11";
    String end = "1995-02-11";

    // Retrieve the dummy test event using the specific filters
    List<Project> actual = projectRepo.datesFilters(start, end);

    // There should only be one project matching these filters
    assertEquals(expected, actual.size());

    // Test if the first project retrieved matches the filters
    assertEquals(actual.get(0).getStartDate(), foundProject.getStartDate());
    assertEquals(actual.get(0).getEndDate(), foundProject.getEndDate());

    // Check if the code and object equals the test dummy project
    assertEquals(actual.get(0).getCode(), foundProject.getCode());
    assertEquals(actual.get(0), foundProject);
  }

  // Test by Hosam Darwish
  @Test
  void deleteProjectTest() {
    // Check initial amount of projects in the database
    int beforeSave = this.projectRepo.findAll().size();

    // Create a new Project
    sampleProject = new Project("delete", "132654987", "deleted", new Date(), new Date(),
      52, 4.3, "Park", "Oost", "delete", "done",
      "this project should be deleted");

    // Try to save the project to the repository
    savedProject = projectRepo.save(sampleProject);

    // Find the newly added deletable project
    List<Project> deletableProjects = projectRepo.fourFiltersFind("1900-01-01", "2030-01-01", "delete", "Oost");

    // Check if there were any projects retrieved
    assertThat(deletableProjects.get(0), isA(Project.class));

    // Retrieve the id of the deletable project
    int deleteId = (int) deletableProjects.get(0).getId();

    // Delete the deletable project and retrieve the status
    boolean deleted = projectRepo.deleteById(deleteId);

    // Check current amount of projects in the database
    int afterSave = this.projectRepo.findAll().size();

    // Check if the status of deleting the project is gone right
    assertTrue(deleted);
    // Check if the number is increased by one
    assertEquals(beforeSave, afterSave);
  }
}
