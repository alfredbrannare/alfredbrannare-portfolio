package se.alfredbrannare.backend.skill.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import se.alfredbrannare.backend.skill.entity.Skill;
import se.alfredbrannare.backend.skill.repository.SkillRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillServiceImpl implements SkillService {
    private final SkillRepository skillRepository;

    @Override
    public List<Skill> getSkillsById(List<Long> ids) {
        return skillRepository.findAllById(ids);
    }

}
