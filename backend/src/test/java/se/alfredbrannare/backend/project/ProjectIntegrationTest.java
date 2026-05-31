package se.alfredbrannare.backend.project;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;
import se.alfredbrannare.backend.project.entity.Project;
import se.alfredbrannare.backend.project.exception.ProjectNotFoundException;
import se.alfredbrannare.backend.project.service.ProjectService;
import se.alfredbrannare.backend.skill.entity.Skill;
import se.alfredbrannare.backend.skill.repository.SkillRepository;
import se.alfredbrannare.backend.storage.service.StorageService;

@SpringBootTest
@Testcontainers
@Transactional
public class ProjectIntegrationTest {

  @Container @ServiceConnection
  static PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:18");

  @Autowired private ProjectService projectService;

  @Autowired private SkillRepository skillRepository;

  @MockitoBean private StorageService storageService;

  @Test
  void createProject_persistsWithSkills() {
    Skill skill = new Skill();
    skill.setName("Java");
    skill.setType("backend");
    Skill savedSkill = skillRepository.save(skill);

    Project project = new Project();
    project.setTitle("Portfolio");

    Project saved = projectService.createProject(project, List.of(savedSkill.getId()));

    assertThat(saved.getId()).isNotNull();
    assertThat(saved.getStack()).hasSize(1);
    assertThat(saved.getStack().getFirst().getName()).isEqualTo("Java");
  }

  @Test
  void getProjectById_returnsProjectWithSkills() {
    Skill skill = new Skill();
    skill.setName("Java");
    skill.setType("backend");
    Skill savedSkill = skillRepository.save(skill);

    Project project = new Project();
    project.setTitle("Portfolio");
    Project saved = projectService.createProject(project, List.of(savedSkill.getId()));

    Project found = projectService.getProjectById(saved.getId());

    assertThat(found.getStack()).hasSize(1);
    assertThat(found.getStack().getFirst().getName()).isEqualTo("Java");
  }

  @Test
  void getProjectById_throwsWhenProjectNotFound() {
    assertThatThrownBy(() -> projectService.getProjectById(1L))
        .isInstanceOf(ProjectNotFoundException.class);
  }

  @Test
  void updateProject_updatesAllFields() {
    Skill skill = new Skill();
    skill.setName("Java");
    skill.setType("backend");
    Skill savedSkill = skillRepository.save(skill);

    Project project = new Project();
    project.setTitle("Portfolio");
    Project saved = projectService.createProject(project, List.of(savedSkill.getId()));

    Project updated = new Project();
    updated.setId(saved.getId());
    updated.setTitle("New Portfolio");
    updated.setDescription("New description");

    Project updatedProject =
        projectService.updateProject(saved.getId(), updated, List.of(savedSkill.getId()));

    assertThat(updatedProject.getTitle()).isEqualTo("New Portfolio");
    assertThat(updatedProject.getDescription()).isEqualTo("New description");
    assertThat(updatedProject.getStack()).hasSize(1);
    assertThat(updatedProject.getStack().getFirst().getName()).isEqualTo("Java");
  }

  @Test
  void updateProject_replacesSkills() {
    Skill java = skillRepository.save(newSkill("Java", "backend"));
    Skill typescript = skillRepository.save(newSkill("TypeScript", "frontend"));

    Project project = new Project();
    project.setTitle("Portfolio");
    Project saved = projectService.createProject(project, List.of(java.getId()));

    Project update = new Project();
    update.setTitle(saved.getTitle());

    Project updated =
        projectService.updateProject(saved.getId(), update, List.of(typescript.getId()));

    assertThat(updated.getStack()).extracting(Skill::getName).containsExactly("TypeScript");
  }

  private Skill newSkill(String name, String type) {
    Skill skill = new Skill();
    skill.setName(name);
    skill.setType(type);
    return skill;
  }

  @Test
  void updateProject_throwsWhenProjectNotFound() {
    assertThatThrownBy(() -> projectService.updateProject(1L, new Project(), List.of()))
        .isInstanceOf(ProjectNotFoundException.class);
  }

  @Test
  void deleteProject_removesProjectFromDatabase() {
    Project project = new Project();
    project.setTitle("Portfolio");

    Project saved = projectService.createProject(project, List.of());

    assertThat(projectService.getAllProjects()).hasSize(1);

    projectService.deleteProject(saved.getId());

    assertThat(projectService.getAllProjects()).isEmpty();
  }

  @Test
  void deleteProject_throwsWhenProjectNotFound() {
    assertThatThrownBy(() -> projectService.deleteProject(1L))
        .isInstanceOf(ProjectNotFoundException.class);
  }

  @Test
  void addImageToProject_throwsWhenProjectNotFound() {
    assertThatThrownBy(() -> projectService.addImageToProject(1L, null))
        .isInstanceOf(ProjectNotFoundException.class);
  }

  @Test
  void addImageToProject_setsImageUrlAndSaves() {
    Project project = new Project();
    project.setTitle("Portfolio");
    Project saved = projectService.createProject(project, List.of());
    String imageUrl = "https://example.com/image.jpg";
    MockMultipartFile file =
        new MockMultipartFile("file", "test.jpg", "image/jpeg", "test".getBytes());

    when(storageService.upload(file)).thenReturn(imageUrl);

    Project result = projectService.addImageToProject(saved.getId(), file);

    assertThat(result.getImage()).isEqualTo(imageUrl);
  }
}
