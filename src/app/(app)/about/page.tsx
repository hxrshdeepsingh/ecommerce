import React from 'react'
import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Target, Heart, Globe, ShieldCheck, Zap } from 'lucide-react'

export const metadata: Metadata = {
    title: 'About Us | Store',
    description: 'Learn more about our mission, values, and the team behind Store.',
}

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden bg-muted/30">
                <div className="container px-4 md:px-6 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
                        <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium mb-2">
                            Our Story
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            We're building the future of commerce
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-[700px]">
                            Empowering businesses and delighting customers with a seamless, modern shopping experience.
                        </p>
                    </div>
                </div>

                {/* Abstract Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 md:py-24 bg-background">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Mission</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                At Store, we believe that e-commerce should be accessible, beautiful, and fast. We started with a simple idea: to create a platform that not only sells products but tells a story.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Our team is dedicated to pushing the boundaries of what's possible on the web, utilizing the latest technologies to deliver performance and reliability without compromising on design.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium">Global Reach</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium">Secure & Trusted</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium">Lightning Fast</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-muted border border-border shadow-xl">
                            {/* Placeholder for an image - using a gradient for now as we don't have assets */}
                            <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center text-muted-foreground/50">
                                <span className="text-sm font-medium">Office / Team Image</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="container px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Core Values</h2>
                        <p className="text-lg text-muted-foreground">
                            These principles guide every decision we make and every product we build.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="bg-background border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
                            <CardHeader>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                                    <Target className="w-6 h-6" />
                                </div>
                                <CardTitle className="text-xl">Customer First</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    We obsess over our customers' happiness. Every feature we launch starts with the question: "How does this help our users?"
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-background border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
                            <CardHeader>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                                    <Heart className="w-6 h-6" />
                                </div>
                                <CardTitle className="text-xl">Passion for Quality</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Good enough isn't good enough. We strive for excellence in our code, our design, and our support.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-background border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
                            <CardHeader>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                                    <Users className="w-6 h-6" />
                                </div>
                                <CardTitle className="text-xl">Better Together</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    We believe in the power of collaboration. Diverse perspectives lead to better solutions and a stronger community.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 md:py-24 bg-background">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Meet the Team</h2>
                            <p className="text-lg text-muted-foreground">
                                The talented individuals working hard to bring you the best experience.
                            </p>
                        </div>
                        {/* <Button variant="outline" className="hidden md:flex">View All Positions</Button> */}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="group relative overflow-hidden rounded-xl bg-muted aspect-[3/4]">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                                <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                                    <p className="font-bold text-lg">Team Member {i}</p>
                                    <p className="text-white/80 text-sm">Position Title</p>
                                </div>
                                {/* Placeholder for team images */}
                                <div className="w-full h-full bg-muted-foreground/10 flex items-center justify-center text-muted-foreground/30">
                                    <Users className="w-12 h-12" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
