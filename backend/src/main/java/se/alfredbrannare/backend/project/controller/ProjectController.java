package se.alfredbrannare.backend.project.controller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import se.alfredbrannare.backend.project.dto.request.CreateProjectRequest;
import se.alfredbrannare.backend.project.dto.request.UpdateProjectRequest;
import se.alfredbrannare.backend.project.dto.response.ProjectResponse;
import se.alfredbrannare.backend.project.entity.Project;
import se.alfredbrannare.backend.project.mapper.ProjectMapper;
import se.alfredbrannare.backend.project.service.ProjectService;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {
  private final ProjectService projectService;
  private final ProjectMapper projectMapper;

  @GetMapping
  public ResponseEntity<List<ProjectResponse>> getAllProjects() {
    List<ProjectResponse> projects = projectMapper.toResponseList(projectService.getAllProjects());
    return ResponseEntity.status(HttpStatus.OK).body(projects);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ProjectResponse> getProjectById(@PathVariable Long id) {
    Project project = projectService.getProjectById(id);
    return ResponseEntity.status(HttpStatus.OK).body(projectMapper.toResponse(project));
  }

  @PostMapping
  public ResponseEntity<ProjectResponse> createProject(
      @Valid @RequestBody CreateProjectRequest request) {
    Project project = projectMapper.toEntity(request);
    Project saved = projectService.createProject(project, request.skillsIds());
    return ResponseEntity.status(HttpStatus.CREATED).body(projectMapper.toResponse(saved));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ProjectResponse> updateProject(
      @PathVariable Long id, @Valid @RequestBody UpdateProjectRequest request) {
    Project project = projectMapper.toEntity(request);
    Project updated = projectService.updateProject(id, project, request.skillsIds());
    return ResponseEntity.status(HttpStatus.OK).body(projectMapper.toResponse(updated));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
    projectService.deleteProject(id);
    return ResponseEntity.noContent().build();
  }

  @PostMapping(value = "/{id}/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<ProjectResponse> uploadImage(
      @PathVariable Long id, @RequestPart("file") MultipartFile file) {
    Project updated = projectService.addImageToProject(id, file);
    return ResponseEntity.status(HttpStatus.OK).body(projectMapper.toResponse(updated));
  }
}
