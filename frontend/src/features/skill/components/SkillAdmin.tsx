'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSkills } from '@/features/skill/queries';
import IconWithTooltip from '@/components/IconWithTooltip';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import SkillFormDialog from '@/features/skill/components/SkillFormDialog';
import SkillDeleteDialog from '@/features/skill/components/SkillDeleteDialog';

export default function SkillAdmin() {
  const { data: skills, isPending, error } = useSkills();

  if (isPending) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="size-6 text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="py-12 text-center text-destructive">
        Error loading skills: {error.message}
      </p>
    );
  }

  const uniqueTypes = Array.from(new Set(skills.map((skill) => skill.type)));

  return (
    <div className="pt-6">
      <div className="mb-4 flex justify-center">
        <SkillFormDialog>
          <Button type="button">
            <Plus /> Add skill
          </Button>
        </SkillFormDialog>
      </div>

      <Tabs defaultValue={uniqueTypes[0]} className="items-center">
        <TabsList
          variant="line"
          className="flex w-full flex-wrap justify-center gap-y-2 border-b pb-2 sm:h-11 sm:flex-nowrap sm:pb-0 group-data-horizontal/tabs:h-auto sm:group-data-horizontal/tabs:h-11"
        >
          {uniqueTypes.map((type) => (
            <TabsTrigger
              key={type}
              value={type}
              className="px-4 text-base font-bold transition-transform duration-300 after:bg-brand-orange hover:scale-105 hover:text-brand-orange data-active:text-brand-orange data-active:text-shadow-[1px_1px_0_rgba(0,0,0,0.7)] sm:text-lg sm:hover:scale-110"
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
                  key={skill.id}
                  className="relative flex w-28 flex-col items-center justify-center rounded-xl border border-border/40 bg-background/50 p-4 text-center shadow-sm transition-all duration-300 hover:border-brand-orange/30 hover:bg-background sm:w-36"
                >
                  <div className="absolute top-1.5 right-1.5 z-10 flex gap-1">
                    <SkillFormDialog skill={skill}>
                      <Badge
                        variant="secondary"
                        render={<button type="button" />}
                        className="cursor-pointer px-1.5"
                        aria-label={`Edit ${skill.name}`}
                      >
                        <Pencil className="size-3" />
                      </Badge>
                    </SkillFormDialog>
                    <SkillDeleteDialog skill={skill}>
                      <Badge
                        variant="destructive"
                        render={<button type="button" />}
                        className="cursor-pointer px-1.5"
                        aria-label={`Delete ${skill.name}`}
                      >
                        <Trash2 className="size-3" />
                      </Badge>
                    </SkillDeleteDialog>
                  </div>

                  <IconWithTooltip
                    tooltipContent={skill.name}
                    className="flex w-full flex-col items-center justify-center gap-3"
                    hideOnDesktop={true}
                  >
                    <div className="relative flex h-12 w-12 items-center justify-center">
                      <Image
                        src={skill.iconUrl}
                        alt={`Icon of ${skill.name}`}
                        width={48}
                        height={48}
                        className="object-contain"
                        unoptimized
                      />
                    </div>

                    <span className="hidden w-full px-1 text-sm font-medium tracking-tight text-muted-foreground line-clamp-2 sm:block">
                      {skill.name}
                    </span>
                  </IconWithTooltip>
                </div>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
