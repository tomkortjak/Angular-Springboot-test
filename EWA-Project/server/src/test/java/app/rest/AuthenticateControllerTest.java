package app.rest;

import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthenticateControllerTest {

  @Autowired
  private MockMvc mvc;

  private String urlAuth = "/authenticate/login";

  //login gegevens zijn van medewerker 123, dit is een test admin


  @Test
  //test written by Wilco Spruijt
  void testLoginNoContent() throws Exception {
    //this test just tests if it's possible to login if nothing was given
    mvc.perform(post(urlAuth)
      .contentType(MediaType.APPLICATION_JSON)
    ).andExpect(status().isBadRequest());
  }

  @Test
  //test written by Wilco Spruijt
  void testLoginStringContent() throws Exception {
    //this test if the controller checks if it's json
    mvc.perform(post(urlAuth)
      .content("email:test@test.nl,passWord:password")
      .contentType(MediaType.APPLICATION_JSON)
    ).andExpect(status().isBadRequest());
  }

  //test written by Wilco Spruijt
  @Test
  void testLoginEmptyJson() throws Exception {

    mvc.perform(post(urlAuth)
      .contentType(MediaType.APPLICATION_JSON)
      .content("{}")
    ).andExpect(status().isUnauthorized());
  }

  //test written by Wilco Spruijt
  @Test
  void testLoginWrongCred() throws Exception {
    String content = new JSONObject()
      .put("eMail","wrong@wrong.nl")
      .put("passWord","wrongpassword")
      .toString();

    mvc.perform(post(urlAuth)
      .contentType(MediaType.APPLICATION_JSON)
      .content(content)
    ).andExpect(status().isUnauthorized());
  }

  //test written by Wilco Spruijt
  @Test
  void testLoginWrongPassword() throws Exception {
    String content = new JSONObject()
      .put("eMail","test@test.nl")
      .put("passWord","wrongpassword")
      .toString();

    mvc.perform(post(urlAuth)
      .contentType(MediaType.APPLICATION_JSON)
      .content(content)
    ).andExpect(status().isUnauthorized());
  }

  //test written by Wilco Spruijt
  @Test
  void testLoginWrongEMail() throws Exception {
    String content = new JSONObject()
      .put("eMail","wrong@wrong.nl")
      .put("passWord","password")
      .toString();

    mvc.perform(post(urlAuth)
      .contentType(MediaType.APPLICATION_JSON)
      .content(content)
    ).andExpect(status().isUnauthorized());
  }

  //test written by Wilco Spruijt
  @Test
  void testLoginGoodCredAdmin() throws Exception {
    String jsonContent = new JSONObject()
      .put("eMail","test@test.nl")
      .put("passWord","password")
      .toString();

    MvcResult mvcResult = mvc.perform(post(urlAuth)
      .contentType(MediaType.APPLICATION_JSON)
      .content(jsonContent)
    ).andExpect(status().isAccepted())
      .andExpect(jsonPath("$.admin").value(true))
      .andExpect(header().exists("Authorization"))
      .andReturn();

    System.out.printf("%n %n%S%n%n",
      mvcResult.getResponse().getHeader("Authorization"));

  }

  //test written by Wilco Spruijt
  @Test
  void testLoginGoodCredEmployee() throws Exception {
    //gegevens gebaseerd op medewerker 35, deze is gemaakt voor deze test
    String jsonContent = new JSONObject()
      .put("eMail","employee@test.nl")
      .put("passWord","password")
      .toString();

    mvc.perform(post(urlAuth)
      .contentType(MediaType.APPLICATION_JSON)
      .content(jsonContent)
    ).andExpect(status().isAccepted())
      .andExpect(jsonPath("$.admin").value(false))
      .andExpect(header().exists("Authorization"));
  }

  @Test
  //written by Wilco Spruijt
  void testLoginSQLInjectionEMail() throws Exception {
    //gegevens gebaseerd op medewerker 35, deze is gemaakt voor deze test
    String jsonContent = new JSONObject()
      .put("eMail","employee@test.nl ' OR '' = '' ")
      .put("passWord","password")
      .toString();

    mvc.perform(post(urlAuth)
      .contentType(MediaType.APPLICATION_JSON)
      .content(jsonContent)
    ).andExpect(status().isUnauthorized());

  }

  @Test
  void testLoginSQLInjectionPassword() throws Exception {
    //gegevens gebaseerd op medewerker 35, deze is gemaakt voor deze test
    String jsonContent = new JSONObject()
      .put("eMail","employee@test.nl")
      .put("passWord", "\"password\" OR \"\"=\"\" ")
      .toString();

    mvc.perform(post(urlAuth)
      .contentType(MediaType.APPLICATION_JSON)
      .content(jsonContent)
    ).andExpect(status().isUnauthorized());

  }
}
