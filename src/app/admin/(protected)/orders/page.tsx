import { db } from '@/libs/DB';
import { ordersTable } from '@/models/Schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

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

const statusColors: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-900',
  CONFIRMED: 'bg-amber-100 text-amber-900',
  SHIPPED: 'bg-purple-100 text-purple-900',
  DELIVERED: 'bg-green-100 text-green-900',
  CANCELLED: 'bg-red-100 text-red-900',
};

export default async function AdminOrdersPage() {
  // Fetch all orders sorted by newest first
  const orders = await db.select().from(ordersTable).orderBy(desc(ordersTable.createdAt));

  return (
    <div className="min-h-screen bg-[#f5f1e8] px-5 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl font-semibold text-[#15120e]">Orders</h1>
            <p className="mt-2 text-black/60">Manage House of Sharmeen customer orders</p>
          </div>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="rounded-full border border-[#15120e] px-6 py-2 text-sm font-bold text-[#15120e] transition hover:bg-[#15120e] hover:text-[#efd37f]"
            >
              Logout
            </button>
          </form>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-lg border border-black/10 bg-white p-12 text-center">
            <p className="text-black/60">No orders found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-black/10 bg-white shadow">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/10 bg-[#efe5d3]">
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#15120e]">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#15120e]">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#15120e]">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#15120e]">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#15120e]">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#15120e]">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#15120e]">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`border-b border-black/10 ${index % 2 === 0 ? 'bg-white' : 'bg-[#fafaf8]'}`}
                  >
                    <td className="px-6 py-4 text-sm font-mono font-bold text-[#15120e]">{order.orderId}</td>
                    <td className="px-6 py-4 text-sm text-black/70">{formatDate(order.createdAt)}</td>
                    <td className="px-6 py-4 text-sm font-bold text-[#15120e]">{order.customerName}</td>
                    <td className="px-6 py-4 text-sm text-black/70">{order.phone}</td>
                    <td className="px-6 py-4 text-sm font-bold text-[#15120e]">{formatPrice(order.total)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                          statusColors[order.status] || 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/orders/${order.orderId}`}
                        className="text-sm font-bold text-[#8d671d] underline underline-offset-2 transition hover:text-[#a57b26]"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
