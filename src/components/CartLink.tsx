'use client';

import Link from 'next/link';
import { useCart } from './CartProvider';

export default function CartLink(props: { label: string }) {
  const { itemCount } = useCart();
  return (
    <Link href="/cart" className="relative rounded-full border border-[#c79a3a]/45 bg-[#c79a3a]/12 px-3 py-2 text-[#f0d47b] transition hover:bg-[#c79a3a]/22 sm:px-4" aria-label={`${props.label} (${itemCount})`}>
      {props.label}
      <span className="ml-1.5 inline-flex min-w-5 items-center justify-center rounded-full bg-[#efd17d] px-1.5 text-[10px] font-black text-[#15110b]">{itemCount}</span>
    </Link>
  );
}
