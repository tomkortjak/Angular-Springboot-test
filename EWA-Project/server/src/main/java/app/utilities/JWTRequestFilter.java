package app.utilities;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.naming.AuthenticationException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;

@Component
public class JWTRequestFilter extends OncePerRequestFilter {
  // JWT configuration that can be adjusted from application.properties
  @Value("${jwt.pass-phrase:secret info}")
  private String passPhrase;
  private boolean DEV_MODE = false;
  // path prefix that will be protected by the authentication filter
  private static Set<String> SECURE_PATHS = Set.of("/rest");


  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
    throws ServletException, IOException {

    // get requested path
    String path = request.getServletPath();

    if(DEV_MODE) {
      SECURE_PATHS = Set.of("");
    }

    // OPTIONS requests and non-secured area should pass through without check
    if (HttpMethod.OPTIONS.matches(request.getMethod()) ||
      SECURE_PATHS.stream().noneMatch(path::startsWith)) {
      System.out.println(request.getMethod());
      chain.doFilter(request, response);
      return;
    }

    try {
      JWToken jwToken = null;

      // get the encoded token string from the authorization request header
      String encodedToken = request.getHeader(HttpHeaders.AUTHORIZATION);

      if (encodedToken != null) {
        // remove the bearer initial string
        encodedToken = encodedToken.replace("Bearer ", "");

        // decode the token
        jwToken = JWToken.decode(encodedToken, passPhrase);
      }

      if (encodedToken == null) {
        // avoid giving clues to the caller (do not say that header is not present, for example)
//        throw new AuthenticationException("authentication problem");
      }


      // continues the chain
      chain.doFilter(request, response);
    } catch (AuthenticationException e) {
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication error");
      return;
    }
  }
}
