'use client';

import { ProjectResponse } from '@/features/project/types';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import IconWithTooltip from '@/components/IconWithTooltip';
import Link from 'next/link';
import { Globe, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

interface ProjectCardProps {
  project: ProjectResponse;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isLongText = project.description.length > 120;

  return (
    <Card className="flex w-full max-w-xl flex-col overflow-hidden border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md pt-0 gap-0 py-0">
      {project.image && (
        <div className="relative aspect-16/8 w-full overflow-hidden border-b bg-muted">
          <Image
            src={project.image}
            alt={`Architecture of ${project.title}`}
            fill
            sizes="(max-width: 640px) 100vw, 576px"
            className="object-cover"
            loading="eager"
          />
        </div>
      )}

      <CardHeader className="px-4 pt-3 pb-1">
        <CardTitle className="text-xl font-bold tracking-tight">
          {project.title}
        </CardTitle>
      </CardHeader>

      <div className="px-4 pb-3">
        <CardDescription className="text-sm text-muted-foreground leading-relaxed">
          <span className={!expanded ? 'line-clamp-4 md:line-clamp-none' : ''}>
            {project.description}
          </span>

          {isLongText && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-xs font-semibold text-foreground underline decoration-muted-foreground/40 hover:decoration-foreground transition-all block md:hidden"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </CardDescription>
      </div>

      <CardFooter className="p-3 mt-auto border-t bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
        <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
          {project.stack.map((skill) => (
            <IconWithTooltip key={skill.id} tooltipContent={skill.name}>
              <div className="bg-background border rounded p-1 shadow-sm hover:scale-105 transition-transform">
                <Image
                  src={skill.iconUrl}
                  alt={`Icon of ${skill.name}`}
                  width={16}
                  height={16}
                  className="block"
                />
              </div>
            </IconWithTooltip>
          ))}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {project.repoLink && (
            <Link
              href={project.repoLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Source</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          )}

          {project.deployLink && (
            <Link
              href={project.deployLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono font-medium text-primary hover:underline transition-all"
            >
              <Globe className="h-3 w-3" />
              <span>Live Demo</span>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
