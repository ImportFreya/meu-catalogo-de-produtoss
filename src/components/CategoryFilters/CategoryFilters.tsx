// app/components/CategoryFilters/CategoryFilters.tsx
"use client";

interface CategoryFiltersProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

// aqui eu usei a tradução para ficar mais amigável para o usuário brasileiro
const categoryTranslations: { [key: string]: string } = {
  "electronics": "Eletrônicos",
  "jewelery": "Joias",
  "men's clothing": "Roupas Masculinas",
  "women's clothing": "Roupas Femininas"
};

 // aqui eu criei o componente CategoryFilters que recebe as categorias, a categoria selecionada e a função para selecionar uma categoria
export const CategoryFilters = ({ categories, selectedCategory, onSelectCategory }: CategoryFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="font-semibold mr-2">Categorias:</span>
      
      <button
        onClick={() => onSelectCategory(null)}
        className={` cursor-pointer px-4 py-2 text-sm rounded-full transition-colors ${
          selectedCategory === null 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        Todos
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={` cursor-pointer px-4 py-2 text-sm rounded-full transition-colors capitalize ${
            selectedCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
           >
         
          {categoryTranslations[category] || category}
        </button>
      ))}
    </div>
  );
};