import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  CreditCard
} from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils/productArt.js';

const statusConfig = {
  Processing: {
    icon: Clock,
    textClass: 'text-amber-700'
  },
  Shipped: {
    icon: Truck,
    textClass: 'text-indigo-600'
  },
  Delivered: {
    icon: CheckCircle2,
    textClass: 'text-emerald-700'
  },
  Cancelled: {
    icon: XCircle,
    textClass: 'text-rose-600'
  }
};

export default function Orders() {
  const { orders, cancelOrder } = useCart();
  const [statusFilter, setStatusFilter] = useState('All');
  const [expandedOrderId, setExpandedOrderId] = useState(orders[0]?.id || null);

  const filteredOrders =
    statusFilter === 'All' ? orders : orders.filter((o) => o.status === statusFilter);

  const toggleDetails = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Header & Status Filter Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">My Orders</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 tabular-nums">
            Track live shipments, download invoices, or manage returns ({orders.length} total orders)
          </p>
        </div>

        {/* Interactive Filter Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
          {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === status
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const cfg = statusConfig[order.status] || statusConfig.Processing;
          const StatusIcon = cfg.icon;
          const isExpanded = expandedOrderId === order.id;

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs"
            >
              {/* Order Top Summary Bar */}
              <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200/70 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                  <div>
                    <span className="text-slate-400 block">Order ID</span>
                    <span className="font-bold text-slate-900 font-mono-tabular">{order.id}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Order Date</span>
                    <span className="font-semibold text-slate-700">{order.date}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Total Price</span>
                    <span className="font-bold text-slate-900 tabular-nums">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 font-bold ${cfg.textClass}`}>
                    <StatusIcon className="w-4 h-4" />
                    <span>{order.status}</span>
                  </span>
                  <span className="text-slate-300" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-slate-600 font-medium">{order.deliveryDate}</span>
                </div>
              </div>

              {/* Order Items & View Details Button */}
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-3 flex-1">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <Link
                        to={`/product/${item.id}`}
                        className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 block"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <div className="min-w-0">
                        <Link
                          to={`/product/${item.id}`}
                          className="text-sm font-semibold text-slate-900 hover:text-indigo-600 line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
                          {item.brand} · Qty: {item.quantity} · {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {order.status === 'Processing' && (
                    <button
                      type="button"
                      onClick={() => cancelOrder(order.id)}
                      className="px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Cancel Order
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleDetails(order.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expandable Order Details Drawer */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-3 border-t border-slate-100 bg-slate-50/50 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-800 mb-0.5">Delivery Address</p>
                      <p>{order.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CreditCard className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-800 mb-0.5">Payment & Invoice Summary</p>
                      <p>
                        Payment Mode: <span className="font-semibold">{order.paymentMethod}</span> ·
                        Total Paid:{' '}
                        <span className="font-semibold tabular-nums">
                          {formatPrice(order.totalAmount)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
            <Package className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h2 className="text-base font-bold text-slate-900">
              No {statusFilter.toLowerCase()} orders found
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Switch filter tabs above to view all your historical orders.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
