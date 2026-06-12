'use client';

import { ProjectResponse } from '@/features/project/types';
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
import { useDeleteProject } from '@/features/project/queries';
import { useState } from 'react';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

interface ProjectDeleteDialogProps {
  project: ProjectResponse;
  children: React.ReactElement;
}

export default function ProjectDeleteDialog({
  project,
  children,
}: ProjectDeleteDialogProps) {
  const remove = useDeleteProject();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    const mutationOptions = {
      onSuccess: () => {
        toast.success('Project deleted successfully');
        setOpen(false);
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Failed to delete project');
      },
    };

    remove.mutate(project.id, mutationOptions);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={children} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete {`"${project.title}"`}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            project.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-end gap-2 py-2 *:flex-1">
          {' '}
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
