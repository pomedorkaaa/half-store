import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { SearchBar } from './SearchBar';
import { FilterButtons } from './FilterButtons';
import { Counter } from './Counter';
import { Loader2, AlertCircle } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  onAddToCart: (product: Product) => void;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, isLoading, error, onAddToCart, favorites, onToggleFavorite }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  // get unique categories
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['Все', ...Array.from(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="catalog">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <FilterButtons categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      </div>

      {!isLoading && !error && (
        <Counter count={filteredProducts.length} category={selectedCategory} />
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-pink-500 mb-4" size={48} />
          <p className="text-gray-400">Загружаем вторую половину данных...</p>
        </div>
      ) : error ? (
        <div className="glass-panel p-8 text-center rounded-2xl flex flex-col items-center">
          <AlertCircle className="text-red-500 mb-4" size={48} />
          <h3 className="text-xl font-bold text-white mb-2">Упс! Что-то пошло не так</h3>
          <p className="text-gray-400">{error}</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="glass-panel p-16 text-center rounded-2xl flex flex-col items-center">
          <div className="text-6xl mb-4 opacity-50">🕵️</div>
          <h3 className="text-xl font-bold text-white mb-2">Ничего не найдено</h3>
          <p className="text-gray-400">Попробуйте изменить параметры поиска или выбрать другую категорию.</p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedCategory('Все'); }}
            className="mt-6 px-6 py-2 bg-gray-700 hover:bg-pink-600 text-white rounded-full transition-colors"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart} 
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={() => onToggleFavorite(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
