import React from 'react';
import { Link } from 'react-router-dom';
import {
  Headphones,
  Smartphone,
  Shirt,
  Coffee,
  Sparkles,
  ShoppingBasket,
  Dumbbell,
  BookOpen,
  Watch
} from 'lucide-react';

const iconMap = {
  Headphones,
  Smartphone,
  Shirt,
  Coffee,
  Sparkles,
  ShoppingBasket,
  Dumbbell,
  BookOpen,
  Watch
};

export default function CategoryCard({ category }) {
  const IconComponent = iconMap[category.icon] || Headphones;

  return (
    <Link
      to={`/category/${encodeURIComponent(category.slug)}`}
      className="group bg-white rounded-xl border border-slate-200/80 hover:border-indigo-300 p-4 flex flex-col items-center text-center shadow-2xs hover:shadow-md transition-all duration-150 hover:-translate-y-0.5 shrink-0 w-28 sm:w-auto"
    >
      <div
        className={`w-12 h-12 rounded-xl ${
          category.bgLight || 'bg-indigo-50'
        } flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform duration-150`}
      >
        <IconComponent className={`w-6 h-6 ${category.iconColor || 'text-indigo-600'}`} />
      </div>
      <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
        {category.name}
      </span>
    </Link>
  );
}
