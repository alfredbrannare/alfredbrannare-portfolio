package se.alfredbrannare.backend.skill.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import se.alfredbrannare.backend.skill.entity.Skill;
import se.alfredbrannare.backend.skill.exception.SkillAlreadyExistsException;
import se.alfredbrannare.backend.skill.exception.SkillNotFoundException;
import se.alfredbrannare.backend.skill.repository.SkillRepository;

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
  public Skill getSkillById(Long id) {
    return skillRepository.findById(id).orElseThrow(() -> new SkillNotFoundException(id));
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
  public Skill updateSkill(Long id, Skill skill) {
    Skill existing = skillRepository.findById(id).orElseThrow(() -> new SkillNotFoundException(id));

    if (skillRepository.existsByNameAndTypeAndIdNot(skill.getName(), skill.getType(), id)) {
      throw new SkillAlreadyExistsException(skill.getName(), skill.getType());
    }

    existing.setName(skill.getName());
    existing.setType(skill.getType());
    existing.setIconUrl(skill.getIconUrl());

    return skillRepository.save(existing);
  }

  @Override
  public void deleteSkill(Long id) {
    if (!skillRepository.existsById(id)) {
      throw new SkillNotFoundException(id);
    }

    skillRepository.deleteById(id);
  }
}
