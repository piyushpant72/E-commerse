import React from 'react';
import { Star } from 'lucide-react';

export default function Rating({ rating = 4.5, reviews, size = 'sm', showStars = false }) {
  const fullStars = Math.floor(rating);

  if (showStars) {
    return (
      <div className="inline-flex items-center gap-1.5">
        <div className="flex items-center gap-0.5 text-amber-500">
          {[1, 2, 3, 4, 5].map((index) => (
            <Star
              key={index}
              className={`${
                size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'
              } ${index <= fullStars ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
            />
          ))}
        </div>
        <span className="text-xs font-semibold text-slate-800 tabular-nums">
          {Number(rating).toFixed(1)}
        </span>
        {typeof reviews === 'number' && (
          <span className="text-xs text-slate-500 tabular-nums">
            ({reviews.toLocaleString('en-IN')} reviews)
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 text-xs">
      <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 tabular-nums">
        <span>{Number(rating).toFixed(1)}</span>
        <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
      </span>
      {typeof reviews === 'number' && (
        <>
          <span className="text-slate-300" aria-hidden="true">
            ·
          </span>
          <span className="text-slate-500 tabular-nums">
            {reviews.toLocaleString('en-IN')} ratings
          </span>
        </>
      )}
    </div>
  );
}
