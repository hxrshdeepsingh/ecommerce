import HeroSection from "@/components/Hero/heroSection";
import ProductsList from "@/components/Products/ProductsList";
import Categories from "@/components/Categories/Categories";
import Newsletter from "@/components/Newsletter/Newsletter";
import Features from "@/components/Features/Features";

export default function page() {
  return (
    <>
      <HeroSection />
      <Categories />
      <ProductsList />
      <ProductsList />
      <Features />
      <Newsletter />
    </>
  );
}
