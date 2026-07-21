import { NextResponse } from 'next/server';
import { ORDERS } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({
    success: true,
    total: ORDERS.length,
    data: ORDERS,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newOrder = {
      id: `ord_${Math.random().toString(36).slice(2, 9)}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
      ...body,
    };

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      data: newOrder,
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: 'Invalid payload' },
      { status: 400 }
    );
  }
}
