import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import { products } from '../data/products.js';
import { categories } from '../data/categories.js';

export default function CategoryProducts() {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category || 'Electronics');
  const [sortBy, setSortBy] = useState('popularity');
  const [minRating, setMinRating] = useState(0);

  const activeCategoryMeta =
    categories.find(
      (c) =>
        c.slug.toLowerCase() === decodedCategory.toLowerCase() ||
        c.id.toLowerCase() === decodedCategory.toLowerCase()
    ) || categories[0];

  const categoryProducts = useMemo(() => {
    const filtered = products.filter(
      (p) =>
        p.category.toLowerCase() === activeCategoryMeta.slug.toLowerCase() &&
        p.rating >= minRating
    );

    const copy = [...filtered];
    if (sortBy === 'price-asc') {
      copy.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      copy.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      copy.sort((a, b) => b.rating - a.rating);
    } else {
      copy.sort((a, b) => b.reviews - a.reviews);
    }
    return copy;
  }, [activeCategoryMeta, sortBy, minRating]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/products" className="hover:text-indigo-600">
          Categories
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">{activeCategoryMeta.name}</span>
      </nav>

      {/* Horizontal Category Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const isCurrent = cat.id === activeCategoryMeta.id;
          return (
            <Link
              key={cat.id}
              to={`/category/${encodeURIComponent(cat.slug)}`}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                isCurrent
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>

      {/* Category Header & Controls */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            {activeCategoryMeta.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            {activeCategoryMeta.description} · Showing {categoryProducts.length} products
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {[
              { label: 'All', val: 0 },
              { label: '4.5★+', val: 4.5 }
            ].map((btn) => (
              <button
                key={btn.label}
                type="button"
                onClick={() => setMinRating(btn.val)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  minRating === btn.val
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <select
            aria-label="Sort category products"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-xs sm:text-sm font-medium text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600 cursor-pointer"
          >
            <option value="popularity">Sort: Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
