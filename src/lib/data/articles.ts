import prisma from '@/lib/prisma'
import { ResponseHelper } from '@/lib/api-response'
import { TArticle } from '@/types/article'

export async function getArticles(options?: {
    query?: string;
    category?: string;
    page?: number;
    limit?: number;
    sort?: 'latest' | 'most-viewed' | 'oldest',
    authorId?: string
}) {
    try {
        const { query, category, page = 1, limit = 9, sort, authorId } = options || {};
        const skip = (page - 1) * limit;

        const where: any = { published: true };

        // Sorting logic
        let orderBy: any = { createdAt: 'desc' }; // Default to latest
        if (sort === 'most-viewed') {
            orderBy = { views: 'desc' };
        } else if (sort === 'oldest') {
            orderBy = { createdAt: 'asc' };
        }

        if (query) {
            where.OR = [
                { title: { contains: query, mode: 'insensitive' } },
                { proTip: { contains: query, mode: 'insensitive' } },
            ]
        }

        if (category) {
            where.categoryId = parseInt(category);
        }

        if (authorId) {
            where.userId = authorId;
        }

        const [articles, total] = await prisma.$transaction([
            prisma.article.findMany({
                where,
                include: {
                    user: { select: { id: true, name: true, image: true } },
                    category: { select: { id: true, name: true } }
                },
                orderBy,
                skip,
                take: limit,
            }),
            prisma.article.count({ where })
        ]);

        const totalPages = Math.ceil(total / limit);

        return ResponseHelper.success({
            articles,
            metadata: {
                total,
                page,
                totalPages,
                limit
            }
        }, "Articles fetched successfully");

    } catch (error) {
        return ResponseHelper.error(error, 'Internal Server Error', 500, { articles: [], metadata: { total: 0, page: 1, totalPages: 0, limit: 9 } });
    }
}

export async function getArticleBySlug(slug: string) {
    try {
        const article = await prisma.article.findUnique({
            where: { slug: slug },
            include: {
                user: { select: { id: true, name: true, image: true } },
                category: { select: { id: true, name: true } }
            }
        });

        if (!article) {
            return ResponseHelper.error(null, `Article ${slug} Not Found`, 404, null);
        }

        return ResponseHelper.success(article);

    } catch (error) {
        return ResponseHelper.error(error, "Internal Server Error", 500, null);
    }
}

export async function getArticleById(id: string) {
    try {
        const article = await prisma.article.findUnique({
            where: { id: Number(id) },
            include: {
                user: { select: { id: true, name: true, image: true } },
                category: { select: { id: true, name: true } }
            }
        });

        if (!article) {
            return ResponseHelper.error(null, `Article ${id} Not Found`, 404, null);
        }

        return ResponseHelper.success(article);

    } catch (error) {
        return ResponseHelper.error(error, "Internal Server Error", 500, null);
    }
}

export async function addArticle(data: TArticle) {
    try {
        const payload = await data;
        const categoryId = Number(payload.categoryId);

        if (!categoryId || isNaN(categoryId)) {
            return ResponseHelper.error(null, "Invalid or missing Category ID", 400, null);
        }

        const article = await prisma.article.create({
            data: {
                title: payload.title,
                slug: payload.slug,
                content: payload.content,
                proTip: payload.proTip,
                published: payload.published,
                image: payload.image,
                categoryId: categoryId,
                userId: payload.userId,
                createdAt: payload.createdAt,
                updatedAt: payload.updatedAt
            }
        })

        return ResponseHelper.success(article, "Article created successfully", 201);

    } catch (error) {
        return ResponseHelper.error(error, 'Internal Server Error', 500, null);
    }
}

export async function getArticlesByUserId(userId: string) {
    try {
        const articles = await prisma.article.findMany({
            where: { userId: userId },
            include: {
                category: { select: { id: true, name: true } }
            },
            orderBy: { createdAt: 'desc' }
        })

        return ResponseHelper.success(articles, "Articles fetched successfully");

    } catch (error) {
        return ResponseHelper.error(error, 'Internal Server Error', 500, []);
    }
}

export async function deleteArticle(id: number) {
    try {
        await prisma.$transaction([
            prisma.comment.deleteMany({ where: { articleId: id } }),
            prisma.like.deleteMany({ where: { articleId: id } }),
            prisma.savedArticle.deleteMany({ where: { articleId: id } }),
            prisma.article.delete({ where: { id } })
        ])
        return ResponseHelper.success(null, "Article deleted successfully");
    } catch (error) {
        return ResponseHelper.error(error, 'Internal Server Error', 500, null);
    }
}

export async function updateArticle(id: number, data: Partial<TArticle>) {
    try {
        const payload = await data;
        const categoryId = payload.categoryId ? Number(payload.categoryId) : undefined;

        const article = await prisma.article.update({
            where: { id },
            data: {
                title: payload.title,
                slug: payload.slug,
                content: payload.content,
                proTip: payload.proTip,
                published: payload.published,
                image: payload.image,
                categoryId: categoryId,
                updatedAt: new Date()
            }
        })

        return ResponseHelper.success(article, "Article updated successfully");

    } catch (error) {
        return ResponseHelper.error(error, 'Internal Server Error', 500, null);
    }
}