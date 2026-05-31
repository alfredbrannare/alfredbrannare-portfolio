package se.alfredbrannare.backend.skill;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;
import se.alfredbrannare.backend.skill.entity.Skill;
import se.alfredbrannare.backend.skill.exception.SkillAlreadyExistsException;
import se.alfredbrannare.backend.skill.exception.SkillNotFoundException;
import se.alfredbrannare.backend.skill.repository.SkillRepository;
import se.alfredbrannare.backend.skill.service.SkillService;

@SpringBootTest
@Testcontainers
@Transactional
public class SkillIntegrationTest {

  @Container @ServiceConnection
  static PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:18");

  @Autowired private SkillService skillService;

  @Autowired private SkillRepository skillRepository;

  @Test
  void createSkill_persistsToDatabase() {
    Skill skill = newSkill("Java", "backend");

    Skill saved = skillService.createSkill(skill);

    assertThat(saved.getId()).isNotNull();
    assertThat(saved.getName()).isEqualTo("Java");
    assertThat(saved.getType()).isEqualTo("backend");
  }

  @Test
  void createSkill_throwsWhenNameAndTypeAlreadyExist() {
    Skill skill = newSkill("Java", "backend");
    skillRepository.save(skill);

    assertThatThrownBy(() -> skillService.createSkill(skill))
        .isInstanceOf(SkillAlreadyExistsException.class);
  }

  @Test
  void getSkillById_returnsSkill() {
    Skill skill = newSkill("Java", "backend");
    Skill saved = skillRepository.save(skill);

    Skill result = skillService.getSkillById(saved.getId());

    assertThat(result.getId()).isEqualTo(saved.getId());
    assertThat(result.getName()).isEqualTo("Java");
    assertThat(result.getType()).isEqualTo("backend");
  }

  @Test
  void getSkillsById_returnsAllRequestedSkills() {
    Skill skill1 = skillRepository.save(newSkill("Java", "backend"));
    Skill skill2 = skillRepository.save(newSkill("TypeScript", "frontend"));

    List<Skill> result = skillService.getSkillsById(List.of(skill1.getId(), skill2.getId()));

    assertThat(result.size()).isEqualTo(2);
    assertThat(result).containsExactlyInAnyOrder(skill1, skill2);
  }

  @Test
  void getSkillsById_throwsWhenAnySkillNotFound() {
    Skill skill1 = skillRepository.save(newSkill("Java", "backend"));

    assertThatThrownBy(() -> skillService.getSkillsById(List.of(skill1.getId(), 99L)))
        .isInstanceOf(SkillNotFoundException.class);
  }

  @Test
  void getSkillsById_returnsEmptyListWhenIdsIsEmpty() {
    assertThat(skillService.getSkillsById(List.of())).isEmpty();
  }

  @Test
  void getAllSkills_returnsAllSkills() {
    Skill skill1 = newSkill("Java", "backend");
    Skill skill2 = newSkill("TypeScript", "frontend");
    Skill saved1 = skillRepository.save(skill1);
    Skill saved2 = skillRepository.save(skill2);

    List<Skill> result = skillService.getAllSkills();
    assertThat(result.size()).isEqualTo(2);
    assertThat(result).containsExactlyInAnyOrder(saved1, saved2);
  }

  @Test
  void updateSkill_updatesAllFields() {
    Skill saved = skillRepository.save(newSkill("Java", "backend"));

    Skill result = skillService.updateSkill(saved.getId(), newSkill("TypeScript", "frontend"));

    assertThat(result.getId()).isEqualTo(saved.getId());
    assertThat(result.getName()).isEqualTo("TypeScript");
    assertThat(result.getType()).isEqualTo("frontend");
  }

  @Test
  void updateSkill_allowsKeepingSameNameAndType() {
    Skill saved = skillRepository.save(newSkill("Java", "backend"));

    Skill updated = newSkill("Java", "backend");
    updated.setIconUrl("https://example.com/icon.png");

    Skill result = skillService.updateSkill(saved.getId(), updated);

    assertThat(result.getId()).isEqualTo(saved.getId());
    assertThat(result.getName()).isEqualTo("Java");
    assertThat(result.getType()).isEqualTo("backend");
    assertThat(result.getIconUrl()).isEqualTo("https://example.com/icon.png");
  }

  @Test
  void updateSkill_throwsWhenNameAndTypeAlreadyExist() {
    skillRepository.save(newSkill("Java", "backend"));
    Skill saved2 = skillRepository.save(newSkill("TypeScript", "frontend"));

    assertThatThrownBy(() -> skillService.updateSkill(saved2.getId(), newSkill("Java", "backend")))
        .isInstanceOf(SkillAlreadyExistsException.class);
  }

  @Test
  void updateSkill_throwsWhenSkillNotFound() {
    assertThatThrownBy(() -> skillService.updateSkill(1L, newSkill("Java", "backend")))
        .isInstanceOf(SkillNotFoundException.class);
  }

  @Test
  void deleteSkill_removesSkillFromDatabase() {
    Skill skill = skillRepository.save(newSkill("Java", "backend"));

    assertThat(skillService.getAllSkills()).containsExactly(skill);

    skillService.deleteSkill(skill.getId());

    assertThat(skillService.getAllSkills()).isEmpty();
  }

  @Test
  void deleteSkill_throwsWhenSkillNotFound() {
    assertThatThrownBy(() -> skillService.deleteSkill(1L))
        .isInstanceOf(SkillNotFoundException.class);
  }

  @Test
  void createSkill_allowsSameNameDifferentType() {
    skillRepository.save(newSkill("TypeScript", "frontend"));

    Skill saved = skillService.createSkill(newSkill("TypeScript", "backend"));

    assertThat(saved.getId()).isNotNull();
    assertThat(skillService.getAllSkills()).hasSize(2);
  }

  // Helper
  private Skill newSkill(String name, String type) {
    Skill skill = new Skill();
    skill.setName(name);
    skill.setType(type);
    return skill;
  }
}
