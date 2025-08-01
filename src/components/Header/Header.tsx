"use client";

import { useCart } from "@/context/CartContext";
import { Menu } from 'lucide-react'; 

export const Header = () => {
  // aqui eu estou usando o contexto do carrinho para pegar a função de toggleSidebar
  const { toggleSidebar } = useCart();

  return (
    // eu criei esse component para responsividade 
    // O header será HIDDEN (escondido) em telas "md" (médias) ou maiores.
    // Ou seja, ele SÓ APARECE em telas pequenas (mobile).
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between md:hidden sticky top-0 z-30">
      <h1 className="text-xl font-bold">
        <a href="/">Connect Store</a>
      </h1>
      <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-700">
        <Menu size={24} />
      </button>
    </header>
  );
};