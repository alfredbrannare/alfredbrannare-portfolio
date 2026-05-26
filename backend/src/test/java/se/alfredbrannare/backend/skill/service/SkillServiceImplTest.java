package se.alfredbrannare.backend.skill.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import se.alfredbrannare.backend.skill.entity.Skill;
import se.alfredbrannare.backend.skill.exception.SkillNotFoundException;
import se.alfredbrannare.backend.skill.repository.SkillRepository;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

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

}
