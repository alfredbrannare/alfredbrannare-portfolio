import type { FC } from 'react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

const Hero: FC = () => {
  return (
    <section className="flex justify-center">
      <div>
        <div className="flex flex-col text-center items-center lg:flex-row lg:text-start">
          <div className="flex-1 flex flex-col justify-center space-y-4 p-4">
            <h1 className="text-5xl font-bold text-amber-500">
              Hello,
            </h1>
            <p className="text-2xl font-semibold">
              My name is{' '}
              <span className="text-amber-500 font-semibold">
                Alfred
              </span>
              , a{' '}
              <span className="text-amber-500 font-semibold">
                Software Development
              </span>{' '}
              student at Lernia specializing in{' '}
              <span className="text-amber-500 font-semibold">
                Java
              </span>{' '}
              and{' '}
              <span className="text-amber-500 font-semibold">
                JavaScript
              </span>
            </p>
            <div className="space-y-2">
              <p>
                I&apos;m passionate about building a strong
                foundation in both frontend and backend
                technologies to create effective and
                user-friendly applications.
              </p>
              <p>
                I&apos;m eager to continue expanding my
                expertise.
              </p>
            </div>
          </div>

          <Image
            src="/images/portrait.webp"
            width={450}
            height={450}
            alt="Portrait of Alfred Brännare"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <Separator className="bg-stone-200 h-1" />
      </div>
    </section>
  );
};

export { Hero };
