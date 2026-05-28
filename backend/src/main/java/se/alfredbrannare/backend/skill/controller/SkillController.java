package se.alfredbrannare.backend.skill.controller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.alfredbrannare.backend.skill.dto.request.CreateSkillRequest;
import se.alfredbrannare.backend.skill.dto.request.UpdateSkillRequest;
import se.alfredbrannare.backend.skill.dto.response.SkillResponse;
import se.alfredbrannare.backend.skill.entity.Skill;
import se.alfredbrannare.backend.skill.mapper.SkillMapper;
import se.alfredbrannare.backend.skill.service.SkillService;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
public class SkillController {
  private final SkillService skillService;
  private final SkillMapper skillMapper;

  @GetMapping
  public ResponseEntity<List<SkillResponse>> getAllSkills() {
    List<SkillResponse> skills = skillMapper.toResponseList(skillService.getAllSkills());
    return ResponseEntity.status(HttpStatus.OK).body(skills);
  }

  @GetMapping("/{id}")
  public ResponseEntity<SkillResponse> getSkillsById(@PathVariable Long id) {
    SkillResponse skill = skillMapper.toResponse(skillService.getSkillById(id));
    return ResponseEntity.status(HttpStatus.OK).body(skill);
  }

  @PostMapping
  public ResponseEntity<SkillResponse> createSkill(@Valid @RequestBody CreateSkillRequest request) {
    Skill skill = skillMapper.toEntity(request);
    Skill saved = skillService.createSkill(skill);
    return ResponseEntity.status(HttpStatus.CREATED).body(skillMapper.toResponse(saved));
  }

  @PutMapping("/{id}")
  public ResponseEntity<SkillResponse> updateSkill(
      @PathVariable Long id, @Valid @RequestBody UpdateSkillRequest request) {
    Skill skill = skillMapper.toEntity(request);
    Skill updated = skillService.updateSkill(id, skill);
    return ResponseEntity.status(HttpStatus.OK).body(skillMapper.toResponse(updated));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
    skillService.deleteSkill(id);
    return ResponseEntity.noContent().build();
  }
}
