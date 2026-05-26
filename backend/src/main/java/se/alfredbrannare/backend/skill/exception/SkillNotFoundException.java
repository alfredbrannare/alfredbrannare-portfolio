package se.alfredbrannare.backend.skill.exception;

import se.alfredbrannare.backend.common.exception.ResourceNotFoundException;

import java.util.List;

public class SkillNotFoundException extends ResourceNotFoundException {
    public SkillNotFoundException(List<Long> ids) {
        super("Skills not found: " + ids);
    }
}
