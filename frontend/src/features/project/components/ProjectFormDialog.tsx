'use client';

import {
  CreateProjectRequest,
  ProjectResponse,
} from '@/features/project/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useSkills } from '@/features/skill/queries';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { useCreateProject, useUpdateProject } from '@/features/project/queries';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';

interface ProjectFormDialogProps {
  project?: ProjectResponse;
  children: React.ReactElement;
}

export default function ProjectFormDialog({
  project,
  children,
}: ProjectFormDialogProps) {
  const { data: skills, isPending, error } = useSkills();
  const create = useCreateProject();
  const update = useUpdateProject();
  const [skillIds, setSkillIds] = useState<number[]>(
    project?.stack.map((skill) => skill.id) ?? [],
  );
  const [open, setOpen] = useState(false);

  const isEditMode = Boolean(project);
  const mutation = isEditMode ? update : create;

  const uniqueSkills = Array.from(
    new Map(skills?.map((skill) => [skill.id, skill])).values(),
  );

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);

    const input: CreateProjectRequest = {
      title: String(fd.get('title')),
      date: (fd.get('date') as string),
      description: (fd.get('description') as string),
      deployLink: (fd.get('deployLink') as string) || null,
      repoLink: (fd.get('repoLink') as string) || null,
      image: project?.image ?? null,
      skillsIds: skillIds,
    };

    const verb = isEditMode ? 'updated' : 'created';

    const mutationOptions = {
      onSuccess: () => {
        toast.success(`Project ${verb} successfully!`);
        setOpen(false);
      },
      onError: (err: Error) => {
        toast.error(err.message || `Failed to ${verb} project`);
      },
    };

    if (isEditMode && project) {
      update.mutate({ id: project.id, input }, mutationOptions);
    } else {
      create.mutate(input, mutationOptions);
    }

  };

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => {
      setOpen(nextOpen);
      if (nextOpen) {
        setSkillIds(project?.stack.map((skill) => skill.id) ?? []);
      }
    }}>
      <DialogTrigger render={children} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Edit project' : 'New project'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? `Update the details for "${project!.title}"`
              : 'Add a new project to your portfolio'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                name="title"
                defaultValue={project?.title}
                placeholder="e.g. Portfolio website"
                maxLength={255}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="date">Date</FieldLabel>
              <Input
                id="date"
                name="date"
                defaultValue={project?.date}
                type="date"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Input
                id="description"
                name="description"
                defaultValue={project?.description}
                placeholder="e.g. A portfolio website built with Next.js and Tailwind CSS."
                maxLength={5000}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="deployLink">Deployed link</FieldLabel>
              <Input
                id="deployLink"
                name="deployLink"
                type="url"
                defaultValue={project?.deployLink ?? undefined}
                placeholder="e.g. https://alfredbrannare.dev"
                maxLength={500}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="repoLink">Repository link</FieldLabel>
              <Input
                id="repoLink"
                name="repoLink"
                type="url"
                defaultValue={project?.repoLink ?? undefined}
                placeholder="e.g. https://github.com/alfredbrannare/portfolio"
                maxLength={500}
              />
            </Field>
            <Field>
              <FieldLabel>Stack</FieldLabel>
              {isPending ? (
                <p>Loading skills...</p>
              ) : error ? (
                <p>Error loading skills: {error.message}</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {uniqueSkills?.map((skill) => {
                    const selected = skillIds.includes(skill.id);
                    return (
                      <Badge
                        key={skill.id}
                        variant={selected ? 'default' : 'outline'}
                        render={<button type={'button'} />}
                        onClick={() =>
                          setSkillIds((prev) =>
                            selected
                              ? prev.filter((id) => id !== skill.id)
                              : [...prev, skill.id],
                          )
                        }
                      >
                        {skill.name}
                      </Badge>
                    );
                  })}
                </div>
              )}
            </Field>
          </FieldGroup>
      <DialogFooter>
       <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending && <Spinner />}
          {mutation.isPending ? 'Saving...' : 'Save'}
        </Button>
      </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
