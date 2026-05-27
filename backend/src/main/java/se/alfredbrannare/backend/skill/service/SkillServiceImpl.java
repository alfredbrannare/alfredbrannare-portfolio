package se.alfredbrannare.backend.skill.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import se.alfredbrannare.backend.skill.entity.Skill;
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
}
