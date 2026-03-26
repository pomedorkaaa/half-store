import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Heart, Scissors, Sun, Moon, Globe, ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { t, Language } from '../i18n';

interface HeaderProps {
  cartCount: number;
  favCount: number;
  onCartClick: () => void;
  onFavClick: () => void;
}

const langLabels: Record<Language, string> = { ru: 'RU', en: 'EN', ro: 'RO' };

export const Header: React.FC<HeaderProps> = ({ cartCount, favCount, onCartClick, onFavClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 header-bg border-b header-border backdrop-blur-md shadow-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-pink-700 flex items-center justify-center half-clip group-hover:clip-none transition-all duration-300">
              <Scissors size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-600">
              {lang === 'en' ? 'The Better Half' : lang === 'ro' ? 'A Doua Jumătate' : 'Вторая половинка'}
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" onClick={(e) => { e.preventDefault(); document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }); }} className="nav-link hover:text-pink-400 transition-colors">{t('nav.catalog', lang)}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' }); }} className="nav-link hover:text-pink-400 transition-colors">{t('nav.about', lang)}</a>
          </nav>

          <div className="flex items-center space-x-3">
            {/* Language Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg nav-link hover:text-pink-400 transition-colors text-sm font-medium"
                title="Language"
              >
                <Globe size={16} />
                <span>{langLabels[lang]}</span>
                <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 lang-dropdown border border-gray-600 rounded-lg shadow-xl overflow-hidden min-w-[80px] z-50">
                  {(['ru', 'en', 'ro'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      className={`w-full px-3 py-2 text-sm text-left transition-colors ${
                        lang === l ? 'bg-pink-600 text-white' : 'lang-dropdown-item hover:bg-pink-600/20'
                      }`}
                    >
                      {langLabels[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg nav-link hover:text-pink-400 transition-colors"
              title={theme === 'dark' ? t('theme.light', lang) : t('theme.dark', lang)}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Favorites */}
            <button onClick={onFavClick} className="nav-link hover:text-pink-400 transition-colors relative">
              <Heart size={24} />
              {favCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                  {favCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button onClick={onCartClick} className="nav-link hover:text-pink-400 transition-colors relative">
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
