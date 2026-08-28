import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { ordersTable } from '@/models/Schema';
import { eq } from 'drizzle-orm';
import { isRequestAdminAuthenticated } from '@/utils/AdminAuth';
import { logger } from '@/libs/Logger';
import * as z from 'zod';

const updateStatusSchema = z.object({
  status: z.enum(['NEW', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
});

/**
 * Update order status (admin only).
 */
export async function PATCH(
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
    const body = await request.json();

    // Validate status
    const validation = updateStatusSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const { status } = validation.data;

    // Find and update the order
    const [updatedOrder] = await db
      .update(ordersTable)
      .set({ status })
      .where(eq(ordersTable.orderId, orderId))
      .returning();

    if (!updatedOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    logger.info(`Order ${orderId} status updated to ${status}`);

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    logger.error(`Error updating order status: ${error instanceof Error ? error.message : String(error)}`);
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
  }
}
