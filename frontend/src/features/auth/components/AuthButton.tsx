'use client';

import LoginDialog from '@/features/auth/components/LoginDialog';
import { useMe } from '@/features/auth/queries';
import Link from 'next/link';
import { Spinner } from '@/components/ui/spinner';

export default function AuthButton() {
  const { data: me, isPending } = useMe();

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <Spinner className="size-4 text-white" />
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (me) {
    return (
      <Link href={'/admin'} className="text-white">
        {me.name}
      </Link>
    );
  }

  return <LoginDialog />;
}
