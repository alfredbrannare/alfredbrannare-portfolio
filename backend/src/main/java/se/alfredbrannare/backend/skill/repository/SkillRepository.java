package se.alfredbrannare.backend.skill.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.alfredbrannare.backend.skill.entity.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    boolean existsByNameAndType(String name, String type);
}
