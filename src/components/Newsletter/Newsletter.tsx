"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Camera } from "lucide-react"

export default function Newsletter() {
    return (
        <section className="py-24 bg-card text-card-foreground">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
                    <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                        <Camera className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
                        Join the Community
                    </h2>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-[600px]">
                        Get exclusive photography tips, gear reviews, and early access to new product launches.
                    </p>
                    <form className="flex flex-col sm:flex-row w-full gap-3 mt-8" onSubmit={(e) => e.preventDefault()}>
                        <Input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 bg-background border-border text-foreground placeholder:text-muted-foreground h-12"
                        />
                        <Button type="submit" className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                            Subscribe
                        </Button>
                    </form>
                    <p className="text-xs text-muted-foreground mt-6">
                        Join 50,000+ photographers. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </section>
    )
}
