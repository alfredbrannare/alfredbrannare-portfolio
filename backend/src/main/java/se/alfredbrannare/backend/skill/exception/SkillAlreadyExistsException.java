package se.alfredbrannare.backend.skill.exception;

import se.alfredbrannare.backend.common.exception.ResourceAlreadyExistsException;

public class SkillAlreadyExistsException extends ResourceAlreadyExistsException {
  public SkillAlreadyExistsException(String name, String type) {
    super("Skill with name " + name + " and type " + type + " already exists");
  }
}
