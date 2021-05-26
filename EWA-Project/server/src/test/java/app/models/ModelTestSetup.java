package app.models;

import app.entities.Employee;
import app.entities.Project;
import app.entities.QuestionnaireResult;
import org.junit.jupiter.api.BeforeEach;

import java.util.Date;
/**
 * This class sets up Model tests
 * Author: Yan Lanna Alexandre
 */
public class ModelTestSetup {
  Employee employee;
  Project project;
  QuestionnaireResult questionnaireResult;

  @BeforeEach
  public void setUp() throws Exception {
    employee = new Employee("Satesh", "Anumala", "satesh.anumala@gmail.com", "house15#049", true,
      "department2", "Oost", "0659382734", "", new Date(2000, 02, 19));
    project = new Project("Vondelpark rennovatie", "1234", "Vondelpark", new Date(), new Date(),
      10.15, 10.15, "Park", "West", "", "Ended", "Park rennovatie");
    questionnaireResult = new QuestionnaireResult();
    questionnaireResult.setExercise(20);
    questionnaireResult.setExperiencingNature(20);
    questionnaireResult.setGardening(20);
    questionnaireResult.setMeetingPeople(20);
    questionnaireResult.setRestAndRelaxation(20);
    questionnaireResult.setEmail("testEmail");
    questionnaireResult.setSex("Male");
    questionnaireResult.setId(1);

  }
}
