import HeroSection from "@/components/Hero/heroSection"
import Categories from "@/components/Categories/Categories"
import dynamic from "next/dynamic"
import { Suspense } from "react"

import ProductsList from "@/components/Products/ProductsList"
import ProductsSkeleton from "@/components/Products/ProductsSkeleton"

const Newsletter = dynamic(() => import("@/components/Newsletter/Newsletter"))
const Features = dynamic(() => import("@/components/Features/Features"))

export const revalidate = 600

export default function Page() {
  return (
    <>
      <HeroSection />
      <Categories />

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsList />
      </Suspense>

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsList />
      </Suspense>

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsList />
      </Suspense>

      <Features />
      <Newsletter />
    </>
  )
}
