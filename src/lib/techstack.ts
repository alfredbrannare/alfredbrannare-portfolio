import type { TechStack } from '@/types';
import type { SimpleIcon } from 'simple-icons';
import * as simpleIcons from 'simple-icons';

export const frontendTechStack = [
  'React',
  'Next.js',
  'Node.js',
  'Tailwind CSS',
] as const;

export const backendTechStack = [
  'Docker',
  'PostgreSQL',
] as const;

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
    url: icon.source,
  };
};

export const frontendSkills: TechStack[] =
  frontendTechStack.map((tech) => getSkill(tech));
export const backendSkills: TechStack[] =
  backendTechStack.map((tech) => getSkill(tech));
