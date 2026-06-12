'use client';

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
import { useCreateSkill, useUpdateSkill } from '@/features/skill/queries';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { CreateSkillRequest, SkillResponse } from '@/features/skill/types';
import { searchIcons, useIconIndex } from '@/features/skill/iconSearch';
import Image from 'next/image';

interface SkillFormDialogProps {
  skill?: SkillResponse;
  children: React.ReactElement;
}

export default function SkillFormDialog({
  skill,
  children,
}: SkillFormDialogProps) {
  const create = useCreateSkill();
  const update = useUpdateSkill();
  const [open, setOpen] = useState(false);
  const { data: icons, isLoading } = useIconIndex(open);
  const [iconQuery, setIconQuery] = useState('');
  const [iconUrl, setIconUrl] = useState(skill?.iconUrl ?? '');

  const results = searchIcons(icons ?? [], iconQuery);

  const isEditMode = Boolean(skill);
  const mutation = isEditMode ? update : create;

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);

    const input: CreateSkillRequest = {
      name: String(fd.get('name')),
      type: (fd.get('type') as string).toLowerCase().trim(),
      iconUrl: fd.get('iconUrl') as string,
    };

    const verb = isEditMode ? 'updated' : 'created';

    const mutationOptions = {
      onSuccess: () => {
        toast.success(`Skill ${verb} successfully!`);
        setOpen(false);
      },
      onError: (err: Error) => {
        toast.error(err.message || `Failed to ${verb} skill`);
      },
    };

    if (isEditMode && skill) {
      update.mutate({ id: skill.id, input }, mutationOptions);
    } else {
      create.mutate(input, mutationOptions);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          if (nextOpen) {
            setIconUrl(skill?.iconUrl ?? '');
            setIconQuery(skill?.name ?? '');
          }
        }}
      >
        <DialogTrigger render={children} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit skill' : 'New skill'}</DialogTitle>
            <DialogDescription>
              {isEditMode
                ? `Update the details for "${skill!.name}"`
                : 'Add a new skill to your portfolio'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  defaultValue={skill?.name}
                  onChange={(e) => setIconQuery(e.target.value)}
                  placeholder="e.g. Java"
                  maxLength={255}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="type">Type</FieldLabel>
                <Input
                  id="type"
                  name="type"
                  defaultValue={skill?.type}
                  placeholder="e.g. backend / frontend / fullstack"
                  maxLength={5000}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="iconUrl">Icon url</FieldLabel>
                <Input
                  id="iconUrl"
                  name="iconUrl"
                  type="url"
                  value={iconUrl}
                  onChange={(e) => setIconUrl(e.target.value)}
                  placeholder="e.g. https://cdn.simpleicons.org/javascript/F7DF1E.svg"
                  maxLength={500}
                />
              </Field>
            </FieldGroup>
            <div className="flex flex-wrap gap-2 p-3 max-h-48 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Spinner />
                  <p>Loading icons...</p>
                </div>
              ) : (
                results.map((result) => (
                  <button
                    type="button"
                    key={result.url}
                    className={`flex rounded-xl border p-4 text-center transition-all duration-300 gap-2 ${result.url === iconUrl ? 'border-brand-orange/30' : 'border-border/40 bg-background/50 shadow-sm'}`}
                    onClick={() => setIconUrl(result.url)}
                  >
                    <Image
                      src={result.url}
                      alt={result.title}
                      width={24}
                      height={24}
                    />
                    <span>{result.title}</span>
                  </button>
                ))
              )}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && <Spinner />}
                {mutation.isPending ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
