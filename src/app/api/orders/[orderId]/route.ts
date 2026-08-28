import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { ordersTable, orderItemsTable } from '@/models/Schema';
import { eq } from 'drizzle-orm';
import { isRequestAdminAuthenticated } from '@/utils/AdminAuth';

/**
 * Fetch a single order with its items (admin only).
 */
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ orderId: string }> }
) {
  // Check admin authentication
  if (!isRequestAdminAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const params = await props.params;
    const { orderId } = params;

    // Fetch order
    const [order] = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.orderId, orderId));

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Fetch order items
    const items = await db
      .select()
      .from(orderItemsTable)
      .where(eq(orderItemsTable.orderId, orderId));

    return NextResponse.json({ success: true, order, items });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}
