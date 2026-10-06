import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils/productArt.js';

export default function PriceDetails({ ctaLabel, onCtaClick, showCta = true }) {
  const {
    originalTotal,
    totalDiscount,
    deliveryCharge,
    tax,
    finalTotal,
    totalItems
  } = useCart();

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs sticky top-22">
      <h2 className="text-sm font-bold text-slate-800 pb-3.5 border-b border-slate-200">
        Price Details ({totalItems} {totalItems === 1 ? 'Item' : 'Items'})
      </h2>

      <div className="py-4 space-y-3 text-sm">
        <div className="flex items-center justify-between text-slate-600">
          <span>Product Total (MRP)</span>
          <span className="font-medium text-slate-900 tabular-nums">
            {formatPrice(originalTotal)}
          </span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <span>Discount on MRP</span>
          <span className="font-medium text-emerald-700 tabular-nums">
            - {formatPrice(totalDiscount)}
          </span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <span>Delivery Charge</span>
          {deliveryCharge === 0 ? (
            <span className="font-semibold text-emerald-700">FREE</span>
          ) : (
            <span className="font-medium text-slate-900 tabular-nums">
              {formatPrice(deliveryCharge)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <span>Estimated GST / Taxes (5%)</span>
          <span className="font-medium text-slate-900 tabular-nums">
            {formatPrice(tax)}
          </span>
        </div>
      </div>

      <div className="pt-3.5 border-t border-slate-200 flex items-center justify-between">
        <span className="text-base font-bold text-slate-900">Final Total</span>
        <span className="text-lg font-bold text-slate-900 tabular-nums">
          {formatPrice(finalTotal)}
        </span>
      </div>

      {totalDiscount > 0 && (
        <p className="mt-3 text-xs font-semibold text-emerald-700 bg-emerald-50/80 px-3 py-2 rounded-lg">
          You will save {formatPrice(totalDiscount)} on this order
        </p>
      )}

      {showCta && (
        <button
          type="button"
          onClick={onCtaClick}
          className="mt-5 w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer whitespace-nowrap"
        >
          <span>{ctaLabel || 'Proceed to Checkout'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Safe and Secure Payments. 100% Authentic Products.</span>
      </div>
    </div>
  );
}
