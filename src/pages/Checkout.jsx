import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  CreditCard,
  Banknote,
  Smartphone,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ShoppingBag
} from 'lucide-react';
import PriceDetails from '../components/PriceDetails.jsx';
import { useCart } from '../context/CartContext.jsx';
import { products } from '../data/products.js';
import { formatPrice } from '../utils/productArt.js';

const paymentMethodsList = [
  {
    id: 'Cash on Delivery',
    title: 'Cash on Delivery (COD)',
    subtitle: 'Pay in cash or via UPI QR at the time of doorstep delivery',
    icon: Banknote
  },
  {
    id: 'UPI',
    title: 'UPI (Google Pay, PhonePe, Paytm, BHIM)',
    subtitle: 'Instant payment using any UPI app · Flat ₹150 cashback eligible',
    icon: Smartphone
  },
  {
    id: 'Credit/Debit Card',
    title: 'Credit / Debit Card',
    subtitle: 'Visa, Mastercard, RuPay · 10% Instant Discount on HDFC & ICICI Cards',
    icon: CreditCard
  },
  {
    id: 'Net Banking',
    title: 'Net Banking',
    subtitle: 'All major Indian banks supported (SBI, HDFC, ICICI, Axis, Kotak)',
    icon: Building2
  }
];

export default function Checkout() {
  const { cartItems, user, placeOrder, addToCart } = useCart();
  const navigate = useNavigate();

  const defaultAddr = user.addresses?.[0] || {
    fullName: user.name || 'Piyush Pant',
    mobile: '9876543210',
    address: 'Flat 402, Skylark Residency, 100ft Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038'
  };

  const [formData, setFormData] = useState({
    fullName: defaultAddr.fullName,
    mobile: defaultAddr.mobile,
    address: defaultAddr.address,
    city: defaultAddr.city,
    state: defaultAddr.state,
    pincode: defaultAddr.pincode
  });

  const [selectedPayment, setSelectedPayment] = useState('Cash on Delivery');
  const [upiId, setUpiId] = useState('piyushpant@okicici');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectSavedAddress = (addr) => {
    setFormData({
      fullName: addr.fullName,
      mobile: addr.mobile,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const order = placeOrder({
      address: formData,
      paymentMethod: selectedPayment
    });
    navigate('/order-success', { state: { order } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-10">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-display">
            No items in cart for checkout
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Add products to your cart first, or load a sample item below to test the checkout flow.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => addToCart(products[0], 1)}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl cursor-pointer"
            >
              Load Sample Item & Continue
            </button>
            <Link
              to="/products"
              className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
          Secure Checkout
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Complete your delivery address and select a preferred payment method
        </p>
      </div>

      <form
        onSubmit={handlePlaceOrder}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
      >
        {/* Left Column: Address Form, Order Items Summary & Payment Method */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Delivery Address Section */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-slate-900">1. Delivery Address</h2>
              </div>
            </div>

            {/* Quick Select from Saved Addresses */}
            {user.addresses?.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-semibold text-slate-500 mb-2">
                  Quick-fill from saved addresses:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {user.addresses.map((addr) => (
                    <button
                      key={addr.id}
                      type="button"
                      onClick={() => handleSelectSavedAddress(addr)}
                      className={`text-left p-3 rounded-xl border transition-colors cursor-pointer ${
                        formData.pincode === addr.pincode && formData.address === addr.address
                          ? 'border-indigo-600 bg-indigo-50/40'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">
                          {addr.fullName} · {addr.type}
                        </span>
                        {formData.pincode === addr.pincode && (
                          <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-1">{addr.address}</p>
                      <p className="text-xs text-slate-500 tabular-nums">
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter recipient full name"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-indigo-600 focus:outline-none tabular-nums"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Street Address (House No, Building, Area) *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Flat / House No., Building, Street, Landmark"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g. Bengaluru"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="e.g. Karnataka"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="560038"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-indigo-600 focus:outline-none tabular-nums"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 2. Order Summary Items */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
            <h2 className="text-base font-bold text-slate-900 mb-4">
              2. Order Summary ({cartItems.length} {cartItems.length === 1 ? 'Product' : 'Products'})
            </h2>
            <div className="divide-y divide-slate-100">
              {cartItems.map((item) => (
                <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-lg object-cover bg-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{item.name}</p>
                    <p className="text-xs text-slate-500 tabular-nums">
                      {item.brand} · Qty: {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-slate-900 tabular-nums shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Payment Method Section */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
            <h2 className="text-base font-bold text-slate-900 mb-4">3. Select Payment Method</h2>
            <div className="space-y-3">
              {paymentMethodsList.map((method) => {
                const Icon = method.icon;
                const isSelected = selectedPayment === method.id;
                return (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`rounded-xl border p-4 transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/30'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={isSelected}
                        onChange={() => setSelectedPayment(method.id)}
                        className="mt-1 w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-indigo-600" />
                          <span className="text-sm font-bold text-slate-900">{method.title}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{method.subtitle}</p>

                        {/* Contextual Input for UPI */}
                        {isSelected && method.id === 'UPI' && (
                          <div className="mt-3 max-w-xs" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="text"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              placeholder="yourname@upi"
                              className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-slate-300 focus:border-indigo-600 focus:outline-none"
                            />
                          </div>
                        )}

                        {/* Contextual Input for Card */}
                        {isSelected && method.id === 'Credit/Debit Card' && (
                          <div
                            className="mt-3 grid grid-cols-3 gap-2 max-w-md"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="text"
                              defaultValue="4532 •••• •••• 4829"
                              placeholder="Card Number"
                              className="col-span-2 px-3 py-2 text-xs bg-white rounded-lg border border-slate-300 tabular-nums"
                            />
                            <input
                              type="text"
                              defaultValue="08/29"
                              placeholder="MM/YY"
                              className="px-3 py-2 text-xs bg-white rounded-lg border border-slate-300 tabular-nums"
                            />
                          </div>
                        )}

                        {/* Contextual Input for Net Banking */}
                        {isSelected && method.id === 'Net Banking' && (
                          <div className="mt-3 max-w-xs" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={selectedBank}
                              onChange={(e) => setSelectedBank(e.target.value)}
                              className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-slate-300"
                            >
                              <option>HDFC Bank</option>
                              <option>ICICI Bank</option>
                              <option>State Bank of India (SBI)</option>
                              <option>Axis Bank</option>
                              <option>Kotak Mahindra Bank</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Buyer Protection & Official Brand Warranty</span>
              </div>
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                Place Order
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: Price Details & Place Order CTA */}
        <div className="lg:col-span-4">
          <PriceDetails
            ctaLabel="Place Order"
            onCtaClick={() => {
              const order = placeOrder({
                address: formData,
                paymentMethod: selectedPayment
              });
              navigate('/order-success', { state: { order } });
            }}
          />
        </div>
      </form>
    </div>
  );
}
