import type { FC } from 'react';

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '../ui';
import Link from 'next/link';

interface HeroCardProps {
  title: string;
  description: string | React.ReactNode;
  content: string;
  linkText?: string;
  linkHref?: string;
  children?: React.ReactNode;
}

const Hero: FC<HeroCardProps> = ({
  title,
  description,
  content,
  linkText,
  linkHref,
  children,
}) => {
  return (
    <Card className="max-w-[500px] shadow-lg hover:shadow-xl transition-shadow duration-200 h-full flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-700">{content}</p>
        {children}
      </CardContent>
      <CardFooter className="flex justify-end mt-4">
        {linkText && linkHref && (
          <Link
            href={linkHref}
            className="text-blue-600 hover:underline"
          >
            {' '}
            {linkText} &rarr;{' '}
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default Hero;
