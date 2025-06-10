import {
  Button,
  Sheet,
  SheetContent,
  SheetTrigger,
  DialogTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../ui';
import { MenuIcon } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center px-4 py-4 bg-primary">
      <Avatar>
        <AvatarImage
          src="/images/portrait.webp"
          alt="Image of Alfred Brännare"
        />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <h1 className="text-amber-500 font-semibold">
        Alfred Brännare
      </h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="group border-amber-500 bg-black text-amber-500 hover:bg-amber-500 hover:text-black"
            aria-label="Open navigation menu"
          >
            <MenuIcon className="h-4 w-4 group-hover:text-black" />
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
