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

      <div className="hidden md:flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-4 py-2 text-sm rounded-full ... ${selectedCategory === null ? 'bg-blue-600 text-white' : 'bg-gray-200 ...'}`}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 text-sm rounded-full ... ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 ...'}`}
          >
            {categoryTranslations[category] || category}
          </button>
        ))}
      </div>

      <div className="md:hidden">
        <select
          value={selectedCategory || ''}
          onChange={(e) => onSelectCategory(e.target.value || null)}
          className="px-4 py-2 text-sm rounded-full border border-gray-300"
        >
          <option value="">Todos</option>
          {categories.map((category) => (
            <option key={category} value={category} className="capitalize">
              {categoryTranslations[category] || category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};