package se.alfredbrannare.backend.project.exception;

import se.alfredbrannare.backend.common.exception.ResourceNotFoundException;

public class ProjectNotFoundException extends ResourceNotFoundException {
  public ProjectNotFoundException(Long id) {
    super("Project with id " + id + " not found");
  }
}
