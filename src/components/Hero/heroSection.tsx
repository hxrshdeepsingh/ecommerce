"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Truck, Shield, CreditCard } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative w-full overflow-hidden">
      <section className="relative py-44">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/media/cat.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl text-white">
            <Badge className="mb-4 bg-white text-black">New Collection</Badge>

            <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
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
                className="bg-white/20 text-white"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 border-border bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <Truck className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  On orders over $50
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Secure Payment</h3>
                <p className="text-sm text-muted-foreground">
                  100% secure transactions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <CreditCard className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">
                  30-day return policy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
