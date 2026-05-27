package se.alfredbrannare.backend.skill.exception;

import java.util.List;
import se.alfredbrannare.backend.common.exception.ResourceNotFoundException;

public class SkillNotFoundException extends ResourceNotFoundException {

  public SkillNotFoundException(Long id) {
    super("Skill with id " + id + " not found");
  }

  public SkillNotFoundException(List<Long> ids) {
    super("Skills not found: " + ids);
  }
}
