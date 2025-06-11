import type { FC } from 'react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { type HeroCardProps } from '@/types';

const Hero: FC<HeroCardProps> = ({
  title,
  description,
  content,
  imageUrl,
  imageAlt,
}) => {
  return (
    <section className="flex justify-center">
      <div>
        <div className="flex flex-col text-center items-center lg:flex-row lg:text-start">
          <div className="flex-1 flex flex-col justify-center space-y-4 p-4">
            <h1 className="text-5xl font-bold text-amber-500">
              {title}
            </h1>
            <p className="text-2xl font-semibold">
              {description}
            </p>
            <div className="space-y-2">
              {typeof content === 'string' ? (
                content
                  .split('. ')
                  .map(
                    (sentence: string, index: number) => (
                      <p key={index}>{sentence.trim()}.</p>
                    )
                  )
              ) : (
                <div>{content}</div>
              )}
            </div>
          </div>

          {imageUrl && (
            <Image
              src={imageUrl}
              width={450}
              height={450}
              alt={imageAlt ?? 'Hero image'}
              priority
              className="rounded-lg object-cover"
            />
          )}
        </div>
        <Separator className="bg-stone-200 h-1" />
      </div>
    </section>
  );
};

export { Hero };
