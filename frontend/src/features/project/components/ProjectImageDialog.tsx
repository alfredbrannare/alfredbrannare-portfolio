'use client'

import { ProjectResponse } from '@/features/project/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useUploadProjectImage } from '@/features/project/queries';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

interface ProjectImageDialogProps {
  project: ProjectResponse;
  children?: React.ReactElement
  onClose?: () => void;
}

export default function ProjectImageDialog({ project, children, onClose }: ProjectImageDialogProps) {
  const [open, setOpen] = useState(!children);
  const upload = useUploadProjectImage();

  const close = () => {
    setOpen(false);
    onClose?.();
  };

  const handleUpload = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fd = new FormData(event.currentTarget);
    const file = fd.get('image') as File;

    const mutationOptions = {
      onSuccess: () => {
        toast.success('Image uploaded successfully!');
        close();
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Failed to upload image');
      },
    }

    upload.mutate({id: project.id, file}, mutationOptions);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) onClose?.();
      }}
    >
      <DialogTrigger render={children} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project.image ? 'Update image' : 'Add image'}</DialogTitle>
          <DialogDescription>
            {project.image
              ? 'Update the image for this project'
              : 'Add an image to this project'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpload}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="image">Image</FieldLabel>
              {project.image && (
                <div className="relative aspect-16/8 w-full overflow-hidden rounded-md border bg-muted">
                  <Image
                    src={project.image}
                    alt={`Current image for ${project.title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 512px"
                    className="object-cover"
                  />
                </div>
              )}
              <Input
                id="image"
                name="image"
                type="file"
                required
                accept="image/png, image/jpeg, image/webp"
                className="h-10 cursor-pointer border-dashed bg-muted/30 transition-colors hover:bg-muted/50 file:mr-3 file:rounded-md file:bg-primary file:px-3 file:text-primary-foreground hover:file:bg-primary/90"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={close}
              disabled={upload.isPending}
            >
              {children ? 'Cancel' : 'Skip'}
            </Button>
            <Button type="submit" disabled={upload.isPending}>
              {upload.isPending ? <><Spinner /> Uploading...</> : 'Upload'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}