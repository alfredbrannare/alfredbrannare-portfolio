import { Button } from '../ui';

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '#', label: 'Home' },
  { href: '#techstack', label: 'Techstack' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const NavBar = () => {
  return (
    <nav className="hidden md:flex items-center space-x-4">
      {navLinks.map((link) => (
        <Button
          key={link.href}
          asChild
          variant="link"
          className="text-stone-100 hover:text-amber-500 transition duration-200"
        >
          <a href={link.href}>{link.label}</a>
        </Button>
      ))}
    </nav>
  );
};

export default NavBar;
export { navLinks };
