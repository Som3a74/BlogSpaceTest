import { Skeleton } from "@/components/ui/skeleton"

export default function AddArticleLoading() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-62.5" />
                    <Skeleton className="h-4 w-87.5" />
                </div>
            </div>

            <div className="space-y-8 bg-card p-6 border rounded-xl">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-25" />
                    <Skeleton className="h-10 w-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-25" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-25" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-25" />
                    <Skeleton className="h-64 w-full" />
                </div>

                <div className="flex justify-end gap-x-4">
                    <Skeleton className="h-10 w-25" />
                    <Skeleton className="h-10 w-37.5" />
                </div>
            </div>
        </div>
    )
}
