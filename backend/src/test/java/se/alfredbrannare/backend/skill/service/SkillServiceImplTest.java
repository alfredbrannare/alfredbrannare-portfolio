package se.alfredbrannare.backend.skill.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import se.alfredbrannare.backend.skill.entity.Skill;
import se.alfredbrannare.backend.skill.exception.SkillAlreadyExistsException;
import se.alfredbrannare.backend.skill.exception.SkillNotFoundException;
import se.alfredbrannare.backend.skill.repository.SkillRepository;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SkillServiceImplTest {

    @Mock
    private SkillRepository skillRepository;

    @InjectMocks
    private SkillServiceImpl skillService;

    @Test
    void getSkillsById_throwsWhenSkillNotFound() {
        Skill skill = new Skill();
        skill.setId(1L);
        Skill skill2 = new Skill();
        skill2.setId(2L);

        when(skillRepository.findAllById(List.of(1L, 2L))).thenReturn(List.of(skill));

        assertThatThrownBy(() -> skillService.getSkillsById(List.of(1L, 2L))).isInstanceOf(SkillNotFoundException.class);
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

        when(skillRepository.existsByNameAndType(newSkill.getName(), newSkill.getType())).thenReturn(true);

        assertThatThrownBy(() -> skillService.createSkill(newSkill)).isInstanceOf(SkillAlreadyExistsException.class);
        verify(skillRepository, never()).save(any(Skill.class));
    }

    private Skill newSkill(String name, String type) {
        Skill skill = new Skill();
        skill.setName(name);
        skill.setType(type);
        return skill;
    }
}
