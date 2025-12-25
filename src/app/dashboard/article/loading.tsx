import { Skeleton } from "@/components/ui/skeleton"

export default function ArticleLoading() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-50" />
                    <Skeleton className="h-4 w-75" />
                </div>
                <Skeleton className="h-10 w-37.5" />
            </div>

            <div className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        </div>
    )
}
