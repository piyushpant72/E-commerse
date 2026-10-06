import React from 'react';

export default function LoadingSpinner({ label = 'Loading products...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className="w-9 h-9 rounded-full border-3 border-slate-200 border-t-indigo-600 animate-spin" />
      <p className="text-sm font-medium text-slate-600">{label}</p>
    </div>
  );
}

export function ProductSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl border border-slate-200/80 p-4 flex flex-col gap-3 animate-pulse"
        >
          <div className="aspect-4/3 w-full bg-slate-100 rounded-lg" />
          <div className="h-3 w-24 bg-slate-100 rounded" />
          <div className="h-4 w-full bg-slate-100 rounded" />
          <div className="h-4 w-2/3 bg-slate-100 rounded" />
          <div className="mt-auto pt-2 flex items-center justify-between">
            <div className="h-5 w-20 bg-slate-100 rounded" />
            <div className="h-9 w-24 bg-slate-100 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
