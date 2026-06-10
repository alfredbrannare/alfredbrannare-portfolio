package se.alfredbrannare.backend.project.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

public record UpdateProjectRequest(
    @NotBlank @Size(max = 255) String title,
    @NotNull(message = "Date is required") LocalDate date,
    @NotBlank(message = "Description is required") @Size(max = 5000) String description,
    @Size(max = 500) String deployLink,
    @Size(max = 500) String repoLink,
    @Size(max = 500) String image,
    List<Long> skillsIds) {}
