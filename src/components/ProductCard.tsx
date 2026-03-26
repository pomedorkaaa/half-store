import React, { useState } from 'react';
import { Product } from '../types';
import { Heart, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isFavorite, onToggleFavorite }) => {
  const { lang } = useLanguage();
  const [likes, setLikes] = useState(product.rating?.count ? Math.floor(product.rating.count / 2) : Math.floor(Math.random() * 100));

  const handleLike = () => {
    if (isFavorite) {
      setLikes(l => l - 1);
    } else {
      setLikes(l => l + 1);
    }
    onToggleFavorite();
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full border border-gray-700 hover:border-pink-500/50">
      <div className="relative h-56 bg-white overflow-hidden flex items-center justify-center p-4">
        {/* We use half-clip to slice the image visually in half */}
        <img 
          src={product.image} 
          alt={product.title}
          className={`max-h-full max-w-full object-contain ${product.isHalfCustom ? '' : 'half-clip'} transition-all duration-500 group-hover:scale-110`}
        />
        {!product.isHalfCustom && (
            <div className="absolute top-2 right-2 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                -50%
            </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium text-pink-400 uppercase tracking-wider">{product.category}</span>
          <div className="flex items-center gap-1 cursor-pointer" onClick={handleLike}>
            <Heart size={16} className={`${isFavorite ? 'fill-pink-500 text-pink-500' : 'text-gray-400'} transition-colors`} />
            <span className="text-sm text-gray-400">{likes}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{product.title}</h3>
        
        <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700/50">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 line-through">${(product.price * 2).toFixed(2)}</span>
            <span className="text-xl font-bold text-yellow-400">${product.price.toFixed(2)}</span>
          </div>
          
          <button 
            onClick={() => onAddToCart(product)}
            className="w-10 h-10 rounded-full bg-gray-700 hover:bg-pink-600 flex items-center justify-center transition-colors group/btn"
            title={t('catalog.addToCart', lang)}
          >
            <ShoppingBag size={18} className="text-gray-300 group-hover/btn:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
