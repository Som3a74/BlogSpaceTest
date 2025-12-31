import Link from 'next/link'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Eye } from "lucide-react"
import { getArticles } from '@/lib/data/articles'
import { dataFormat } from '@/utils/dataFormat'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function LatestArticlesSection() {
    const latestResponse = await getArticles({ limit: 4 });
    const latestArticles = latestResponse.data?.articles || [];

    return (
        <section className="py-24 bg-muted/30">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="space-y-2">
                        <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">Fresh off the press</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Latest Articles</h2>
                    </div>
                    <Button variant="link" className="text-muted-foreground hover:text-primary p-0 h-auto font-semibold" asChild>
                        <Link href="/blog">Browse archive &rarr;</Link>
                    </Button>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {latestArticles.map((article: any) => (
                        <Link
                            key={article.id}
                            href={`/blog/${article.slug}`}
                            aria-label={`Read more about ${article.title}`}
                            className="group flex flex-col sm:flex-row gap-6 p-4 rounded-2xl bg-background border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                        >
                            <span className="sr-only">Read more about {article.title}</span>
                            <div className="shrink-0 w-full sm:w-48 h-48 sm:h-auto rounded-xl overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 192px"
                                />
                            </div>

                            <div className="flex flex-col flex-1 py-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <Badge variant="outline" className="text-xs font-medium border-primary/20 text-primary">
                                        {article.category?.name || "Blog"}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {dataFormat(article.createdAt)}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {article.title}
                                </h3>

                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                                    {(article.content && typeof article.content === 'string')
                                        ? article.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...'
                                        : article.proTip || "Read more to find out..."}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t mt-auto">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={article.user?.image} alt={article.user?.name} />
                                            <AvatarFallback className="text-[8px]">{article.user?.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium text-foreground">{article.user?.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Eye className="w-3 h-3" /> {article.views}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}