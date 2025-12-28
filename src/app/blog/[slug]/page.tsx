import { notFound } from 'next/navigation'
import { headers } from "next/headers"
import { Metadata } from "next"

import BlogContent from '../_components/BlogContent'
import CommentsSection from './_components/CommentsSection'
import SpecificBlogSidebar from "./_components/SpecificBlogSidebar"
import { ReadingProgressBar } from "@/components/ReadingProgressBar"

import { ArticleActions } from "./_components/ArticleActions"
import { ArticleHeader } from "./_components/ArticleHeader"
import { ArticleAuthor } from "./_components/ArticleAuthor"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getArticleBySlug } from '@/lib/data/articles'
import { calculateReadingTime } from "@/utils/readingTime"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const result = await getArticleBySlug(slug);

    if (!result.success || !result.data) {
        return {
            title: "Article Not Found",
        };
    }

    const data = result.data;
    const url = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/blog/${slug}`;

    return {
        title: data.title,
        description: String(data.content).substring(0, 160).replace(/<[^>]*>?/gm, ''),
        openGraph: {
            title: data.title,
            description: String(data.content).substring(0, 160).replace(/<[^>]*>?/gm, ''),
            url: url,
            siteName: "BlogSpace",
            images: [
                {
                    url: data.image || "/images/logo.png",
                    width: 1200,
                    height: 630,
                    alt: data.title,
                },
            ],
            type: "article",
            publishedTime: data.createdAt.toISOString(),
            authors: [data.user?.name || "Anonymous"],
            tags: [data.category.name],
        },
        twitter: {
            card: "summary_large_image",
            title: data.title,
            description: String(data.content).substring(0, 160).replace(/<[^>]*>?/gm, ''),
            images: [data.image || "/images/logo.png"],
        },
    };
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const result = await getArticleBySlug(slug);

    if (!result.success || !result.data) {
        notFound();
    }
    const data = result.data;
    const readingTime = calculateReadingTime(String(data.content));
    const pageUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/blog/${slug}`;

    // Track views
    try {
        await prisma.article.update({
            where: { id: data.id },
            data: { views: { increment: 1 } }
        });
    } catch (e) {
        console.error("View increment error:", e);
    }

    const isSaved = session ? !!(await prisma.savedArticle.findUnique({
        where: {
            userId_articleId: {
                userId: session.user.id,
                articleId: data.id
            }
        }
    })) : false;

    const comments = await prisma.comment.findMany({
        where: { articleId: data.id },
        include: {
            user: {
                select: {
                    name: true,
                    image: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div className="container py-8 md:py-12 max-w-5xl mx-auto">
            <ReadingProgressBar />

            <ArticleActions
                pageUrl={pageUrl}
                title={data.title}
                articleId={data.id}
                isSaved={isSaved}
            />

            <ArticleHeader
                categoryName={data.category.name}
                createdAt={data.createdAt}
                readingTime={readingTime}
                views={data.views}
                title={data.title}
            />

            <ArticleAuthor authorName={data.user?.name} authorImage={data.user?.image} />

            {/* Featured Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-4xl my-12 shadow-2xl">
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
                    <BlogContent content={data.content} proTip={data.proTip ?? undefined} />

                    {/* Discussion Section */}
                    <CommentsSection
                        articleId={data.id}
                        initialComments={comments}
                        sessionUser={session?.user}
                    />
                </article>

                {/* specific blog Sideba */}
                <aside className="lg:col-span-4">
                    <SpecificBlogSidebar />
                </aside>
            </div>
        </div>
    );
};

export default Page;
