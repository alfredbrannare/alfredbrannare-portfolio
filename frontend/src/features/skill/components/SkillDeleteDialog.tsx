'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { SkillResponse } from '@/features/skill/types';
import { useDeleteSkill } from '@/features/skill/queries';

interface SkillDeleteDialogProps {
  skill: SkillResponse;
  children: React.ReactElement;
}

export default function SkillDeleteDialog({
  skill,
  children,
}: SkillDeleteDialogProps) {
  const remove = useDeleteSkill();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    const mutationOptions = {
      onSuccess: () => {
        toast.success('Skill deleted successfully');
        setOpen(false);
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Failed to delete skill');
      },
    };

    remove.mutate(skill.id, mutationOptions);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={children} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete {`"${skill.name}"`}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            skill.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-end gap-2">
          <AlertDialogCancel variant="default" disabled={remove.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={remove.isPending}
          >
            {remove.isPending ? (
              <>
                <Spinner /> Deleting...{' '}
              </>
            ) : (
              'Delete'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
