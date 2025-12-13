'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createUrl } from '@/utilities/createUrl'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
// import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'

type Props = {
    categories?: { id: string; title: string }[]
    minPrice?: number
    maxPrice?: number
}

export function FilterSidebar({ categories = [], minPrice = 0, maxPrice = 1000 }: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [priceRange, setPriceRange] = useState<[number, number]>([
        Number(searchParams?.get('minPrice')) || minPrice,
        Number(searchParams?.get('maxPrice')) || maxPrice
    ])
    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        searchParams?.get('category')?.split(',').filter(Boolean) || []
    )

    useEffect(() => {
        // Sync state with URL params on mount/update
        const catParam = searchParams?.get('category')
        if (catParam) {
            setSelectedCategories(catParam.split(','))
        } else {
            setSelectedCategories([])
        }
    }, [searchParams])

    const handleCategoryChange = (categoryId: string, checked: boolean) => {
        const newCategories = checked
            ? [...selectedCategories, categoryId]
            : selectedCategories.filter((c) => c !== categoryId)

        setSelectedCategories(newCategories)
        applyFilters(newCategories, priceRange)
    }

    const handlePriceChange = (value: number[]) => {
        // Only update state while dragging
        setPriceRange([value[0], value[1]])
    }

    const handlePriceCommit = (value: number[]) => {
        // Update URL when drag ends
        applyFilters(selectedCategories, [value[0], value[1]])
    }

    const applyFilters = (categories: string[], price: [number, number]) => {
        const newParams = new URLSearchParams(searchParams?.toString())

        if (categories.length > 0) {
            newParams.set('category', categories.join(','))
        } else {
            newParams.delete('category')
        }

        // Assuming backend supports minPrice/maxPrice params, otherwise this is just UI prep
        // newParams.set('minPrice', price[0].toString())
        // newParams.set('maxPrice', price[1].toString())

        router.push(createUrl('/shop', newParams))
    }

    const clearFilters = () => {
        setSelectedCategories([])
        setPriceRange([minPrice, maxPrice])
        router.push('/shop')
    }

    return (
        <div className="flex flex-col gap-6 p-4 border rounded-lg bg-card">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Filters</h3>
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="h-auto p-0 text-muted-foreground hover:text-primary">
                        Clear all
                    </Button>
                </div>

                <div className="space-y-4">
                    <h4 className="font-medium text-sm">Categories</h4>
                    <div className="space-y-2">
                        {categories.map((cat) => (
                            <div key={cat.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`cat-${cat.id}`}
                                    checked={selectedCategories.includes(cat.id)}
                                    onCheckedChange={(checked) => handleCategoryChange(cat.id, checked as boolean)}
                                />
                                <Label htmlFor={`cat-${cat.id}`} className="text-sm font-normal cursor-pointer">
                                    {cat.title}
                                </Label>
                            </div>
                        ))}
                        {categories.length === 0 && (
                            <p className="text-sm text-muted-foreground">No categories available</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="font-medium text-sm">Price Range</h4>
                {/* <Slider
                    defaultValue={[minPrice, maxPrice]}
                    value={[priceRange[0], priceRange[1]]}
                    min={minPrice}
                    max={maxPrice}
                    step={10}
                    onValueChange={handlePriceChange}
                    onValueCommit={handlePriceCommit}
                    className="mt-6"
                /> */}
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>
        </div>
    )
}
