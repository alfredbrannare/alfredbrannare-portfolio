import {
  Button,
  Sheet,
  SheetContent,
  SheetTrigger,
  DialogTitle,
} from '../ui';
import { MenuIcon } from 'lucide-react';
import NavBar from './NavBar';
import { navLinks } from './NavBar';

const Header = () => {
  return (
    <>
      <header className="flex flex-col px-4 py-4 bg-primary">
        <section className="flex flex-row justify-center items-center px-4 py-4 bg-primary">
          <h1 className="text-amber-500 font-semibold text-3xl">
            Alfred Brännare
          </h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="text-stone-100 hover:text-amber-500 bg-primary fixed bottom-4 right-4 x-50 md:hidden z-99"
                aria-label="Open navigation menu"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="bottom"
              className="py-4 px-4 z-99"
            >
              <DialogTitle className="text-center sr-only">
                Navigation links
              </DialogTitle>
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  asChild
                  variant="link"
                  className="text-black hover:text-amber-500 transition duration-200"
                >
                  <a href={link.href}>{link.label}</a>
                </Button>
              ))}
            </SheetContent>
          </Sheet>
        </section>
      </header>
      <nav className="sticky top-0 z-50 flex flex-row justify-center items-center px-1 py-1 bg-primary">
        <NavBar />
      </nav>
    </>
  );
};

export default Header;
