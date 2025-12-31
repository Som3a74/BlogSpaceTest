import { PerformanceChart } from "./_charts/PerformanceChart"
import { DistributionChart } from "./_charts/DistributionChart"
import { GrowthChart } from "./_charts/GrowthChart"

interface ArticleViewsData {
    name: string
    views: number
}

interface CategoryData {
    name: string
    count: number
}

interface GrowthData {
    date: string
    count: number
}

interface DashboardChartsProps {
    viewsData: ArticleViewsData[]
    categoryData: CategoryData[]
    growthData: GrowthData[]
}

export function OverviewCharts({ viewsData, categoryData, growthData }: DashboardChartsProps) {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <PerformanceChart data={viewsData} />
                <DistributionChart data={categoryData} />
            </div>

            <GrowthChart data={growthData} />
        </div>
    )
}
