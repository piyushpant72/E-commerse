import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Calendar, CreditCard, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils/productArt.js';

export default function OrderSuccess() {
  const location = useLocation();
  const { lastPlacedOrder, orders } = useCart();

  const order = location.state?.order || lastPlacedOrder || orders[0];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-xs text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 ring-8 ring-emerald-50/50">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <p className="text-xs font-bold text-emerald-700 tracking-wide mb-1">
          Confirmation Receipt Sent
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
          Order Placed Successfully
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          Thank you for shopping with NovaMart. Your order is confirmed and being prepared for
          dispatch.
        </p>

        {/* Order Summary Box */}
        <div className="mt-8 bg-slate-50 rounded-xl border border-slate-200/80 p-5 text-left space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-slate-200/80">
            <div>
              <p className="text-xs text-slate-500">Order ID</p>
              <p className="text-sm font-bold text-indigo-600 font-mono-tabular mt-0.5">
                {order?.id || 'ORD-948201'}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Estimated Delivery</span>
              </p>
              <p className="text-sm font-bold text-emerald-700 mt-0.5">
                {order?.deliveryDate || 'Within 3 Business Days'}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                <span>Total Amount</span>
              </p>
              <p className="text-base font-bold text-slate-900 tabular-nums mt-0.5">
                {formatPrice(order?.totalAmount || 1499)} ({order?.paymentMethod || 'COD'})
              </p>
            </div>
          </div>

          {order?.address && (
            <div className="flex items-start gap-2.5 text-xs text-slate-600">
              <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800">Shipping To: </span>
                <span>{order.address}</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/orders"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors whitespace-nowrap"
          >
            <Package className="w-4 h-4" />
            <span>View Orders</span>
          </Link>
          <Link
            to="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors whitespace-nowrap"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
