package se.alfredbrannare.backend.project.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import se.alfredbrannare.backend.project.entity.Project;

public interface ProjectService {
  List<Project> getAllProjects();

  Project getProjectById(Long id);

  Project createProject(Project project, List<Long> skillIds);

  Project updateProject(Long id, Project project, List<Long> skillIds);

  void deleteProject(Long id);

  Project addImageToProject(Long id, MultipartFile file);
}
