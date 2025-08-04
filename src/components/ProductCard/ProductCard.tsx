// app/components/ProductCard/ProductCard.tsx
"use client";

import Image from "next/image";
import Link from 'next/link';
import { useCart, Product } from "@/context/CartContext"; 
import { titleTranslations } from '@/lib/translations';
import { ShoppingCart } from 'lucide-react'; 

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    addToCart(product);
  };

  const formattedPrice = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const translatedTitle = titleTranslations[product.id] || product.title;

  return (
    <Link 
      href={`/produtos/${product.id}`} 
      className="flex flex-col h-full group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    > 
      <article className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col flex-grow">
        <div className="relative w-full h-60">
          <Image
            src={product.image}
            alt={translatedTitle}
            fill
            style={{ objectFit: 'contain' }}
            className="p-4"
          />
        </div>
        
        <section className="p-4 flex flex-col flex-grow">
          <h3 className="text-md font-semibold text-gray-800 mb-1 h-12 overflow-hidden">
            {translatedTitle}
          </h3>

         
          <p className="text-sm text-blue-600 group-hover:underline mb-4">
            Ver detalhes
          </p>
          
         
          <div className="mt-auto flex justify-between items-center pt-2">
            <p className="text-xl font-bold text-gray-900">
              {formattedPrice}
            </p>
            <button
              onClick={handleAddToCart} 
              className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              aria-label="Adicionar ao carrinho"
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </section>
      </article>
    </Link>
  );
};