'use client';

import { useProjects } from '@/features/project/queries';
import ProjectCard from '@/features/project/components/ProjectCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Pencil, Plus, Trash2 } from 'lucide-react';

export default function ProjectAdmin() {
  const { data: projects, isPending, error } = useProjects();

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
        Error loading projects: {error.message}
      </p>
    );
  }

  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="pt-6">
      <div className="mb-4 flex justify-center">
        {/* TODO: wire to a create Dialog (useCreateProject) */}
        <Button type="button">
          <Plus /> Add project
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {sortedProjects.map((project) => (
          <div
            key={project.id}
            className="flex w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <div className="relative w-full">
              <div className="absolute top-2 right-2 z-10 flex gap-1.5">
                {/* TODO: wire to an edit Dialog (useUpdateProject) */}
                <Badge
                  variant="secondary"
                  render={<button type="button" />}
                  className="cursor-pointer backdrop-blur-sm"
                >
                  <Pencil className="size-3" /> Edit
                </Badge>
                {/* TODO: wire to a delete confirm Dialog (useDeleteProject) */}
                <Badge
                  variant="destructive"
                  render={<button type="button" />}
                  className="cursor-pointer backdrop-blur-sm"
                >
                  <Trash2 className="size-3" /> Delete
                </Badge>
              </div>
              <ProjectCard project={project} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
