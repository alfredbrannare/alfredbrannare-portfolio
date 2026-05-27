package se.alfredbrannare.backend.skill.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import se.alfredbrannare.backend.skill.entity.Skill;
import se.alfredbrannare.backend.skill.exception.SkillAlreadyExistsException;
import se.alfredbrannare.backend.skill.exception.SkillNotFoundException;
import se.alfredbrannare.backend.skill.repository.SkillRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SkillServiceImpl implements SkillService {
    private final SkillRepository skillRepository;

    @Override
    public List<Skill> getSkillsById(List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return List.of();
        }

        List<Skill> skills = skillRepository.findAllById(ids);

        if (skills.size() != ids.size()) {
            Set<Long> foundIds = skills.stream().map(Skill::getId).collect(Collectors.toSet());
            List<Long> missingIds = ids.stream().filter(id -> !foundIds.contains(id)).toList();
            throw new SkillNotFoundException(missingIds);
        }

        return skills;
    }

    @Override
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    @Override
    public Skill createSkill(Skill skill) {
        if (skillRepository.existsByNameAndType(skill.getName(), skill.getType())) {
            throw new SkillAlreadyExistsException(skill.getName(), skill.getType());
        }

        return skillRepository.save(skill);
    }

    @Override
    public Skill updateSkill(Skill skill) {
        return null;
    }

    @Override
    public void deleteSkill(Long id) {

    }

}
