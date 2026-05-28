package se.alfredbrannare.backend.security;

import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.client.RestClient;

@Slf4j
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
  private final String adminEmail;
  private final OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate;
  private final RestClient githubApi;

  public CustomOAuth2UserService(
      String adminEmail,
      OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate,
      RestClient githubApi) {
    this.adminEmail = adminEmail;
    this.delegate = delegate;
    this.githubApi = githubApi;
  }

  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    OAuth2User user = delegate.loadUser(userRequest);

    String accessToken = userRequest.getAccessToken().getTokenValue();
    String primaryEmail = fetchPrimaryEmail(accessToken);

    if (primaryEmail == null || !primaryEmail.equalsIgnoreCase(adminEmail)) {
      log.warn(
          "Rejected OAuth2 login: github_login={} primary_email={}",
          user.getAttribute("login"),
          primaryEmail);
      throw new OAuth2AuthenticationException(
          new OAuth2Error("unauthorized_user", "User is not allowed", null));
    }

    log.info("Authorized OAuth2 login for {}", primaryEmail);
    return user;
  }

  private String fetchPrimaryEmail(String accessToken) {
    List<Map<String, Object>> emails =
        githubApi
            .get()
            .uri("/user/emails")
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
            .header(HttpHeaders.ACCEPT, "application/vnd.github+json")
            .retrieve()
            .body(new ParameterizedTypeReference<>() {});

    if (emails == null) return null;
    return emails.stream()
        .filter(email -> Boolean.TRUE.equals(email.get("primary")))
        .filter(email -> Boolean.TRUE.equals(email.get("verified")))
        .map(email -> (String) email.get("email"))
        .findFirst()
        .orElse(null);
  }
}
