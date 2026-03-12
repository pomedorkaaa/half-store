import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-bg-dark border-t border-gray-800 text-gray-400 py-8 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-600">
                            Вторая половинка
                        </span>
                        <p className="text-sm mt-1">Идеальный магазин для тех, кому не нужно целое.</p>
                    </div>
                    
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-pink-400 transition-colors">О нас</a>
                        <a href="#" className="hover:text-pink-400 transition-colors">Доставка половинками</a>
                        <a href="#" className="hover:text-pink-400 transition-colors">Контакты</a>
                    </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
                    &copy; {new Date().getFullYear()} Вторая половинка. Все права защищены (наполовину).
                </div>
            </div>
        </footer>
    );
};
