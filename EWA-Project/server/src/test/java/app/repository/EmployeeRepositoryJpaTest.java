package app.repository;

import app.entities.Employee;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.mockito.Mockito.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class EmployeeRepositoryJpaTest {
  @Autowired
  private EmployeeRepositoryJpa employeeRepo;

  @Autowired
  private TestRestTemplate restTemplate;

  private final int EMPLOYEE_TEST_ID = 123;


  // setup for if the employee doesn't exist
  @BeforeAll
  void testSetup() {
    if (employeeRepo.findById(EMPLOYEE_TEST_ID) == null) {
      Employee testEmployee = new Employee("testName", "testPassword", "test@test.nl", "password", true,
        "testDepartment", "testDistrict", "123457890", "testImage", Date.valueOf(LocalDate.now()));
      testEmployee.setId(EMPLOYEE_TEST_ID);
      Employee newEmployee = new Employee("newEmployee", "newEmployee", "new@Employee.nl", "newEmployee", true,
        "newEmployee", "newEmployeeDistrict", "123457890", "newEmployee", Date.valueOf(LocalDate.now()));
      employeeRepo.save(testEmployee);
      employeeRepo.save(newEmployee);
    }
  }

  // Test by Tom Kwarten
  @Test
  void saveEmployeeTest() {
    final int expectedSize = this.employeeRepo.findAll(null, null, null).size() + 1;
    Employee testEmployee;
    // Create a new Employee
    testEmployee = new Employee("newEmployee", "newEmployee", "new@Employee.nl", "newEmployee", true,
      "newEmployee", "newEmployeeDistrict", "123457890", "newEmployee", Date.valueOf(LocalDate.now()));

    // Try to save the employee to the repository
    employeeRepo.save(testEmployee);
    System.out.println("Id van employee is: " + testEmployee.getId());
    this.employeeRepo.findAll(null, null, null).forEach(employee -> {
      System.out.println("Id van employee is: " + employee.getId());
    });

    // Check current amount of employees in the database
    final int actualSize = this.employeeRepo.findAll(null, null, null).size();

    // Check if the size of employees is increased by one
    assertEquals(expectedSize, actualSize);
  }

  // Test by Tom Kwarten
  @Test
  void findEmployeeById() {
    // Try to retrieve the employee from the repository
    Employee foundEmployee = employeeRepo.findById(EMPLOYEE_TEST_ID);

    //check if the employee has been updated with the new phone number
    assertThat(foundEmployee, instanceOf(Employee.class));
    assertThat((int) foundEmployee.getId(), is(EMPLOYEE_TEST_ID));
  }

  // Test by Tom Kwarten
  @Test
  void findNoEmployeeById() {
    // Try to retrieve the employee from the repository
    Employee foundEmployee = employeeRepo.findById(666666);

    // check if the employee has been updated with the new phone number
    assertNull(foundEmployee);
  }

  // Test by Tom Kwarten
  @Test
  void putEmployeeTest() {
    final String randomNumber = Integer.toString((int) Math.round((Math.random() * 99999999) + 10000000));

    // retrieve employee and give him a new number
    Employee updatedEmployee = employeeRepo.findById(EMPLOYEE_TEST_ID);
    updatedEmployee.setPhoneNumber(randomNumber);

    // try to update the employee to the repository
    employeeRepo.save(updatedEmployee);

    // check if the employee has been updated with the new phone number
    assertThat(employeeRepo.findById(EMPLOYEE_TEST_ID).getPhoneNumber(), equalTo(randomNumber));
  }

  // Test by Tom Kwarten
  @Test
  void findEmployeeWithNameAndDepartment() {
    final String name = "testName";
    final String district = "testDistrict";

    // retrieve employee with filters
    List<Employee> retrievedEmployees = employeeRepo.findAll(name, null, district);

    // assert that all employees contain the string name and district
    retrievedEmployees.forEach(employee -> {
      assertThat(employee.getDistrict(), containsString("testDistrict"));
      assertThat(employee.getName(), containsString("testName"));
    });
    assertThat(retrievedEmployees.size(), is(1));
  }

  // Test by Tom Kwarten
  @Test
  void findEmployeeWithNonExistingName() {
    final String name = "thisNameHasNeverBeenUsed";

    // retrieve empty employee list with name that doesn't exist
    List<Employee> retrievedEmployees = employeeRepo.findAll(name, null, null);

    assertThat(retrievedEmployees, everyItem(nullValue()));
  }

  // Test by Tom Kwarten
  @Test
  void findEmployeeWithAllFilters() {
    final String name = "testName";
    final String district = "testDistrict";
    final String email = "test@test.nl";

    // retrieve employee with filters
    List<Employee> retrievedEmployees = employeeRepo.findAll(name, email, district);

    assertNotNull(retrievedEmployees);
    // check if retrieved employee contains filters
    retrievedEmployees.forEach(employee -> {
      assertThat(employee.getDistrict(), containsString(district));
      assertThat(employee.getName(), containsString(name));
      assertThat(employee.getEmail(), containsString(email));
    });
    assertThat(retrievedEmployees.size(), is(1));
  }

  // Test by Tom Kwarten
  @Test
  void findMultipleEmployeeWithDistrict() {
    final String district = "newEmployeeDistrict";

    // retrieve employee with filters
    List<Employee> retrievedEmployees = employeeRepo.findAll(null, null, district);
    assertNotNull(retrievedEmployees);
    retrievedEmployees.forEach(employee -> {
      assertEquals(district, employee.getDistrict());
    });
    // assert that multiple employees have been retrieved
    assertThat(retrievedEmployees.size(), greaterThan(1));
  }

  // Test by Tom Kwarten
  @Test
  void findMultipleEmployeeWithEmail() {
    final String email = "new@Employee.nl";

    // retrieve employee with filters
    List<Employee> retrievedEmployees = employeeRepo.findAll(null, email, null);
    assertNotNull(retrievedEmployees);
    retrievedEmployees.forEach(employee -> {
      assertEquals(email, employee.getEmail());
    });
    // assert that multiple employees have been retrieved
    assertThat(retrievedEmployees.size(), greaterThan(1));
  }

  // Test by Tom Kwarten
  @Test
  void findMultipleEmployeeWithName() {
    final String name = "newEmployee";

    // retrieve employee with filters
    List<Employee> retrievedEmployees = employeeRepo.findAll(name, null, null);
    assertNotNull(retrievedEmployees);
    // assert that multiple employees have been retrieved
    retrievedEmployees.forEach(employee -> {
      assertEquals(name, employee.getName());
    });
    assertThat(retrievedEmployees.size(), greaterThan(1));
  }

  // Test by Tom Kwarten
  @Test
  void findEmployeeWithDistrictAndEmail() {
    final String district = "testDistrict";
    final String email = "test@test.nl";

    // retrieve employee with filters
    List<Employee> retrievedEmployees = employeeRepo.findAll(null, email, district);

    assertNotNull(retrievedEmployees);
    // check if retrieved employee contains filters
    retrievedEmployees.forEach(employee -> {
      assertThat(employee.getDistrict(), containsString(district));
      assertThat(employee.getEmail(), containsString(email));
    });
    assertThat(retrievedEmployees.size(), is(1));
  }

  // Test by Tom Kwarten
  @Test
  void deleteEmployee() {
    Employee newEmployee = new Employee("toBeDeletedEmployee", "toBeDeletedEmployee", "toBeDeleted@Employee.nl",
      "toBeDeletedEmployee", true, "toBeDeletedEmployee", "toBeDeletedEmployee",
      "123457890", "toBeDeletedEmployee", Date.valueOf(LocalDate.now()));
    employeeRepo.save(newEmployee);
    // get original size of employeeList
    int beforeDelete = employeeRepo.findAll(null, null, null).size();

    List<Employee> deletedEmployee = employeeRepo.findAll("toBeDeletedEmployee", null, null);
    assertNotEquals(null, employeeRepo.findAll("toBeDeletedEmployee", null, null));
    employeeRepo.deleteById(deletedEmployee.get(0).getId());

    // get new size of employeeList after deleting Employee
    int afterDelete = employeeRepo.findAll(null, null, null).size();

    // check if the size has decreased
    assertThat(afterDelete, lessThan(beforeDelete));
  }
}
