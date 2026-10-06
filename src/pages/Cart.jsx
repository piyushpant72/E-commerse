import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, PlusCircle } from 'lucide-react';
import CartItem from '../components/CartItem.jsx';
import PriceDetails from '../components/PriceDetails.jsx';
import { useCart } from '../context/CartContext.jsx';
import { products } from '../data/products.js';

export default function Cart() {
  const { cartItems, clearCart, addToCart, totalItems } = useCart();
  const navigate = useNavigate();

  const handleLoadSampleItems = () => {
    addToCart(products[0], 1);
    addToCart(products[14], 1);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center shadow-2xs">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Your Shopping Cart is Empty
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
            Looks like you have not added anything to your cart yet. Explore top deals across
            electronics, mobiles, fashion, and home essentials.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={handleLoadSampleItems}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-indigo-600" />
              <span>Add Demo Bestsellers</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Shopping Cart ({totalItems} {totalItems === 1 ? 'Item' : 'Items'})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Items in your cart are eligible for Free Express Doorstep Delivery
          </p>
        </div>

        <button
          type="button"
          onClick={() => clearCart(false)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Right: Price Details */}
        <div className="lg:col-span-4">
          <PriceDetails
            ctaLabel="Proceed to Checkout"
            onCtaClick={() => navigate('/checkout')}
          />
        </div>
      </div>
    </div>
  );
}
