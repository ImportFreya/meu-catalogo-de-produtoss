
"use client";

import { useCart } from "@/context/CartContext";
import { Menu, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export const Header = () => {
  const { toggleSidebar, openCart, cartItems } = useCart();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    // eu criei esse component para responsividade 
    // O header será HIDDEN (escondido) em telas "md" (médias) ou maiores.
    // Ou seja, ele SÓ APARECE em telas pequenas (mobile).

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between md:hidden sticky top-0 z-30">
      <h1 className="text-xl font-bold">
        <Link href="/">Connect Store</Link>
      </h1>
      <div className="flex items-center gap-2">
        <button onClick={openCart} className="p-2 rounded-md hover:bg-gray-700 relative">
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
        <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-700">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};