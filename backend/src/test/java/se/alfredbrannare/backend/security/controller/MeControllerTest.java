package se.alfredbrannare.backend.security.controller;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import se.alfredbrannare.backend.security.config.SecurityConfig;

@WebMvcTest(MeController.class)
@Import(SecurityConfig.class)
class MeControllerTest {

  @Autowired private MockMvc mockMvc;

  @Test
  void me_returnsLoginAndName_whenAuthenticated() throws Exception {
    mockMvc
        .perform(
            get("/api/me")
                .with(
                    oauth2Login()
                        .attributes(
                            attributes -> {
                              attributes.put("login", "testUser");
                              attributes.put("name", "Test User");
                            })))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.login").value("testUser"))
        .andExpect(jsonPath("$.name").value("Test User"));
  }

  @Test
  void me_returnsUnauthorized_whenAnonymous() throws Exception {
    mockMvc.perform(get("/api/me")).andExpect(status().isUnauthorized());
  }
}
