import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categories = [
    {
        title: "Cameras",
        href: "/cameras",
        image: "/media/ee.webp",
        description: "DSLR & Mirrorless Bodies"
    },
    {
        title: "Lenses",
        href: "/lenses",
        image: "/media/ee.webp",
        description: "Prime & Zoom Glass"
    },
    {
        title: "Drones & Gear",
        href: "/accessories",
        image: "/media/ee.webp",
        description: "Aerial & Support Equipment"
    }
]

export default function Categories() {
    return (
        <section className="py-12 md:py-16 bg-background">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl text-primary md:text-4xl font-bold tracking-tight">Shop by Category</h2>
                        <p className="text-muted-foreground mt-4 text-lg max-w-xl">
                            Explore our comprehensive collection of professional photography equipment.
                        </p>
                    </div>
                    <Link href="/shop" className="hidden md:flex items-center text-primary font-medium hover:underline text-lg">
                        View all categories <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.title}
                            href={category.href}
                            className="group relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-[3/4] border border-border/50"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${category.image})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                            <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                                <h3 className="text-3xl font-bold mb-2">{category.title}</h3>
                                <p className="text-white/70 text-base mb-6 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                    {category.description}
                                </p>
                                <span className="inline-flex items-center text-sm font-bold uppercase tracking-widest border-b-2 border-white/0 group-hover:border-white transition-all duration-300">
                                    Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
