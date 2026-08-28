import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { ordersTable, orderItemsTable } from '@/models/Schema';
import { logger } from '@/libs/Logger';
import * as z from 'zod';

const createOrderSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  notes: z.string().optional().default(''),
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      size: z.string().optional(),
      price: z.number().positive(),
      image: z.string(),
      quantity: z.number().int().positive(),
    })
  ).min(1, 'Cart must have at least one item'),
  subtotal: z.number().positive(),
});

/**
 * Generate a unique order ID.
 */
function generateOrderId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

/**
 * Create a new order and save it to the database.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request data
    const validation = createOrderSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validation.error.issues },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Validate subtotal matches sum of items
    const calculatedSubtotal = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (Math.abs(calculatedSubtotal - data.subtotal) > 0.01) {
      logger.warn(`Subtotal mismatch: client=${data.subtotal}, calculated=${calculatedSubtotal}`);
      return NextResponse.json(
        { error: 'Subtotal validation failed' },
        { status: 400 }
      );
    }

    const deliveryCharge = 350; // Rs. 350 fixed delivery charge
    const total = calculatedSubtotal + deliveryCharge;
    const orderId = generateOrderId();

    // Insert order into database
    await db.insert(ordersTable).values({
      orderId,
      customerName: data.customerName,
      phone: data.phone,
      address: data.address,
      city: data.city,
      notes: data.notes || null,
      subtotal: calculatedSubtotal.toString(),
      deliveryCharge: deliveryCharge.toString(),
      total: total.toString(),
      paymentMethod: 'COD',
      status: 'NEW',
    });

    // Insert order items into database
    const orderItems = data.items.map((item) => ({
      orderId,
      productName: item.name,
      productSize: item.size || null,
      productImage: item.image,
      price: item.price.toString(),
      quantity: item.quantity,
      lineTotal: (item.price * item.quantity).toString(),
    }));

    await db.insert(orderItemsTable).values(orderItems);

    logger.info(`Order created: ${orderId}`);

    return NextResponse.json(
      {
        success: true,
        orderId,
        message: 'Order placed successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    logger.error(`Error creating order: ${error instanceof Error ? error.message : String(error)}`);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
