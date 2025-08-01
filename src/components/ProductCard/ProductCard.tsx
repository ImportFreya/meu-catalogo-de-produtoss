"use client";

import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext"; 


interface Product {
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

//aqui define o tipo das props que o componente ProductCard vai receber
interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  // aqui eu estou usando o contexto do carrinho que criamos anteriormente
  const { addToCart } = useContext(CartContext);


  const formattedPrice = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    // aqui eu criei o componente ProductCard que recebe um produto e exibe suas informações
    <article className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col group">
   
      <div className="relative w-full h-60">
        <Image
          src={product.image}
          alt={`Imagem do produto ${product.title}`}
          fill
          style={{ objectFit: 'contain' }} // 'contain' evita que a imagem seja cortada
          className="p-4 group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </div>

      
      <section className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-semibold text-gray-800 mb-2 h-12 overflow-hidden">
          {product.title}
        </h3>
        <p className="text-xl font-bold text-gray-900 mb-4">
          {formattedPrice}
        </p>

        
        <div className="mt-auto">
          <button
            
            onClick={() => addToCart(product)} 
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors cursor-pointer"
            
          >
            Adicionar ao carrinho
          </button>
        </div>
      </section>
    </article>
  );
};