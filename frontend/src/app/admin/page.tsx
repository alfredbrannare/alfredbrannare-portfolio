'use client';

import { useMe } from '@/features/auth/queries';

export default function AdminPage() {
  const { data: me, isPending } = useMe();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (!me) {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Welcome, {me.name}</p>
    </div>
  );
}
