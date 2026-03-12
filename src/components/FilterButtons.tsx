import React from 'react';

interface FilterButtonsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category 
              ? 'bg-pink-600 text-white shadow-[0_0_10px_rgba(236,72,153,0.5)]' 
              : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 hover:text-white'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
