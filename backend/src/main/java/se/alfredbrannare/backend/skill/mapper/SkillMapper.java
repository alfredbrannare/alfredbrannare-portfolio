package se.alfredbrannare.backend.skill.mapper;

import org.mapstruct.Mapper;
import se.alfredbrannare.backend.skill.dto.response.SkillResponse;
import se.alfredbrannare.backend.skill.entity.Skill;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SkillMapper {
    SkillResponse toResponse(Skill skill);
    List<SkillResponse> toResponseList(List<Skill> skills);
}
