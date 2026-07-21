import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let filtered = PRODUCTS;
  if (category && category !== 'all') {
    filtered = PRODUCTS.filter((p) => p.category === category);
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    data: filtered,
  });
}
