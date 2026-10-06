import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Share2, MessageSquare, Mail, Phone, MapPin, X } from 'lucide-react';
import { useToast } from '../context/ToastContext.jsx';

const infoContent = {
  About: {
    title: 'About NovaMart India',
    body: 'NovaMart is a modern Indian digital retail storefront connecting verified brands, independent studios, and millions of households across 19,000+ pincodes. Built on transparent pricing, 100% genuine inventory, and express doorstep logistics.'
  },
  Contact: {
    title: 'Contact Customer Care',
    body: 'Reach our 24/7 support desk at support@novamart.in or call our toll-free helpline 1800-208-9898. Corporate Headquarters: Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103.'
  },
  Careers: {
    title: 'Careers at NovaMart',
    body: 'We are hiring across Frontend Engineering, Supply Chain Operations, Product Design, and Category Management in Bengaluru, Mumbai, and Gurugram.'
  },
  'Help Center': {
    title: '24/7 Help Center',
    body: 'Track orders, manage returns, download GST invoices, or request instant warranty support directly from your Orders dashboard.'
  },
  Returns: {
    title: 'Easy 7-Day Returns & Replacements',
    body: 'All eligible products come with a hassle-free 7-day return or replacement policy. Instant refunds are processed to your original payment mode upon doorstep pickup.'
  },
  Shipping: {
    title: 'Express Shipping Policy',
    body: 'Orders above ₹499 qualify for Free Express Delivery. Next-day delivery is available across 45+ metro and Tier-1 Indian cities.'
  },
  'Privacy Policy': {
    title: 'Privacy & Data Protection Policy',
    body: 'We adhere strictly to Digital Personal Data Protection (DPDP) standards. Your personal addresses, order history, and payment preferences are never shared with third-party advertisers.'
  },
  'Terms & Conditions': {
    title: 'Terms of Use & Sale',
    body: 'All products listed on NovaMart are covered by official manufacturer warranties and transparent GST invoicing.'
  }
};

export default function Footer() {
  const [activeInfoKey, setActiveInfoKey] = useState(null);
  const { showToast } = useToast();

  const handleSocialClick = (platform) => {
    showToast(`Following NovaMart on ${platform}`, 'info');
  };

  return (
    <>
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <Link
                to="/"
                className="text-2xl font-bold tracking-tight text-white font-display inline-block"
              >
                NovaMart
              </Link>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                Your trusted destination for flagship electronics, contemporary fashion, smart home
                appliances, and everyday essentials delivered across India.
              </p>
              <div className="space-y-1.5 text-xs text-slate-400 pt-1">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Embassy TechVillage, Outer Ring Rd, Bengaluru 560103</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span className="tabular-nums">1800-208-9898 (24/7 Toll-Free Support)</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>care@novamart.in</span>
                </p>
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2.5 text-sm">
                {['About', 'Contact', 'Careers'].map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => setActiveInfoKey(item)}
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  </li>
                ))}
                <li>
                  <Link
                    to="/products"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Store Directory
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Customer Service</h3>
              <ul className="space-y-2.5 text-sm">
                {['Help Center', 'Returns', 'Shipping'].map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => setActiveInfoKey(item)}
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  </li>
                ))}
                <li>
                  <Link
                    to="/orders"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Track Orders
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Social */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2.5 text-sm mb-6">
                {['Privacy Policy', 'Terms & Conditions'].map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => setActiveInfoKey(item)}
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>

              <h4 className="text-xs font-semibold text-slate-400 mb-3">Connect With Us</h4>
              <div className="flex items-center gap-2.5">
                {[
                  { label: 'Web Community', icon: Globe },
                  { label: 'Social Updates', icon: Share2 },
                  { label: 'Customer Forum', icon: MessageSquare }
                ].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handleSocialClick(label)}
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} NovaMart Retail Pvt. Ltd. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>100% Authentic Inventory</span>
              <span aria-hidden="true">·</span>
              <span>UPI / Cards / NetBanking / COD</span>
              <span aria-hidden="true">·</span>
              <span>ISO 27001 Secure Checkout</span>
            </div>
          </div>
        </div>
      </footer>

      {activeInfoKey && infoContent[activeInfoKey] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-slate-900">
                {infoContent[activeInfoKey].title}
              </h3>
              <button
                type="button"
                onClick={() => setActiveInfoKey(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              {infoContent[activeInfoKey].body}
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setActiveInfoKey(null)}
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
