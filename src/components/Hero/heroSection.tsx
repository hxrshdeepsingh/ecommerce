"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative w-full overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center">

        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="https://static.gopro.com/assets/blta2b8522e5372af40/bltb90e0d3048f72f0f/68aee83db54b061d1aca0b79/01-h13-pdp-rugged-1280.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-3xl text-white">
            <Badge className="mb-4 bg-white text-black">New Collection</Badge>

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
