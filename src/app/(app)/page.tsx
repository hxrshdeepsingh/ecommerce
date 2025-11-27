import HeroSection from "@/components/Hero/heroSection";
import ProductsList from "@/components/Products/ProductsList";
import Categories from "@/components/Categories/Categories";
import dynamic from "next/dynamic";

// Lazy load below-the-fold components to reduce initial bundle size
const Newsletter = dynamic(() => import("@/components/Newsletter/Newsletter"), {
  loading: () => null, // No loading state needed for below-fold content
});
const Features = dynamic(() => import("@/components/Features/Features"), {
  loading: () => null,
});

export default function page() {
  return (
    <>
      <HeroSection />
      <Categories />
      <ProductsList />
      <Features />
      <Newsletter />
    </>
  );
}

// Enable ISR - revalidate home page every 60 seconds
export const revalidate = 60;
