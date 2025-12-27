import { Article, Category } from "@/app/generated/prisma/client";
import Link from "next/link";
import { Bookmark, Calendar, ChevronRight } from "lucide-react";

interface SavedArticleWithDetails extends Article {
    category: Category;
}

export function SavedArticlesList({ savedArticles }: { savedArticles: (any)[] }) {
    if (savedArticles.length === 0) {
        return (
            <div className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-slate-50 dark:bg-white/2 rounded-3xl flex items-center justify-center mx-auto border border-slate-100 dark:border-white/5">
                    <Bookmark className="h-10 w-10 text-slate-300" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">No saved articles yet</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                        Articles you save will appear here for easy access.
                    </p>
                </div>
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-black text-primary hover:underline">
                    Explore Articles <ChevronRight className="h-4 w-4" />
                </Link>
            </div>
        );
    }

    return (
        <div className="grid gap-6">
            {savedArticles.map((saved: any) => (
                <Link
                    key={saved.id}
                    href={`/blog/${saved.article.slug}`}
                    className="group bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 rounded-3xl p-6 flex flex-col md:flex-row gap-6 transition-all hover:ring-2 hover:ring-primary/20"
                >
                    {saved.article.image && (
                        <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden relative">
                            <img
                                src={saved.article.image}
                                alt={saved.article.title}
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                    )}
                    <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">
                                {saved.article.category.name}
                            </span>
                            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                <Calendar className="h-3 w-3" />
                                {new Date(saved.article.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                            {saved.article.title}
                        </h3>
                    </div>
                    <div className="flex items-center justify-center">
                        <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-primary transition-colors" />
                    </div>
                </Link>
            ))}
        </div>
    );
}
