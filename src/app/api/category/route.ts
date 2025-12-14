import { NextRequest, NextResponse } from 'next/server'
import { getCategories } from '@/lib/data/categories'

export async function GET(request: NextRequest) {
    const result = await getCategories();
    return NextResponse.json(result, { status: result.status });
}