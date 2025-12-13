import type { Media, Product } from '@/payload-types'

import { GridTileImage } from '@/components/Grid/tile'
import { Gallery } from '@/components/product/Gallery'
import { ProductDescription } from '@/components/product/ProductDescription'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { RichText } from '@/components/RichText'
import { getPayloadClient } from "@/utilities/getPayloadCached"
import { ProductBreadcrumbs } from '@/components/product/ProductBreadcrumbs'
import { Reviews } from '@/components/product/Reviews'

export default async function ProductPage({ params }: any) {
  const { slug } = await params
  const product = await queryProductBySlug({ slug })
  if (!product) return notFound()
  const gallery = product.gallery?.filter((item: any) => typeof item.image === 'object').map((item: any) => ({ ...item, image: item.image as Media, })) || []
  let price = product.priceInUSD
  if (product.enableVariants && product?.variants?.docs?.length) {
    price = product?.variants?.docs?.reduce((acc: any, variant: any) => {
      if (typeof variant === 'object' && variant?.priceInUSD && acc && variant?.priceInUSD > acc) {
        return variant.priceInUSD
      }
      return acc
    }, price)
  }
  const relatedProducts = product.relatedProducts?.filter((relatedProduct: any) => typeof relatedProduct === 'object') ?? []

  return (
    <>
      <div className="container pt-8 pb-8">
        <ProductBreadcrumbs
          productTitle={product.title}
          category={product.categories?.[0] && typeof product.categories?.[0] === 'object' ? product.categories[0] : undefined}
        />

        <div className="flex flex-col gap-12 rounded-lg border p-8 md:py-12 lg:flex-row lg:gap-8 bg-primary-foreground">
          <div className="h-full w-full basis-full lg:basis-1/2">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              {Boolean(gallery?.length) && <Gallery gallery={gallery} />}
            </Suspense>
          </div>

          <div className="basis-full lg:basis-1/2">
            <ProductDescription product={product} />
          </div>
        </div>
      </div>

      <div className="container py-16 space-y-16">

        {/* ---------------------- */}
        {/* MAIN PRODUCT IMAGE     */}
        {/* ---------------------- */}
        {product.productImage && typeof product.productImage === "object" && (
          <div className="w-full flex justify-center">
            <img src={product.productImage.url}
              alt={product.productImage.alt || product.title}
              className="max-w-full w-full rounded-lg shadow"
            />
          </div>
        )}

        {/* ---------------------- */}
        {/* PRODUCT DESCRIPTION    */}
        {/* ---------------------- */}
        {product.productContent && (
          <RichText data={product.productContent} className='max-w-full w-full m-0 p-0 mb-12' />
        )}

        {/* ---------------------- */}
        {/* PRODUCT SPECIFICATIONS */}
        {/* ---------------------- */}
        {product.productTable?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Specifications</h2>

            <table className="w-full border-collapse border border-border text-sm md:text-base">
              <tbody>
                {product.productTable?.map((row: any) => (
                  <tr key={row.id} className="border-b border-border">
                    <td className="p-3 font-semibold bg-muted w-1/3 border-r border-border">
                      {row.label}
                    </td>
                    <td className="p-3">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ---------------------- */}
        {/* REVIEWS SECTION        */}
        {/* ---------------------- */}
        {/* <Reviews /> */}
      </div>


      {/* {
      relatedProducts.length ? (
        <div className="container">
          <RelatedProducts products={relatedProducts as Product[]} />
        </div>
      ) : (
        <></>
      )
    } */}
      {/* </div> */}
    </>
  )
}

function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {products.map((product) => (
          <li
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
            key={product.id}
          >
            <Link className="relative h-full w-full" href={`/products/${product.slug}`}>
              <GridTileImage
                label={{
                  amount: product.priceInUSD!,
                  title: product.title,
                }}
                media={product.meta?.image as Media}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const queryProductBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'products',
    depth: 3,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        ...(draft ? [] : [{ _status: { equals: 'published' } }]),
      ],
    },
    populate: {
      variants: {
        title: true,
        priceInUSD: true,
        inventory: true,
        options: true,
      },
    },
  })

  return result.docs?.[0] || null
}