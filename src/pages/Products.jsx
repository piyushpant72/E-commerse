import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, RotateCcw, X, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import { products } from '../data/products.js';
import { categories } from '../data/categories.js';
import { formatPrice } from '../utils/productArt.js';

const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹2,000', min: 0, max: 2000 },
  { label: '₹2,000 – ₹10,000', min: 2000, max: 10000 },
  { label: '₹10,000 – ₹50,000', min: 10000, max: 50000 },
  { label: 'Above ₹50,000', min: 50000, max: Infinity }
];

const ratingOptions = [
  { label: '4.5★ & above', value: 4.5 },
  { label: '4.0★ & above', value: 4.0 },
  { label: 'All Ratings', value: 0 }
];

const discountOptions = [
  { label: '40% or more', value: 40 },
  { label: '30% or more', value: 30 },
  { label: '20% or more', value: 20 },
  { label: '10% or more', value: 10 },
  { label: 'Any Discount', value: 0 }
];

export default function Products() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const allBrands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).sort();
  }, []);

  const toggleCategory = (catName) => {
    setSelectedCategories((prev) =>
      prev.includes(catName) ? prev.filter((c) => c !== catName) : [...prev, catName]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceIndex(0);
    setSelectedBrands([]);
    setMinRating(0);
    setMinDiscount(0);
    setInStockOnly(false);
    setSortBy('popularity');
  };

  const filteredProducts = useMemo(() => {
    const priceRange = priceRanges[selectedPriceIndex] || priceRanges[0];

    const result = products.filter((product) => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }
      if (product.price < priceRange.min || product.price > priceRange.max) {
        return false;
      }
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      if (product.rating < minRating) {
        return false;
      }
      if (product.discount < minDiscount) {
        return false;
      }
      if (inStockOnly && !product.inStock) {
        return false;
      }
      return true;
    });

    const sorted = [...result];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      sorted.sort((a, b) => b.id - a.id);
    } else {
      // popularity (reviews count)
      sorted.sort((a, b) => b.reviews - a.reviews);
    }

    return sorted;
  }, [
    selectedCategories,
    selectedPriceIndex,
    selectedBrands,
    minRating,
    minDiscount,
    inStockOnly,
    sortBy
  ]);

  const activeFilterCount =
    selectedCategories.length +
    (selectedPriceIndex !== 0 ? 1 : 0) +
    selectedBrands.length +
    (minRating > 0 ? 1 : 0) +
    (minDiscount > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const FilterSidebarContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
          <h2 className="text-sm font-bold text-slate-900">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="text-xs font-semibold text-indigo-600 tabular-nums">
              ({activeFilterCount} active)
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Categories Filter */}
      <div>
        <h3 className="text-xs font-bold text-slate-800 mb-2.5">Categories</h3>
        <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.slug)}
                onChange={() => toggleCategory(cat.slug)}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="truncate">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="pt-4 border-t border-slate-200/80">
        <h3 className="text-xs font-bold text-slate-800 mb-2.5">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range, idx) => (
            <label
              key={range.label}
              className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              <input
                type="radio"
                name="price-range"
                checked={selectedPriceIndex === idx}
                onChange={() => setSelectedPriceIndex(idx)}
                className="w-4 h-4 border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="tabular-nums">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="pt-4 border-t border-slate-200/80">
        <h3 className="text-xs font-bold text-slate-800 mb-2.5">Brand</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {allBrands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="truncate">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Customer Rating Filter */}
      <div className="pt-4 border-t border-slate-200/80">
        <h3 className="text-xs font-bold text-slate-800 mb-2.5">Customer Rating</h3>
        <div className="space-y-2">
          {ratingOptions.map((opt) => (
            <label
              key={opt.label}
              className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              <input
                type="radio"
                name="rating-filter"
                checked={minRating === opt.value}
                onChange={() => setMinRating(opt.value)}
                className="w-4 h-4 border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="tabular-nums">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Discount Filter */}
      <div className="pt-4 border-t border-slate-200/80">
        <h3 className="text-xs font-bold text-slate-800 mb-2.5">Discount</h3>
        <div className="space-y-2">
          {discountOptions.map((opt) => (
            <label
              key={opt.label}
              className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              <input
                type="radio"
                name="discount-filter"
                checked={minDiscount === opt.value}
                onChange={() => setMinDiscount(opt.value)}
                className="w-4 h-4 border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="tabular-nums">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="pt-4 border-t border-slate-200/80">
        <h3 className="text-xs font-bold text-slate-800 mb-2.5">Availability</h3>
        <label className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-slate-900 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>Exclude Out of Stock</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Desktop Left Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 sticky top-22">
            <FilterSidebarContent />
          </div>
        </aside>

        {/* Right Side Product Listing */}
        <div className="flex-1 min-w-0">
          {/* Top Header Bar */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                All Products Catalog
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 tabular-nums">
                Showing {filteredProducts.length} of {products.length} products
                {filteredProducts.length > 0 &&
                  ` · Starting at ${formatPrice(
                    Math.min(...filteredProducts.map((p) => p.price))
                  )}`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer whitespace-nowrap"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort-select" className="text-xs font-medium text-slate-500 shrink-0">
                  Sort by:
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm font-medium text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600 cursor-pointer"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">No matching products found</h2>
              <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                Try adjusting your price range, brand selection, or minimum discount filters to see
                more items.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Collapsible Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative ml-auto w-80 max-w-[85vw] bg-white h-full shadow-2xl p-5 overflow-y-auto z-10">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Filter Products</h3>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterSidebarContent />
            <div className="mt-6 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
