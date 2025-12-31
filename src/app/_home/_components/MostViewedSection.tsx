import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, ArrowRight } from "lucide-react"
import { getArticles } from '@/lib/data/articles'
import BlogCard from '@/app/blog/_components/BlogCard'

export default async function MostViewedSection() {
    const mostViewedResponse = await getArticles({ sort: 'most-viewed', limit: 3 });
    const mostViewedArticles = mostViewedResponse.data?.articles || [];

    return (
        <section className="py-20 bg-background">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="space-y-2">
                        <Badge variant="secondary" className="bg-orange-500/10 text-orange-700 hover:bg-orange-500/20">
                            <Trophy className="w-3 h-3 mr-1" /> Trending Now
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Most Viewed</h2>
                    </div>
                    <Button variant="ghost" className="group text-muted-foreground hover:text-primary" asChild>
                        <Link href="/blog?sort=most-viewed">
                            View All <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {mostViewedArticles.map((article: any) => (
                        <BlogCard
                            key={article.id}
                            {...article}
                        />
                    ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/blog?sort=most-viewed">View All Most Viewed</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
