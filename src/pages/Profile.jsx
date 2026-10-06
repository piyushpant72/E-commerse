import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  MapPin,
  Package,
  Heart,
  CreditCard,
  Settings,
  Plus,
  Trash2,
  LogOut,
  ShoppingCart
} from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { formatPrice } from '../utils/productArt.js';

const profileTabs = [
  { id: 'personal', label: 'Personal Information', icon: User },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'payments', label: 'Saved Payment Methods', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export default function Profile() {
  const {
    user,
    updateProfile,
    addAddress,
    removeAddress,
    orders,
    addToCart,
    logoutUser
  } = useCart();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('personal');

  // Personal Info form state
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [mobile, setMobile] = useState(user.mobile || '');
  const [gender, setGender] = useState(user.gender || 'Male');

  // New Address form state
  const [showAddrForm, setShowAddrForm] = useState(false);
  const [newAddr, setNewAddr] = useState({
    type: 'Home',
    fullName: user.name || '',
    mobile: '9876543210',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  // Settings toggles
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [dealAlerts, setDealAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);

  const handlePersonalSave = (e) => {
    e.preventDefault();
    updateProfile({ name, email, mobile, gender });
  };

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    addAddress(newAddr);
    setNewAddr({
      type: 'Home',
      fullName: user.name || '',
      mobile: '9876543210',
      address: '',
      city: '',
      state: '',
      pincode: ''
    });
    setShowAddrForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-4">
          {/* User Identity Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 flex items-center gap-3.5 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold text-lg flex items-center justify-center shrink-0 font-display">
              {(user.name || 'P')[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-400">Hello,</p>
              <h1 className="text-base font-bold text-slate-900 truncate">{user.name}</h1>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="bg-white rounded-2xl border border-slate-200/80 p-2 shadow-2xs flex lg:flex-col overflow-x-auto no-scrollbar gap-1">
            {profileTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => {
                logoutUser();
                navigate('/login');
              }}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors whitespace-nowrap cursor-pointer lg:mt-2 lg:border-t lg:border-slate-100"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Sign Out</span>
            </button>
          </nav>
        </aside>

        {/* Right Content Area */}
        <div className="lg:col-span-9 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs">
          {/* 1. Personal Information */}
          {activeTab === 'personal' && (
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-1">
                Personal Information
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Manage your account profile details and primary contact information
              </p>

              <form onSubmit={handlePersonalSave} className="max-w-xl space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-indigo-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-indigo-600 focus:outline-none tabular-nums"
                    />
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-semibold text-slate-700 mb-2">Gender</span>
                  <div className="flex items-center gap-6 text-sm">
                    {['Male', 'Female', 'Other'].map((g) => (
                      <label key={g} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          checked={gender === g}
                          onChange={() => setGender(g)}
                          className="w-4 h-4 text-indigo-600 border-slate-300"
                        />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 2. Addresses */}
          {activeTab === 'addresses' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                    Saved Delivery Addresses
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Manage your home and office shipping destinations
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddrForm((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Address</span>
                </button>
              </div>

              {showAddrForm && (
                <form
                  onSubmit={handleAddAddressSubmit}
                  className="mb-6 p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4"
                >
                  <h3 className="text-sm font-bold text-slate-900">New Delivery Address</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={newAddr.fullName}
                      onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                      className="px-3.5 py-2 text-sm bg-white rounded-lg border border-slate-300"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number"
                      value={newAddr.mobile}
                      onChange={(e) => setNewAddr({ ...newAddr, mobile: e.target.value })}
                      className="px-3.5 py-2 text-sm bg-white rounded-lg border border-slate-300 tabular-nums"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Street Address, Building, Area"
                      value={newAddr.address}
                      onChange={(e) => setNewAddr({ ...newAddr, address: e.target.value })}
                      className="sm:col-span-2 px-3.5 py-2 text-sm bg-white rounded-lg border border-slate-300"
                    />
                    <input
                      type="text"
                      required
                      placeholder="City"
                      value={newAddr.city}
                      onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                      className="px-3.5 py-2 text-sm bg-white rounded-lg border border-slate-300"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="State"
                        value={newAddr.state}
                        onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                        className="px-3.5 py-2 text-sm bg-white rounded-lg border border-slate-300"
                      />
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="Pincode"
                        value={newAddr.pincode}
                        onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                        className="px-3.5 py-2 text-sm bg-white rounded-lg border border-slate-300 tabular-nums"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddrForm(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(user.addresses || []).map((addr) => (
                  <div
                    key={addr.id}
                    className="p-4 rounded-xl border border-slate-200 flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-600">{addr.type}</span>
                        <button
                          type="button"
                          onClick={() => removeAddress(addr.id)}
                          aria-label="Delete address"
                          className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-slate-900 mt-1">{addr.fullName}</p>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-xs text-slate-500 mt-1.5 tabular-nums">
                        Phone: {addr.mobile}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Orders Preview */}
          {activeTab === 'orders' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                    Recent Orders ({orders.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Quick overview of your recent purchases
                  </p>
                </div>
                <Link
                  to="/orders"
                  className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Open Full Orders Page
                </Link>
              </div>

              <div className="space-y-3">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <p className="text-xs font-bold text-indigo-600 font-mono-tabular">
                        {ord.id} · {ord.date}
                      </p>
                      <p className="text-sm font-semibold text-slate-900 mt-0.5">
                        {ord.items.map((i) => i.name).join(', ')}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{ord.deliveryDate}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-sm font-bold text-slate-900 tabular-nums">
                        {formatPrice(ord.totalAmount)}
                      </span>
                      <Link
                        to="/orders"
                        className="px-3.5 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Wishlist Preview */}
          {activeTab === 'wishlist' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                    Saved Wishlist ({wishlistItems.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Products saved to your account
                  </p>
                </div>
                <Link
                  to="/wishlist"
                  className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Open Wishlist Page
                </Link>
              </div>

              {wishlistItems.length === 0 ? (
                <p className="text-sm text-slate-500 py-8 text-center">
                  Your wishlist is currently empty.
                </p>
              ) : (
                <div className="space-y-3">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-lg object-cover bg-slate-100 shrink-0"
                        />
                        <div className="min-w-0">
                          <Link
                            to={`/product/${item.id}`}
                            className="text-sm font-semibold text-slate-900 hover:text-indigo-600 truncate block"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs font-bold text-slate-800 tabular-nums mt-0.5">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => addToCart(item, 1)}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromWishlist(item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. Saved Payment Methods */}
          {activeTab === 'payments' && (
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-1">
                Saved Payment Methods
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Tokenized cards and verified UPI handles for 1-click checkout
              </p>

              <div className="space-y-3 max-w-xl">
                {(user.paymentMethods || []).map((pm) => (
                  <div
                    key={pm.id}
                    className="p-4 rounded-xl border border-slate-200 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-indigo-600">{pm.type}</p>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">{pm.label}</p>
                      <p className="text-xs text-slate-500">{pm.provider}</p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-700">Verified</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Settings */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-1">
                Account & Notification Settings
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Control how you receive shipment updates and promotional alerts
              </p>

              <div className="space-y-4 max-w-xl">
                {[
                  {
                    label: 'SMS & Email Shipment Tracking',
                    desc: 'Receive live dispatch and out-for-delivery alerts',
                    checked: orderUpdates,
                    onChange: setOrderUpdates
                  },
                  {
                    label: 'Price Drop & Wishlist Alerts',
                    desc: 'Get notified when items in your wishlist go on flash sale',
                    checked: dealAlerts,
                    onChange: setDealAlerts
                  },
                  {
                    label: 'WhatsApp Invoice & Delivery Updates',
                    desc: 'Receive instant digital GST invoices on WhatsApp',
                    checked: whatsappAlerts,
                    onChange: setWhatsappAlerts
                  }
                ].map((setting) => (
                  <label
                    key={setting.label}
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-200 cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-900">{setting.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{setting.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={setting.checked}
                      onChange={(e) => {
                        setting.onChange(e.target.checked);
                        showToast('Notification preference updated', 'info');
                      }}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
