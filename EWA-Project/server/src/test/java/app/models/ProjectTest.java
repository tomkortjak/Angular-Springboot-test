package app.models;

import app.entities.Project;
import app.entities.QuestionnaireResult;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

/**
 * This class tests the Project Model
 * Author: Yan Lanna Alexandre
 */
public class ProjectTest extends ModelTestSetup {
  public static final String EXPECTED_NAME = "Vondelpark rennovatie";
  public static final String EXPECTED_CODE = "1234";
  public static final String EXPECTED_LOCATION = "Vondelpark";
  public static final String EXPECTED_NEIGHBOURHOOD = "West";

  @Test
  public void testProjectDetails(){
    assertEquals(project.getName(), EXPECTED_NAME);
    assertEquals(project.getCode(), EXPECTED_CODE);
    assertEquals(project.getLocation(), EXPECTED_LOCATION);
    assertEquals(project.getNeighbourhood(), EXPECTED_NEIGHBOURHOOD);
  }

  @Test
  public void testProjectQuestionnaireResultOneToMany(){
    assertTrue(project.getQuestionnaireResults().size() == 0);

    ArrayList<QuestionnaireResult> questionnaireResultsList = new ArrayList<>();
    questionnaireResultsList.add(questionnaireResult);
    questionnaireResultsList.add(questionnaireResult);
    questionnaireResultsList.add(questionnaireResult);
    project.setQuestionnaireResults(questionnaireResultsList);

    assertTrue(project.getQuestionnaireResults().contains(questionnaireResult));
    assertTrue(project.getQuestionnaireResults().size() == 3);
  }
}
