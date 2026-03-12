import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductList } from './components/ProductList';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { Product } from './types';
import { mockProducts } from './data/products';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavOpen, setIsFavOpen] = useState(false);
  
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('halfStoreFavorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [cart, setCart] = useState<Record<number, number>>(() => {
    const saved = localStorage.getItem('halfStoreCart');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('halfStoreFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('halfStoreCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data: Product[] = await response.json();
        
        const categoryMap: Record<string, string> = {
          "electronics": "Электроника",
          "jewelery": "Ювелирные изделия",
          "men's clothing": "Мужская одежда",
          "women's clothing": "Женская одежда"
        };
        
        // Transform API data to fit half-store concept
        const transformedData = data.map(item => {
          const translatedCategory = categoryMap[item.category] || item.category;
          return {
            ...item,
            category: translatedCategory,
            title: `Половина от: ${item.title}`,
            price: item.price / 2, // 50% discount
            description: `Это шикарный оригинальный товар из категории "${translatedCategory}". Мы аккуратно отрезали ровно половину, чтобы сэкономить ваши деньги (и место в шкафу)!`,
            isHalfCustom: false
          };
        });
        
        // Combine mock data (which has our custom ones) and remote data
        setProducts([...mockProducts, ...transformedData]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Неизвестная ошибка при загрузке");
        }
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const current = prev[product.id] || 0;
      return { ...prev, [product.id]: current + 1 };
    });
  };

  const handleToggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
  };

  const totalCartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-bg-darker flex flex-col font-sans transition-colors duration-300 relative">
      <Header 
        cartCount={totalCartCount} 
        favCount={favorites.length}
        onCartClick={() => setIsCartOpen(true)}
        onFavClick={() => setIsFavOpen(true)}
      />
      <main className="flex-grow pt-8">
        <Hero />
        <ProductList 
          products={products} 
          isLoading={isLoading} 
          error={error} 
          onAddToCart={handleAddToCart}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      </main>
      <Footer />

      {/* Модальное окно Корзины */}
      <Modal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        title="Ваша половина корзины"
      >
        <div className="space-y-4">
          <p className="text-gray-300">В корзине товаров (половинок): <strong className="text-white">{totalCartCount}</strong></p>
          {Object.keys(cart).length === 0 ? (
            <p className="text-gray-500 italic">Сначала добавьте хотя бы одну половинку чего-нибудь!</p>
          ) : (
            <ul className="space-y-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {Object.entries(cart).map(([idStr, quantity]) => {
                const id = parseInt(idStr);
                const product = products.find(p => p.id === id);
                if (!product) return null;
                return (
                  <li key={id} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700">
                    <img src={product.image} alt={product.title} className="w-12 h-12 object-cover rounded-lg half-clip" />
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold text-white line-clamp-1">{product.title}</h4>
                      <span className="text-xs text-yellow-400">${product.price.toFixed(2)} &times; {quantity}</span>
                    </div>
                    <button 
                      onClick={() => setCart(prev => {
                        const newCart = {...prev};
                        delete newCart[id];
                        return newCart;
                      })} 
                      className="text-pink-500 hover:text-pink-400 text-sm"
                    >
                      Удалить
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          
          {totalCartCount > 0 && (
            <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700 mt-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Итого:</span>
                <span className="text-xl font-bold text-white">
                  ${Object.entries(cart).reduce((sum, [idStr, q]) => {
                    const p = products.find(p => p.id === parseInt(idStr));
                    return sum + (p ? p.price * q : 0);
                  }, 0).toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-pink-400 opacity-80">Напоминаем: чтобы собрать целый предмет, вам нужно заказать его дважды!</p>
            </div>
          )}
          
          <button 
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-pink-700 text-white font-bold hover:from-pink-400 hover:to-pink-600 transition-all mt-4"
            onClick={() => setIsCartOpen(false)}
          >
            {totalCartCount > 0 ? "Перейти к оформлению половины заказа" : "Закрыть"}
          </button>
        </div>
      </Modal>

      {/* Модальное окно Избранного */}
      <Modal 
        isOpen={isFavOpen} 
        onClose={() => setIsFavOpen(false)}
        title="Избранные половинки"
      >
        <div className="space-y-4">
          {favorites.length === 0 ? (
            <p className="text-gray-400 text-center py-6">
              Пока здесь пусто. В этом мире так трудно найти свою вторую половинку...
            </p>
          ) : (
            <ul className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {products.filter(p => favorites.includes(p.id)).map(favProduct => (
                <li key={favProduct.id} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700">
                  <img src={favProduct.image} alt={favProduct.title} className="w-12 h-12 object-cover rounded-lg half-clip" />
                  <div className="flex-grow">
                    <h4 className="text-sm font-bold text-white line-clamp-1">{favProduct.title}</h4>
                    <span className="text-xs text-yellow-400">${favProduct.price.toFixed(2)}</span>
                  </div>
                  <button onClick={() => handleToggleFavorite(favProduct.id)} className="text-pink-500 hover:text-pink-400">
                    Убрать
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button 
            className="w-full py-3 rounded-xl bg-gray-700 text-white font-bold hover:bg-gray-600 transition-all mt-4"
            onClick={() => setIsFavOpen(false)}
          >
            Закрыть
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
