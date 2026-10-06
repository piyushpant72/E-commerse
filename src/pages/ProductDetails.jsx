import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Zap,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Tag,
  Star,
  CheckCircle2,
  MapPin,
  Minus,
  Plus,
  ChevronRight
} from 'lucide-react';
import { products } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import Rating from '../components/Rating.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { formatPrice } from '../utils/productArt.js';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const product = products.find((p) => String(p.id) === String(id)) || products[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('560038');
  const [deliveryStatus, setDeliveryStatus] = useState(
    'Free Express Delivery by Tomorrow, 9 PM · Cash on Delivery available'
  );
  const [customReviews, setCustomReviews] = useState([]);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  useEffect(() => {
    setSelectedImageIndex(0);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const wishlisted = isInWishlist(product.id);

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    const cleaned = pincode.trim();
    if (/^\d{6}$/.test(cleaned)) {
      setDeliveryStatus(
        `Deliverable to ${cleaned} · ${product.delivery || 'Free delivery by Tomorrow'} · COD Eligible`
      );
      showToast(`Delivery verified for pincode ${cleaned}`, 'info');
    } else {
      setDeliveryStatus('Please enter a valid 6-digit Indian pincode (e.g., 560038 or 400001).');
    }
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewTitle.trim() || !newReviewComment.trim()) return;
    const review = {
      id: `custom-${Date.now()}`,
      author: 'Verified Shopper',
      city: 'Bengaluru',
      rating: newReviewRating,
      date: 'Just now',
      verified: true,
      title: newReviewTitle.trim(),
      comment: newReviewComment.trim()
    };
    setCustomReviews((prev) => [review, ...prev]);
    setNewReviewTitle('');
    setNewReviewComment('');
    showToast('Thank you! Your review has been published.', 'success');
  };

  const allReviews = [...customReviews, ...(product.userReviews || [])];
  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const thumbnailLabels = ['Front View', 'Studio Angle', 'Close-Up Detail', 'Edition Specs'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link
          to={`/category/${encodeURIComponent(product.category)}`}
          className="hover:text-indigo-600"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Top Contiguous Purchase Module (Left Gallery + Right Purchase Info) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-8 shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left: Large Product Image & Switchable Thumbnails */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative aspect-4/3 w-full rounded-xl bg-slate-100/80 border border-slate-200/70 overflow-hidden">
              <img
                src={product.images?.[selectedImageIndex] || product.image}
                alt={`${product.name} view ${selectedImageIndex + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`absolute top-3.5 right-3.5 w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-colors cursor-pointer ${
                  wishlisted
                    ? 'bg-rose-50 text-rose-600'
                    : 'bg-white/90 hover:bg-white text-slate-600 hover:text-rose-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Images Switcher */}
            <div className="grid grid-cols-4 gap-3">
              {(product.images || [product.image]).map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`group relative aspect-4/3 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImageIndex === idx
                      ? 'border-indigo-600 ring-2 ring-indigo-600/20'
                      : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="sr-only">{thumbnailLabels[idx] || `View ${idx + 1}`}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info, Pricing, Offers, Quantity & CTAs */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
              <span className="font-bold text-indigo-600">{product.brand}</span>
              <span aria-hidden="true">·</span>
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-medium">In Stock & Ready to Ship</span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 leading-snug font-display">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-3">
              <Rating rating={product.rating} reviews={product.reviews} showStars size="lg" />
            </div>

            {/* Price Block */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <p className="text-xs font-semibold text-emerald-700 mb-1">Special Festival Price</p>
              <div className="flex items-baseline flex-wrap gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-base text-slate-400 line-through tabular-nums">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-sm font-bold text-emerald-700 tabular-nums">
                      {product.discount}% off
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Inclusive of all taxes · Official Brand GST Invoice provided
              </p>
            </div>

            {/* Available Offers */}
            <div className="mt-5">
              <h2 className="text-xs font-bold text-slate-800 mb-2.5">Available Offers</h2>
              <ul className="space-y-2">
                {product.offers.map((offer, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <Tag className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{offer}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Delivery Information & Pincode Checker */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <label
                htmlFor="pincode-input"
                className="block text-xs font-bold text-slate-800 mb-2"
              >
                Check Delivery & Cash on Delivery Availability
              </label>
              <form onSubmit={handlePincodeCheck} className="flex items-center gap-2 max-w-sm">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="pincode-input"
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit pincode"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-indigo-600 focus:outline-none tabular-nums"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
                >
                  Check
                </button>
              </form>
              <p className="text-xs text-slate-600 mt-2 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>{deliveryStatus}</span>
              </p>
            </div>

            {/* Quantity Selector & Primary Actions */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700">Quantity:</span>
                <div className="inline-flex items-center rounded-lg border border-slate-300 bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-200/70 rounded-l-lg cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-slate-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    aria-label="Increase quantity"
                    className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-200/70 rounded-r-lg cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-1 flex-wrap sm:flex-nowrap gap-3">
                <button
                  type="button"
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer whitespace-nowrap"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex-1 py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Buy Now</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`py-3 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                    wishlisted
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                  <span className="hidden xl:inline">
                    {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                  </span>
                </button>
              </div>
            </div>

            {/* Trust Footer Strip */}
            <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-3 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>7 Days Easy Replacement</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Official Brand Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>100% Genuine Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description & Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Product Description & Key Highlights */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7">
          <h2 className="text-lg font-bold text-slate-900 font-display mb-3">
            Product Description
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
            {product.description}
          </p>

          <h3 className="text-sm font-bold text-slate-900 mb-3">Key Highlights</h3>
          <ul className="space-y-2.5">
            {(product.highlights || []).map((point, index) => (
              <li key={index} className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Specifications Table */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7">
          <h2 className="text-lg font-bold text-slate-900 font-display mb-4">
            Technical Specifications
          </h2>
          <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-xl overflow-hidden">
            {Object.entries(product.specifications || {}).map(([key, value], idx) => (
              <div
                key={key}
                className={`grid grid-cols-3 gap-4 px-4 py-3 text-sm ${
                  idx % 2 === 0 ? 'bg-slate-50/60' : 'bg-white'
                }`}
              >
                <span className="font-medium text-slate-500">{key}</span>
                <span className="col-span-2 font-semibold text-slate-900 tabular-nums">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ratings & Reviews Section */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-6">
          Ratings & Customer Reviews
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 border-b border-slate-200">
          {/* Overall Rating & Breakdown */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-start gap-6">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-slate-900 tabular-nums">
                  {Number(product.rating).toFixed(1)}
                </span>
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              </div>
              <p className="text-xs text-slate-500 mt-1 tabular-nums">
                Based on {product.reviews.toLocaleString('en-IN')} verified ratings &{' '}
                {allReviews.length} detailed reviews
              </p>
            </div>

            {/* Breakdown Bars */}
            <div className="w-full space-y-2 text-xs">
              {[
                { stars: 5, pct: 68, color: 'bg-emerald-600' },
                { stars: 4, pct: 21, color: 'bg-emerald-500' },
                { stars: 3, pct: 7, color: 'bg-amber-500' },
                { stars: 2, pct: 2, color: 'bg-orange-500' },
                { stars: 1, pct: 2, color: 'bg-rose-500' }
              ].map((row) => (
                <div key={row.stars} className="flex items-center gap-2.5">
                  <span className="w-8 font-semibold text-slate-700 tabular-nums">
                    {row.stars} ★
                  </span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                  </div>
                  <span className="w-9 text-right text-slate-500 tabular-nums">{row.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Write a Review Form */}
          <div className="lg:col-span-8 bg-slate-50 rounded-xl p-5 border border-slate-200/70">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Write a Customer Review</h3>
            <form onSubmit={handleAddReview} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-600">Your Rating:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 cursor-pointer"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= newReviewRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="Review headline (e.g. Great battery & sound)"
                  className="px-3.5 py-2 text-sm bg-white rounded-lg border border-slate-300 focus:border-indigo-600 focus:outline-none"
                />
                <input
                  type="text"
                  required
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Share your experience with this product..."
                  className="px-3.5 py-2 text-sm bg-white rounded-lg border border-slate-300 focus:border-indigo-600 focus:outline-none"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* User Reviews List */}
        <div className="mt-6 divide-y divide-slate-100">
          {allReviews.map((rev) => (
            <div key={rev.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 tabular-nums">
                  {rev.rating}.0 ★
                </span>
                <span className="text-sm font-bold text-slate-900">{rev.title}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{rev.comment}</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                <span className="font-medium text-slate-600">{rev.author}</span>
                <span aria-hidden="true">·</span>
                <span>Certified Buyer, {rev.city}</span>
                <span aria-hidden="true">·</span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Similar Products */}
      <section aria-labelledby="similar-heading">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2
              id="similar-heading"
              className="text-xl font-bold text-slate-900 font-display"
            >
              Similar Products in {product.category}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Customers who viewed this item also considered these alternatives
            </p>
          </div>
          <Link
            to={`/category/${encodeURIComponent(product.category)}`}
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {similarProducts.map((sim) => (
            <ProductCard key={sim.id} product={sim} />
          ))}
        </div>
      </section>
    </div>
  );
}
