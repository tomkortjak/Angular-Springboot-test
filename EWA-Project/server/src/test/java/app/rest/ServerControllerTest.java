package app.rest;

import app.entities.Project;
import app.repository.ProjectRepositoryJpa;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ServerControllerTest {

  @Autowired
  private ProjectRepositoryJpa projectRepositoryJpa;

  @Autowired
  private ServerController controller;

  private MockMvc mockMvc;


  //Test written by Safak Inan
  @Test
  void getProjectsTestTitle() {
    List<Project> projectList = controller.getProjects("test", "test", "test", null, null);
    for (Project p: projectList) {
      assertEquals("test", p.getName());
    }
  }

  //Test written by Safak Inan
  @Test
  void getProjectsTestType() {
    List<Project> projectList = controller.getProjects("test", "test", null, "Park", null);
    for (Project p: projectList) {
      assertEquals("Park", p.getType());
    }
  }

  //Test written by Safak Inan
  @Test
  void getProjectsTestHood() {
    List<Project> projectList = controller.getProjects("test", "test", "test", null, "Oost");
    for (Project p: projectList) {
      assertEquals("Oost", p.getNeighbourhood());
    }
  }

  //Test written by Safak Inan
  @Test
  void getProjectsTestTitleAndHood() {
    List<Project> projectList = controller.getProjects("test", "test", "test", null, "Oost");
    for (Project p: projectList) {
      assertEquals("test", p.getName());
      assertEquals("Oost", p.getNeighbourhood());
    }
  }

  //Test written by Safak Inan
  @Test
  void getProjectInfo() {
    Project project = controller.getProjectInfo("9999");
    assertNotNull(project);
    assertEquals(project.getCode(), "9999");
  }

}
