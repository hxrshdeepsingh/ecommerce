import type { Product } from '@/payload-types'

import Link from 'next/link'
import React from 'react'
import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type Props = {
  product: Partial<Product>
}

export const ProductGridItem: React.FC<Props> = ({ product }) => {
  const { gallery, priceInUSD, title, slug } = product

  let price = priceInUSD
  const variants = product.variants?.docs

  if (variants && variants.length > 0) {
    const variant = variants[0]
    if (
      variant &&
      typeof variant === 'object' &&
      variant?.priceInUSD &&
      typeof variant.priceInUSD === 'number'
    ) {
      price = variant.priceInUSD
    }
  }

  const image =
    gallery?.[0]?.image && typeof gallery[0]?.image !== 'string' ? gallery[0]?.image : false

  return (
    <Link href={`/products/${slug}`} className="group block h-full">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg border-border/50 bg-card hover:border-primary/50">
        <CardHeader className="p-0">
          <div className="aspect-square relative overflow-hidden bg-muted">
            {image ? (
              <Media
                resource={image}
                fill
                imgClassName="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground/50">
                No Image
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-grow px-5">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </CardContent>
        <CardFooter className="p-5 pt-0 flex items-center justify-between">
          <div className="font-bold text-lg text-primary">
            {typeof price === 'number' && <Price amount={price} />}
          </div>
          <Button size="sm" variant="secondary" className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
