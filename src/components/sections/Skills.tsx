import Image from 'next/image';
import Link from 'next/link';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../ui';

import {
  frontendSkills,
  backendSkills,
} from '@/lib/techstack';

const Skills = () => {
  return (
    <section className="flex flex-col justify-center items-center">
      <h1>Skills</h1>
      <Tabs
        defaultValue="frontend"
        className="w-[400px] justify-center items-center"
      >
        <TabsList>
          <TabsTrigger value="frontend">
            Frontend
          </TabsTrigger>
          <TabsTrigger value="backend">Backend</TabsTrigger>
        </TabsList>
        <TabsContent
          value="frontend"
          className="flex flex-row"
        >
          {frontendSkills.map((skill) => (
            <Link
              key={skill.title}
              className="flex flex-col justify-center items-center my-4 mx-4"
              href={skill.url}
            >
              <Image
                src={skill.image}
                alt={`${skill.title} icon`}
                width="50"
                height="50"
              />
              <span>{skill.title}</span>
            </Link>
          ))}
        </TabsContent>
        <TabsContent
          value="backend"
          className="flex flex-row"
        >
          {backendSkills.map((skill) => (
            <Link
              key={skill.title}
              className="flex flex-col justify-center items-center my-4 mx-4"
              href={skill.url}
            >
              <Image
                src={skill.image}
                alt={`${skill.title} icon`}
                width="50"
                height="50"
              />
              <span>{skill.title}</span>
            </Link>
          ))}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export { Skills };
