import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

const OAUTH_LOGIN_URL =
  process.env.NEXT_PUBLIC_OAUTH_LOGIN_URL ??
  'http://localhost:8080/oauth2/authorization/github';

export default function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger className="text-white hover:text-brand-orange cursor-pointer transition-transform duration-300 hover:scale-110">
        <LogIn />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Log in to your account using your GitHub profile.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-4 pt-4">
          <Button nativeButton={false} render={<a href={OAUTH_LOGIN_URL} />}>
            Continue with GitHub
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
