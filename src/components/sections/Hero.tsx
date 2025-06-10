import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { HeroCardProps } from '@/types';
import { ChevronRight } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  Separator,
  Button,
} from '../ui';

const Hero: FC<HeroCardProps> = ({
  title,
  description,
  content,
  linkText,
  linkHref,
  children,
  imageUrl,
  imageAlt,
}) => {
  let imageComponent = null;
  if (imageUrl) {
    imageComponent = (
      <Image
        src={imageUrl}
        width={450}
        height={450}
        alt={imageAlt ?? 'Hero image'}
        priority
        className="rounded-lg object-cover"
      />
    );
  }

  return (
    <Card className="w-full flex flex-col md:flex-row items-center justify-between shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
      <div className="flex flex-col md:w-1/2 lg:w-2/3">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {title}
          </CardTitle>
          <Separator className="my-4" />{' '}
          <CardDescription className="text-lg md:text-xl text-gray-600">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 pb-4 flex-grow">
          <div className="text-base md:text-lg text-gray-700">
            {content}
          </div>
          {children}
        </CardContent>
        <CardFooter className="justify-center p-0 pt-4 flex md:justify-end">
          {linkText && linkHref && (
            <Button
              asChild
              variant="default"
              className="hover:text-amber-400 transition duration-200"
            >
              <Link href={linkHref}>
                {linkText} <ChevronRight />
              </Link>
            </Button>
          )}
        </CardFooter>
      </div>

      <div className="flex-shrink-0 md:w-1/2 lg:w-1/3 flex justifyenter items-center">
        {imageComponent}
      </div>
    </Card>
  );
};

export { Hero };
