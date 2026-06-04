import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SkillResponse } from '@/features/skill/types';
import IconWithTooltip from '@/components/IconWithTooltip';
import Image from 'next/image';

interface SkillTabsProps {
  skills: SkillResponse[];
}

export default function SkillTabs({ skills }: SkillTabsProps) {
  const uniqueTypes = Array.from(new Set(skills.map((skill) => skill.type)));

  return (
    <Tabs
      defaultValue="frontend"
      className="max-w-4xl mx-auto px-4 py-8 items-center"
    >
      <TabsList variant="line" className="group-data-horizontal/tabs:h-11">
        {uniqueTypes.map((type) => (
          <TabsTrigger key={type} value={type} className="px-4 text-base">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>
      {uniqueTypes.map((type) => (
        <TabsContent
          key={type}
          value={type}
          className={'flex flex-wrap justify-center gap-3'}
        >
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
  );
}
