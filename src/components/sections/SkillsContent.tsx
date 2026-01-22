'use client'; // <-- This is the most important part

import Image from 'next/image';

import {
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../ui';

import type { ProcessedTechStack } from '@/types'; // Import the type

type SkillsContentProps = {
  processedTechStack: ProcessedTechStack;
};

export const SkillsContent = ({
  processedTechStack,
}: SkillsContentProps) => {
  const skillCategories = Object.keys(
    processedTechStack
  ) as Array<keyof typeof processedTechStack>;

  return (
    <section
      className="flex flex-col justify-center items-center mt-6"
      id="techstack"
    >
      <h1 className="text-5xl font-bold text-amber-500 mb-6 text-shadow-[1px_1px_0_rgba(0,0,0,0.7)]">
        Techstack
      </h1>
      <Tabs
        defaultValue="frontend"
        className="w-full max-w-6xl"
      >
        <TabsList className="md:w-md lg:w-xl mx-auto flex flex-row justify-center items-center text-center">
          {skillCategories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category.charAt(0).toUpperCase() +
                category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        {skillCategories.map((category) => (
          <TabsContent
            key={category}
            value={category}
            className="flex flex-row sm:flex-wrap overflow-x-auto overflow-y-hidden justify-start sm:justify-center gap-3 p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
          >
            {processedTechStack[category].map((skill) => (
              <div
                key={skill.title}
                className="flex flex-col justify-top items-center text-center flex-shrink-0 min-w-[80px]"
              >
                <Image
                  src={skill.image}
                  alt={`${skill.title} icon`}
                  width="50"
                  height="50"
                  className="min-h-[50px] min-w-[50px] object-contain mb-2"
                  unoptimized
                />
                <span className="text-sm whitespace-nowrap">
                  {skill.title}
                </span>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
      <Separator className="bg-stone-200 h-1" />
    </section>
  );
};
