"use client";
import { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { CategoryFilters } from '../components/CategoryFilters/CategoryFilters'; // aqui eu quis criar um componente para os filtros de categoria, pra deixar mais limpo e orgarnizado por tipo se for roupa, eletronicos, etc
import { Product } from '@/context/CartContext';
import { Search } from 'lucide-react';
import { ProductCardSkeleton } from '../components/ProductCardSkeleton/ProductCardSkeleton';
import { titleTranslations } from '@/lib/translations';

export default function HomePage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  // Aqui eu adicionei um efeito para atualizar o termo de pesquisa após 500ms de inatividade do usuário
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchTerm(inputValue);
    }
  };

  // Filtra os produtos com base no termo de pesquisa
  const filteredProducts = allProducts.filter(product => {
    // Pega o título original em inglês
    const originalTitle = product.title;
    // Pega o título traduzido em português
    const translatedTitle = titleTranslations[product.id] || product.title;
    // Converte o termo de busca para minúsculas para comparação
    const term = searchTerm.toLowerCase();
    // Retorna true se o termo de busca for encontrado EM QUALQUER UM dos títulos
    return originalTitle.toLowerCase().includes(term) ||
      translatedTitle.toLowerCase().includes(term);
  });

  const handleSearchClick = () => {
    setSearchTerm(inputValue);
  };


  return (
    <div>
      <div className="mb-8">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Buscar produto pelo nome..."
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
        <button
          onClick={handleSearchClick}
          className="bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer flex-shrink-0 px-4 py-3"
        >
          <span className="md:hidden">
            <Search size={20} />
          </span>
          <span className="hidden md:inline">
            Buscar
          </span>
        </button>
        </div>
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