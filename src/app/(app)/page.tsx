import HeroSection from "@/components/Hero/heroSection";
import ProductsList from "@/components/Products/ProductsList";
import Categories from "@/components/Categories/Categories";
import Newsletter from "@/components/Newsletter/Newsletter";

export default function page() {
  return (
    <>
      <HeroSection />
      <Categories />
      <ProductsList />
      <div className="bg-muted/10 py-8">
        <div className="container px-4 md:px-6 mb-8">
          <h2 className="text-3xl font-bold tracking-tight">New Arrivals</h2>
          <p className="text-muted-foreground">Fresh styles just added to our collection.</p>
        </div>
        <ProductsList />
      </div>
      <Newsletter />
    </>
  );
}
