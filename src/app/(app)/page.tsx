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
        <ProductsList
          title="Industries Systems"
          description="Discover our best-selling and trending items curated just for you."
        />
      </Suspense>

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsList
          title="Security Systems"
          description="Discover our best-selling and trending items curated just for you."
        />
      </Suspense>

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsList
          title="CCTV Cameras"
          description="Discover our best-selling and trending items curated just for you."
        />
      </Suspense>

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsList
          title="Mobile Phones"
          description="Discover our best-selling and trending items curated just for you."
        />
      </Suspense>

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsList
          title="Mobile Accessories"
          description="Discover our best-selling and trending items curated just for you."
        />
      </Suspense>

      <Features />
      <Newsletter />
    </>
  )
}
