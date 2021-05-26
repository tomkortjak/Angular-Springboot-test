package app.rest;

import app.entities.Employee;
import exeptions.ForbiddenException;
import exeptions.NotFoundException;
import org.junit.jupiter.api.Test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.sql.Date;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class EmployeeServerControllerTest {

  @Autowired
  private MockMvc mvc;

  @Autowired
  ServerController controller;

  // Test by Tom Kwarten
  @Test
  void putEmployeeException() throws ForbiddenException {
    Employee newEmployee = new Employee("newEmployee", "newEmployee", "new@Employee.nl", "newEmployee", true,
      "newEmployee", "newEmployeeDistrict", "123457890", "newEmployee", Date.valueOf(LocalDate.now()));
    newEmployee.setId(999);

    assertThrows(ForbiddenException.class, () -> {
      controller.putEmployee(1, newEmployee);
    });
  }

  // Test by Tom Kwarten
  @Test
  void deleteEmployeeException() throws NotFoundException {
    assertThrows(NotFoundException.class, () -> {
      controller.deleteAccount(-10);
    });
  }

  // Test by Tom Kwarten
  @Test
  void getEmployeeException() throws NotFoundException {
    assertThrows(NotFoundException.class, () -> {
      controller.getEmployee(-10);
    });
  }

  // Test by Tom Kwarten
  //check if employee can be retrieved
  @Test
  void getEmployee() throws Exception {
    mvc.perform(get("/rest/accounts")
      .contentType(MediaType.ALL)
    ).andExpect(status().isOk());
  }

}
