import React from 'react'
import prisma from '@/lib/prisma'
import { ArticleForm } from './_components/ArticleForm'

const AddArticlePage = async () => {
    // Fetch categories for the form
    const categories = await prisma.category.findMany({
        orderBy: {
            name: 'asc'
        }
    })
    console.log(categories)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Add New Article</h2>
                    <p className="text-muted-foreground">
                        Create a new blog post for your audience.
                    </p>
                </div>
            </div>

            <ArticleForm categories={categories} />
        </div>
    )
}

export default AddArticlePage