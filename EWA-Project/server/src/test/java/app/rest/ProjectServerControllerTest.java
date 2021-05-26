package app.rest;

import exeptions.NotFoundException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ProjectServerControllerTest {
  @Mock
  @Autowired
  private ServerController serverTemplate;

  @BeforeEach
  void setUp() {
  }

  @AfterEach
  void tearDown() {
  }

  // Test by Hosam Darwish
  @Test
  void DeleteProjectTestException() throws NotFoundException {
    // Expect an exception to be thrown when a project which doesn't exist and is tried to be deleted
    assertThrows(NotFoundException.class, () -> {
      serverTemplate.deleteProject(0);
    });
  }

  // Test by Hosam Darwish
  @Test
  void GetProjectTestException() throws NotFoundException {
    // Expect an exception to be thrown when a project which doesn't exist and is tried to be retrieved
    assertThrows(NotFoundException.class, () -> {
      serverTemplate.getProject(0);
    });
  }
}
