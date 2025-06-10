export interface HeroCardProps {
  title: string;
  description: string | React.ReactNode;
  content: string | React.ReactNode;
  linkText?: string;
  linkHref?: string;
  children?: React.ReactNode;
  imageUrl?: string;
  imageAlt?: string;
}
