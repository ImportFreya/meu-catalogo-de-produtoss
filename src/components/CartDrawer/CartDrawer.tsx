"use client";

import { useCart } from "@/context/CartContext"; 
import { X, Trash2 } from "lucide-react";
import Image from "next/image";

export const CartDrawer = () => {
  // aqui eu estou usando tudo que fiz no context de tudo que precisamos do nosso contexto do carrinho
  const { isCartOpen, closeCart, cartItems, removeFromCart, clearCart } = useCart();

  // aqui calculamos o valor total dos itens no carrinho
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    // aqui eu usei para quando clicar no carrinho vai pro outro lado para ficar visualmente bonito e ainda conseguir ver os produtos.
    // eu usei transform e transition para o efeito de deslizar.
    // a classe muda com base no estado `isCartOpen`.
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      } w-full max-w-md flex flex-col`}
    >
    
      <header className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold">Seu Carrinho</h2>
        <button onClick={closeCart} className="p-1 rounded-full hover:bg-gray-200">
          <X size={24} />
        </button>
      </header>

    
      <div className="flex-grow overflow-y-auto p-4">
        {cartItems.length === 0 ? (
         
          <p className="text-center text-gray-500 mt-10">Seu carrinho está vazio.</p>
        ) : (
         
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <Image src={item.image} alt={item.title} width={64} height={64} className="border rounded-md p-1 object-contain" />
                <div className="flex-grow">
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} x R$ {item.price.toFixed(2)}
                  </p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 p-1 cursor-pointer">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

     
      {cartItems.length > 0 && (
        <footer className="p-4 border-t bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-xl font-bold">R$ {total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
            Finalizar Compra
          </button>
          <button onClick={clearCart} className="w-full mt-2 text-sm text-gray-500 hover:text-red-500 cursor-pointer">
            Limpar carrinho
          </button>
        </footer>
      )}
    </div>
  );
};