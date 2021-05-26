package app.repository;

import app.entities.QuestionnaireResult;
import app.rest.ServerController;
import exeptions.NotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.internal.bytebuddy.matcher.ElementMatchers.is;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class QuestionnaireResultRepositoryJpaTest {

  private List<QuestionnaireResult> resultList;

  @Autowired
  private QuestionnaireResultRepositoryJpa repositoryJpa;

  @Autowired
  private ServerController controller;

  @BeforeEach
  void setUp(){
    resultList = repositoryJpa.findAll(1);
  }


  //Test written by Safak Inan
  @Test
  void updateResultsTest(){
    //Create a new Questionairesult
    QuestionnaireResult result = new QuestionnaireResult();
    result.setEmail("testEmail");
    result.setExercise(20);
    result.setExperiencingNature(20);
    result.setGardening(20);
    result.setMeetingPeople(20);
    result.setRestAndRelaxation(20);

    //Get the current size
    int oldSize = resultList.size();
    assertEquals(resultList.size(), oldSize);

    //Save the object in the database
    repositoryJpa.save(result);
    resultList = repositoryJpa.findAll(1);
    assertEquals(resultList.size(), oldSize + 1);
    QuestionnaireResult addedResult = resultList.get(oldSize);
    assertEquals(addedResult.getEmail(), result.getEmail());
  }

  //Test written by Safak Inan
  @Test
  void singleResultUpdateTest(){
    //Get the result on index 4
    QuestionnaireResult result = resultList.get(0);
    int size = resultList.size();
    assertEquals(repositoryJpa.findAll(1).size(), size);
    result.setSex("Male");

    //Update the object
    repositoryJpa.save(result);
    assertEquals(repositoryJpa.findAll(1).size(), size);
    resultList = repositoryJpa.findAll(1);

    //Check if objects are the same
    QuestionnaireResult resultNew = resultList.get(0);
    assertEquals(resultNew.getEmail(), resultNew.getEmail());
  }

  //Test written by Safak Inan
  @Test
  void deleteResultTest(){
    //Get current size
    int size = resultList.size();
    assertEquals(repositoryJpa.findAll(1).size(), size);
    QuestionnaireResult result = resultList.get(0);

    //Delete object
    repositoryJpa.deleteById(result.getId());

    //Check if current size is 1 less
    assertEquals(repositoryJpa.findAll(1).size(), size-1);
    assertNull(repositoryJpa.findById(result.getId()));

  }

  //Test written by Safak Inan
  @Test
  void getSingleResult(){
    //Get object and check if it contains in the table
    QuestionnaireResult result = repositoryJpa.findById(repositoryJpa.findAll(1).get(0).getId());
    System.out.println(repositoryJpa.findById(repositoryJpa.findAll(1).get(0).getId()));
    System.out.println(resultList.get(0));
    assertTrue(resultList.contains(result));
    assertEquals(resultList.get(0).getClass(), QuestionnaireResult.class);
  }

  //Test written by Safak Inan
  @Test
  void putResultsException(){
    assertThrows(Exception.class, () -> {
      controller.postQuestionnaire(null);
    });
  }



//  @Test
//  void getResultsException(){
//    assertThrows(NotFoundException.class, () -> {
//      controller.getProjectResults(-10);
//    });
//  }


}
