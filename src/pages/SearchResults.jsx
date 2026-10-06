import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import { products } from '../data/products.js';

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get('q') || '').trim();
  const [sortBy, setSortBy] = useState('relevance');

  const matchedProducts = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return products;

    const filtered = products.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );

    const copy = [...filtered];
    if (sortBy === 'price-asc') {
      copy.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      copy.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      copy.sort((a, b) => b.rating - a.rating);
    }
    return copy;
  }, [query, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Search Header Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            {query ? `Search results for: ${query}` : 'Search All Products'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 tabular-nums">
            Found {matchedProducts.length} matching{' '}
            {matchedProducts.length === 1 ? 'product' : 'products'} across names, brands &
            categories
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="search-sort" className="text-xs font-medium text-slate-500 shrink-0">
            Sort by:
          </label>
          <select
            id="search-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-xs sm:text-sm font-medium text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600 cursor-pointer"
          >
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Quick Search Suggestions Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-xs font-semibold text-slate-500 shrink-0">Try searching:</span>
        {['iphone', 'Sony', 'Apple', 'Nike', 'Dyson', 'Laptop', 'Coffee', 'Watch', 'Books'].map(
          (term) => (
            <button
              key={term}
              type="button"
              onClick={() => setSearchParams({ q: term })}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                query.toLowerCase() === term.toLowerCase()
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {term}
            </button>
          )
        )}
      </div>

      {/* Matching Products Grid */}
      {matchedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {matchedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            No products matched "{query}"
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Check your spelling or try searching for a broader keyword such as "iphone", "headphones",
            "laptop", or "shoes".
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setSearchParams({ q: 'iphone' })}
              className="px-4 py-2.5 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer"
            >
              Search "iphone"
            </button>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
            >
              <span>Browse All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
