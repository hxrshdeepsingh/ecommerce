import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { OrderItem } from '@/components/OrderItem'
import { headers as getHeaders } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'
import { getAuthUser } from '@/utilities/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

export default async function Orders({ searchParams }: Props) {
  const headers = await getHeaders()
  const user = await getAuthUser(headers)
  const resolvedSearchParams = await searchParams
  const page = typeof resolvedSearchParams?.page === 'string' ? Number(resolvedSearchParams.page) : 1

  if (!user) {
    redirect(`/login?warning=${encodeURIComponent('Please login to access your orders.')}`)
  }

  const payload = await getPayload({ config: configPromise })
  let orders: any[] | null = null
  let hasNextPage = false
  let hasPrevPage = false
  let totalPages = 1

  try {
    const ordersResult = await payload.find({
      collection: 'orders',
      limit: 10,
      page,
      user,
      overrideAccess: false,
      where: {
        customer: {
          equals: user?.id,
        },
      },
    })

    orders = ordersResult?.docs || []
    hasNextPage = ordersResult.hasNextPage
    hasPrevPage = ordersResult.hasPrevPage
    totalPages = ordersResult.totalPages
  } catch (error) { }

  return (
    <>
      <div className="border p-8 rounded-lg bg-accent w-full">
        <h1 className="text-3xl font-medium mb-8">Orders</h1>
        {(!orders || !Array.isArray(orders) || orders?.length === 0) && (
          <p className="">You have no orders.</p>
        )}

        {orders && orders.length > 0 && (
          <ul className="flex flex-col gap-6 mb-8">
            {orders?.map((order, index) => (
              <li key={order.id}>
                <OrderItem order={order} />
              </li>
            ))}
          </ul>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <Button variant="outline" disabled={!hasPrevPage} asChild={hasPrevPage}>
              {hasPrevPage ? (
                <Link href={`/orders?page=${page - 1}`}>Previous</Link>
              ) : (
                <span>Previous</span>
              )}
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button variant="outline" disabled={!hasNextPage} asChild={hasNextPage}>
              {hasNextPage ? (
                <Link href={`/orders?page=${page + 1}`}>Next</Link>
              ) : (
                <span>Next</span>
              )}
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export const metadata: Metadata = {
  description: 'Your orders.',
  openGraph: mergeOpenGraph({
    title: 'Orders',
    url: '/orders',
  }),
  title: 'Orders',
}
