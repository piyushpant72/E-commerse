import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { formatPrice } from '../utils/productArt.js';

export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const itemSubtotal = item.price * item.quantity;
  const inWishlist = isInWishlist(item.id);

  const handleSaveForLater = () => {
    addToWishlist(item);
    removeFromCart(item.id);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5">
      {/* Product Thumbnail */}
      <Link
        to={`/product/${item.id}`}
        className="w-full sm:w-32 h-36 sm:h-28 rounded-lg bg-slate-100 overflow-hidden shrink-0 block"
      >
        <img
          src={item.image}
          alt={item.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-150"
        />
      </Link>

      {/* Item Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-slate-500 mb-0.5">
                {item.brand} · {item.category}
              </p>
              <Link
                to={`/product/${item.id}`}
                className="text-sm sm:text-base font-semibold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-2"
              >
                {item.name}
              </Link>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-slate-400">Subtotal</p>
              <p className="text-base font-bold text-slate-900 tabular-nums">
                {formatPrice(itemSubtotal)}
              </p>
            </div>
          </div>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-sm font-semibold text-slate-800 tabular-nums">
              {formatPrice(item.price)}
            </span>
            {item.originalPrice > item.price && (
              <>
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  {formatPrice(item.originalPrice)}
                </span>
                <span className="text-xs font-semibold text-emerald-700 tabular-nums">
                  {item.discount}% off
                </span>
              </>
            )}
          </div>
          <p className="text-xs text-emerald-700 mt-1">
            {item.delivery || 'Free delivery by Tomorrow'}
          </p>
        </div>

        {/* Controls Row: Quantity Steppers, Wishlist & Remove */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center rounded-lg border border-slate-300 bg-slate-50">
            <button
              type="button"
              onClick={() => decreaseQuantity(item.id)}
              aria-label="Decrease quantity"
              className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-200/70 rounded-l-lg transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center text-sm font-semibold text-slate-900 tabular-nums">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => increaseQuantity(item.id)}
              aria-label="Increase quantity"
              className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-200/70 rounded-r-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveForLater}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{inWishlist ? 'Move to Wishlist' : 'Save to Wishlist'}</span>
            </button>
            <span className="text-slate-300" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={() => removeFromCart(item.id)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
