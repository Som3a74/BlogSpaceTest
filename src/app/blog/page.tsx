import BlogSlider from './_components/BlogSlider'
import { Badge } from "@/components/ui/badge"
import BlogSidebar from './_components/BlogSidebar'
import ArticleGrid from './_components/ArticleGrid'
import { Suspense } from 'react'
import ArticleGridSkeleton from './_components/ArticleGridSkeleton'

import { getArticles } from '@/lib/data/articles'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Blog | DevJournal",
    description: "Explore our latest articles, tutorials, and insights on web development, design, and technology. Stay updated with the latest trends.",
};

const Page = async ({
    searchParams,
}: {
    searchParams: Promise<{
        q?: string;
        category?: string;
        page?: string;
        sort?: string;
    }>;
}) => {
    const params = await searchParams;

    const sliderResponse = await getArticles({ limit: 5 });
    const sliderArticles = sliderResponse.data?.articles || [];

    return (
        <div className="container py-8 space-y-12">
            {/* Header & Slider */}
            <section className="space-y-8">
                <div className="flex flex-col items-center text-center space-y-4 py-8 bg-muted/30 rounded-3xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
                    <Badge variant="outline" className="px-3 py-1 text-sm bg-background">
                        Our Blog
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                        Latest <span className="text-primary">Insights</span> & Updates
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto px-4">
                        Discover our latest thoughts, tutorials, and stories on technology, design, and innovation.
                        Stay ahead of the curve with expert analysis.
                    </p>
                </div>
                <BlogSlider blogs={sliderArticles} />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <BlogSidebar />

                {/* Main Content */}
                <main className="lg:col-span-3 space-y-8">
                    <Suspense key={JSON.stringify(params)} fallback={<ArticleGridSkeleton />}>
                        <ArticleGrid searchParams={params} />
                    </Suspense>
                </main>
            </div>
        </div>
    );
};

export default Page;