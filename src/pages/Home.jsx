import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  Truck,
  ShieldCheck,
  RotateCcw,
  Award,
  HeadphonesIcon
} from 'lucide-react';
import HeroBanner from '../components/HeroBanner.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { categories, promoBanners } from '../data/categories.js';
import { products } from '../data/products.js';

const trustFeatures = [
  {
    title: 'Free Delivery',
    description: 'Complimentary express delivery on orders above ₹499 across India',
    icon: Truck
  },
  {
    title: 'Secure Payments',
    description: '256-bit encrypted UPI, Cards, NetBanking & Cash on Delivery',
    icon: ShieldCheck
  },
  {
    title: 'Easy Returns',
    description: 'Hassle-free 7-day doorstep return and instant refund policy',
    icon: RotateCcw
  },
  {
    title: 'Genuine Products',
    description: '100% brand-authorized inventory with official GST invoice',
    icon: Award
  },
  {
    title: '24/7 Support',
    description: 'Dedicated customer care specialists available round the clock',
    icon: HeadphonesIcon
  }
];

export default function Home() {
  // Frontend countdown timer for Flash Deals (starts at 04h 38m 19s)
  const [secondsLeft, setSecondsLeft] = useState(4 * 3600 + 38 * 60 + 19);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 4 * 3600 + 59 * 60 + 59));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 8);
  const recommendedProducts = products.filter((p) => p.isRecommended).slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-12 sm:space-y-16">
      {/* 1. Hero Banner Carousel */}
      <HeroBanner />

      {/* 2. Categories Section */}
      <section aria-labelledby="categories-heading">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2
              id="categories-heading"
              className="text-xl sm:text-2xl font-bold text-slate-900 font-display"
            >
              Shop by Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Explore 9 curated departments tailored for everyday needs
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 whitespace-nowrap"
          >
            <span>All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 pb-2 sm:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 3. Flash Deals Section with Countdown */}
      <section
        aria-labelledby="flash-deals-heading"
        className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div>
              <h2
                id="flash-deals-heading"
                className="text-xl sm:text-2xl font-bold text-slate-900 font-display"
              >
                Flash Deals of the Day
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Limited-time price drops on top-rated electronics & lifestyle picks
              </p>
            </div>

            {/* Countdown Timer UI */}
            <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-3.5 py-2 rounded-xl text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="text-slate-300">Ends in</span>
              <span className="font-mono-tabular tracking-wider text-sm text-white">
                {hours}h : {minutes}m : {seconds}s
              </span>
            </div>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 whitespace-nowrap"
          >
            <span>View All Deals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {flashDeals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Trending Products Grid */}
      <section aria-labelledby="trending-heading">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2
              id="trending-heading"
              className="text-xl sm:text-2xl font-bold text-slate-900 font-display"
            >
              Trending Across India
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Most-purchased flagship phones, audio gear, and bestseller editions this week
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 whitespace-nowrap"
          >
            <span>Browse Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Promotional Section (3 Curated Banners) */}
      <section aria-labelledby="promo-heading">
        <div className="mb-5">
          <h2
            id="promo-heading"
            className="text-xl sm:text-2xl font-bold text-slate-900 font-display"
          >
            Curated Storefront Spotlights
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Direct brand savings on electronics, seasonal fashion, and kitchen upgrades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {promoBanners.map((banner) => (
            <Link
              key={banner.id}
              to={banner.link}
              className="group relative h-64 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 flex flex-col justify-end p-6 shadow-xs hover:shadow-lg transition-all duration-150"
            >
              <img
                src={banner.image}
                alt={banner.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent" />
              <div className="relative z-10">
                <p className="text-xs font-medium text-indigo-300 mb-1">{banner.offer}</p>
                <h3 className="text-xl font-bold text-white font-display">{banner.title}</h3>
                <p className="text-xs text-slate-200 mt-0.5 mb-3">{banner.subtitle}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  <span>{banner.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Recommended Products */}
      <section aria-labelledby="recommended-heading">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2
              id="recommended-heading"
              className="text-xl sm:text-2xl font-bold text-slate-900 font-display"
            >
              Recommended For You
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Handpicked essentials rated 4.5★ and above by verified buyers
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 whitespace-nowrap"
          >
            <span>See All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Why Choose Us */}
      <section
        aria-labelledby="why-choose-heading"
        className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8"
      >
        <div className="mb-6">
          <h2
            id="why-choose-heading"
            className="text-lg sm:text-xl font-bold text-slate-900 font-display"
          >
            Why Millions Shop on NovaMart
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Every order is backed by our nationwide buyer protection guarantee
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {trustFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="flex flex-col items-start p-4 rounded-xl bg-slate-50/80 border border-slate-100"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{feat.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
