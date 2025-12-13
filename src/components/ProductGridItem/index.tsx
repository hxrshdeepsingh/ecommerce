import type { Product } from '@/payload-types'
import { useAuth } from '@/providers/Auth'

import Link from 'next/link'
import React from 'react'
import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'

/**
 * Improvements:
 * - Cleaner hierarchy & spacing
 * - Subtle gradient overlay on images
 * - Better hover animation (lift + glow)
 * - Clear CTA button
 * - Price & stock alignment
 */

type Props = {
  product: Partial<Product>
}

export const ProductGridItem: React.FC<Props> = ({ product }) => {
  const { gallery, priceInUSD, title, slug, categories } = product
  const dealerPrice = (product as any).dealerPrice
  const { user } = useAuth()
  const isDealer = user?.roles?.includes('dealer')

  let price = isDealer && dealerPrice ? dealerPrice : priceInUSD
  const variants = product.variants?.docs

  if (variants && variants.length > 0) {
    const variant = variants[0]
    if (variant && typeof variant === 'object' && typeof variant.priceInUSD === 'number') {
      price = variant.priceInUSD
    }
  }

  const image =
    gallery?.[0]?.image && typeof gallery[0]?.image !== 'string' ? gallery[0]?.image : null

  const hoverImage =
    gallery?.[1]?.image && typeof gallery[1]?.image !== 'string' ? gallery[1]?.image : null

  const categoryTitle =
    categories && categories[0] && typeof categories[0] === 'object'
      ? categories[0].title
      : null

  return (
    <Link href={`/products/${slug}`} className="group block h-full">
      <div className="relative h-full overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          {image ? (
            <>
              <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0">
                <Media resource={image} fill imgClassName="object-cover" />
              </div>

              {hoverImage && (
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <Media resource={hoverImage} fill imgClassName="object-cover" />
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Quick Action */}
              <div className="absolute inset-x-4 bottom-4 translate-y-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <Button className="w-full gap-2 rounded-full" size="sm">
                  <Eye className="h-4 w-4" />
                  Quick View
                </Button>
              </div>
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
              No Image
            </div>
          )}

          {/* Top Badges */}
          <div className="absolute left-3 top-3 flex gap-2">
            {categoryTitle && (
              <Badge variant="secondary" className="backdrop-blur">
                {categoryTitle}
              </Badge>
            )}
            <Badge className="bg-emerald-600 text-white">In Stock</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 p-4">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug transition-colors group-hover:text-primary">
            {title}
          </h3>

          <div className="mt-auto flex items-center justify-between">
            <div className="text-lg font-bold">
              <Price amount={price} />
            </div>
            <Badge variant="outline" className="text-xs">
              ID: 867340
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  )
}
