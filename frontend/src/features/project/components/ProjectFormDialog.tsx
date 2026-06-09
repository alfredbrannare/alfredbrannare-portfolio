'use client';

import { ProjectResponse } from '@/features/project/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useSkills } from '@/features/skill/queries';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface ProjectFormDialogProps {
  project?: ProjectResponse;
  children: React.ReactElement;
}

export default function ProjectFormDialog({
  project,
  children,
}: ProjectFormDialogProps) {
  const { data: skills, isPending, error } = useSkills();
  const [skillIds, setSkillIds] = useState<number[]>(
    project?.stack.map((skill) => skill.id) ?? [],
  );

  const uniqueSkills = Array.from(
    new Map(skills?.map((skill) => [skill.id, skill])).values(),
  );
  const isEditMode = Boolean(project);

  return (
    <Dialog>
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
      </DialogContent>
    </Dialog>
  );
}
