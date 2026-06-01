package se.alfredbrannare.backend.skill.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
    name = "skills",
    uniqueConstraints =
        @UniqueConstraint(
            name = "uq_skills_name_type",
            columnNames = {"name", "type"}))
@Getter
@Setter
@NoArgsConstructor
public class Skill {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String type;

  private String iconUrl;
}
