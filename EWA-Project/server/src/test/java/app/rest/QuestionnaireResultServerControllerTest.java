package app.rest;

import app.entities.Project;
import app.entities.QuestionnaireResult;
import app.repository.QuestionnaireResultRepositoryJpa;
import com.fasterxml.jackson.databind.ObjectMapper;
import exeptions.ForbiddenException;
import exeptions.NotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.awt.*;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * This class tests the ServerController endpoints for questionnaire result
 * Author: Yan Lanna Alexandre
 */

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class QuestionnaireResultServerControllerTest {



  @Autowired
  private ServerController serverController;

  @Autowired
  private MockMvc mvc;


  @Test
  public void questionnaireResultPostWorksAndAddsOneResult() throws Exception {

    MockHttpServletRequest request = new MockHttpServletRequest();
    RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

    List<QuestionnaireResult> projectResultsBeforeAddingNewResult = serverController.getProjectResults(9999);

    // create questionnaireresult object
    QuestionnaireResult expectedResult = new QuestionnaireResult();
    expectedResult.setExercise(20);
    expectedResult.setExperiencingNature(20);
    expectedResult.setGardening(20);
    expectedResult.setMeetingPeople(20);
    expectedResult.setRestAndRelaxation(20);
    expectedResult.setEmail("testEmail");
    expectedResult.setSex("Male");
    expectedResult.addProject(serverController.getProject(9999));

    // post object
    serverController.postQuestionnaire(expectedResult);
    // retrieve list of questionnaire results
    List<QuestionnaireResult> projectResultsAfterAddingNewResult = serverController.getProjectResults(9999);

    // check if object has been posted
    assertTrue(projectResultsBeforeAddingNewResult.size() == projectResultsAfterAddingNewResult.size() - 1);
  }

  @Test
  public void getNonExistentProjectResults(){
    assertThrows(NotFoundException.class, () -> {
      serverController.getProjectResults(-1);
    });
  }

  @Test
  public void getQuestionnaireResult() throws Exception{
    mvc.perform(get("/projects/results/1")
        .contentType(MediaType.ALL)
    ).andExpect(status().isOk());
  }

  @Test
  public void postFaultQuestionnaireResult() throws Exception{
//     create questionnaireresult object without project added to it
    QuestionnaireResult questionnaireResult = new QuestionnaireResult();
 //    post faulty object
    assertThrows(ForbiddenException.class, () -> {
      serverController.postQuestionnaire(questionnaireResult);
    });
  }

}
