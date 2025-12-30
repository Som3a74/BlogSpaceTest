"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { MoreHorizontal, Pencil, Trash2, Eye, Plus } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteArticleAction } from "../actions"
import { TArticle } from "@/types/article"
import { dataFormat } from "@/utils/dataFormat"

type TArticleRow = TArticle & {
    id: number;
    category?: { name: string } | null
}

interface ArticleTableProps {
    articles: TArticleRow[]
}

export function ArticleTable({ articles }: ArticleTableProps) {
    const [isPending, startTransition] = useTransition()

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this article?")) return

        startTransition(async () => {
            const result = await deleteArticleAction(id)
            if (result.success) {
                toast.success("Article deleted successfully")
            } else {
                toast.error(result.message || "Failed to delete article")
            }
        })
    }

    return (
        <div className="rounded-md border bg-card">
            <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm text-left">
                    <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Article</th>
                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground hidden md:table-cell">Category</th>
                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground hidden md:table-cell">Created At</th>
                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                        {articles.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                    No articles found. Create your first article!
                                </td>
                            </tr>
                        ) : (
                            articles.map((article) => (
                                <tr key={article.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 rounded-md">
                                                <AvatarImage src={article.image || ""} alt={article.title} className="object-cover" />
                                                <AvatarFallback className="rounded-md">{article.title.substring(0, 2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col max-w-50 md:max-w-75">
                                                <span className="font-medium truncate">{article.title}</span>
                                                <span className="text-xs text-muted-foreground truncate hidden sm:inline-block">{article.slug}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle hidden md:table-cell">
                                        {article.category?.name || "Uncategorized"}
                                    </td>
                                    <td className="p-4 align-middle">
                                        <Badge variant={article.published ? "default" : "secondary"}>
                                            {article.published ? "Published" : "Draft"}
                                        </Badge>
                                    </td>
                                    <td className="p-4 align-middle hidden md:table-cell">
                                        {dataFormat(article.createdAt)}
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/dashboard/article/add-article?mode=edit&id=${article.id}`}>
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/blog/${article.slug}`}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-red-600 focus:text-red-600"
                                                    onClick={() => handleDelete(article.id)}
                                                    disabled={isPending}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
