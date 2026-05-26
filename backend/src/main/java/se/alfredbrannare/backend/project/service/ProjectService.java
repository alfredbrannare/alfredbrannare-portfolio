package se.alfredbrannare.backend.project.service;

import se.alfredbrannare.backend.project.dto.request.CreateProjectRequest;
import se.alfredbrannare.backend.project.dto.request.UpdateProjectRequest;
import se.alfredbrannare.backend.project.entity.Project;

import java.util.List;

public interface ProjectService {
    List<Project> getAllProjects();
    Project getProjectById(Long id);
    Project createProject(Project project, List<Long> skillIds);
    Project updateProject(Long id, Project project);
    void deleteProject(Long id);
}
