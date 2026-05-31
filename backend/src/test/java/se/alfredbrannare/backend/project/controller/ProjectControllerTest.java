package se.alfredbrannare.backend.project.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.IOException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import se.alfredbrannare.backend.project.mapper.ProjectMapper;
import se.alfredbrannare.backend.project.service.ProjectService;
import se.alfredbrannare.backend.security.config.SecurityConfig;
import se.alfredbrannare.backend.storage.exception.InvalidFileTypeException;
import se.alfredbrannare.backend.storage.exception.StorageException;

@WebMvcTest(ProjectController.class)
@Import(SecurityConfig.class)
public class ProjectControllerTest {

  @Autowired private MockMvc mockMvc;

  @MockitoBean private ProjectService projectService;

  @MockitoBean private ProjectMapper projectMapper;

  @Test
  @WithMockUser
  void uploadImage_returnsOkWithUpdatedProject() throws Exception {
    mockMvc
        .perform(
            multipart("/api/projects/1/image")
                .file(new MockMultipartFile("file", "shot.png", "image/png", "x".getBytes()))
                .with(csrf()))
        .andExpect(status().isOk());
  }

  @Test
  @WithMockUser
  void uploadImage_returnsBadRequestForInvalidType() throws Exception {
    when(projectService.addImageToProject(eq(1L), any()))
        .thenThrow(new InvalidFileTypeException("Unsupported content type: text/plain"));

    mockMvc
        .perform(
            multipart("/api/projects/1/image")
                .file(new MockMultipartFile("file", "shot.txt", "text/plain", "x".getBytes()))
                .with(csrf()))
        .andExpect(status().isBadRequest());
  }

  @Test
  @WithMockUser
  void uploadImage_returnsServerError() throws Exception {
    when(projectService.addImageToProject(eq(1L), any()))
        .thenThrow(new StorageException("Failed to upload ", new IOException()));

    mockMvc
        .perform(
            multipart("/api/projects/1/image")
                .file(new MockMultipartFile("file", "shot.png", "image/png", "x".getBytes()))
                .with(csrf()))
        .andExpect(status().is5xxServerError());
  }
}
