import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Store,
  Package,
  LogOut,
  LogIn,
  ChevronDown,
  Search,
  CheckCircle2
} from 'lucide-react';
import SearchBar from './SearchBar.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { categories } from '../data/categories.js';

export default function Navbar() {
  const { totalItems, user, logoutUser } = useCart();
  const { wishlistItems } = useWishlist();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [sellerModalOpen, setSellerModalOpen] = useState(false);
  const [sellerBusiness, setSellerBusiness] = useState('');
  const [sellerGst, setSellerGst] = useState('');

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSellerSubmit = (e) => {
    e.preventDefault();
    setSellerModalOpen(false);
    setSellerBusiness('');
    setSellerGst('');
    showToast('Seller application registered! Our onboarding team will reach out.', 'success');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
          {/* Zone 1: Brand Title + Mobile Menu Trigger */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden p-2 -ml-1 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold tracking-tight text-indigo-600 font-display whitespace-nowrap"
            >
              NovaMart
            </Link>
          </div>

          {/* Zone 2: Desktop Search Bar & Quick Links */}
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-auto">
            <SearchBar />
          </div>

          {/* Zone 3: Actions (Login, Become a Seller, Wishlist, Cart, Profile) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Mobile Search Toggle */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen((prev) => !prev)}
              aria-label="Toggle search bar"
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Login Button */}
            {!user.isLoggedIn ? (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors whitespace-nowrap"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors whitespace-nowrap"
              >
                <span>Login</span>
              </Link>
            )}

            {/* Become a Seller */}
            <button
              type="button"
              onClick={() => setSellerModalOpen(true)}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Store className="w-4 h-4 text-slate-500" />
              <span>Become a Seller</span>
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative p-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Heart className="w-5 h-5" />
              <span className="hidden xl:inline text-sm font-medium">Wishlist</span>
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 right-0.5 xl:static xl:ml-0.5 min-w-[18px] h-[18px] px-1 text-[11px] font-bold bg-rose-600 text-white rounded-full flex items-center justify-center tabular-nums">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              aria-label="Shopping Cart"
              className="relative p-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 right-0.5 sm:static sm:ml-0.5 min-w-[18px] h-[18px] px-1 text-[11px] font-bold bg-indigo-600 text-white rounded-full flex items-center justify-center tabular-nums">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User / Profile Dropdown Menu */}
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                aria-label="User account menu"
                className="flex items-center gap-1.5 p-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <User className="w-5 h-5" />
                <span className="hidden md:inline text-sm font-medium max-w-[100px] truncate">
                  {user.isLoggedIn ? user.name.split(' ')[0] : 'Account'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:inline" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {user.isLoggedIn ? user.name : 'Welcome Guest'}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {user.isLoggedIn ? user.email : 'Sign in for seamless checkout'}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                    >
                      <Package className="w-4 h-4 text-slate-400" />
                      <span>Orders</span>
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                    >
                      <Heart className="w-4 h-4 text-slate-400" />
                      <span>Wishlist ({wishlistItems.length})</span>
                    </Link>
                    <Link
                      to="/products"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                    >
                      <Store className="w-4 h-4 text-slate-400" />
                      <span>All Products</span>
                    </Link>
                  </div>
                  <div className="border-t border-slate-100 pt-1">
                    {user.isLoggedIn ? (
                      <button
                        type="button"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logoutUser();
                          navigate('/login');
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Login / Register</span>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Expandable Search Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden px-4 pb-3 bg-white border-t border-slate-100 pt-2">
            <SearchBar onSearchComplete={() => setMobileSearchOpen(false)} />
          </div>
        )}
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <p className="text-base font-bold font-display">NovaMart</p>
                <p className="text-xs text-slate-300 mt-0.5">
                  {user.isLoggedIn ? `Hello, ${user.name}` : 'Welcome Guest'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-1.5 text-slate-300 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 border-b border-slate-100">
              <p className="text-xs font-semibold text-slate-400 mb-2">Shop By Category</p>
              <div className="grid grid-cols-1 gap-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${encodeURIComponent(cat.slug)}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-4 flex flex-col gap-1">
              <p className="text-xs font-semibold text-slate-400 mb-2">My Account</p>
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                All Products Catalog
              </Link>
              <Link
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                My Orders
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                My Wishlist ({wishlistItems.length})
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                User Profile & Addresses
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSellerModalOpen(true);
                }}
                className="text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Become a Seller
              </button>
              <div className="pt-3 mt-2 border-t border-slate-100 flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Become a Seller Modal */}
      {sellerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Sell on NovaMart</h3>
                  <p className="text-xs text-slate-500">0% commission for your first 30 days</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSellerModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSellerSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Business / Store Name
                </label>
                <input
                  type="text"
                  required
                  value={sellerBusiness}
                  onChange={(e) => setSellerBusiness(e.target.value)}
                  placeholder="e.g. Apex Audio & Electronics"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-indigo-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  GSTIN or PAN Number
                </label>
                <input
                  type="text"
                  required
                  value={sellerGst}
                  onChange={(e) => setSellerGst(e.target.value)}
                  placeholder="e.g. 29ABCDE1234F1Z5"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-indigo-600 focus:outline-none"
                />
              </div>
              <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-600 space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Reach 19,000+ pincodes across India</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>7-day guaranteed direct bank settlements</span>
                </div>
              </div>
              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setSellerModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer"
                >
                  Register Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
