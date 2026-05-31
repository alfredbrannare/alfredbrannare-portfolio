package se.alfredbrannare.backend.project.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;
import se.alfredbrannare.backend.project.entity.Project;
import se.alfredbrannare.backend.project.exception.ProjectNotFoundException;
import se.alfredbrannare.backend.project.repository.ProjectRepository;
import se.alfredbrannare.backend.skill.entity.Skill;
import se.alfredbrannare.backend.skill.service.SkillService;
import se.alfredbrannare.backend.storage.service.StorageService;

@ExtendWith(MockitoExtension.class)
public class ProjectServiceImplTest {

  @Mock private ProjectRepository projectRepository;

  @InjectMocks private ProjectServiceImpl projectService;

  @Mock private SkillService skillService;

  @Mock private StorageService storageService;

  @Test
  void getAllProjects_returnsAllFromRepository() {
    Project project1 = new Project();
    project1.setTitle("Project 1");
    Project project2 = new Project();
    project2.setTitle("Project 2");

    when(projectRepository.findAll()).thenReturn(List.of(project1, project2));

    List<Project> result = projectService.getAllProjects();

    assertThat(result).hasSize(2);
    assertThat(result)
        .extracting(Project::getTitle)
        .containsExactlyInAnyOrder("Project 1", "Project 2");
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

    assertThatThrownBy(() -> projectService.getProjectById(1L))
        .isInstanceOf(ProjectNotFoundException.class);
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

  @Test
  void updateProject_updatesFieldsAndResolvesSkills() {
    Project existing = new Project();
    existing.setId(1L);
    existing.setTitle("Old Title");
    existing.setDescription("Old Description");

    Project updated = new Project();
    updated.setTitle("New Title");
    updated.setDescription("New Description");

    Skill skill1 = new Skill();
    skill1.setId(1L);

    when(projectRepository.findById(1L)).thenReturn(Optional.of(existing));
    when(skillService.getSkillsById(List.of(1L))).thenReturn(List.of(skill1));
    when(projectRepository.save(any(Project.class)))
        .thenAnswer(invocation -> invocation.getArgument(0));

    Project result = projectService.updateProject(1L, updated, List.of(1L));

    assertThat(result.getTitle()).isEqualTo("New Title");
    assertThat(result.getDescription()).isEqualTo("New Description");
    assertThat(result.getStack()).containsExactly(skill1);
  }

  @Test
  void updateProject_throwsWhenProjectNotFound() {
    when(projectRepository.findById(1L)).thenReturn(Optional.empty());

    assertThatThrownBy(() -> projectService.updateProject(1L, new Project(), List.of(1L)))
        .isInstanceOf(ProjectNotFoundException.class);
  }

  @Test
  void deleteProject_deletesWhenExists() {
    Project existing = new Project();
    existing.setId(1L);

    when(projectRepository.existsById(1L)).thenReturn(true);

    projectService.deleteProject(1L);
    verify(projectRepository).deleteById(1L);
  }

  @Test
  void deleteProject_throwsWhenProjectNotFound() {
    when(projectRepository.existsById(1L)).thenReturn(false);

    assertThatThrownBy(() -> projectService.deleteProject(1L))
        .isInstanceOf(ProjectNotFoundException.class);
  }

  @Test
  void addImageToProject_setsImageUrlAndSaves() {
    Long id = 1L;
    Project project = new Project();
    MultipartFile file = mock(MultipartFile.class);

    when(projectRepository.findById(id)).thenReturn(Optional.of(project));
    when(storageService.upload(file)).thenReturn("https://example.com/image.jpg");
    when(projectRepository.save(project)).thenReturn(project);

    Project result = projectService.addImageToProject(id, file);

    assertThat(result.getImage()).isEqualTo("https://example.com/image.jpg");
    verify(storageService).upload(file);
  }

  @Test
  void addImageToProject_throwsWhenProjectNotFound() {
    when(projectRepository.findById(1L)).thenReturn(Optional.empty());
    assertThatThrownBy(() -> projectService.addImageToProject(1L, mock(MultipartFile.class)))
        .isInstanceOf(ProjectNotFoundException.class);
    verify(storageService, never()).upload(any(MultipartFile.class));
    verify(projectRepository, never()).save(any(Project.class));
  }
}
