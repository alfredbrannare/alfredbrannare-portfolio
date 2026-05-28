package se.alfredbrannare.backend.security;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.header;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import java.util.Map;
import java.util.Set;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

@ExtendWith(MockitoExtension.class)
class CustomOAuth2UserServiceTest {

  private static final String ADMIN_EMAIL = "admin@example.com";

  @Mock private OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate;

  private MockRestServiceServer githubServer;
  private CustomOAuth2UserService service;

  @BeforeEach
  void setUp() {
    RestClient.Builder builder = RestClient.builder().baseUrl("https://api.github.com");
    githubServer = MockRestServiceServer.bindTo(builder).build();
    service = new CustomOAuth2UserService(ADMIN_EMAIL, delegate, builder.build());
  }

  @Test
  void loadUser_returnsUserWhenPrimaryEmailMatchesAdmin() {
    OAuth2UserRequest request = mockRequest("token-123");
    when(delegate.loadUser(request)).thenReturn(githubUser("test"));

    githubServer
        .expect(requestTo("https://api.github.com/user/emails"))
        .andExpect(method(HttpMethod.GET))
        .andExpect(header("Authorization", "Bearer token-123"))
        .andRespond(
            withSuccess(
                "[{\"email\":\"admin@example.com\",\"primary\":true,\"verified\":true}]",
                MediaType.APPLICATION_JSON));

    OAuth2User user = service.loadUser(request);

    assertThat(user.<String>getAttribute("login")).isEqualTo("test");
    githubServer.verify();
  }

  @Test
  void loadUser_matchesAdminEmailCaseInsensitively() {
    OAuth2UserRequest request = mockRequest("token-123");
    when(delegate.loadUser(request)).thenReturn(githubUser("test"));

    githubServer
        .expect(requestTo("https://api.github.com/user/emails"))
        .andRespond(
            withSuccess(
                "[{\"email\":\"ADMIN@example.com\",\"primary\":true,\"verified\":true}]",
                MediaType.APPLICATION_JSON));

    assertThat(service.loadUser(request)).isNotNull();
  }

  @Test
  void loadUser_throwsWhenPrimaryEmailDoesNotMatchAdmin() {
    OAuth2UserRequest request = mockRequest("token-123");
    when(delegate.loadUser(request)).thenReturn(githubUser("intruder"));

    githubServer
        .expect(requestTo("https://api.github.com/user/emails"))
        .andRespond(
            withSuccess(
                "[{\"email\":\"other@example.com\",\"primary\":true,\"verified\":true}]",
                MediaType.APPLICATION_JSON));

    assertThatThrownBy(() -> service.loadUser(request))
        .isInstanceOf(OAuth2AuthenticationException.class)
        .extracting(ex -> ((OAuth2AuthenticationException) ex).getError().getErrorCode())
        .isEqualTo("unauthorized_user");
  }

  @Test
  void loadUser_throwsWhenNoPrimaryEmailReturned() {
    OAuth2UserRequest request = mockRequest("token-123");
    when(delegate.loadUser(request)).thenReturn(githubUser("test"));

    githubServer
        .expect(requestTo("https://api.github.com/user/emails"))
        .andRespond(withSuccess("[]", MediaType.APPLICATION_JSON));

    assertThatThrownBy(() -> service.loadUser(request))
        .isInstanceOf(OAuth2AuthenticationException.class);
  }

  @Test
  void loadUser_throwsWhenPrimaryEmailIsUnverified() {
    OAuth2UserRequest request = mockRequest("token-123");
    when(delegate.loadUser(request)).thenReturn(githubUser("test"));

    githubServer
        .expect(requestTo("https://api.github.com/user/emails"))
        .andRespond(
            withSuccess(
                "[{\"email\":\"admin@example.com\",\"primary\":true,\"verified\":false}]",
                MediaType.APPLICATION_JSON));

    assertThatThrownBy(() -> service.loadUser(request))
        .isInstanceOf(OAuth2AuthenticationException.class);
  }

  private OAuth2User githubUser(String login) {
    return new DefaultOAuth2User(
        Set.of(new SimpleGrantedAuthority("OAUTH2_USER")), Map.of("login", login), "login");
  }

  private OAuth2UserRequest mockRequest(String tokenValue) {
    OAuth2UserRequest request = mock(OAuth2UserRequest.class);
    OAuth2AccessToken token = mock(OAuth2AccessToken.class);
    when(request.getAccessToken()).thenReturn(token);
    when(token.getTokenValue()).thenReturn(tokenValue);
    return request;
  }
}
