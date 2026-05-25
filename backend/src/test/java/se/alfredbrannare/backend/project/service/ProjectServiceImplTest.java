package se.alfredbrannare.backend.project.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import se.alfredbrannare.backend.project.entity.Project;
import se.alfredbrannare.backend.project.repository.ProjectRepository;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
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

}
