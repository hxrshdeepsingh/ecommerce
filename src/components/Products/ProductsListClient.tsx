"use client"

import * as React from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { ProductGridItem } from "@/components/ProductGridItem"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { useAuth } from "@/providers/Auth"

export default function CarouselClient({ products, title, description }: { products: any; title: string; description: string }) {
  const { user } = useAuth()
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <section className="container py-14 space-y-10">
      {/* Heading Section */}
      {/* <div className="flex flex-col space-y-4">
        <h2 className="text-3xl text-primary md:text-4xl font-bold tracking-tight">

        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
          {description}
        </p>
      </div> */}

      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-3xl text-primary md:text-4xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-xl">
            {description}
          </p>
        </div>
        <Link href="/shop" className="hidden md:flex items-center text-primary font-medium hover:underline text-lg">
          See all <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative">
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4 pb-4">
            {products.map((product: any) => (
              <CarouselItem
                key={product.id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="h-full p-1">
                  <ProductGridItem product={product} user={user} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <div className="hidden lg:block">
            <CarouselPrevious className="-left-12 h-12 w-12 border-2" />
            <CarouselNext className="-right-12 h-12 w-12 border-2" />
          </div>
        </Carousel>

        {/* Dots Pagination */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                current === index + 1
                  ? "w-8 bg-primary"
                  : "w-2 bg-primary/20 hover:bg-primary/40"
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
