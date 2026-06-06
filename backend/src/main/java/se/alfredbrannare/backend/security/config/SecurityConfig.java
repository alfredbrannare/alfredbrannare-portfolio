package se.alfredbrannare.backend.security.config;

import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.client.RestClient;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import se.alfredbrannare.backend.security.service.CustomOAuth2UserService;

@Configuration
public class SecurityConfig {

  @Bean
  public CustomOAuth2UserService customOAuth2UserService(
      @Value("${app.admin-email}") String adminEmail) {
    RestClient githubApi = RestClient.builder().baseUrl("https://api.github.com").build();
    return new CustomOAuth2UserService(adminEmail, new DefaultOAuth2UserService(), githubApi);
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource(
          @Value("${app.frontend-url}") String frontendUrl) {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(List.of(frontendUrl));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("*"));
    config.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(
      HttpSecurity http, CustomOAuth2UserService customOAuth2UserService) throws Exception {
    http.cors(Customizer.withDefaults())
        .authorizeHttpRequests(
            auth ->
                auth.requestMatchers(HttpMethod.GET, "/api/**")
                    .permitAll()
                    .requestMatchers("/", "/error", "/oauth2/**", "/login/**")
                    .permitAll()
                    .requestMatchers("/actuator/health")
                    .permitAll()
                    .requestMatchers(HttpMethod.POST, "/api/**")
                    .authenticated()
                    .requestMatchers(HttpMethod.PUT, "/api/**")
                    .authenticated()
                    .requestMatchers(HttpMethod.DELETE, "/api/**")
                    .authenticated()
                    .anyRequest()
                    .denyAll())
        .oauth2Login(
            oauth2 ->
                oauth2
                    .userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2UserService))
                    .defaultSuccessUrl("http://localhost:3000", true))
        .csrf(csrf -> csrf.spa());
    return http.build();
  }
}
