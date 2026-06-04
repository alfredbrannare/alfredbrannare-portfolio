import SectionHeader from '@/components/SectionHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSkills } from '@/features/skill/api';
import IconWithTooltip from '@/features/skill/components/IconWithTooltip';
import Image from 'next/image';

export default async function SkillSection() {
  const skills = await getSkills();

  const uniqueTypes = Array.from(new Set(skills.map((skill) => skill.type)));

  return (
    <section>
      <SectionHeader
        title="Skills"
        description="A list of what I've worked with"
      />
      <Tabs defaultValue="frontend">
        <TabsList variant="line">
          {uniqueTypes.map((type) => (
            <TabsTrigger key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        {uniqueTypes.map((type) => (
          <TabsContent key={type} value={type} className={'flex gap-3'}>
            {skills
              .filter((skill) => skill.type === type)
              .map((skill) => (
                <div
                  key={skill.id || skill.name}
                  className="flex flex-row justify-center text-center items-center"
                >
                  <IconWithTooltip
                    tooltipContent={skill.name}
                    className="flex flex-col items-center justify-center gap-2"
                    hideOnDesktop={true}
                  >
                    <Image
                      src={skill.iconUrl}
                      alt={`Icon of ${skill.name}`}
                      width={50}
                      height={50}
                    />
                    <span className={'hidden sm:block'}>{skill.name}</span>
                  </IconWithTooltip>
                </div>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
