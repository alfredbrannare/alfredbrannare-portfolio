import Image from 'next/image';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../ui';

import { processedTechStack } from '@/lib/techstack';

const Skills = () => {
  const skillCategories = Object.keys(
    processedTechStack
  ) as Array<keyof typeof processedTechStack>;

  return (
    <section className="flex flex-col justify-center items-center mt-6 px-4">
      <h1 className="text-5xl font-bold text-amber-500 mb-6">
        Skills
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
            className="flex flex-row overflow-x-auto overflow-y-hidden justify-start lg:justify-center gap-3 p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
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
                />
                <span className="text-sm whitespace-nowrap">
                  {skill.title}
                </span>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export { Skills };
