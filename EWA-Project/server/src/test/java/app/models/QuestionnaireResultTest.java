package app.models;
import app.entities.Project;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
/**
 * This class tests the QuestionnaireResult Model
 * Author: Yan Lanna Alexandre
 */
public class QuestionnaireResultTest extends ModelTestSetup{
  public static final int EXPECTED_EXERCISE = 20;
  public static final int EXPECTED_EXPERIENCING_NATURE = 20;
  public static final int EXPECTED_GARDENING = 20;
  public static final String EXPECTED_EMAIL = "testEmail";



  @Test
  public void testQuestionnaireResultDetails(){
    assertEquals(questionnaireResult.getExercise(), EXPECTED_EXERCISE);
    assertEquals(questionnaireResult.getExperiencingNature(), EXPECTED_EXPERIENCING_NATURE);
    assertEquals(questionnaireResult.getGardening(), EXPECTED_GARDENING);
    assertEquals(questionnaireResult.getEmail(), EXPECTED_EMAIL);
  }

  @Test
  public void testQuestionnaireProjectManyToOneRelation(){


    assertNull(questionnaireResult.getProject());

    questionnaireResult.addProject(project);

    assertTrue(questionnaireResult.getProject() == project);
  }

}
