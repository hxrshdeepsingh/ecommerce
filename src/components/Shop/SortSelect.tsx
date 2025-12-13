'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from 'next/navigation'
import { createUrl } from '@/utilities/createUrl'

export function SortSelect() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentSort = searchParams?.get('sort') || 'title'

    const handleSortChange = (value: string) => {
        const newParams = new URLSearchParams(searchParams?.toString())
        newParams.set('sort', value)
        router.push(createUrl('/shop', newParams))
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap hidden sm:inline">Sort by:</span>
            <Select value={currentSort} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="title">Name: A-Z</SelectItem>
                    <SelectItem value="-title">Name: Z-A</SelectItem>
                    <SelectItem value="priceInUSD">Price: Low to High</SelectItem> /* Update key if your schema differs */
                    <SelectItem value="-priceInUSD">Price: High to Low</SelectItem>
                    <SelectItem value="-createdAt">Newest Arrivals</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
