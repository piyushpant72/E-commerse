import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import Rating from '../components/Rating.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils/productArt.js';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center shadow-2xs">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Your Wishlist is Empty
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
            Save your favorite electronics, fashion, and home items to your wishlist to track price
            drops and buy them anytime.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
          >
            <span>Discover Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
          My Wishlist ({wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'})
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Saved products ready to move to your shopping cart
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-slate-200/80 overflow-hidden flex flex-col shadow-2xs"
          >
            <div className="relative aspect-4/3 bg-slate-100">
              <Link to={`/product/${item.id}`} className="block w-full h-full">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </Link>
              <button
                type="button"
                onClick={() => removeFromWishlist(item.id)}
                aria-label="Remove from wishlist"
                className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-white/90 hover:bg-rose-50 text-slate-500 hover:text-rose-600 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 flex flex-col flex-1">
              <p className="text-xs text-slate-500 mb-1">
                {item.brand} · {item.category}
              </p>
              <Link
                to={`/product/${item.id}`}
                className="text-sm font-semibold text-slate-900 hover:text-indigo-600 line-clamp-2 mb-2"
              >
                {item.name}
              </Link>

              <div className="mb-3">
                <Rating rating={item.rating} reviews={item.reviews} />
              </div>

              <div className="mt-auto">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-base font-bold text-slate-900 tabular-nums">
                    {formatPrice(item.price)}
                  </span>
                  {item.originalPrice > item.price && (
                    <span className="text-xs text-slate-400 line-through tabular-nums">
                      {formatPrice(item.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(item.id)}
                    className="py-2 px-3 rounded-lg border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
