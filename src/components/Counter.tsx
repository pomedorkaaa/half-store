import React from 'react';

interface CounterProps {
  count: number;
  category: string;
}

export const Counter: React.FC<CounterProps> = ({ count, category }) => {
  return (
    <div className="mb-6 flex justify-between text-sm text-gray-400">
      <span>Показано товаров: <strong className="text-pink-400">{count}</strong> {category !== 'Все' && `в категории ${category}`}</span>
    </div>
  );
};
