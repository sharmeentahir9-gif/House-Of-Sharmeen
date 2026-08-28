'use client';

import { useState } from 'react';
import { useCart, type CartProduct } from './CartProvider';

export default function AddToCartButton(props: { product: CartProduct; label: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        addItem(props.product);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
      className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-[#b58b33] bg-[#15120e] px-5 py-3 text-sm font-bold text-[#f1d77f] transition hover:bg-[#2a2419]"
    >
      {added ? 'Added to cart' : props.label}
    </button>
  );
}
