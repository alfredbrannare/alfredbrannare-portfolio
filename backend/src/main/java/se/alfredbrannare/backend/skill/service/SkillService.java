package se.alfredbrannare.backend.skill.service;

import se.alfredbrannare.backend.skill.entity.Skill;

import java.util.List;

public interface SkillService {
    public List<Skill> getSkillsById(List<Long> ids);
}
