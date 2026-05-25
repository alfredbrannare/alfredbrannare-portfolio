package se.alfredbrannare.backend.project.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import se.alfredbrannare.backend.project.entity.Project;
import se.alfredbrannare.backend.project.exception.ProjectNotFoundException;
import se.alfredbrannare.backend.project.repository.ProjectRepository;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProjectServiceImplTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectServiceImpl projectService;

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
    void saveProject_returnsSavedProject() {
        Project input = new Project();
        input.setTitle("Project 1");

        Project saved = new Project();
        saved.setId(1L);
        saved.setTitle("Project 1");

        when(projectRepository.save(input)).thenReturn(saved);

        Project result = projectService.saveProject(input);

        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getTitle()).isEqualTo("Project 1");
    }

}
