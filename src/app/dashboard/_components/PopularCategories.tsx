import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export async function PopularCategories() {
    const popularCategories = await prisma.category.findMany({
        take: 3,
        include: {
            _count: {
                select: { articles: true }
            }
        },
        orderBy: {
            articles: {
                _count: 'desc'
            }
        }
    });

    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Global Popular Categories</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {popularCategories.map((cat) => (
                        <div key={cat.id} className="flex items-center">
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">{cat.name}</p>
                                <p className="text-xs text-muted-foreground">{cat._count.articles} articles</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
