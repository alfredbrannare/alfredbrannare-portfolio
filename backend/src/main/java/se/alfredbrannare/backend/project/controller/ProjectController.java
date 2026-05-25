package se.alfredbrannare.backend.project.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.alfredbrannare.backend.project.dto.response.ProjectResponse;
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

}
