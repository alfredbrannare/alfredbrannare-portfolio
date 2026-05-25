package se.alfredbrannare.backend.project.service;

import se.alfredbrannare.backend.project.dto.request.CreateProjectRequest;
import se.alfredbrannare.backend.project.entity.Project;

import java.util.List;

public interface ProjectService {
    List<Project> getAllProjects();
    Project getProjectById(Long id);
    Project createProject(CreateProjectRequest project);
    Project updateProject(Project project);
    void deleteProject(Long id);
}
