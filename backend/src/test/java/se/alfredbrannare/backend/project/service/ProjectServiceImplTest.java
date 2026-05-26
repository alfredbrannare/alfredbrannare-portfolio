package se.alfredbrannare.backend.project.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import se.alfredbrannare.backend.project.dto.request.CreateProjectRequest;
import se.alfredbrannare.backend.project.dto.request.UpdateProjectRequest;
import se.alfredbrannare.backend.project.entity.Project;
import se.alfredbrannare.backend.project.exception.ProjectNotFoundException;
import se.alfredbrannare.backend.project.mapper.ProjectMapper;
import se.alfredbrannare.backend.project.repository.ProjectRepository;
import se.alfredbrannare.backend.skill.entity.Skill;
import se.alfredbrannare.backend.skill.service.SkillService;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProjectServiceImplTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectServiceImpl projectService;

    @Mock
    private ProjectMapper projectMapper;

    @Mock
    private SkillService skillService;

    @Test
    void getAllProjects_returnsAllFromRepository() {
        Project project1 = new Project();
        project1.setTitle("Project 1");
        Project project2 = new Project();
        project2.setTitle("Project 2");

        when(projectRepository.findAll()).thenReturn(List.of(project1, project2));

        List<Project> result = projectService.getAllProjects();

        assertThat(result).hasSize(2);
        assertThat(result).extracting(Project::getTitle).containsExactlyInAnyOrder("Project 1", "Project 2");
    }

    @Test
    void getProjectById_returnsProjectFromRepository() {
        Project project = new Project();
        project.setId(1L);
        project.setTitle("Project 1");

        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));

        Project result = projectService.getProjectById(1L);

        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getTitle()).isEqualTo("Project 1");
    }

    @Test
    void getProjectById_whenMissing_throwsNotFound() {
        when(projectRepository.findById(1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> projectService.getProjectById(1L)).isInstanceOf(ProjectNotFoundException.class);
    }

    @Test
    void createProject_savesProjectWithResolvedSkills() {
        Project project = new Project();

        Skill skill1 = new Skill();
        skill1.setId(1L);
        Skill skill2 = new Skill();
        skill2.setId(2L);

        Project saved = new Project();
        saved.setStack(List.of(skill1, skill2));

        when(skillService.getSkillsById(List.of(1L, 2L))).thenReturn(List.of(skill1, skill2));
        when(projectRepository.save(any(Project.class))).thenReturn(saved);

        Project result = projectService.createProject(project, List.of(1L, 2L));

        assertThat(result.getStack()).containsExactlyInAnyOrder(skill1, skill2);
        verify(skillService).getSkillsById(List.of(1L, 2L));
        verify(projectRepository).save(any(Project.class));
    }

}
