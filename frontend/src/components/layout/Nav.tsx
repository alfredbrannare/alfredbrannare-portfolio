'use client';

import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
}

interface NavProps {
  navItems: NavItem[];
  variant?: 'desktop' | 'mobile';
}

export default function Nav({ navItems, variant = 'desktop' }: NavProps) {
  const [open, setOpen] = useState(false);

  switch (variant) {
    case 'mobile':
      return (
        <nav className="relative z-20" aria-label="Main navigation">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            className="fixed bottom-4 right-4 z-50 flex flex-col gap-1 rounded bg-zinc-950 p-3 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
          >
            <span
              className={`h-0.5 w-4 bg-white transition-transform ${open ? 'translate-y-1.5 rotate-45' : ''}`}
            />
            <span
              className={`h-0.5 w-4 bg-white transition-opacity ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`h-0.5 w-4 bg-white transition-transform ${open ? '-translate-y-1.5 -rotate-45' : ''}`}
            />
          </button>

          {open && (
            <ul
              id="mobile-menu"
              className="fixed bottom-20 right-4 z-50 flex flex-col gap-2 rounded bg-zinc-900 p-4 text-white shadow-lg"
            >
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </nav>
      );

    case 'desktop':
    default:
      return (
        <nav
          className="flex py-2 px-4 md:px-8 min-h-17 relative z-20"
          aria-label="Main navigation"
        >
          <ul className="flex flex-row items-center gap-4 text-white">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      );
  }
}
