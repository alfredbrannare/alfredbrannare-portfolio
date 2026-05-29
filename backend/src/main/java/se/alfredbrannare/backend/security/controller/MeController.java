package se.alfredbrannare.backend.security.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.alfredbrannare.backend.security.dto.response.MeResponse;

@RestController
@RequestMapping("/api/me")
public class MeController {

  @GetMapping
  public ResponseEntity<MeResponse> me(@AuthenticationPrincipal OAuth2User user) {
    if (user == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    MeResponse body = new MeResponse(user.getAttribute("login"), user.getAttribute("name"));

    return ResponseEntity.ok(body);
  }
}
