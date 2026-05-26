package se.alfredbrannare.backend.project.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import se.alfredbrannare.backend.project.entity.Project;
import se.alfredbrannare.backend.project.exception.ProjectNotFoundException;
import se.alfredbrannare.backend.project.repository.ProjectRepository;
import se.alfredbrannare.backend.skill.service.SkillService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    private final SkillService skillService;

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project getProjectById(Long id) {
        return projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException(id));
    }

    @Override
    public Project createProject(Project project, List<Long> skillIds) {
        project.setStack(skillService.getSkillsById(skillIds));
        return projectRepository.save(project);
    }

    @Override
    public Project updateProject(Long id, Project project) {
        return null;
    }

    @Override
    public void deleteProject(Long id) {

    }
}
