import prisma from '@/lib/prisma'
import { TCategory } from '@/types/category'
import { ResponseHelper } from '@/lib/api-response'

export async function getCategories() {
    try {
        const categories = await prisma.category.findMany()
        if (!categories) {
            return ResponseHelper.error(null, "Categories not found", 404, []);
        }

        return ResponseHelper.success(categories, "Categories fetched successfully");


    } catch (error) {
        return ResponseHelper.error(error, "Internal Server Error", 500, []);
    }
}

export async function AddCategory(data: TCategory) {
    const categoryData = await data

    try {
        const category = await prisma.category.create({
            data: {
                name: categoryData.name,
            }
        })

        return ResponseHelper.success(category, "Category created successfully", 201);

    } catch (error: any) {
        if (error.code === 'P2002') {
            return ResponseHelper.error(error, 'Category with this name already exists', 409, null);
        }
        return ResponseHelper.error(error, 'Internal Server Error', 500, null);
    }
}