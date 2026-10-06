import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react';
import { heroSlides } from '../data/categories.js';

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[360px] sm:min-h-[420px]">
        {/* Left Copy Column */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center z-10">
          <p className="text-xs sm:text-sm font-medium text-indigo-400 tracking-wide mb-2.5">
            {slide.kicker}
          </p>
          <h1
            className="text-2xl sm:text-4xl lg:text-[40px] font-bold text-white leading-tight tracking-tight font-display max-w-xl"
            style={{ textWrap: 'balance' }}
          >
            {slide.headline}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3.5 max-w-lg leading-relaxed">
            {slide.subtitle}
          </p>

          {/* Offer Information */}
          <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm text-emerald-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{slide.offerText}</span>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to={slide.primaryLink}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors whitespace-nowrap"
            >
              <span>{slide.primaryCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to={slide.secondaryLink}
              className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors whitespace-nowrap"
            >
              {slide.secondaryCta}
            </Link>
          </div>
        </div>

        {/* Right Product Imagery Column */}
        <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-full w-full overflow-hidden bg-slate-800">
          <img
            src={slide.image}
            alt={slide.headline}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-opacity duration-200"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-slate-900/30 to-transparent" />
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-20 flex items-center gap-2">
        <div className="flex items-center gap-1.5 mr-2">
          {heroSlides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentSlide ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="w-8 h-8 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="w-8 h-8 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
