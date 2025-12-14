import { NextRequest, NextResponse } from 'next/server'
import { getArticles, addArticle } from '@/lib/data/articles'

// GET /api/article
export async function GET(request: NextRequest) {
    const result = await getArticles();
    return NextResponse.json(result, { status: result.status });
}

// POST /api/article
export async function POST(request: NextRequest) {
    const body = await request.json();
    const result = await addArticle(body);
    return NextResponse.json(result, { status: result.status });
}
