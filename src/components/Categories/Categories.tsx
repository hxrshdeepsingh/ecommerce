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
        title: "Drones",
        href: "/accessories",
        image: "/media/ee.webp",
        description: "Aerial & Support Equipment"
    },
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
        title: "Drones",
        href: "/accessories",
        image: "/media/ee.webp",
        description: "Aerial & Support Equipment"
    },
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
        title: "Drones",
        href: "/accessories",
        image: "/media/ee.webp",
        description: "Aerial & Support Equipment"
    },
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
        title: "Drones",
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

                <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.title}
                            href={category.href}
                            className="group relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-[3/4] shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${category.image})` }}
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                            {/* Content with Glass Effect */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-xl overflow-hidden relative">
                                    <h3 className="text-md font-bold text-white mb-1 group-hover:text-primary-foreground transition-colors">{category.title}</h3>
                                    <p className="text-white/80 text-sm transform transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 group-hover:mb-3">
                                        {category.description}
                                    </p>

                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
