"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart, Product } from '@/context/CartContext';
import toast from 'react-hot-toast';
import {
  titleTranslations,
  descriptionTranslations,
  categoryTranslations
} from '@/lib/translations';
import { ProductDetailSkeleton } from '@/components/ProductCardSkeleton/ProductDetailSkeleton';

import { ArrowLeft } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();

  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | null>('M');
  const availableSizes = ['P', 'M', 'G', 'GG'];

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
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return <p className="text-center mt-12">Produto não encontrado.</p>;
  }

  const translatedTitle = titleTranslations[product.id] || product.title;
  const translatedDescription = descriptionTranslations[product.id] || product.description;
  const translatedCategory = categoryTranslations[product.category] || product.category;

  const handleAddToCartClick = () => {
    if (!selectedSize) {
      alert("Por favor, selecione um tamanho.");
      return;
    }
    addToCart(product);
  }

  
  const showSizeAndColorSelectors =
    product.category === "men's clothing" || product.category === "women's clothing";

  return (

    <div className="bg-white p-6 md:p-12 rounded-lg shadow-lg relative">


      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
        aria-label="Voltar para a lista de produtos"
      >
        <ArrowLeft size={20} />
        <span className="font-semibold hidden sm:inline cursor-pointer">Voltar</span>
      </button>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-12 md:mt-0">
        <div className="relative h-96 w-full">
          <Image
            src={product.image}
            alt={translatedTitle}
            fill
            style={{ objectFit: 'contain' }}
            className="rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-gray-500 mb-2 capitalize">{translatedCategory}</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{translatedTitle}</h1>
          <p className="text-gray-700 leading-relaxed mb-6">{translatedDescription}</p>

          {showSizeAndColorSelectors && (
            <>
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-800 mb-2">Cor</h3>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-gray-800 border-2 border-blue-500 cursor-pointer" aria-label="Cor preto"></button>
                  <button className="w-8 h-8 rounded-full bg-gray-300 border-2 border-transparent cursor-pointer" aria-label="Cor cinza"></button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-800 mb-2">Tamanho</h3>
                <div className="flex gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                    w-12 h-12 rounded-md border flex items-center justify-center
                    font-semibold transition-colors cursor-pointer
                    ${selectedSize === size
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-800 border-gray-300 hover:border-gray-500'}
                  `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="mt-auto flex flex-col md:flex-row gap-4 items-center">
            <span className="text-4xl font-extrabold text-gray-900">
              {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            <button
              onClick={handleAddToCartClick}
              className="bg-gray-900 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors w-full md:w-auto cursor-pointer"
            >
              Adicionar à sacola
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}