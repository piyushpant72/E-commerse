import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Check, Package } from 'lucide-react';
import Rating from './Rating.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { formatPrice } from '../utils/productArt.js';

export default function ProductCard({ product }) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [imgError, setImgError] = useState(false);

  const wishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  return (
    <div className="group bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-150 hover:-translate-y-0.5 flex flex-col overflow-hidden h-full">
      {/* Image Container (4:3 aspect ratio) */}
      <div className="relative aspect-4/3 w-full bg-slate-100/70 overflow-hidden shrink-0">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-500 p-4 text-center">
              <Package className="w-8 h-8 mb-1.5 text-indigo-500" />
              <span className="text-xs font-medium line-clamp-1">{product.brand}</span>
            </div>
          )}
        </Link>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center shadow-xs transition-transform duration-150 active:scale-95 cursor-pointer ${
            wishlisted
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/90 hover:bg-white text-slate-500 hover:text-rose-600'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1">
        {/* Clean unboxed metadata: Brand · Category */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
          <span className="font-semibold text-slate-700 truncate">{product.brand}</span>
          <span aria-hidden="true">·</span>
          <span className="truncate">{product.category}</span>
        </div>

        {/* Product Name */}
        <Link
          to={`/product/${product.id}`}
          className="text-sm sm:text-[15px] font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug mb-2"
        >
          {product.name}
        </Link>

        {/* Rating & Review Count */}
        <div className="mb-2.5">
          <Rating rating={product.rating} reviews={product.reviews} />
        </div>

        {/* Price Row */}
        <div className="mt-auto pt-1">
          <div className="flex items-baseline flex-wrap gap-1.5">
            <span className="text-base sm:text-lg font-bold text-slate-900 tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs font-semibold text-emerald-700 tabular-nums">
                  {product.discount}% off
                </span>
              </>
            )}
          </div>

          {/* Delivery Information */}
          <p className="text-xs text-slate-500 mt-1 truncate">
            {product.delivery || 'Free delivery by Tomorrow'}
          </p>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            className={`mt-3 w-full py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors duration-150 whitespace-nowrap cursor-pointer ${
              inCart
                ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {inCart ? (
              <>
                <Check className="w-4 h-4 shrink-0" />
                <span>Added · Add +1</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 shrink-0" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
