import prisma from '@/lib/prisma'

export async function getCategories() {
    try {
        const categories = await prisma.category.findMany()
        if (!categories) {
            return {
                message: "Categories not found",
                status: 404,
                success: false,
                data: []
            }
        }

        return {
            data: categories,
            message: "Categories fetched successfully",
            status: 200,
            success: true,
        }


    } catch (error) {
        return {
            message: "Failed to fetch categories",
            error: error instanceof Error ? error.message : error,
            status: 500,
            success: false,
            data: []
        }
    }
}
