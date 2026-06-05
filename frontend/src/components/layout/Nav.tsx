interface NavItem {
  label: string;
  href: string;
}

interface NavProps {
  navItems: NavItem[];
}

export default function Nav({ navItems }: NavProps) {
  return (
    <nav
      className="flex py-2 px-4 md:px-8 bg-zinc-950 min-h-17 relative z-20"
      aria-label="Main navigation"
    >
      <ul className="flex flex-row items-center gap-4 text-white">
        {navItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="hover:text-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
