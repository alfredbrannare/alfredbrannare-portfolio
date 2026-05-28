package se.alfredbrannare.backend.skill.service;

import java.util.List;
import se.alfredbrannare.backend.skill.entity.Skill;

public interface SkillService {
  public List<Skill> getSkillsById(List<Long> ids);

  public Skill getSkillById(Long id);

  public List<Skill> getAllSkills();

  public Skill createSkill(Skill skill);

  public Skill updateSkill(Long id, Skill skill);

  public void deleteSkill(Long id);
}
