import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { SearchBar } from './SearchBar';
import { FilterButtons } from './FilterButtons';
import { Counter } from './Counter';
import { Loader2, AlertCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  onAddToCart: (product: Product) => void;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
}

const ITEMS_PER_PAGE = 12; // 3 rows × 4 columns

export const ProductList: React.FC<ProductListProps> = ({ products, isLoading, error, onAddToCart, favorites, onToggleFavorite }) => {
  const { lang } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(t('catalog.all', lang));
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // get unique categories
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return [t('catalog.all', lang), ...Array.from(cats)];
  }, [products, lang]);

  // Reset selected category when lang changes and current value doesn't match
  useEffect(() => {
    const allLabel = t('catalog.all', lang);
    // If selectedCategory was the "all" label in another language, reset it
    if (!categories.includes(selectedCategory)) {
      setSelectedCategory(allLabel);
    }
  }, [lang, categories, selectedCategory]);

  const filteredProducts = useMemo(() => {
    const allLabel = t('catalog.all', lang);
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === allLabel || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory, lang]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchTerm, selectedCategory]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

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
          <p className="text-gray-400">{t('catalog.loading', lang)}</p>
        </div>
      ) : error ? (
        <div className="glass-panel p-8 text-center rounded-2xl flex flex-col items-center">
          <AlertCircle className="text-red-500 mb-4" size={48} />
          <h3 className="text-xl font-bold text-white mb-2">{t('catalog.errorTitle', lang)}</h3>
          <p className="text-gray-400">{error}</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="glass-panel p-16 text-center rounded-2xl flex flex-col items-center">
          <div className="text-6xl mb-4 opacity-50">🕵️</div>
          <h3 className="text-xl font-bold text-white mb-2">{t('catalog.nothingFound', lang)}</h3>
          <p className="text-gray-400">{t('catalog.nothingHint', lang)}</p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedCategory(t('catalog.all', lang)); }}
            className="mt-6 px-6 py-2 bg-gray-700 hover:bg-pink-600 text-white rounded-full transition-colors"
          >
            {t('catalog.resetFilters', lang)}
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={() => onToggleFavorite(product.id)}
              />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                className="group flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500/20 to-pink-700/20 border border-pink-500/40 text-pink-400 font-semibold hover:from-pink-500 hover:to-pink-700 hover:text-white hover:border-transparent hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all duration-300"
              >
                {t('catalog.showMore', lang)}
                <ChevronDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
