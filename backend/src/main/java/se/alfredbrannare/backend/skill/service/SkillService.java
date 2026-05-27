package se.alfredbrannare.backend.skill.service;

import java.util.List;
import se.alfredbrannare.backend.skill.entity.Skill;

public interface SkillService {
  public List<Skill> getSkillsById(List<Long> ids);
}
