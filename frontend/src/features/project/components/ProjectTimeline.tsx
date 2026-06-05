'use client';

import { ProjectResponse } from '@/features/project/types';
import ProjectCard from '@/features/project/components/ProjectCard';
import { useEffect, useRef } from 'react';
import { animate, onScroll } from 'animejs';

interface ProjectTimelineProps {
  projects: ProjectResponse[];
}

export default function ProjectTimeline({ projects }: ProjectTimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current || !fillRef.current) return;

    const animation = animate(fillRef.current, {
      scaleY: [0, 1],
      ease: 'linear',
      autoplay: onScroll({
        target: trackRef.current,
        enter: { target: 'top', container: 'center' },
        leave: { target: 'bottom', container: 'center' },
        sync: true,
      }),
    });

    return () => {
      animation.revert();
    };
  }, []);

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No projects found.</p>
      </div>
    );
  }

  const sortedProjects = [...projects].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <section className="space-y-12 max-w-4xl mx-auto px-4 py-8">
      <div
        ref={trackRef}
        className="relative border-l border-muted-foreground/20 mx-auto md:mx-36 space-y-12"
      >
        <div
          ref={fillRef}
          className="absolute left-0 top-0 h-full w-0.5 -translate-x-1/2 origin-top bg-brand-orange"
          style={{ transform: 'scaleY(0)' }}
        />
        {sortedProjects.map((project, index) => (
          <div
            key={project.id}
            className="relative pl-6 md:pl-10 grid grid-cols-1 gap-2 md:gap-4 items-start group"
          >
            <div className="absolute left-0 top-2.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-muted-foreground/30 group-hover:bg-primary group-hover:scale-125 transition-all duration-200 z-10" />

            <div className="md:absolute md:right-full md:mr-8 md:top-1.5 whitespace-nowrap">
              <time className="text-xs font-mono font-semibold tracking-wider text-muted-foreground bg-muted/50 md:bg-transparent px-2 py-1 md:p-0 rounded">
                {project.date}
              </time>
            </div>

            <div className="max-w-xl transition-transform duration-300 group-hover:translate-x-1">
              <ProjectCard project={project} priority={index === 0} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
