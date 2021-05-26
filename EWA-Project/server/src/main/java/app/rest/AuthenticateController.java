package app.rest;

import app.entities.Employee;
import app.utilities.JWToken;
import com.fasterxml.jackson.databind.node.ObjectNode;
import exeptions.UnAuthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authenticate")
public class AuthenticateController {
  @Autowired
  ServerController controller;
  // JWT configuration that can be adjusted from application.properties
  @Value("${jwt.issuer}")
  private String issuer;

  @Value("${jwt.pass-phrase}")
  private String passPhrase;

  @Value("${jwt.duration-of-validity}")
  private int tokenDurationOfValidity;


  @PostMapping("login")
  public ResponseEntity<Employee> login(@RequestBody ObjectNode loginCredentials) {
    if (loginCredentials.findValue("eMail") != null && loginCredentials.findValue("passWord") != null) {
      String email = loginCredentials.findValue("eMail").textValue();
      String password = loginCredentials.findValue("passWord").textValue();
      Employee currentUser = null;

      for(Employee account: controller.getAccounts(null, null, null)) {
        if(account.getEmail().equals(email) && account.getPassword().equals(password)) {
          currentUser = account;
        }
      }

      if (currentUser != null) {
        JWToken jwToken = new JWToken(currentUser.getName(), currentUser.getId(), currentUser.getAdmin());
        String tokenString = jwToken.encode(issuer, passPhrase, tokenDurationOfValidity);

        return ResponseEntity.accepted()
          .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenString)
          .body(currentUser);
      } else {
        throw new UnAuthorizedException();
      }
    } else {
      throw new UnAuthorizedException();
    }
  }
}
