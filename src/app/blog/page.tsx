import BlogSlider from './_components/BlogSlider'
import BlogCard from './_components/BlogCard'
import { Badge } from "@/components/ui/badge"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import BlogSidebar from './_components/BlogSidebar'

import { getArticles } from '@/lib/data/articles'

const Page = async () => {
    const articles = await getArticles()
    console.log(articles)

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
                <BlogSlider blogs={articles.data || []} />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <BlogSidebar />

                {/* Main Content */}
                <main className="lg:col-span-3 space-y-8">
                    {/* Article Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {articles.data?.map((post: any) => (
                            <BlogCard
                                id={post.id}
                                key={post.id}
                                title={post.title}
                                content={post.content}
                                image={post.image}
                                category={post.category}
                                updatedAt={post.updatedAt}
                                createdAt={post.createdAt}
                                user={post.user}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    <Pagination className="mt-8">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </main>
            </div>
        </div>
    );
};

export default Page;