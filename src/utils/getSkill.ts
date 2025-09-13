import type {
  TechStack,
  ProcessedTechStack,
  ProcessedProjects,
} from '@/types';
import { projects } from '@/data/projects';
import { getDbSkills } from '@/lib/db/skills';
import type { SimpleIcon } from 'simple-icons';
import * as simpleIcons from 'simple-icons';

export const getSkill = (name: string): TechStack => {
  const icon = (
    Object.values(simpleIcons) as SimpleIcon[]
  ).find(
    (icon) =>
      icon.title.toLowerCase() === name.toLowerCase()
  );

  if (icon) {
    return {
      title: icon.title,
      image: `https://cdn.simpleicons.org/${icon.slug}/${icon.hex}`,
    };
  }

  const safeName = name.replace(/\s+/g, '-');

  return {
    title: name,
    image: `https://icon.icepanel.io/Technology/svg/${safeName}.svg`,
  };
};

export async function getProcessedTechStack(): Promise<ProcessedTechStack> {
  const skills = await getDbSkills();
  return {
    frontend: skills
      .filter((s) => s.type === 'frontend')
      .map((s) => getSkill(s.name)),
    backend: skills
      .filter((s) => s.type === 'backend')
      .map((s) => getSkill(s.name)),
    other: skills
      .filter((s) => s.type === 'other')
      .map((s) => getSkill(s.name)),
  };
}

export const processedProjects: ProcessedProjects =
  projects.map((project) => ({
    ...project,
    stack: project.stack.map(getSkill),
  }));
