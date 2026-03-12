import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: 1001,
    title: "Одинокий кроссовок",
    price: 45.99,
    description: "Зачем вам два, если можно прыгать на одной ноге? Спортивный левый (или правый) кроссовок.",
    category: "Обувь",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    isHalfCustom: true
  },
  {
    id: 1002,
    title: "Полчашки для кофе",
    price: 9.99,
    description: "Для тех, кто предпочитает всегда видеть стакан наполовину полным.",
    category: "Посуда",
    image: "/assets/coffee.png",
    isHalfCustom: true
  },
  {
    id: 1003,
    title: "Половина батона",
    price: 1.50,
    description: "Свежайший, хрустящий. Вторая половина была съедена по дороге домой.",
    category: "Еда",
    image: "/assets/bread.png",
    isHalfCustom: true
  },
  {
    id: 1004,
    title: "Одна штанина",
    price: 24.50,
    description: "Самый писк моды. Идеально для летнего сезона на одной ноге.",
    category: "Одежда",
    image: "/assets/jeans.png",
    isHalfCustom: true
  },
  {
    id: 1005,
    title: "Половина зонта",
    price: 12.00,
    description: "Защищает только от косого дождя с одной стороны.",
    category: "Аксессуары",
    image: "/assets/umbrella.png",
    isHalfCustom: true
  },
  {
    id: 1006,
    title: "Полкилограмма гвоздей",
    price: 5.00,
    description: "Ровно половина от килограмма. Идеально для половины забора.",
    category: "Инструменты",
    image: "/assets/nails.png",
    isHalfCustom: true
  }
];
