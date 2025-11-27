import configPromise from "@payload-config"
import { getPayload } from "payload"
import CarouselClient from "./ProductsListClient"

export default async function ProductsList() {
  const payload = await getPayload({ config: configPromise })

  const products = await payload.find({
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

  return <CarouselClient products={products.docs} />
}

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;
