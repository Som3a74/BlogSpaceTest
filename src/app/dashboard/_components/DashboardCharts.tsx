import prisma from "@/lib/prisma";
import { OverviewCharts } from "./OverviewCharts";

export async function DashboardCharts({ userId }: { userId: string }) {
    // Fetch data for charts
    const [topArticles, articlesByCategory, allUserArticles] = await Promise.all([
        // Top 5 articles by views
        prisma.article.findMany({
            where: { userId },
            orderBy: { views: 'desc' },
            take: 5,
            select: { title: true, views: true }
        }),
        // Articles count per category for this user
        prisma.category.findMany({
            where: {
                articles: {
                    some: { userId }
                }
            },
            include: {
                _count: {
                    select: {
                        articles: {
                            where: { userId }
                        }
                    }
                }
            }
        }),
        // Get all articles to calculate growth over time
        prisma.article.findMany({
            where: { userId },
            select: { createdAt: true },
            orderBy: { createdAt: 'asc' }
        })
    ]);

    const viewsData = topArticles.map(article => ({
        name: article.title.length > 15 ? article.title.substring(0, 15) + "..." : article.title,
        views: article.views
    }));

    const categoryData = articlesByCategory.map(cat => ({
        name: cat.name,
        count: cat._count.articles
    }));

    // Calculate growth data (articles per month for the last 6 months)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const lastSixMonths: { month: number; year: number; label: string; count: number }[] = [];
    for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        lastSixMonths.push({
            month: d.getMonth(),
            year: d.getFullYear(),
            label: `${months[d.getMonth()]} ${d.getFullYear()}`,
            count: 0
        });
    }

    allUserArticles.forEach(article => {
        const date = new Date(article.createdAt);
        const month = date.getMonth();
        const year = date.getFullYear();

        const monthData = lastSixMonths.find(m => m.month === month && m.year === year);
        if (monthData) {
            monthData.count++;
        }
    });

    const growthData = lastSixMonths.map(m => ({
        date: m.label,
        count: m.count
    }));

    return <OverviewCharts viewsData={viewsData} categoryData={categoryData} growthData={growthData} />;
}
