import React from 'react';
import { ShoppingCart, Heart, Scissors } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  favCount: number;
  onCartClick: () => void;
  onFavClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, favCount, onCartClick, onFavClick }) => {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-pink-700 flex items-center justify-center half-clip group-hover:clip-none transition-all duration-300">
              <Scissors size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-600">
              Вторая половинка
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" onClick={(e) => { e.preventDefault(); document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-300 hover:text-pink-400 transition-colors">Каталог</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onFavClick(); }} className="text-gray-300 hover:text-pink-400 transition-colors">Избранное</a>
            <a href="#" onClick={(e) => { e.preventDefault(); document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-300 hover:text-pink-400 transition-colors">О нас</a>
          </nav>

          <div className="flex items-center space-x-6">
            <button onClick={onFavClick} className="text-gray-300 hover:text-pink-400 transition-colors relative">
              <Heart size={24} />
              {favCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                  {favCount}
                </span>
              )}
            </button>
            <button onClick={onCartClick} className="text-gray-300 hover:text-pink-400 transition-colors relative">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
