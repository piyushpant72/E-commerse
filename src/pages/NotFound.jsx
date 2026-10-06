import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 shadow-2xs">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
          <Compass className="w-8 h-8" />
        </div>
        <p className="text-xs font-bold text-indigo-600 tracking-wider">ERROR 404</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-1">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          The page or product link you are looking for may have moved or no longer exists.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Browse All Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
