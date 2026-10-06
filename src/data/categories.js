export const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'Electronics',
    icon: 'Headphones',
    description: 'Flagship audio, noise-cancelling headphones, smart laptops, and studio accessories',
    itemCount: 6,
    accent: 'from-indigo-500/10 to-slate-500/5',
    iconColor: 'text-indigo-600',
    bgLight: 'bg-indigo-50/80'
  },
  {
    id: 'mobiles',
    name: 'Mobiles',
    slug: 'Mobiles',
    icon: 'Smartphone',
    description: '5G flagship smartphones, foldables, pro camera phones, and fast-charging devices',
    itemCount: 4,
    accent: 'from-blue-500/10 to-indigo-500/5',
    iconColor: 'text-blue-600',
    bgLight: 'bg-blue-50/80'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'Fashion',
    icon: 'Shirt',
    description: 'Contemporary Indian & western wear, tailored jackets, sneakers, and everyday apparel',
    itemCount: 4,
    accent: 'from-violet-500/10 to-slate-500/5',
    iconColor: 'text-violet-600',
    bgLight: 'bg-violet-50/80'
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    slug: 'Home & Kitchen',
    icon: 'Coffee',
    description: 'Barista coffee makers, air fryers, smart purifiers, and architectural home essentials',
    itemCount: 4,
    accent: 'from-amber-500/10 to-slate-500/5',
    iconColor: 'text-amber-700',
    bgLight: 'bg-amber-50/80'
  },
  {
    id: 'beauty',
    name: 'Beauty',
    slug: 'Beauty',
    icon: 'Sparkles',
    description: 'Dermatologist-formulated skincare serums, organic grooming, and luxury fragrances',
    itemCount: 3,
    accent: 'from-rose-500/10 to-slate-500/5',
    iconColor: 'text-rose-600',
    bgLight: 'bg-rose-50/80'
  },
  {
    id: 'grocery',
    name: 'Grocery',
    slug: 'Grocery',
    icon: 'ShoppingBasket',
    description: 'Single-origin estate coffee, organic dry fruits, artisanal honey, and gourmet pantry staples',
    itemCount: 3,
    accent: 'from-emerald-500/10 to-slate-500/5',
    iconColor: 'text-emerald-600',
    bgLight: 'bg-emerald-50/80'
  },
  {
    id: 'sports',
    name: 'Sports',
    slug: 'Sports',
    icon: 'Dumbbell',
    description: 'Pro-grade fitness equipment, English willow cricket gear, yoga mats, and running essentials',
    itemCount: 3,
    accent: 'from-cyan-500/10 to-slate-500/5',
    iconColor: 'text-cyan-600',
    bgLight: 'bg-cyan-50/80'
  },
  {
    id: 'books',
    name: 'Books',
    slug: 'Books',
    icon: 'BookOpen',
    description: 'Bestselling Indian non-fiction, software architecture, personal finance, and design editions',
    itemCount: 3,
    motif: 'editorial',
    accent: 'from-teal-500/10 to-slate-500/5',
    iconColor: 'text-teal-700',
    bgLight: 'bg-teal-50/80'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'Accessories',
    icon: 'Watch',
    description: 'Automatic chronographs, polarized eyewear, handcrafted leather bags, and travel gear',
    itemCount: 4,
    accent: 'from-slate-500/10 to-indigo-500/5',
    iconColor: 'text-slate-700',
    bgLight: 'bg-slate-100/80'
  }
];

export const heroSlides = [
  {
    id: 1,
    kicker: 'Flagship Tech Festival · Up to 45% Off',
    headline: 'Big Savings, Better Shopping',
    subtitle: 'Discover top products at amazing prices. Next-generation smartphones, studio headphones, and ultra-light laptops with instant bank discounts.',
    primaryCta: 'Shop Now',
    primaryLink: '/products',
    secondaryCta: 'Explore Deals',
    secondaryLink: '/category/Electronics',
    offerText: 'Extra ₹3,000 Instant Discount on Selected Cards · No-Cost EMI up to 12 Months',
    image: '/src/assets/images/hero_electronics_showcase_1791269813742.jpg',
    badge: 'Top Rated Electronics'
  },
  {
    id: 2,
    kicker: 'New Season Wardrobe · Direct From Studios',
    headline: 'Elevated Everyday Style & Accessories',
    subtitle: 'Curated contemporary apparel, automatic timepieces, and handcrafted footwear designed for modern comfort and durability.',
    primaryCta: 'Shop Fashion',
    primaryLink: '/category/Fashion',
    secondaryCta: 'View Accessories',
    secondaryLink: '/category/Accessories',
    offerText: 'Flat 30% to 55% Off on New Season Arrivals · Free 7-Day Size Exchange',
    image: '/src/assets/images/hero_fashion_lifestyle_1791269836044.jpg',
    badge: '2026 Collection'
  },
  {
    id: 3,
    kicker: 'Smart Home Upgrade · Architectural Living',
    headline: 'Transform Your Home & Kitchen Space',
    subtitle: 'From barista-grade espresso machines to smart air purifiers and precision cookware built for Indian homes.',
    primaryCta: 'Explore Home',
    primaryLink: '/category/Home%20%26%20Kitchen',
    secondaryCta: 'All Categories',
    secondaryLink: '/products',
    offerText: 'Free Doorstep Installation & Extended 2-Year Brand Warranty Included',
    image: '/src/assets/images/hero_home_living_1791269847586.jpg',
    badge: 'Home Essentials'
  }
];

export const promoBanners = [
  {
    id: 'electronics-sale',
    title: 'Electronics Sale',
    subtitle: 'Pro Audio, Smartwatches & Laptops',
    offer: 'Up to 50% Off + Free Express Delivery',
    link: '/category/Electronics',
    image: '/src/assets/images/promo_electronics_sale_1791269863097.jpg',
    cta: 'Shop Electronics'
  },
  {
    id: 'fashion-deals',
    title: 'Fashion Deals',
    subtitle: 'Tailored Apparel, Eyewear & Timepieces',
    offer: 'Min. 35% Off on Top Brands',
    link: '/category/Fashion',
    image: '/src/assets/images/promo_fashion_essentials_1791269874633.jpg',
    cta: 'Explore Fashion'
  },
  {
    id: 'home-essentials',
    title: 'Home Essentials',
    subtitle: 'Coffee Makers, Air Fryers & Smart Living',
    offer: 'Starting at ₹1,299 · Exchange Offers',
    link: '/category/Home%20%26%20Kitchen',
    image: '/src/assets/images/hero_home_living_1791269847586.jpg',
    cta: 'Upgrade Home'
  }
];
