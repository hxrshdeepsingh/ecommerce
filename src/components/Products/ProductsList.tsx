import configPromise from "@payload-config"
import { getPayload } from "payload"
import { cache } from "react"
import CarouselClient from "./ProductsListClient"

const getProductsCached = cache(async () => {
  const payload = await getPayload({ config: configPromise })

  return payload.find({
    collection: "products",
    draft: false,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      gallery: true,
      categories: true,
      priceInUSD: true,
    },
    depth: 1,
    sort: "title",
  })
})

export default async function ProductsList() {
  const products = await getProductsCached()
  return <CarouselClient products={products.docs} />
}

export const revalidate = 60
