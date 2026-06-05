'use client';

import { useHeroDrawAnimation } from '../hooks/useHeroDrawAnimation';
import { portraitPaths, PORTRAIT_VIEWBOX } from '../portraitPaths';
import HeroDescription from '@/features/hero/components/HeroDescription';

export default function HeroSection() {
  const svgRef = useHeroDrawAnimation();

  return (
    <section className="flex flex-col lg:flex-row items-center justify-center">
      <HeroDescription />
      <svg
        ref={svgRef}
        viewBox={PORTRAIT_VIEWBOX}
        className="w-full max-w-md [&_.hero-line]:fill-none [&_.hero-line]:stroke-zinc-950 [&_.hero-line]:stroke-[1.5] [&_.hero-line]:[stroke-linecap:round] [&_.hero-line]:[stroke-linejoin:round]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {portraitPaths.map((d, i) => (
          <path key={i} className="hero-line" d={d} />
        ))}
      </svg>
    </section>
  );
}
