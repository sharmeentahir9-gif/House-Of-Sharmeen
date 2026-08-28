'use client';

import React from 'react';
import { Link } from '@/libs/I18nNavigation';

const whatsappNumber = '923035124661';

export default function OrderSuccessPage(props: {
  params: Promise<{ orderId: string }>;
}) {
  const params = props.params;
  
  // Use React's use hook to unwrap the promise
  const [orderId, setOrderId] = React.useState<string | null>(null);

  React.useEffect(() => {
    params.then((p) => setOrderId(p.orderId));
  }, [params]);

  if (!orderId) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-24 text-center">
        <p className="text-black/60">Loading...</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-5 py-16 text-center sm:py-24">
      <div className="mb-8">
        <svg className="mx-auto h-16 w-16 text-[#a57b26]" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </div>

      <h1 className="font-serif text-5xl font-semibold">Thank you!</h1>
      <p className="mt-3 text-lg text-black/70">Your order has been placed successfully.</p>

      <div className="mt-10 rounded-lg border border-[#caa454]/35 bg-[#efe5d3] p-6 sm:p-8">
        <p className="text-sm text-black/60">Your Order ID</p>
        <p className="mt-2 font-mono text-2xl font-bold text-[#15120e]">{orderId}</p>
        <p className="mt-4 text-sm text-black/70">
          Please save this Order ID for your records. You will need it to track your order.
        </p>
      </div>

      <div className="mt-8 space-y-3 text-black/70">
        <p>
          <strong>Payment Method:</strong> Cash on Delivery (COD)
        </p>
        <p>
          <strong>Delivery Charge:</strong> Rs. 350
        </p>
        <p className="text-sm">
          You will receive your order within 3-5 business days.
        </p>
      </div>

      <div className="mt-10 space-y-3 sm:flex sm:items-center sm:justify-center sm:gap-3">
        <Link
          href="/"
          className="block rounded-full bg-[#15120e] px-6 py-3 text-sm font-black tracking-wide text-[#efd37f] transition hover:bg-[#2d271c]"
        >
          CONTINUE SHOPPING
        </Link>
        <a
          href={`https://wa.me/${whatsappNumber}?text=Hello%20House%20of%20Sharmeen`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border-2 border-[#15120e] px-6 py-3 text-sm font-bold text-[#15120e] transition hover:bg-[#15120e] hover:text-[#efd37f]"
        >
          NEED HELP?
        </a>
      </div>

      <p className="mt-8 text-xs text-black/50">
        An order confirmation has been sent to your email. If you have any questions, please don't hesitate to contact us.
      </p>
    </section>
  );
}
