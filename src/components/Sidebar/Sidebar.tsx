// components/Sidebar/Sidebar.tsx
"use client";

import { ShoppingCart, Home, Info } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export const Sidebar = () => {
  const { cartItems, openCart, isSidebarOpen, toggleSidebar } = useCart();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <aside
      className={`
        bg-gray-800 text-white w-64 h-screen p-4 flex flex-col
        fixed top-0 left-0 z-50
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}
    >
      <div className="text-2xl font-bold mb-10">
      <Link href="/" onClick={isSidebarOpen ? toggleSidebar : undefined}>Connect Store</Link>
      </div>
      <nav className="flex flex-col space-y-4">
          <Link href="/" onClick={isSidebarOpen ? toggleSidebar : undefined} className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors">
          <Home className="mr-3" />
          Início
        </Link>
        <button
          onClick={openCart}
          className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors relative"
        >
          <ShoppingCart className="mr-3" />
          Carrinho
          {totalItems > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
          
          <Link href="/sobre" onClick={isSidebarOpen ? toggleSidebar : undefined} className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors">
          <Info className="mr-3" />
          Sobre nós
        </Link>
      </nav>
    </aside>
  );
};