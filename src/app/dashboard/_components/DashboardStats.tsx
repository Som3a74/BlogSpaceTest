import prisma from "@/lib/prisma";
import { FileText, Eye, MessageCircle, Heart, Bookmark } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export async function DashboardStats({ userId }: { userId: string }) {
    const [articlesCount, aggregateViews, totalLikes, totalComments, totalSaves] = await Promise.all([
        prisma.article.count({ where: { userId } }),
        prisma.article.aggregate({ where: { userId }, _sum: { views: true } }),
        prisma.like.count({ where: { article: { userId } } }),
        prisma.comment.count({ where: { article: { userId } } }),
        prisma.savedArticle.count({ where: { article: { userId } } }),
    ]);

    const stats = [
        {
            title: "Total Articles",
            value: articlesCount.toString(),
            icon: FileText,
            color: "text-blue-500",
            description: "Articles published"
        },
        {
            title: "Total Views",
            value: (aggregateViews._sum.views || 0).toLocaleString(),
            icon: Eye,
            color: "text-emerald-500",
            description: "Total reader reach"
        },
        {
            title: "Total Likes",
            value: totalLikes.toLocaleString(),
            icon: Heart,
            color: "text-rose-500",
            description: "Positive reader feedback"
        },
        {
            title: "Total Saves",
            value: totalSaves.toLocaleString(),
            icon: Bookmark,
            color: "text-amber-500",
            description: "Content bookmarks"
        },
        {
            title: "Total Comments",
            value: totalComments.toLocaleString(),
            icon: MessageCircle,
            color: "text-violet-500",
            description: "Community engagement"
        }
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">
                            {stat.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
