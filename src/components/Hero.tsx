import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-bg-darker py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-8">
            <span className="block mb-2">Добро пожаловать в</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-400">
              «Вторую половинку»
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 mb-10">
            Мы продаем абсолютно всё, но ровно наполовину! Зачем платить за всё, если вам нужна только часть?
            <br className="hidden md:block"/>Скидка 50% на весь ассортимент (буквально).
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 text-base font-medium rounded-full text-white bg-pink-600 hover:bg-pink-700 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:shadow-[0_0_25px_rgba(236,72,153,0.8)]"
            >
              Перейти к каталогу
            </button>
            <button className="px-8 py-3 text-base font-medium rounded-full text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700">
              Узнать больше
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-pink-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-yellow-400/10 blur-[100px] rounded-full"></div>
      </div>
    </div>
  );
};
