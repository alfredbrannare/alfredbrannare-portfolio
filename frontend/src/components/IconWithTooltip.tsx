'use client';

import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface IconWithTooltipProps {
  children: React.ReactNode;
  tooltipContent?: React.ReactNode;
  className?: string;
  hideOnDesktop?: boolean;
}

export default function IconWithTooltip({
  children,
  tooltipContent,
  className,
  hideOnDesktop = false,
}: IconWithTooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        className={`${hideOnDesktop ? '' : 'cursor-pointer'} ${className || ''}`}
        onClick={() => setOpen(!open)}
      >
        {children}
      </TooltipTrigger>

      <TooltipContent className={hideOnDesktop ? 'sm:hidden' : ''}>
        {tooltipContent ? tooltipContent : 'Not deployed'}
      </TooltipContent>
    </Tooltip>
  );
}
