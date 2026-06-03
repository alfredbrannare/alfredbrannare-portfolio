'use client';

import { ProjectResponse } from '@/features/project/types';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import IconWithTooltip from '@/features/skill/components/IconWithTooltip';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

interface ProjectCardProps {
  project: ProjectResponse;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = project.description.length > 150;

  return (
    <Card className="mx-auto flex h-full w-full max-w-sm flex-col gap-2 pt-0 pb-2 shadow-md">
      {project.image && (
        <Image
          src={project.image}
          alt={`Image of ${project.title}`}
          width={800}
          height={450}
          className="aspect-16/7 w-full object-cover"
          loading="eager"
        />
      )}

      <CardHeader className="px-2">
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>

      <CardDescription className="px-2">
        <p className={!expanded ? 'line-clamp-3' : ''}>{project.description}</p>

        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-1 text-xs font-medium hover:underline"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </CardDescription>

      <CardFooter className="mt-auto w-full px-2">
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
    </Card>
  );
}
