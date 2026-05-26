package se.alfredbrannare.backend.project.dto.response;

import se.alfredbrannare.backend.skill.dto.response.SkillResponse;

import java.time.LocalDate;
import java.util.List;

public record ProjectResponse(
        Long id,
        String title,
        LocalDate date,
        String description,
        String deployLink,
        String repoLink,
        String image,
        List<SkillResponse> stack
) {
}
