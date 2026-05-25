package se.alfredbrannare.backend.project.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import se.alfredbrannare.backend.project.dto.request.CreateProjectRequest;
import se.alfredbrannare.backend.project.entity.Project;
import se.alfredbrannare.backend.project.exception.ProjectNotFoundException;
import se.alfredbrannare.backend.project.mapper.ProjectMapper;
import se.alfredbrannare.backend.project.repository.ProjectRepository;
import se.alfredbrannare.backend.skill.service.SkillService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
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
    public Project createProject(CreateProjectRequest request) {
        Project project = projectMapper.toRequest(request);
        project.setStack(skillService.getSkillsById(request.skillsIds()));

        return projectRepository.save(project);
    }

    @Override
    public Project updateProject(Project project) {
        return null;
    }

    @Override
    public void deleteProject(Long id) {

    }
}
