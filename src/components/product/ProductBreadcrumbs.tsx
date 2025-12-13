import Link from "next/link"
import { ChevronRight } from "lucide-react"

type Props = {
    productTitle: string
    category?: { title: string; id: string }
}

export function ProductBreadcrumbs({ productTitle, category }: Props) {
    return (
        <nav className="flex items-center text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
                Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/shop" className="hover:text-primary transition-colors">
                Shop
            </Link>

            {category && (
                <>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <Link href={`/shop?category=${category.id}`} className="hover:text-primary transition-colors">
                        {category.title}
                    </Link>
                </>
            )}

            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
                {productTitle}
            </span>
        </nav>
    )
}
