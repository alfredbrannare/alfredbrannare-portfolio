'use client';

import { ProjectResponse } from '@/features/project/types';
import Image from 'next/image';
import IconWithTooltip from '@/features/skill/components/IconWithTooltip';
import Link from 'next/link';
import { Badge, Globe } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { CardDescription, CardFooter } from '@/components/ui/card';

interface ProjectPreviewProps {
  project: ProjectResponse;
}

export default function ProjectPreview({ project }: ProjectPreviewProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = project.description.length > 150;

  return (
    <Dialog>
      <DialogTrigger className="flex w-full max-w-sm flex-col gap-2 text-left cursor-pointer">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        {project.image && (
          <Image
            src={project.image}
            alt={`Image of ${project.title}`}
            width={350}
            height={450}
            className="aspect-video w-full rounded-lg object-cover"
            loading="eager"
          />
        )}
      </DialogTrigger>
      <DialogContent className="gap-2">
        <DialogHeader>
          <DialogTitle className="font-semibold text-xl">
            {project.title}
          </DialogTitle>
        </DialogHeader>
        {project.image && (
          <Image
            src={project.image}
            alt={`Image of ${project.title}`}
            width={1200}
            height={675}
            className="w-full rounded-lg object-cover"
          />
        )}
        <CardDescription>
          <p className={!expanded ? 'line-clamp-3' : ''}>
            {project.description}
          </p>

          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-xs font-medium hover:underline"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </CardDescription>
        <CardFooter className="mt-auto w-full px-0 pb-0">
          <div className="flex w-full justify-between">
            <div className="flex flex-row gap-1">
              {project.stack.map((skill) => (
                <IconWithTooltip key={skill.id} tooltipContent={skill.name}>
                  <Image
                    src={skill.iconUrl}
                    alt={`Icon of ${skill.name}`}
                    width={20}
                    height={20}
                  />
                </IconWithTooltip>
              ))}
            </div>

            <div className="flex flex-row gap-1">
              {project.repoLink && (
                <IconWithTooltip
                  tooltipContent={
                    <Link
                      href={project.repoLink}
                      className="underline hover:text-amber-400"
                    >
                      View GitHub Repo
                    </Link>
                  }
                >
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
                    alt="Github Icon"
                    width={20}
                    height={20}
                  />
                </IconWithTooltip>
              )}

              {project.deployLink && (
                <IconWithTooltip
                  tooltipContent={
                    <Link
                      href={project.deployLink}
                      className="underline hover:text-amber-400"
                    >
                      Visit Live Site
                    </Link>
                  }
                >
                  <Globe width={20} height={20} />
                </IconWithTooltip>
              )}
            </div>
          </div>
        </CardFooter>
      </DialogContent>
    </Dialog>
  );
}
