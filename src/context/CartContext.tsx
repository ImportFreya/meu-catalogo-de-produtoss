
"use client";

import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import toast from 'react-hot-toast'; 

// Eu usei o context para gerenciar o estado do carrinho de compras, onde vai me ajudar a ter o controle e usar sebre esse component
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  isSidebarOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleSidebar: () => void;
}

export const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }
  }, []);

  useEffect(() =>{
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

    }
    else {
      localStorage.removeItem('cartItems');
    }
  } , [cartItems]);
  
  // essa logica aqui é para adicionar um produto ao carrinho
  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...product, quantity: 1 }];
    });
    toast.success(`${product.title} adicionado ao carrinho!`);
  };

  // e aqui é para remover o produto do carrinho 
  const removeFromCart = (productId: number) => {
  
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast.error("Item removido do carrinho."); 
  };

  const clearCart = () => {
    setCartItems([]);
    toast.error("Carrinho esvaziado."); 
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(prevState => !prevState);

  const value = {
    cartItems,
    isCartOpen,
    isSidebarOpen,
    addToCart,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
    toggleSidebar,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};