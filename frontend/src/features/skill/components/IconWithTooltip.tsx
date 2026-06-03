'use client';

import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface IconWithTooltipProps {
  children: React.ReactNode;
  tooltipContent: React.ReactNode;
}

export default function IconWithTooltip({
  children,
  tooltipContent,
}: IconWithTooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger className="cursor-pointer" onClick={() => setOpen(!open)}>
        {children}
      </TooltipTrigger>
      <TooltipContent>{tooltipContent}</TooltipContent>
    </Tooltip>
  );
}
