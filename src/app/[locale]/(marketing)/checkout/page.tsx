'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/libs/I18nNavigation';
import { useCart } from '@/components/CartProvider';

const whatsappNumber = '923035124661';
const formatPrice = (value: number) => `Rs. ${value.toLocaleString('en-PK')}`;

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const placeOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const phone = String(form.get('phone') ?? '').trim();
    const address = String(form.get('address') ?? '').trim();
    const city = String(form.get('city') ?? '').trim();
    const notes = String(form.get('notes') ?? '').trim();
    if (!name || !phone || !address || !city) {
      setError('Please complete your name, phone, address and city.');
      return;
    }
    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    const products = items.map((item) => `${item.name} (${item.size}) x ${item.quantity} - ${formatPrice(item.price * item.quantity)}`).join('\n');
    const message = [`House of Sharmeen Order`, ``, `Customer name: ${name}`, `Phone: ${phone}`, `Address: ${address}`, `City: ${city}`, ``, `Products:`, products, ``, `Total: ${formatPrice(subtotal)}`, `Payment: COD`, `Notes: ${notes || 'None'}`].join('\n');
    window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    setSubmitted(true);
  };

  if (submitted) return <section className="mx-auto max-w-2xl px-5 py-24 text-center"><h1 className="font-serif text-5xl font-semibold">Order prepared</h1><p className="mt-5 text-black/60">Your WhatsApp order message is ready.</p></section>;
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
      <p className="text-xs font-bold tracking-[0.3em] text-[#a57b26] uppercase">Secure order details</p>
      <h1 className="mt-3 font-serif text-5xl font-semibold">Checkout</h1>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_390px]">
        <form onSubmit={placeOrder} className="space-y-5">
          <label className="block text-sm font-bold">Full Name<input name="name" required className="mt-2 w-full border border-black/15 bg-white px-4 py-3.5 font-normal outline-none focus:border-[#b58b33]" /></label>
          <label className="block text-sm font-bold">Mobile / WhatsApp Number<input name="phone" type="tel" required className="mt-2 w-full border border-black/15 bg-white px-4 py-3.5 font-normal outline-none focus:border-[#b58b33]" /></label>
          <label className="block text-sm font-bold">Full Delivery Address<textarea name="address" required rows={3} className="mt-2 w-full border border-black/15 bg-white px-4 py-3.5 font-normal outline-none focus:border-[#b58b33]" /></label>
          <label className="block text-sm font-bold">City<input name="city" required className="mt-2 w-full border border-black/15 bg-white px-4 py-3.5 font-normal outline-none focus:border-[#b58b33]" /></label>
          <label className="block text-sm font-bold">Optional Order Notes<textarea name="notes" rows={3} className="mt-2 w-full border border-black/15 bg-white px-4 py-3.5 font-normal outline-none focus:border-[#b58b33]" /></label>
          {error && <p role="alert" className="border border-red-900/20 bg-red-50 px-4 py-3 text-sm text-red-900">{error}</p>}
          <button type="submit" className="w-full rounded-full bg-[#15120e] px-6 py-4 text-sm font-black tracking-wide text-[#efd37f] transition hover:bg-[#2d271c]">PLACE ORDER</button>
        </form>
        <aside className="h-fit border border-[#caa454]/35 bg-[#efe5d3] p-6 sm:p-8">
          <h2 className="font-serif text-3xl font-semibold">Order Summary</h2>
          <div className="mt-6 divide-y divide-black/10 border-y border-black/10">
            {items.map((item) => <div key={item.id} className="flex gap-3 py-4"><div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg"><Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" /></div><div className="min-w-0 text-sm"><p className="font-bold">{item.name}</p><p className="text-black/55">Qty {item.quantity} • {formatPrice(item.price * item.quantity)}</p></div></div>)}
          </div>
          <div className="mt-5 flex justify-between text-lg font-black"><span>Total</span><span>{formatPrice(subtotal)}</span></div>
          <p className="mt-4 text-sm text-black/60">Payment method: <strong>Cash on Delivery (COD)</strong></p>
          <Link href="/cart" className="mt-6 inline-flex text-sm font-bold text-[#8d671d] underline underline-offset-4">Back to cart</Link>
        </aside>
      </div>
    </section>
  );
}
