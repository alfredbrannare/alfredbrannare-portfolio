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
    <section className="flex flex-col justify-center items-center mt-6">
      <h1 className="text-5xl font-bold text-amber-500 mb-6">
        Skills
      </h1>
      <Tabs
        defaultValue="frontend"
        className="w-[400px] justify-center items-center"
      >
        <TabsList>
          <TabsTrigger value="frontend">
            Frontend
          </TabsTrigger>
          <TabsTrigger value="backend">Backend</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>
        <TabsContent
          value="frontend"
          className="flex flex-row"
        >
          {frontendSkills.map((skill) => (
            <div
              key={skill.title}
              className="flex flex-col justify-center items-center my-4 mx-4 text-center min-h-[120px]"
            >
              <Image
                src={skill.image}
                alt={`${skill.title} icon`}
                width="50"
                height="50"
              />
              <span className="bottom-0">
                {skill.title}
              </span>
            </div>
          ))}
        </TabsContent>
        <TabsContent
          value="backend"
          className="flex flex-row"
        >
          {backendSkills.map((skill) => (
            <div
              key={skill.title}
              className="flex flex-col justify-center items-center my-4 mx-4 text-center"
            >
              <Image
                src={skill.image}
                alt={`${skill.title} icon`}
                width="50"
                height="50"
              />
              <span>{skill.title}</span>
            </div>
          ))}
        </TabsContent>
        <TabsContent
          value="other"
          className="flex flex-row"
        >
          {otherSkills.map((skill) => (
            <div
              key={skill.title}
              className="flex flex-col justify-center items-center my-4 mx-4 text-center"
            >
              <Image
                src={skill.image}
                alt={`${skill.title} icon`}
                width="50"
                height="50"
              />
              <span>{skill.title}</span>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export { Skills };
