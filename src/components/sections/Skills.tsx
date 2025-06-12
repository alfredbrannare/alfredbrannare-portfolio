import Image from 'next/image';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../ui';

import {
  frontendSkills,
  backendSkills,
  otherSkills,
} from '@/lib/techstack';

const Skills = () => {
  return (
    <section className="flex flex-col justify-center items-center mt-6 px-4">
      <h1 className="text-5xl font-bold text-amber-500 mb-6">
        Skills
      </h1>
      <Tabs
        defaultValue="frontend"
        className="w-full max-w-5xl"
      >
        <TabsList className="w-full justify-center">
          <TabsTrigger value="frontend">
            Frontend
          </TabsTrigger>
          <TabsTrigger value="backend">Backend</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>
        <TabsContent
          value="frontend"
          className="flex flex-row overflow-x-auto overflow-y-hidden justify-start lg:justify-center gap-4 p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
        >
          {frontendSkills.map((skill) => (
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
        <TabsContent
          value="backend"
          className="flex flex-row overflow-x-auto overflow-y-hidden justify-start lg:justify-center gap-4 p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
        >
          {backendSkills.map((skill) => (
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
        <TabsContent
          value="other"
          className="flex flex-row overflow-x-auto overflow-y-hidden justify-start lg:justify-center gap-4 p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
        >
          {otherSkills.map((skill) => (
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
      </Tabs>
    </section>
  );
};

export { Skills };
