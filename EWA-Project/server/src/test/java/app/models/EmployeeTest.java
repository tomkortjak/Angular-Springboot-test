package app.models;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
/**
 * This class tests the Employee Model
 * Author: Yan Lanna Alexandre
 */
public class EmployeeTest extends ModelTestSetup{


  public static final String EXPECTED_FIRST_NAME = "Satesh";
  public static final String EXPECTED_LAST_NAME = "Anumala";
  public static final String EXPECTED_EMAIL = "satesh.anumala@gmail.com";
  public static final String EXPECTED_PASSWORD = "house15#049";



  @Test
  public void testEmployeeDetails(){
    assertEquals(employee.getName(), EXPECTED_FIRST_NAME);
    assertEquals(employee.getLastName(), EXPECTED_LAST_NAME);
    assertEquals(employee.getEmail(), EXPECTED_EMAIL);
    assertEquals(employee.getPassword(), EXPECTED_PASSWORD);
  }

//  @Test
//  public void testEmployeeProjectsOneToManyRelation(){
//     ArrayList<Project> projectList = new ArrayList<>();
//
//     assertNull(employee.getProjects());
//
//     projectList.add(project);
//     projectList.add(project);
//     projectList.add(project);
//    employee.setProjects(projectList);
//
//    assertTrue(employee.getProjects().contains(project));
//    assertTrue(employee.getProjects().size() == 3);
//  }



}
