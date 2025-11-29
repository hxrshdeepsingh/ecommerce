import type { ReactNode } from 'react'
import { getPayloadClient } from '@/utilities/getPayloadCached'
import { headers as getHeaders } from 'next/headers.js'
// import configPromise from '@payload-config'
// import { getPayload } from 'payload'
import { RenderParams } from '@/components/RenderParams'
import { AccountNav } from '@/components/AccountNav'
import { getCachedUser } from '@/utilities/getCachedUser'

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headers = await getHeaders()
  const payload = await getPayloadClient()
  const user = await getCachedUser(payload, headers)

  return (
    <div>
      <div className="container">
        <RenderParams />
      </div>

      <div className="container mt-16 pb-8 flex gap-8">
        {user && (
          <AccountNav className="max-w-[15.5rem] grow flex-col items-start gap-4 hidden md:flex" />
        )}

        <div className="flex flex-col gap-12 grow">{children}</div>
      </div>
    </div>
  )
}
