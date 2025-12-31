import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
    return (
        <div className="container py-8 space-y-12">
            {/* Header Skeleton */}
            <section className="space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-1/3" />
                    <Skeleton className="h-6 w-1/2" />
                </div>
                {/* Slider Skeleton */}
                <Skeleton className="w-full h-100 rounded-xl" />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Skeleton */}
                <aside className="lg:col-span-1 space-y-6">
                    <Skeleton className="h-10 w-full" />
                    <div className="space-y-4 p-4 border rounded-lg">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                </aside>

                {/* Main Content Skeleton */}
                <main className="lg:col-span-3 space-y-8">
                    {/* Grid Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex flex-col space-y-3">
                                <Skeleton className="h-50 w-full rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-1/3" />
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Skeleton */}
                    <div className="flex justify-center gap-2">
                        <Skeleton className="h-10 w-10" />
                        <Skeleton className="h-10 w-10" />
                        <Skeleton className="h-10 w-10" />
                        <Skeleton className="h-10 w-10" />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Loading