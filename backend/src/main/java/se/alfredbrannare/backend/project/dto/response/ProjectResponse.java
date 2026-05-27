package se.alfredbrannare.backend.project.dto.response;

import java.time.LocalDate;
import java.util.List;
import se.alfredbrannare.backend.skill.dto.response.SkillResponse;

public record ProjectResponse(
    Long id,
    String title,
    LocalDate date,
    String description,
    String deployLink,
    String repoLink,
    String image,
    List<SkillResponse> stack) {}
