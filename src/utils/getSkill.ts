import type {
  TechStack,
  ProcessedTechStack,
  ProcessedProjects,
} from '@/types';
import { projects } from '@/data/projects';
import { techStack } from '@/data/techstack';
import type { SimpleIcon } from 'simple-icons';
import * as simpleIcons from 'simple-icons';

export const getSkill = (name: string): TechStack => {
  const icon = (
    Object.values(simpleIcons) as SimpleIcon[]
  ).find(
    (icon) =>
      icon.title.toLowerCase() === name.toLowerCase()
  );

  if (!icon) throw new Error(`Icon not found for ${name}`);

  return {
    title: icon.title,
    image: `https://cdn.simpleicons.org/${icon.slug}/${icon.hex}`,
  };
};

export const processedTechStack: ProcessedTechStack = {
  frontend: techStack.frontend.map(getSkill),
  backend: techStack.backend.map(getSkill),
  other: techStack.other.map(getSkill),
};

export const processedProjects: ProcessedProjects =
  projects.map((project) => ({
    ...project,
    stack: project.stack.map(getSkill),
  }));
