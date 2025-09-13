import type {
  TechStack,
  ProcessedTechStack,
  ProcessedProjects,
} from '@/types';
import { projects } from '@/data/projects';
import { getDbSkills } from '@/lib/db/skills';
import type { SimpleIcon } from 'simple-icons';
import * as simpleIcons from 'simple-icons';

const ICON_OVERRIDES: Record<string, string> = {
  java: 'https://icon.icepanel.io/Technology/svg/Java.svg',
};

export const getSkill = (name: string): TechStack => {
  const override = ICON_OVERRIDES[name.toLowerCase()];
  if (override) {
    return {
      title: name,
      image: override,
    };
  }

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
