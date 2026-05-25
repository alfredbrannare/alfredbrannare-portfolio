package se.alfredbrannare.backend.project.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.alfredbrannare.backend.project.dto.request.CreateProjectRequest;
import se.alfredbrannare.backend.project.dto.response.ProjectResponse;
import se.alfredbrannare.backend.project.entity.Project;
import se.alfredbrannare.backend.project.mapper.ProjectMapper;
import se.alfredbrannare.backend.project.service.ProjectService;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;
    private final ProjectMapper projectMapper;

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getAllProjects() {
        List<ProjectResponse> projects = projectMapper.toResponseList(projectService.getAllProjects());
        return ResponseEntity.ok(projects);
    }

    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(@Valid @RequestBody CreateProjectRequest request) {
        Project saved = projectService.createProject(request);
        return ResponseEntity.ok(projectMapper.toResponse(saved));
    }

}
