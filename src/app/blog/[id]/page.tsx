import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowLeft, Bookmark } from "lucide-react"
import Link from 'next/link'
import BlogContent from '../_components/BlogContent'
import BlogCard from '../_components/BlogCard'
import SharedButton from './_components/SharedButton'
import { notFound } from 'next/navigation'
import SpecificBlogSidebar from "./_components/SpecificBlogSidebar"
import { dataFormat } from "@/utilities/dataFormat"

import { getArticleById } from '@/lib/data/articles'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const result = await getArticleById(id);

    if (!result.success || !result.data) {
        notFound();
    }
    const data = result.data;
    console.log(data)

    // const similarPosts = article.filter((post: any) => post.categoryId === article.categoryId)

    return (
        <div className="container py-8 md:py-12 max-w-5xl mx-auto">
            {/* Back Link */}
            <div className="mb-8">
                <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground hover:text-primary">
                    <Link href="/blog">
                        <ArrowLeft className="h-4 w-4" /> Back to Blog
                    </Link>
                </Button>
            </div>

            {/* Article Header */}
            <header className="space-y-6 mb-12 text-center md:text-left">
                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                    <Badge variant="secondary" className="px-3 py-1">{data.category.name}</Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {dataFormat(data.createdAt.toISOString())}
                    </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                    {data.title}
                </h1>

                <div id="author" className="flex items-center justify-center md:justify-between border-y py-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            {(data.user?.name || "A").charAt(0)}
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-medium">{data.user?.name || "Anonymous"}</p>
                            <p className="text-xs text-muted-foreground">Author</p>
                        </div>
                    </div>
                    <div className="gap-2 hidden md:flex">
                        <SharedButton title={data.title} />
                        <Button variant="outline" size="icon" className="rounded-full">
                            <Bookmark className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-12 shadow-lg">
                <img
                    src={data.image || ""}
                    alt={data.title}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Content & Sidebar Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content */}
                <article className="lg:col-span-8" id="content">
                    <BlogContent content={data.content} />
                </article>

                {/* specific blog Sideba */}
                <SpecificBlogSidebar />
            </div>

            {/* Similar Articles */}
            <section className="mt-20 pt-12 border-t">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold tracking-tight">Similar Articles</h2>
                    <Button variant="ghost" asChild>
                        <Link href="/blog">View All</Link>
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* {similarPosts.map((post) => (
                        <BlogCard
                            id={post.id}
                            key={post.id}
                            title={post.title}
                            excerpt={post.excerpt}
                            image={post.image}
                            category={post.category}
                            date={post.date}
                            author={post.author}
                        />
                    ))} */}
                </div>
            </section>
        </div>
    );
};

export default Page;