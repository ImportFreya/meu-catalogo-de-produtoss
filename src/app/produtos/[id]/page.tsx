"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useCart, Product } from '@/context/CartContext';
import toast from 'react-hot-toast';
import { 
  titleTranslations, 
  descriptionTranslations, 
  categoryTranslations 
} from '@/lib/translations';
import { ProductDetailSkeleton } from '@/components/ProductCardSkeleton/ProductDetailSkeleton';

// eu fiz esse componente para exibir os detalhes de um produto específico, onde o usuário pode ver as informações do produto e adicionar ao carrinho

export default function ProductDetailPage() {
  const { id } = useParams(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const response = await fetch(`https://fakestoreapi.com/products/${id}`);
          if (!response.ok) throw new Error("Produto não encontrado");
          const data: Product = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Falha ao buscar o produto:", error);
          toast.error("Não foi possível carregar os detalhes do produto.");
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (loading) {
   return <ProductDetailSkeleton />;;
  }

  if (!product) {
    return <p className="text-center mt-12">Produto não encontrado.</p>;
  }

  const translatedTitle = titleTranslations[product.id] || product.title;
  const translatedDescription = descriptionTranslations[product.id] || product.description;
  const translatedCategory = categoryTranslations[product.category] || product.category;

  return (
    <div className="bg-white p-6 md:p-12 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="relative h-96 w-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            style={{ objectFit: 'contain' }}
            className="rounded-lg"
          />
        </div>

        <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{translatedTitle}</h1>
          <p className="text-gray-500 mb-4 capitalize">{translatedCategory}</p>
          <p className="text-gray-700 leading-relaxed mb-6">{translatedDescription}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-4xl font-extrabold text-gray-900">
              {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}