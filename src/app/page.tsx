"use client";

import { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { CategoryFilters } from '../components/CategoryFilters/CategoryFilters'; // aqui eu quis criar um componente para os filtros de categoria, pra deixar mais limpo e orgarnizado por tipo se for roupa, eletronicos, etc
import { Product } from '@/context/CartContext';

import { ProductCardSkeleton } from '../components/ProductCardSkeleton/ProductCardSkeleton';

export default function HomePage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data: string[] = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Falha ao buscar categorias", err);
      }
    };
    fetchCategories();
  }, []);
  // Busca os produtos com base na categoria selecionada ou todos os produtos se nenhuma categoria for selecionada

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      const url = selectedCategory
        ? `https://fakestoreapi.com/products/category/${selectedCategory}`
        : 'https://fakestoreapi.com/products';

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Falha ao buscar os produtos.');
        const data: Product[] = await response.json();
        setAllProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocorreu um erro inesperado.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  // Filtra os produtos com base no termo de pesquisa
  const filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar produto pelo nome..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-8">
        <CategoryFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : error ? (
          <p className="col-span-full text-center mt-8 text-red-500">{error}</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center">Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
}