"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative w-full overflow-hidden">
      <section className="relative min-h-[80vh] flex items-center justify-center">

        {/* Background Image - Optimized with Next.js Image */}
        <Image
          src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=2070&auto=format&fit=crop"
          alt="Photography equipment background"
          fill
          className="object-cover z-0"
          priority // Load immediately for LCP optimization
          quality={85}
          sizes="100vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-3xl text-white">
            <Badge className="mb-4" variant="secondary">New Collection</Badge>

            <h1 className="text-5xl font-bold mb-6 drop-shadow-lg font-sohne">
              Discover Amazing Products
            </h1>

            <p className="text-xl text-white/90 mb-8 drop-shadow-md">
              Shop the latest trends with exclusive deals and fast shipping.
            </p>

            <div className="flex gap-4">
              <Button size="lg">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="bg-white/20 text-white border-white/30"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
