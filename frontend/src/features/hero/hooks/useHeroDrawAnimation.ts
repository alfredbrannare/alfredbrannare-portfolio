'use client';

import { useEffect, useRef } from 'react';
import { animate, svg, stagger } from 'animejs';

/**
 * Runs the anime.js line-drawing animation over every `.hero-line` path inside
 * the returned SVG ref. Attach the ref to the `<svg>` element that contains the
 * portrait paths.
 */
export function useHeroDrawAnimation() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const paths = svgRef.current.querySelectorAll('.hero-line');
    if (paths.length === 0) return;
    const staggerStep = 2200 / paths.length;
    animate(svg.createDrawable(paths), {
      draw: ['0 0', '0 1'],
      ease: 'inOutQuad',
      duration: 1200,
      delay: stagger(staggerStep),
    });
  }, []);

  return svgRef;
}
