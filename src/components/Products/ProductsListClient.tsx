"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { ProductGridItem } from "@/components/ProductGridItem"

export default function CarouselClient({ products }) {
  return (
    <section className="container py-14 space-y-10">
      {/* Heading Section */}
      <div className="space-y-2">
        <h2 className="text-3xl text-primary md:text-4xl font-bold tracking-tight">
          Featured Products
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Discover our best-selling and trending items curated just for you.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative">
        <Carousel
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <ProductGridItem product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  )
}
