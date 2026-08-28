'use client';

import Image from 'next/image';
import { Link } from '@/libs/I18nNavigation';
import { useCart } from '@/components/CartProvider';

const formatPrice = (value: number) => `Rs. ${value.toLocaleString('en-PK')}`;

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
      <p className="text-xs font-bold tracking-[0.3em] text-[#a57b26] uppercase">Your selection</p>
      <h1 className="mt-3 font-serif text-5xl font-semibold">Shopping cart</h1>
      {items.length === 0 ? (
        <div className="mt-12 border-t border-black/10 py-12 text-center">
          <p className="font-serif text-3xl">Your cart is empty.</p>
          <Link href="/" className="mt-7 inline-flex rounded-full bg-[#15120e] px-6 py-3.5 text-sm font-bold text-[#efd37f]">Continue Shopping</Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="divide-y divide-black/10 border-y border-black/10">
            {items.map((item) => (
              <div key={item.id} className="grid gap-5 py-6 sm:grid-cols-[120px_1fr_auto] sm:items-center">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#efe8db]"><Image src={item.image} alt={item.name} fill sizes="120px" className="object-cover" /></div>
                <div>
                  <h2 className="font-serif text-2xl font-semibold">{item.name}</h2>
                  <p className="mt-1 text-sm text-black/50">{item.size}</p>
                  <p className="mt-3 font-bold text-[#8d671d]">{formatPrice(item.price)}</p>
                </div>
                <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
                  <div className="flex items-center border border-black/15">
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-9 w-9 text-lg" aria-label="Decrease quantity">-</button>
                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-9 w-9 text-lg" aria-label="Increase quantity">+</button>
                  </div>
                  <button type="button" onClick={() => removeItem(item.id)} className="text-xs font-bold tracking-wide text-black/50 underline underline-offset-4 hover:text-[#8d671d]">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <aside className="h-fit border border-[#caa454]/35 bg-[#efe5d3] p-6 sm:p-8">
            <h2 className="font-serif text-3xl font-semibold">Order total</h2>
            <div className="mt-7 flex justify-between border-t border-black/10 pt-5 text-lg font-black"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <p className="mt-3 text-sm text-black/55">Cash on Delivery across Pakistan.</p>
            <Link href="/checkout" className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#15120e] px-5 py-3.5 text-sm font-bold text-[#efd37f]">Proceed to Checkout</Link>
            <Link href="/" className="mt-4 inline-flex w-full items-center justify-center text-sm font-bold text-[#8d671d] underline underline-offset-4">Continue Shopping</Link>
          </aside>
        </div>
      )}
    </section>
  );
}
