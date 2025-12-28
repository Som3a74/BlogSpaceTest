import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import { dataFormat } from "@/utils/dataFormat"

interface ArticleHeaderProps {
    categoryName: string
    createdAt: Date
    readingTime: number
    views: number
    title: string
}

export const ArticleHeader = ({ categoryName, createdAt, readingTime, views, title }: ArticleHeaderProps) => {
    return (
        <header className="space-y-6 mb-12 text-center md:text-left">
            <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                <Badge variant="secondary" className="px-3 py-1 bg-primary/5 text-primary border-primary/10">
                    {categoryName}
                </Badge>
                <span className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> {dataFormat(createdAt.toISOString())}
                </span>
                <span className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {readingTime} min read
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded">
                    {views + 1 || 1} Views
                </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
                {title}
            </h1>
        </header>
    )
}
