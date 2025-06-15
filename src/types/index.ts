//Hero
export interface HeroSectionProps {
  title: string;
  description: string | React.ReactNode;
  content: string | React.ReactNode;
  linkText?: string;
  linkHref?: string;
  children?: React.ReactNode;
  imageUrl?: string;
  imageAlt?: string;
}

//Techstack
export type TechStack = {
  title: string;
  image: string;
};

export type ProcessedTechStack = {
  frontend: TechStack[];
  backend: TechStack[];
  other: TechStack[];
};

export type Project = {
  id: number;
  title: string;
  date: string;
  deployLink: string;
  repoLink: string;
  image: string;
  description: string;
  stack: string[];
};

export type ProcessedProject = Omit<Project, 'stack'> & {
  stack: TechStack[];
};

export type ProcessedProjects = ProcessedProject[];
