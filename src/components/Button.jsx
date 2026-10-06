import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  onClick,
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-xs',
    secondary: 'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 shadow-xs',
    outline:
      'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 hover:border-slate-400',
    subtle: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900',
    danger: 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs min-h-[36px]',
    md: 'px-4 py-2.5 text-sm min-h-[42px]',
    lg: 'px-6 py-3 text-base min-h-[48px]'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.md
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
