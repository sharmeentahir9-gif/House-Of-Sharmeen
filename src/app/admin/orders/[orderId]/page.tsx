import { db } from '@/libs/DB';
import { ordersTable, orderItemsTable } from '@/models/Schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import Image from 'next/image';
import { AdminOrderDetail } from '@/components/AdminOrderDetail';
import { redirect } from 'next/navigation';

const formatPrice = (value: string | number) => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return `Rs. ${num.toLocaleString('en-PK')}`;
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default async function AdminOrderDetailPage(props: {
  params: Promise<{ orderId: string }>;
}) {
  const params = await props.params;
  const { orderId } = params;

  // Fetch order
  const [order] = await db
    .select()
    .from(ordersTable)
    .where(eq(ordersTable.orderId, orderId));

  if (!order) {
    redirect('/admin/orders');
  }

  // Fetch order items
  const items = await db
    .select()
    .from(orderItemsTable)
    .where(eq(orderItemsTable.orderId, orderId));

  return (
    <div className="min-h-screen bg-[#f5f1e8] px-5 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/admin/orders" className="mb-6 inline-flex text-sm font-bold text-[#8d671d] underline underline-offset-2 transition hover:text-[#a57b26]">
          ← Back to Orders
        </Link>

        <div className="rounded-lg border border-black/10 bg-white p-6 sm:p-8 shadow">
          <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
            {/* Main Order Details */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <h1 className="font-serif text-3xl font-semibold text-[#15120e]">{order.orderId}</h1>
                <p className="mt-2 text-sm text-black/60">{formatDate(order.createdAt)}</p>
              </div>

              {/* Customer Information */}
              <div className="border-t border-black/10 pt-6">
                <h2 className="font-serif text-xl font-semibold text-[#15120e]">Customer Information</h2>
                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <p className="text-black/60">Name</p>
                    <p className="font-bold text-[#15120e]">{order.customerName}</p>
                  </div>
                  <div>
                    <p className="text-black/60">Phone</p>
                    <p className="font-bold text-[#15120e]">{order.phone}</p>
                  </div>
                  <div>
                    <p className="text-black/60">Address</p>
                    <p className="font-bold text-[#15120e]">{order.address}</p>
                  </div>
                  <div>
                    <p className="text-black/60">City</p>
                    <p className="font-bold text-[#15120e]">{order.city}</p>
                  </div>
                  {order.notes && (
                    <div>
                      <p className="text-black/60">Notes</p>
                      <p className="font-bold text-[#15120e]">{order.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t border-black/10 pt-6">
                <h2 className="font-serif text-xl font-semibold text-[#15120e]">Order Items</h2>
                <div className="mt-4 divide-y divide-black/10 border-y border-black/10">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4">
                      {item.productImage && (
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-bold text-[#15120e]">{item.productName}</p>
                        {item.productSize && (
                          <p className="text-sm text-black/60">Size: {item.productSize}</p>
                        )}
                        <p className="text-sm text-black/60">
                          Qty {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#15120e]">{formatPrice(item.lineTotal)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t border-black/10 pt-6">
                <h2 className="font-serif text-xl font-semibold text-[#15120e]">Order Summary</h2>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-black/60">Subtotal</span>
                    <span className="font-bold text-[#15120e]">{formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/60">Delivery Charges</span>
                    <span className="font-bold text-[#15120e]">{formatPrice(order.deliveryCharge)}</span>
                  </div>
                  <div className="border-t border-black/10 pt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-[#15120e]">Grand Total</span>
                      <span className="text-lg font-bold text-[#15120e]">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                  <div className="pt-3">
                    <p className="text-black/60">Payment Method: <strong>{order.paymentMethod}</strong></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Status Update */}
            <div className="h-fit rounded-lg border border-[#caa454]/35 bg-[#efe5d3] p-6">
              <AdminOrderDetail orderId={order.orderId} currentStatus={order.status} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
