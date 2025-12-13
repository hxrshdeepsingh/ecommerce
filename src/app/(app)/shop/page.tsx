import { Grid } from '@/components/Grid'
import { ProductGridItem } from '@/components/ProductGridItem'
// import configPromise from '@payload-config'
// import { getPayload } from 'payload'
import { getPayloadClient } from "@/utilities/getPayloadCached"
import React from 'react'
import { FilterSidebar } from '@/components/Shop/FilterSidebar'
import { SortSelect } from '@/components/Shop/SortSelect'

export const metadata = {
  description: 'Search for products in the store.',
  title: 'Shop',
}

type SearchParams = { [key: string]: string | string[] | undefined }

type Props = {
  searchParams: Promise<SearchParams>
}

export default async function ShopPage({ searchParams }: Props) {
  const { q: searchValue, sort, category } = await searchParams
  const payload = await getPayloadClient();

  const categoriesDocs = await payload.find({
    collection: 'categories',
    pagination: false,
    sort: 'title',
    select: {
      title: true,
      id: true,
    }
  })

  const products = await payload.find({
    collection: 'products',
    draft: false,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      gallery: true,
      categories: true,
      priceInUSD: true,
    },
    ...(sort ? { sort: sort as string } : { sort: 'title' }),
    ...(searchValue || category
      ? {
        where: {
          and: [
            {
              _status: {
                equals: 'published',
              },
            },
            ...(searchValue
              ? [
                {
                  or: [
                    {
                      title: {
                        like: searchValue,
                      },
                    },
                    {
                      description: {
                        like: searchValue,
                      },
                    },
                  ],
                },
              ]
              : []),
            ...(category
              ? [
                {
                  categories: {
                    in: (category as string).split(','),
                  },
                },
              ]
              : []),
          ],
        },
      }
      : {}),
  })

  const sidebarCategories = categoriesDocs.docs.map(c => ({ id: c.id, title: c.title }))

  const resultsText = products.docs.length > 1 ? 'results' : 'result'

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <div className="w-full lg:w-64 flex-none">
          <FilterSidebar categories={sidebarCategories} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Shop</h1>
            <div className="flex items-center gap-4">
              <p className="text-muted-foreground text-sm">
                {searchValue ? (
                  <>
                    {products.docs?.length === 0
                      ? 'No products match '
                      : `Showing ${products.docs.length} ${resultsText} for `}
                    <span className="font-bold">&quot;{searchValue}&quot;</span>
                  </>
                ) : (
                  `Showing ${products.docs.length} products`
                )}
              </p>
              <SortSelect />
            </div>
          </div>

          {products.docs?.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-xl text-muted-foreground">No products found. Try changing your filters.</p>
            </div>
          )}

          {products?.docs.length > 0 && (
            <Grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.docs.map((product) => {
                return <ProductGridItem key={product.id} product={product} />
              })}
            </Grid>
          )}
        </div>
      </div>
    </div>
  )
}
