import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { products } from '../data/products.js';
import { formatPrice } from '../utils/productArt.js';

export default function SearchBar({ onSearchComplete }) {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trimmed = query.trim().toLowerCase();
  const suggestions = trimmed
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(trimmed) ||
            p.brand.toLowerCase().includes(trimmed) ||
            p.category.toLowerCase().includes(trimmed)
        )
        .slice(0, 5)
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = query.trim();
    setIsOpen(false);
    if (clean) {
      navigate(`/search?q=${encodeURIComponent(clean)}`);
    } else {
      navigate('/products');
    }
    if (onSearchComplete) onSearchComplete();
  };

  const handleQuickTerm = (term) => {
    setQuery(term);
    setIsOpen(false);
    navigate(`/search?q=${encodeURIComponent(term)}`);
    if (onSearchComplete) onSearchComplete();
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative flex items-center w-full">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
        <input
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search for products, brands and more"
          aria-label="Search for products, brands and more"
          className="w-full pl-10 pr-16 py-2.5 text-sm bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder:text-slate-500 rounded-lg border border-transparent focus:border-indigo-600 focus:outline-none transition-colors"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            aria-label="Clear search"
            className="absolute right-10 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="submit"
          aria-label="Submit search"
          className="absolute right-1.5 px-2.5 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors cursor-pointer"
        >
          Go
        </button>
      </form>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
          {trimmed.length > 0 ? (
            suggestions.length > 0 ? (
              <div className="py-1.5">
                <div className="px-3.5 py-1.5 text-xs font-medium text-slate-400 flex items-center justify-between">
                  <span>Matching Products</span>
                  <span>Press Enter for all results</span>
                </div>
                {suggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      navigate(`/product/${item.id}`);
                      if (onSearchComplete) onSearchComplete();
                    }}
                    className="w-full px-3.5 py-2.5 text-left hover:bg-slate-50 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-md object-cover bg-slate-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {item.brand} · {item.category}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-slate-900 tabular-nums shrink-0">
                      {formatPrice(item.price)}
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full px-3.5 py-2.5 text-xs font-semibold text-indigo-600 bg-slate-50 hover:bg-indigo-50/60 flex items-center justify-center gap-1.5 border-t border-slate-100 cursor-pointer"
                >
                  <span>View all search results for "{query.trim()}"</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="p-4 text-center">
                <p className="text-sm text-slate-600">
                  No direct match for <span className="font-semibold">"{query}"</span>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Try searching for iPhone, Sony, Nike, Laptop, Coffee, or Watch
                </p>
              </div>
            )
          ) : (
            <div className="p-3.5">
              <p className="text-xs font-medium text-slate-400 mb-2">Popular Searches</p>
              <div className="flex flex-wrap gap-1.5">
                {['iphone', 'Sony Headphones', 'MacBook', 'Nike', 'Espresso', 'Watch', 'Books'].map(
                  (term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleQuickTerm(term)}
                      className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 rounded-md transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
