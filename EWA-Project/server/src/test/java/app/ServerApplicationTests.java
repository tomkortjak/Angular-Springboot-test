package app;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class ServerApplicationTests {
  @Mock
  @Autowired
  ServerApplication application = null;

  // Test by Hosam Darwish
  @Test
  void contextLoads() {
    // Test dependency injection of main application bean
    assertNotNull(application);
    System.out.println("Application auto-configuration has succeeded.");
  }
}
