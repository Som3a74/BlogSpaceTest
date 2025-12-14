import { NextRequest, NextResponse } from 'next/server'
import { getArticleById } from '@/lib/data/articles'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const result = await getArticleById(id);
    return NextResponse.json(result, { status: result.status });
}