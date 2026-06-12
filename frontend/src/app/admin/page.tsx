'use client';

import { useMe } from '@/features/auth/queries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Spinner } from '@/components/ui/spinner';
import ProjectAdmin from '@/features/project/components/ProjectAdmin';
import SkillAdmin from '@/features/skill/components/SkillAdmin';

export default function AdminPage() {
  const { data: me, isPending } = useMe();

  const features = [
    { name: 'Projects', value: 'projects' },
    { name: 'Skills', value: 'skills' },
  ];

  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <Spinner className="size-8 text-muted-foreground" />
      </div>
    );
  }

  if (!me) {
    return (
      <p className="py-20 text-center text-muted-foreground">
        You must be logged in to view this page.
      </p>
    );
  }

  return (
    <Tabs
      defaultValue="projects"
      className="mx-auto max-w-5xl items-center px-4 py-8"
    >
      <TabsList
        variant="line"
        className="flex w-full flex-wrap justify-center gap-y-2 border-b pb-2 sm:h-11 sm:flex-nowrap sm:pb-0 group-data-horizontal/tabs:h-auto sm:group-data-horizontal/tabs:h-11"
      >
        {features.map((feature) => (
          <TabsTrigger
            key={feature.value}
            value={feature.value}
            className="px-4 text-base font-bold transition-transform duration-300 after:bg-brand-orange hover:scale-105 hover:text-brand-orange data-active:text-brand-orange data-active:text-shadow-[1px_1px_0_rgba(0,0,0,0.7)] sm:text-lg sm:hover:scale-110"
          >
            {feature.name}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="projects" className="w-full">
        <ProjectAdmin />
      </TabsContent>
      <TabsContent value="skills" className="w-full">
        <SkillAdmin />
      </TabsContent>
    </Tabs>
  );
}
