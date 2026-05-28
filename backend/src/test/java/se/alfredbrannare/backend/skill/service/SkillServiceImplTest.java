package se.alfredbrannare.backend.skill.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import se.alfredbrannare.backend.skill.entity.Skill;
import se.alfredbrannare.backend.skill.exception.SkillAlreadyExistsException;
import se.alfredbrannare.backend.skill.exception.SkillNotFoundException;
import se.alfredbrannare.backend.skill.repository.SkillRepository;

@ExtendWith(MockitoExtension.class)
public class SkillServiceImplTest {

  @Mock private SkillRepository skillRepository;

  @InjectMocks private SkillServiceImpl skillService;

  @Test
  void getSkillsById_throwsWhenSkillNotFound() {
    Skill skill = new Skill();
    skill.setId(1L);
    Skill skill2 = new Skill();
    skill2.setId(2L);

    when(skillRepository.findAllById(List.of(1L, 2L))).thenReturn(List.of(skill));

    assertThatThrownBy(() -> skillService.getSkillsById(List.of(1L, 2L)))
        .isInstanceOf(SkillNotFoundException.class);
  }

  @Test
  void getSkillsById_returnsAllRequestedSkills() {
    Skill s1 = new Skill();
    s1.setId(1L);
    Skill s2 = new Skill();
    s2.setId(2L);

    when(skillRepository.findAllById(List.of(1L, 2L))).thenReturn(List.of(s1, s2));

    List<Skill> result = skillService.getSkillsById(List.of(1L, 2L));

    assertThat(result.size()).isEqualTo(2);
    assertThat(result).containsExactlyInAnyOrder(s1, s2);
  }

  @Test
  void getSkillsById_returnsEmptyListWhenIdsIsEmpty() {
    assertThat(skillService.getSkillsById(List.of())).isEmpty();
    verify(skillRepository, never()).findAllById(any());
  }

  @Test
  void getSkillById_returnsSkillWhenFound() {
    Skill skill = newSkill("Java", "backend");
    skill.setId(1L);

    when(skillRepository.findById(1L)).thenReturn(Optional.of(skill));

    assertThat(skillService.getSkillById(1L)).isEqualTo(skill);
  }

  @Test
  void getSkillById_throwsWhenSkillNotFound() {
    when(skillRepository.findById(1L)).thenReturn(Optional.empty());

    assertThatThrownBy(() -> skillService.getSkillById(1L))
        .isInstanceOf(SkillNotFoundException.class);
  }

  @Test
  void getAllSkills_returnsAllSkills() {
    Skill skill1 = new Skill();
    skill1.setId(1L);
    Skill skill2 = new Skill();
    skill2.setId(2L);

    when(skillRepository.findAll()).thenReturn(List.of(skill1, skill2));

    List<Skill> result = skillService.getAllSkills();
    assertThat(result.size()).isEqualTo(2);
    assertThat(result).containsExactlyInAnyOrder(skill1, skill2);
  }

  @Test
  void createSkill_savesSkill() {
    Skill skill = newSkill("Java", "backend");
    skill.setId(1L);

    when(skillRepository.save(any(Skill.class))).thenReturn(skill);

    Skill result = skillService.createSkill(skill);

    verify(skillRepository).save(any(Skill.class));
    assertThat(result).isSameAs(skill);
  }

  @Test
  void createSkill_throwsWhenNameAndTypeAlreadyExist() {
    Skill newSkill = newSkill("Java", "backend");

    when(skillRepository.existsByNameAndType(newSkill.getName(), newSkill.getType()))
        .thenReturn(true);

    assertThatThrownBy(() -> skillService.createSkill(newSkill))
        .isInstanceOf(SkillAlreadyExistsException.class);
    verify(skillRepository, never()).save(any(Skill.class));
  }

  @Test
  void updateSkill_throwsWhenSkillNotFound() {
    when(skillRepository.existsById(1L)).thenReturn(false);

    assertThatThrownBy(() -> skillService.updateSkill(1L, newSkill("Java", "backend")))
        .isInstanceOf(SkillNotFoundException.class);
  }

  @Test
  void updateSkill_savesSkill() {
    Skill updated = newSkill("TypeScript", "frontend");
    updated.setId(1L);

    when(skillRepository.existsById(1L)).thenReturn(true);
    when(skillRepository.save(any(Skill.class))).thenReturn(updated);

    Skill result = skillService.updateSkill(1L, updated);

    assertThat(result).isSameAs(updated);

    ArgumentCaptor<Skill> captor = ArgumentCaptor.forClass(Skill.class);
    verify(skillRepository).save(captor.capture());
    Skill saved = captor.getValue();
    assertThat(saved.getName()).isEqualTo("TypeScript");
    assertThat(saved.getType()).isEqualTo("frontend");
  }

  @Test
  void updateSkill_throwsWhenNameAndTypeAlreadyExist() {
    Skill newSkill = newSkill("Java", "backend");

    when(skillRepository.existsById(1L)).thenReturn(true);
    when(skillRepository.existsByNameAndTypeAndIdNot(newSkill.getName(), newSkill.getType(), 1L))
        .thenReturn(true);

    assertThatThrownBy(() -> skillService.updateSkill(1L, newSkill))
        .isInstanceOf(SkillAlreadyExistsException.class);
    verify(skillRepository, never()).save(any(Skill.class));
  }

  @Test
  void updateSkill_savesWhenNameAndTypeBelongToSameSkill() {
    Skill updated = newSkill("Java", "backend");
    updated.setId(1L);

    when(skillRepository.existsById(1L)).thenReturn(true);
    when(skillRepository.existsByNameAndTypeAndIdNot(updated.getName(), updated.getType(), 1L))
        .thenReturn(false);
    when(skillRepository.save(any(Skill.class))).thenReturn(updated);

    Skill result = skillService.updateSkill(1L, updated);

    assertThat(result).isSameAs(updated);
    ArgumentCaptor<Skill> captor = ArgumentCaptor.forClass(Skill.class);
    verify(skillRepository).save(captor.capture());
    Skill saved = captor.getValue();
    assertThat(saved.getName()).isEqualTo("Java");
    assertThat(saved.getType()).isEqualTo("backend");
  }

  @Test
  void deleteSkill_throwsWhenSkillNotFound() {
    when(skillRepository.existsById(1L)).thenReturn(false);
    assertThatThrownBy(() -> skillService.deleteSkill(1L))
        .isInstanceOf(SkillNotFoundException.class);
    verify(skillRepository, never()).deleteById(1L);
  }

  @Test
  void deleteSkill_deletesWhenExists() {
    when(skillRepository.existsById(1L)).thenReturn(true);

    skillService.deleteSkill(1L);
    verify(skillRepository).deleteById(1L);
  }

  // Helper
  private Skill newSkill(String name, String type) {
    Skill skill = new Skill();
    skill.setName(name);
    skill.setType(type);
    return skill;
  }
}
