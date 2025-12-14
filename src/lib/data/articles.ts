import prisma from '@/lib/prisma'

export async function getArticles() {
    try {
        const articles = await prisma.article.findMany({
            include: {
                user: { select: { id: true, name: true } },
                category: { select: { id: true, name: true } }
            }
        })

        type ArticleType = (typeof articles)[number]

        const formattedArticles = articles.map((article: ArticleType) => {
            const { introduction, proTip, conclusion, ...rest } = article

            return {
                ...rest,
                content: {
                    introduction,
                    proTip,
                    conclusion
                }
            }
        })

        return {
            data: formattedArticles,
            status: 200,
            success: true,
            message: "Articles fetched successfully",
        }

    } catch (error) {
        return {
            success: false,
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : error,
            data: [], // Ensure data is always an array to prevent crashes
            status: 500
        }
    }
}

export async function getArticleById(id: string) {
    try {
        const article = await prisma.article.findUnique({
            where: { id: Number(id) },
            include: {
                user: { select: { id: true, name: true } },
                category: { select: { id: true, name: true } }
            }
        });

        if (!article) {
            return {
                success: false,
                message: `Article ${id} Not Found`,
                status: 404,
                data: null
            };
        }

        const content = {
            Introduction: article.introduction,
            ProTip: article.proTip,
            Conclusion: article.conclusion,
        };

        return {
            success: true,
            data: { ...article, content },
            status: 200
        };

    } catch (error) {
        return {
            success: false,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error,
            status: 500,
            data: null
        };
    }
}

export async function addArticle(data: any) {
    try {
        const payload = await data;
        const categoryId = Number(payload.categoryId);
        const userId = Number(payload.userId) || 1;

        if (!categoryId || isNaN(categoryId)) {
            return {
                success: false,
                message: "Invalid or missing Category ID",
                status: 400,
                data: null
            };
        }

        const article = await prisma.article.create({
            data: {
                title: payload.title,
                introduction: payload.introduction,
                proTip: payload.proTip,
                conclusion: payload.conclusion,
                published: payload.published,
                image: payload.image,
                categoryId: categoryId,
                userId: userId,
                createdAt: payload.createdAt,
                updatedAt: payload.updatedAt
            }
        })

        return {
            success: true,
            data: article,
            message: "Article created successfully",
            status: 201
        }

    } catch (error) {
        return {
            success: false,
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : error,
            status: 500,
            data: null
        }
    }
}
