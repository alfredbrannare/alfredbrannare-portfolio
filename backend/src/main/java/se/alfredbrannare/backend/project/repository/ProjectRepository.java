package se.alfredbrannare.backend.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.alfredbrannare.backend.project.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
