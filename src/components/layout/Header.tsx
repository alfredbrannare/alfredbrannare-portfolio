import {
  Button,
  Sheet,
  SheetContent,
  SheetTrigger,
  DialogTitle,
} from '../ui';
import { MenuIcon } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center px-4 py-4 bg-stone-900">
      <h1 className="text-amber-500 font-semibold">
        Alfred Brännare
      </h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="py-4 px-4">
          <DialogTitle className="text-center">
            Side Menu
          </DialogTitle>
          <h2>Test</h2>
        </SheetContent>
      </Sheet>
    </header>
  );
}
