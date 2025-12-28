import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ArticleAuthorProps {
    authorName?: string | null
    authorImage?: string | null
}

export const ArticleAuthor = ({ authorName, authorImage }: ArticleAuthorProps) => {
    return (
        <div id="author" className="flex items-center justify-center md:justify-between border-y border-slate-100 dark:border-white/5 py-6">
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 shadow-inner bg-primary/20">
                    <AvatarImage src={authorImage || ""} alt={authorName || ""} className="object-cover" />
                    <AvatarFallback className="bg-transparent text-primary font-black uppercase">
                        {(authorName || "A").charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className="text-left">
                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                        {authorName || "Anonymous"}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Article Author</p>
                </div>
            </div>
        </div>
    )
}