package se.alfredbrannare.backend.project.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import se.alfredbrannare.backend.skill.entity.Skill;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
public class Project {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String title;

  private LocalDate date;

  @Column(columnDefinition = "TEXT")
  private String description;

  private String deployLink;

  private String repoLink;

  private String image;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
      name = "project_skills",
      joinColumns = @JoinColumn(name = "project_id"),
      inverseJoinColumns = @JoinColumn(name = "skill_id"))
  private List<Skill> stack = new ArrayList<>();

  @Column(nullable = false)
  private Instant createdAt = Instant.now();
}
