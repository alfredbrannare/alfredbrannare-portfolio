package se.alfredbrannare.backend.skill.dto.request;

import jakarta.validation.constraints.NotBlank;

public record CreateSkillRequest(
    @NotBlank(message = "Name is required") String name,
    @NotBlank(message = "Type is required") String type,
    String iconUrl) {}
