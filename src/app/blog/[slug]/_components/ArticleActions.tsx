"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from 'next/link'
import { SocialShare } from "./SocialShare"
import SaveButton from "./SaveButton"

interface ArticleActionsProps {
    pageUrl: string
    title: string
    articleId: number
    isSaved: boolean
}

export const ArticleActions = ({ pageUrl, title, articleId, isSaved }: ArticleActionsProps) => {
    return (
        <div className="mb-8 flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground hover:text-primary transition-all">
                <Link href="/blog">
                    <ArrowLeft className="h-4 w-4" /> Back to Blog
                </Link>
            </Button>
            <div className="flex items-center gap-2">
                <SocialShare url={pageUrl} title={title} />
                <SaveButton articleId={articleId} initialSaved={isSaved} />
            </div>
        </div>
    )
}
