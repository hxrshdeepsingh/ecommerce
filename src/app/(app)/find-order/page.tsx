import type { Metadata } from 'next'

import React from 'react'
import { FindOrderForm } from '@/components/forms/FindOrderForm'
import { headers as getHeaders } from 'next/headers.js'

import { getPayloadClient } from '@/utilities/getPayloadCached';
import { getCachedUser } from '@/utilities/getCachedUser';

export default async function FindOrderPage() {
  const headers = await getHeaders();
  const payload = await getPayloadClient();
  const user = await getCachedUser(payload, headers);

  return (
    <div className="container py-16">
      <FindOrderForm initialEmail={user?.email} />
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Find your order with us using your email.',
  title: 'Find order',
}
