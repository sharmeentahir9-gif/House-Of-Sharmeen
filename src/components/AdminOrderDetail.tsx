'use client';

import { useState } from 'react';

const statusFlow = {
  NEW: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['SHIPPED', 'CANCELLED'],
  SHIPPED: ['DELIVERED', 'CANCELLED'],
  DELIVERED: [],
  CANCELLED: [],
};

const statusColors: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-900',
  CONFIRMED: 'bg-amber-100 text-amber-900',
  SHIPPED: 'bg-purple-100 text-purple-900',
  DELIVERED: 'bg-green-100 text-green-900',
  CANCELLED: 'bg-red-100 text-red-900',
};

export function AdminOrderDetail({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const availableTransitions = (statusFlow as Record<string, string[]>)[status] || [];

  const handleStatusUpdate = async (newStatus: string) => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to update status');
        setLoading(false);
        return;
      }

      setStatus(newStatus);
      setSuccess('Status updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-lg font-semibold text-[#15120e]">Order Status</h3>
        <div className="mt-3">
          <span
            className={`inline-block rounded-full px-4 py-2 text-sm font-bold ${
              statusColors[status] || 'bg-gray-100 text-gray-900'
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      {availableTransitions.length > 0 && (
        <div>
          <h4 className="mb-3 font-bold text-[#15120e]">Update Status</h4>
          <div className="space-y-2">
            {availableTransitions.map((newStatus) => (
              <button
                key={newStatus}
                onClick={() => handleStatusUpdate(newStatus)}
                disabled={loading}
                className={`block w-full rounded-lg px-4 py-2.5 text-sm font-bold text-white transition ${
                  newStatus === 'CANCELLED'
                    ? 'bg-red-600 hover:bg-red-700'
                    : newStatus === 'DELIVERED'
                      ? 'bg-green-600 hover:bg-green-700'
                      : newStatus === 'SHIPPED'
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'bg-[#15120e] hover:bg-[#2d271c]'
                } disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                Mark as {newStatus}
              </button>
            ))}
          </div>
        </div>
      )}

      {status === 'DELIVERED' && (
        <div className="rounded-lg bg-green-50 px-4 py-3">
          <p className="text-sm text-green-900">This order has been delivered. No further updates are available.</p>
        </div>
      )}

      {status === 'CANCELLED' && (
        <div className="rounded-lg bg-red-50 px-4 py-3">
          <p className="text-sm text-red-900">This order has been cancelled. No further updates are available.</p>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-900">{error}</p>
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3">
          <p className="text-sm text-green-900">{success}</p>
        </div>
      )}
    </div>
  );
}
