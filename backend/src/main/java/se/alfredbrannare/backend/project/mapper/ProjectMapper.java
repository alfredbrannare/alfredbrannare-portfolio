package se.alfredbrannare.backend.project.mapper;

import org.mapstruct.Mapper;
import se.alfredbrannare.backend.project.dto.response.ProjectResponse;
import se.alfredbrannare.backend.project.entity.Project;
import se.alfredbrannare.backend.skill.mapper.SkillMapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = SkillMapper.class)
public interface ProjectMapper {
    ProjectResponse toResponse(Project project);
    List<ProjectResponse> toResponseList(List<Project> projects);
}
