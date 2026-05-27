package se.alfredbrannare.backend.skill.service;

import se.alfredbrannare.backend.skill.entity.Skill;

import java.util.List;

public interface SkillService {
    public List<Skill> getSkillsById(List<Long> ids);
    public List<Skill> getAllSkills();
    public Skill createSkill(Skill skill);
    public Skill updateSkill(Long id, Skill skill);
    public void deleteSkill(Long id);
}
