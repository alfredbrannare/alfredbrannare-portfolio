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
      <TabsList
        variant="line"
        className="flex w-full flex-wrap sm:flex-nowrap h-auto sm:h-11 justify-center gap-y-2 border-b pb-2 sm:pb-0 group-data-horizontal/tabs:h-auto sm:group-data-horizontal/tabs:h-11"
      >
        {uniqueTypes.map((type) => (
          <TabsTrigger
            key={type}
            value={type}
            className="px-4 text-base sm:text-lg font-bold after:bg-brand-orange data-active:text-brand-orange data-active:text-shadow-[1px_1px_0_rgba(0,0,0,0.7)] hover:text-brand-orange transition-transform duration-300 hover:scale-105 sm:hover:scale-110"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>
      {uniqueTypes.map((type) => (
        <TabsContent
          key={type}
          value={type}
          className="flex flex-wrap justify-center gap-4 pt-6"
        >
          {skills
            .filter((skill) => skill.type === type)
            .map((skill) => (
              <div
                key={skill.id || skill.name}
                className="flex w-28 sm:w-36 flex-col items-center justify-center rounded-xl border border-border/40 bg-background/50 p-4 text-center transition-all duration-300 hover:scale-105 hover:border-brand-orange/30 hover:bg-background shadow-sm"
              >
                <IconWithTooltip
                  tooltipContent={skill.name}
                  className="flex flex-col items-center justify-center gap-3 w-full"
                  hideOnDesktop={true}
                >
                  <div className="relative flex h-12 w-12 items-center justify-center">
                    <Image
                      src={skill.iconUrl}
                      alt={`Icon of ${skill.name}`}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>

                  <span className="hidden sm:block text-sm font-medium text-muted-foreground tracking-tight line-clamp-2 w-full px-1">
                    {skill.name}
                  </span>
                </IconWithTooltip>
              </div>
            ))}
        </TabsContent>
      ))}
    </Tabs>
  );
}
