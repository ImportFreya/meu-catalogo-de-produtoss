// app/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { Product } from '@/context/CartContext';
import { CategoryFilters } from '../components/CategoryFilters/CategoryFilters'; // Eu quis criar esse novo componente CategoryFilters para filtrar os produtos por categoria e ficar mais bonitinho visualmente.

export default function HomePage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // aqui puxamos as categorias da API quando o componente é montado
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

  // então Edson aqui é onde buscamos os produtos, agora com a lógica de categoria
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      // URL dinâmica: se uma categoria for selecionada, busca por ela. Senão, busca todos.
      const url = selectedCategory
        ? `https://fakestoreapi.com/products/category/${selectedCategory}`
        : 'https://fakestoreapi.com/products';

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Falha ao buscar os produtos.');
        }
        const data: Product[] = await response.json();
        setAllProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocorreu um erro inesperado.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]); // Dependência: re-executa quando `selectedCategory` muda

  // Filtro de busca por nome continua funcionando sobre a lista de produtos atual
  const filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
  if (error) 


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
          <p className="col-span-full text-center">Carregando...</p>
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