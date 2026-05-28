package se.alfredbrannare.backend.skill.mapper;

import java.util.List;
import org.mapstruct.Mapper;
import se.alfredbrannare.backend.skill.dto.request.CreateSkillRequest;
import se.alfredbrannare.backend.skill.dto.request.UpdateSkillRequest;
import se.alfredbrannare.backend.skill.dto.response.SkillResponse;
import se.alfredbrannare.backend.skill.entity.Skill;

@Mapper(componentModel = "spring")
public interface SkillMapper {
  SkillResponse toResponse(Skill skill);

  List<SkillResponse> toResponseList(List<Skill> skills);

  Skill toEntity(CreateSkillRequest request);

  Skill toEntity(UpdateSkillRequest request);
}
