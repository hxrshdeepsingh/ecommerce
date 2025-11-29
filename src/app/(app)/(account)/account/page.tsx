import { headers as getHeaders } from 'next/headers';
import { AccountForm } from '@/components/forms/AccountForm';
import { redirect } from 'next/navigation';

import { getPayloadClient } from '@/utilities/getPayloadCached';
import { getCachedUser } from '@/utilities/getCachedUser';

export default async function AccountPage() {
  const headers = await getHeaders();
  const payload = await getPayloadClient();
  const user = await getCachedUser(payload, headers);

  if (!user) {
    redirect(`/login?warning=${encodeURIComponent('Please login to access your account settings.')}`);
  }

  return (
    <>
      <div className="border p-8 rounded-lg bg-accent">
        <h1 className="text-3xl font-medium mb-8">Account settings</h1>
        <AccountForm />
      </div>
    </>
  );
}

export const metadata = {
  description: 'Create an account or log in to your existing account.',
  title: 'Account',
};
