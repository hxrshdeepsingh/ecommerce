import { Skeleton } from "@/components/ui/skeleton"

export default function ProductsSkeleton() {
    return (
        <section className="container py-14 space-y-10">
            <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-5 w-72" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="h-52 w-full rounded-xl" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
        </section>
    )
}
