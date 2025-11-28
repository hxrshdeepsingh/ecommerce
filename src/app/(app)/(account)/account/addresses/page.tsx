import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { headers as getHeaders } from 'next/headers'
import { getAuthUser } from '@/utilities/auth'
import { AddressListing } from '@/components/addresses/AddressListing'
import { CreateAddressModal } from '@/components/addresses/CreateAddressModal'
import { redirect } from 'next/navigation'

export default async function AddressesPage() {
  const headers = await getHeaders()
  const user = await getAuthUser(headers)

  if (!user) {
    redirect(
      `/login?warning=${encodeURIComponent('Please login to access your account settings.')}`,
    )
  }

  return (
    <>
      <div className="border p-8 rounded-lg bg-accent">
        <h1 className="text-3xl font-medium mb-8">Addresses</h1>

        <div className="mb-8">
          <AddressListing />
        </div>

        <CreateAddressModal />
      </div>
    </>
  )
}

export const metadata: Metadata = {
  description: 'Manage your addresses.',
  openGraph: mergeOpenGraph({
    title: 'Addresses',
    url: '/account/addresses',
  }),
  title: 'Addresses',
}
