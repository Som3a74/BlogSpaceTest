import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getArticles } from '@/lib/data/articles'

// GET /api/article
export async function GET(request: NextRequest) {
    const result = await getArticles();
    return NextResponse.json(result, { status: result.status });
}