import Link from 'next/link';
import { Button } from '../ui';

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

const NavBar = () => {
  return (
    <nav className="hidden md:flex items-center space-x-4">
      {navLinks.map((link) => (
        <Button
          key={link.href}
          asChild
          variant="link"
          className="text-stone-100 hover:text-amber-400 transition duration-200"
        >
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </nav>
  );
};

export default NavBar;
