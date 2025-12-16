import prisma from '@/lib/prisma'
import { ResponseHelper } from '@/lib/api-response'
import { TArticle } from '@/types/article'

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

        return ResponseHelper.success(formattedArticles, "Articles fetched successfully");

    } catch (error) {
        return ResponseHelper.error(error, 'Internal Server Error', 500, []);
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
            return ResponseHelper.error(null, `Article ${id} Not Found`, 404, null);
        }

        const content = {
            Introduction: article.introduction,
            ProTip: article.proTip,
            Conclusion: article.conclusion,
        };

        return ResponseHelper.success({ ...article, content });

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
                introduction: payload.introduction,
                proTip: payload.proTip,
                conclusion: payload.conclusion,
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