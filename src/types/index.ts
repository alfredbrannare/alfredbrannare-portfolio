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
  url: string;
};
