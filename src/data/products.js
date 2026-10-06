import { createProductGallery } from '../utils/productArt.js';

const rawProducts = [
  {
    id: 1,
    name: 'SoundMax Studio ANC Wireless Bluetooth Headphones',
    brand: 'SoundMax',
    category: 'Electronics',
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    rating: 4.4,
    reviews: 1245,
    inStock: true,
    isFlashDeal: true,
    isTrending: true,
    isRecommended: true,
    delivery: 'Free delivery by Tomorrow',
    artType: 'headphones',
    colors: ['#1e1b4b', '#6366f1'],
    primaryPhoto: '/src/assets/images/promo_electronics_sale_1791269863097.jpg',
    description:
      'Engineered with 40mm neodymium acoustic drivers and hybrid active noise cancellation, the SoundMax Studio ANC headphones deliver deep bass, crisp vocals, and 30 hours of uninterrupted wireless playback.',
    highlights: [
      '40dB Hybrid Active Noise Cancellation with Transparency Mode',
      'Up to 30 Hours Battery Life · Fast Type-C Charge (10 min = 5 hrs)',
      'Dual Device Multipoint Bluetooth 5.3 Connectivity',
      'Memory-foam protein leather ear cushions for all-day comfort'
    ],
    specifications: {
      'Battery Life': '30 Hours',
      Connectivity: 'Bluetooth 5.3',
      'Driver Size': '40 mm Dynamic',
      'Noise Cancellation': 'Hybrid ANC up to 40 dB',
      'Charging Port': 'USB Type-C Fast Charge',
      Weight: '248 g',
      Warranty: '1 Year Brand Warranty'
    }
  },
  {
    id: 2,
    name: 'Apple iPhone 16 Pro 5G (Natural Titanium, 256 GB)',
    brand: 'Apple',
    category: 'Mobiles',
    price: 112900,
    originalPrice: 119900,
    discount: 6,
    rating: 4.8,
    reviews: 3420,
    inStock: true,
    isFlashDeal: false,
    isTrending: true,
    isRecommended: true,
    delivery: 'Free delivery by Tomorrow',
    artType: 'smartphone',
    colors: ['#334155', '#64748b'],
    primaryPhoto: '/src/assets/images/hero_electronics_showcase_1791269813742.jpg',
    description:
      'Forged in Grade 5 titanium, iPhone 16 Pro features the blazing-fast A18 Pro chip, a 48MP Fusion camera system with 5x Telephoto zoom, and a 6.3-inch Super Retina XDR ProMotion display.',
    highlights: [
      '256 GB ROM · Grade 5 Natural Titanium Enclosure',
      '16.0 cm (6.3 inch) Super Retina XDR Display with 120Hz ProMotion',
      '48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto Camera',
      'A18 Pro Bionic Chip with 16-core Neural Engine'
    ],
    specifications: {
      Display: '6.3-inch Super Retina XDR OLED (120Hz)',
      Processor: 'Apple A18 Pro Hexa-Core',
      Storage: '256 GB NVMe',
      'Rear Camera': '48MP + 48MP + 12MP (5x Optical Zoom)',
      'Front Camera': '12MP TrueDepth',
      Battery: 'Up to 27 Hours Video Playback',
      Warranty: '1 Year Apple India Manufacturer Warranty'
    }
  },
  {
    id: 3,
    name: 'Apple iPhone 15 5G (Midnight Blue, 128 GB)',
    brand: 'Apple',
    category: 'Mobiles',
    price: 64999,
    originalPrice: 79900,
    discount: 19,
    rating: 4.7,
    reviews: 5890,
    inStock: true,
    isFlashDeal: true,
    isTrending: true,
    isRecommended: false,
    delivery: 'Free delivery by Tomorrow',
    artType: 'smartphone',
    colors: ['#1e3a8a', '#3b82f6'],
    description:
      'Featuring the Dynamic Island, a 48MP Main camera with 2x optical-quality telephoto, color-infused back glass, and USB-C connectivity powered by the A16 Bionic processor.',
    highlights: [
      '128 GB Storage · Color-infused glass and aerospace aluminum',
      '15.49 cm (6.1 inch) Super Retina XDR Display with Dynamic Island',
      '48MP Main Camera with 2x Telephoto & Next-Gen Portraits',
      'A16 Bionic Chip · USB Type-C Connector · IP68 Water Resistant'
    ],
    specifications: {
      Display: '6.1-inch Super Retina XDR OLED',
      Processor: 'Apple A16 Bionic',
      Storage: '128 GB',
      'Rear Camera': '48MP Main + 12MP Ultra Wide',
      Connectivity: '5G, Wi-Fi 6, Bluetooth 5.3, USB-C',
      Resistance: 'IP68 Ceramic Shield',
      Warranty: '1 Year Apple India Warranty'
    }
  },
  {
    id: 4,
    name: 'Samsung Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)',
    brand: 'Samsung',
    category: 'Mobiles',
    price: 109999,
    originalPrice: 134999,
    discount: 19,
    rating: 4.7,
    reviews: 2180,
    inStock: true,
    isFlashDeal: false,
    isTrending: true,
    isRecommended: true,
    delivery: 'Free delivery by Tomorrow',
    artType: 'smartphone',
    colors: ['#0f172a', '#475569'],
    description:
      'Built with a titanium exterior and integrated S Pen, Galaxy S24 Ultra brings a 200MP Quad Tele camera system, Snapdragon 8 Gen 3 for Galaxy, and anti-reflective Gorilla Armor glass.',
    highlights: [
      '12 GB RAM | 256 GB ROM · Built-in Precision S Pen',
      '17.27 cm (6.8 inch) Quad HD+ Dynamic AMOLED 2X 120Hz Display',
      '200MP + 50MP + 12MP + 10MP Quad Rear Camera',
      '5000 mAh Battery with 45W Super Fast Charging'
    ],
    specifications: {
      Display: '6.8-inch QHD+ Dynamic AMOLED 2X',
      Processor: 'Snapdragon 8 Gen 3 for Galaxy',
      'RAM / Storage': '12 GB / 256 GB',
      Camera: '200MP Quad Camera with 100x Space Zoom',
      Battery: '5000 mAh',
      'S Pen': 'Included (Bluetooth Enabled)',
      Warranty: '1 Year Handset + 6 Months Accessories'
    }
  },
  {
    id: 5,
    name: 'OnePlus 12R 5G (Iron Gray, 16 GB RAM, 256 GB)',
    brand: 'OnePlus',
    category: 'Mobiles',
    price: 39999,
    originalPrice: 45999,
    discount: 13,
    rating: 4.5,
    reviews: 1640,
    inStock: true,
    isFlashDeal: true,
    isTrending: false,
    isRecommended: true,
    delivery: 'Free delivery in 2 days',
    artType: 'smartphone',
    colors: ['#334155', '#0ea5e9'],
    description:
      'Flagship performance meets endurance with a 5500 mAh battery, 100W SUPERVOOC charging, LTPO4.0 ProXDR 120Hz display, and Snapdragon 8 Gen 2 mobile platform.',
    highlights: [
      '16 GB LPDDR5X RAM | 256 GB UFS 4.0 Storage',
      '5500 mAh Battery with 100W SUPERVOOC Charger in Box',
      '50MP Sony IMX890 Main Sensor with OIS',
      'Cryo-Velocity VC Cooling System for Sustained Gaming'
    ],
    specifications: {
      Display: '6.78-inch 1.5K LTPO4 AMOLED (120Hz)',
      Processor: 'Qualcomm Snapdragon 8 Gen 2',
      'RAM / Storage': '16 GB / 256 GB',
      Battery: '5500 mAh (100W Charging)',
      OS: 'OxygenOS 14',
      Warranty: '1 Year Manufacturer Warranty'
    }
  },
  {
    id: 6,
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    brand: 'Sony',
    category: 'Electronics',
    price: 26990,
    originalPrice: 34990,
    discount: 23,
    rating: 4.8,
    reviews: 1890,
    inStock: true,
    isFlashDeal: false,
    isTrending: true,
    isRecommended: true,
    delivery: 'Free delivery by Tomorrow',
    artType: 'headphones',
    colors: ['#0f172a', '#475569'],
    description:
      'Industry-leading noise cancellation powered by two processors and eight microphones. Ultra-lightweight soft fit leather design with LDAC high-resolution wireless audio.',
    highlights: [
      'Integrated Processor V1 + HD Noise Cancelling Processor QN1',
      '8 Microphones for Crystal-Clear Voice Pickup on Calls',
      'Up to 30 Hours Battery Life · 3 Min Charge = 3 Hours Playback',
      'Speak-to-Chat & Adaptive Sound Control'
    ],
    specifications: {
      'Battery Life': '30 Hours (ANC On)',
      'Audio Codec': 'LDAC, AAC, SBC',
      Microphones: '8-Mic Beamforming Array',
      Weight: '250 g',
      'Carrying Case': 'Collapsible Soft Case Included',
      Warranty: '1 Year Sony India Warranty'
    }
  },
  {
    id: 7,
    name: 'Apple MacBook Air M3 (13.6-inch, 16GB RAM, 512GB SSD, Midnight)',
    brand: 'Apple',
    category: 'Electronics',
    price: 124900,
    originalPrice: 134900,
    discount: 7,
    rating: 4.9,
    reviews: 940,
    inStock: true,
    isFlashDeal: false,
    isTrending: true,
    isRecommended: true,
    delivery: 'Free delivery by Tomorrow',
    artType: 'laptop',
    colors: ['#1e293b', '#38bdf8'],
    description:
      'Supercharged by the M3 chip, the 13.6-inch MacBook Air combines portable anodized aluminum design with 18-hour battery life, Liquid Retina display, and MagSafe 3 charging.',
    highlights: [
      'Apple M3 8-Core CPU & 10-Core GPU with Hardware Ray Tracing',
      '16 GB Unified Memory · 512 GB PCIe SSD Storage',
      '34.46 cm (13.6-inch) Liquid Retina Display with 500 nits brightness',
      '1080p FaceTime HD Camera · Four-Speaker Sound System with Spatial Audio'
    ],
    specifications: {
      Processor: 'Apple M3 (8-Core CPU, 10-Core GPU)',
      Memory: '16 GB Unified RAM',
      Storage: '512 GB SSD',
      Display: '13.6-inch Liquid Retina (2560 x 1664)',
      Battery: 'Up to 18 Hours',
      Weight: '1.24 kg',
      Warranty: '1 Year Apple Limited Warranty'
    }
  },
  {
    id: 8,
    name: 'ASUS Vivobook 16X Creator Laptop (Intel Core i7 13th Gen, RTX 4050)',
    brand: 'ASUS',
    category: 'Electronics',
    price: 78990,
    originalPrice: 104990,
    discount: 25,
    rating: 4.5,
    reviews: 620,
    inStock: true,
    isFlashDeal: true,
    isTrending: false,
    isRecommended: false,
    delivery: 'Free delivery in 2 days',
    artType: 'laptop',
    colors: ['#334155', '#6366f1'],
    description:
      'Built for creators and engineers, featuring a 16-inch 120Hz FHD+ 16:10 display, Intel Core i7-13620H processor, NVIDIA GeForce RTX 4050 6GB GPU, and IceCool thermal technology.',
    highlights: [
      'Intel Core i7-13620H (10 Cores, up to 4.9 GHz) · RTX 4050 6GB GDDR6',
      '16 GB DDR4 RAM | 512 GB PCIe 4.0 NVMe M.2 SSD',
      '16-inch 16:10 120Hz Anti-Glare IPS Display (100% sRGB)',
      'Backlit Chiclet Keyboard with Fingerprint Sensor & 70Wh Battery'
    ],
    specifications: {
      Processor: 'Intel Core i7-13620H 13th Gen',
      Graphics: 'NVIDIA GeForce RTX 4050 6GB',
      'RAM / Storage': '16 GB / 512 GB Gen4 SSD',
      Display: '16-inch WUXGA (1920 x 1200) 120Hz',
      Weight: '1.80 kg',
      Warranty: '1 Year Onsite ASUS Warranty'
    }
  },
  {
    id: 9,
    name: 'Canon EOS R50 Mirrorless Camera with RF-S 18-45mm Lens',
    brand: 'Canon',
    category: 'Electronics',
    price: 61990,
    originalPrice: 75995,
    discount: 18,
    rating: 4.6,
    reviews: 412,
    inStock: true,
    isFlashDeal: false,
    isTrending: false,
    isRecommended: true,
    delivery: 'Free delivery in 2 days',
    artType: 'camera',
    colors: ['#1e293b', '#0284c7'],
    description:
      'Compact APS-C mirrorless camera with a 24.2MP CMOS sensor, DIGIC X image processor, uncropped 4K 30p video oversampled from 6K, and Dual Pixel CMOS AF II.',
    highlights: [
      '24.2 Megapixel APS-C CMOS Sensor with DIGIC X Processor',
      '6K Oversampled Uncropped 4K 30fps Video & Full HD 120fps',
      'Dual Pixel CMOS AF II with Subject Detection (People, Animals, Vehicles)',
      'Vari-Angle Touchscreen LCD & Electronic Viewfinder'
    ],
    specifications: {
      Sensor: '24.2MP APS-C CMOS',
      'Lens Mount': 'Canon RF (RF-S 18-45mm Included)',
      Video: '4K 30p / FHD 120p',
      'Continuous Shooting': 'Up to 15 fps Electronic Shutter',
      Weight: '375 g (Body Only)',
      Warranty: '2 Years Canon India Warranty'
    }
  },
  {
    id: 10,
    name: 'JBL Charge 5 Portable Waterproof Bluetooth Speaker',
    brand: 'JBL',
    category: 'Electronics',
    price: 12999,
    originalPrice: 18999,
    discount: 32,
    rating: 4.6,
    reviews: 2830,
    inStock: true,
    isFlashDeal: true,
    isTrending: true,
    isRecommended: false,
    delivery: 'Free delivery by Tomorrow',
    artType: 'speaker',
    colors: ['#1d4ed8', '#60a5fa'],
    description:
      'Take the party anywhere with JBL Original Pro Sound, an optimized long-excursion driver, separate tweeter, dual bass radiators, IP67 waterproofing, and built-in powerbank.',
    highlights: [
      '40W RMS Output with Dedicated Tweeter & Dual Passive Radiators',
      '20 Hours Playtime + Built-in 7500mAh Powerbank to Charge Devices',
      'IP67 Waterproof and Dustproof Fabric Enclosure',
      'PartyBoost Multi-Speaker Pairing Support'
    ],
    specifications: {
      'Output Power': '40W RMS',
      'Battery Life': '20 Hours',
      'Waterproof Rating': 'IP67',
      Connectivity: 'Bluetooth 5.1 + USB-A Charge Out',
      Weight: '960 g',
      Warranty: '1 Year Harman India Warranty'
    }
  },
  {
    id: 11,
    name: 'Indigo Loom Tailored Pure Linen Mandarin Collar Jacket',
    brand: 'Indigo Loom',
    category: 'Fashion',
    price: 3499,
    originalPrice: 6999,
    discount: 50,
    rating: 4.5,
    reviews: 530,
    inStock: true,
    isFlashDeal: false,
    isTrending: true,
    isRecommended: true,
    delivery: 'Free delivery in 2 days',
    artType: 'apparel',
    colors: ['#1e3a8a', '#93c5fd'],
    primaryPhoto: '/src/assets/images/hero_fashion_lifestyle_1791269836044.jpg',
    description:
      'Woven from 100% European flax linen, this unlined structural jacket features a clean mandarin collar, natural corozo nut buttons, and breathable tailoring suited for Indian climates.',
    highlights: [
      '100% Certified European Flax Linen (Pre-washed for softness)',
      'Contemporary Tailored Fit with Breathable Half-Canvas Lining',
      'Two Welted Chest & Waist Pockets + Interior Passport Pocket',
      'Ideal for Festive Occasions, Business Casual & Evening Wear'
    ],
    specifications: {
      Fabric: '100% Pure Linen (210 GSM)',
      Fit: 'Modern Tailored Fit',
      Collar: 'Band / Mandarin Collar',
      'Wash Care': 'Dry Clean or Gentle Cold Wash',
      Origin: 'Handcrafted in Bengaluru, India'
    }
  },
  {
    id: 12,
    name: 'Nike Air Zoom Pegasus 40 Road Running Shoes',
    brand: 'Nike',
    category: 'Fashion',
    price: 6799,
    originalPrice: 11495,
    discount: 41,
    rating: 4.7,
    reviews: 1420,
    inStock: true,
    isFlashDeal: true,
    isTrending: true,
    isRecommended: true,
    delivery: 'Free delivery by Tomorrow',
    artType: 'sneakers',
    colors: ['#0f172a', '#38bdf8'],
    description:
      'A springy ride for every run, the Peg 40 pairs Nike React foam with two Zoom Air units in the forefoot and heel for responsive cushioning and midfoot lockdown.',
    highlights: [
      'Dual Zoom Air Units (Forefoot & Heel) + Nike React Midsole Foam',
      'Engineered Single-Layer Mesh Upper for Targeted Breathability',
      'Waffle-Inspired Rubber Outsole for High-Mileage Traction',
      'Suede Midfoot Strap for Arch-Friendly Secure Fit'
    ],
    specifications: {
      'Upper Material': 'Engineered Breathable Mesh',
      Midsole: 'Nike React Foam + Dual Zoom Air',
      'Heel-to-Toe Drop': '10 mm',
      Weight: '288 g (UK 8)',
      Warranty: '6 Months Nike Manufacturing Warranty'
    }
  },
  {
    id: 13,
    name: 'Anokhi Jaipur Hand-Block Printed Mulmul Cotton Kurta Set',
    brand: 'Anokhi',
    category: 'Fashion',
    price: 2199,
    originalPrice: 3999,
    discount: 45,
    rating: 4.6,
    reviews: 875,
    inStock: true,
    isFlashDeal: false,
    isTrending: false,
    isRecommended: true,
    delivery: 'Free delivery in 3 days',
    artType: 'apparel',
    colors: ['#4f46e5', '#c7d2fe'],
    description:
      'Artisanal Sanganeri hand-block printed straight kurta crafted in featherlight 100% organic mulmul cotton, paired with tapered cotton trousers and a matching kota doria dupatta.',
    highlights: [
      'Authentic Hand-Block Print by Master Artisans in Jaipur',
      '3-Piece Set: Straight Kurta, Tapered Pants & Kota Doria Dupatta',
      'Natural Azo-Free Vegetable Dyes · Skin-Friendly Breathable Cotton',
      'Side Seam Pockets on Both Kurta and Trousers'
    ],
    specifications: {
      Material: '100% Combed Mulmul Cotton',
      'Set Contents': 'Kurta, Trousers, Dupatta',
      Sleeve: 'Three-Quarter Sleeves',
      Craft: 'Sanganeri Hand-Block Print',
      'Care Instructions': 'Gentle Hand Wash Separately'
    }
  },
  {
    id: 14,
    name: "Levi's 511 Slim Fit Selvedge Stretch Denim Jeans",
    brand: "Levi's",
    category: 'Fashion',
    price: 2399,
    originalPrice: 4599,
    discount: 48,
    rating: 4.4,
    reviews: 2190,
    inStock: true,
    isFlashDeal: false,
    isTrending: false,
    isRecommended: false,
    delivery: 'Free delivery by Tomorrow',
    artType: 'apparel',
    colors: ['#1e293b', '#475569'],
    description:
      'A modern slim with room to move, the 511 Slim Fit Jeans sit below the waist with a streamlined cut from hip to ankle, woven with sustainably sourced cotton and TENCEL Lyocell.',
    highlights: [
      '98% Cotton, 2% Elastane Comfort Stretch Indigo Denim',
      'Sits Below Waist · Slim Through Seat, Thigh & Leg Opening',
      'Made with Water<Less® Finishing Technique',
      'Classic 5-Pocket Styling with Iconic Arcuate Stitching'
    ],
    specifications: {
      Fit: '511 Slim Fit (Mid Rise)',
      Fabric: '98% Cotton, 2% Elastane (12.5 oz)',
      Closure: 'YKK Brass Zip Fly with Shank Button',
      Care: 'Machine Wash Cold Inside Out'
    }
  },
  {
    id: 15,
    name: 'DeLonghi Dedica Arte 15-Bar Manual Espresso Coffee Maker',
    brand: 'DeLonghi',
    category: 'Home & Kitchen',
    price: 16499,
    originalPrice: 24999,
    discount: 34,
    rating: 4.7,
    reviews: 740,
    inStock: true,
    isFlashDeal: true,
    isTrending: true,
    isRecommended: true,
    delivery: 'Free delivery by Tomorrow',
    artType: 'appliance',
    colors: ['#334155', '#94a3b8'],
    primaryPhoto: '/src/assets/images/hero_home_living_1791269847586.jpg',
    description:
      'Brew cafe-quality espresso and velvety microfoam lattes in a sleek 15cm wide brushed stainless steel body featuring Thermoblock heating and the My LatteArt commercial steam wand.',
    highlights: [
      '15-Bar Professional Pump Pressure & Fast 35-Second Thermoblock Heating',
      'My LatteArt Commercial Steam Wand for Silky Microfoam Texturing',
      'Ultra-Slim 15cm Footprint in Brushed Stainless Steel Finish',
      'Includes Metal Tamper, Milk Pitcher & Double-Wall Filter Baskets'
    ],
    specifications: {
      Pressure: '15 Bar Italian Pump',
      Power: '1300 Watts',
      'Water Tank': '1.1 Litres Detachable',
      Body: 'Brushed Stainless Steel',
      Dimensions: '14.9 x 33.0 x 30.5 cm',
      Warranty: '1 Year DeLonghi India Warranty'
    }
  },
  {
    id: 16,
    name: 'Philips Digital Air Fryer HD9252/90 with Rapid Air Technology (4.1L)',
    brand: 'Philips',
    category: 'Home & Kitchen',
    price: 7499,
    originalPrice: 11995,
    discount: 38,
    rating: 4.6,
    reviews: 4320,
    inStock: true,
    isFlashDeal: false,
    isTrending: true,
    isRecommended: true,
    delivery: 'Free delivery by Tomorrow',
    artType: 'appliance',
    colors: ['#0f172a', '#38bdf8'],
    description:
      'Enjoy crispy snacks and meals with up to 90% less oil. Features a digital touch screen with 7 presets, patented starfish bottom design for Rapid Air swirl, and dishwasher-safe QuickClean basket.',
    highlights: [
      'Patented Rapid Air Technology for Crispy Exterior & Tender Interior',
      '4.1 Litre Capacity (800g Fries) · 7 One-Touch Cooking Presets',
      'Keep Warm Function + Auto Shut-Off Timer up to 60 Minutes',
      'Non-Stick QuickClean Basket is 100% Dishwasher Safe'
    ],
    specifications: {
      Capacity: '4.1 Litres',
      Wattage: '1400 Watts',
      Control: 'Digital Touch Screen (7 Presets)',
      'Cord Length': '0.8 m',
      Warranty: '2 Years Philips Worldwide Guarantee'
    }
  },
  {
    id: 17,
    name: 'Dyson Purifier Cool Formaldehyde Smart Air Purifier (TP09)',
    brand: 'Dyson',
    category: 'Home & Kitchen',
    price: 44900,
    originalPrice: 56900,
    discount: 21,
    rating: 4.8,
    reviews: 510,
    inStock: true,
    isFlashDeal: false,
    isTrending: false,
    isRecommended: true,
    delivery: 'Free delivery by Tomorrow',
    artType: 'appliance',
    colors: ['#475569', '#eab308'],
    description:
      'Automatically detects and destroys formaldehyde, captures 99.95% of ultrafine pollutants as small as 0.1 microns with fully sealed HEPA H13 filtration, and projects purified cooling airflow.',
    highlights: [
      'Solid-State Formaldehyde Sensor + Catalytic Filter (Never Needs Replacing)',
      'Fully Sealed HEPA H13 + Activated Carbon 360° Filtration',
      'Air Multiplier™ Technology with 350° Oscillation & Backward Diffused Mode',
      'Real-Time AQI Display & MyDyson™ App / Voice Control'
    ],
    specifications: {
      Filtration: 'HEPA H13 + Activated Carbon + Catalytic SCO',
      Oscillation: 'Up to 350 Degrees',
      'Noise Level': '61.5 dB at Max Speed',
      Connectivity: 'Wi-Fi & Bluetooth (MyDyson App)',
      Warranty: '2 Years Dyson India Cord-Free Warranty'
    }
  },
  {
    id: 18,
    name: 'Meyer Cast Iron Pre-Seasoned Skillet & Dutch Oven Combo (26cm)',
    brand: 'Meyer',
    category: 'Home & Kitchen',
    price: 3299,
    originalPrice: 5499,
    discount: 40,
    rating: 4.5,
    reviews: 890,
    inStock: true,
    isFlashDeal: false,
    isTrending: false,
    isRecommended: false,
    delivery: 'Free delivery in 2 days',
    artType: 'appliance',
    colors: ['#1e293b', '#f97316'],
    description:
      'Heavy-gauge toxin-free cast iron skillet pre-seasoned with 100% vegetable oil. Delivers unmatched heat retention on gas, induction, oven, and open campfire.',
    highlights: [
      '100% Toxin-Free Uncoated Cast Iron (No PTFE, PFOA or Synthetic Coatings)',
      'Pre-Seasoned with Cold-Pressed Vegetable Oil for Natural Non-Stick Patina',
      'Compatible with Induction, Gas, Ceramic, Halogen & Oven up to 300°C',
      'Includes Heat-Resistant Silicone Hot Handle Holder'
    ],
    specifications: {
      Diameter: '26 cm (3.2 Litres)',
      Material: '100% Virgin Iron Ore Cast Iron',
      Weight: '2.65 kg',
      Compatibility: 'Gas, Induction, Oven, Grill',
      Warranty: 'Lifetime Structural Warranty'
    }
  },
  {
    id: 19,
    name: 'Minimalist 10% Niacinamide + 1% Zinc Face Serum Trio Kit',
    brand: 'Minimalist',
    category: 'Beauty',
    price: 1199,
    originalPrice: 1797,
    discount: 33,
    rating: 4.6,
    reviews: 6420,
    inStock: true,
    isFlashDeal: true,
    isTrending: true,
    isRecommended: true,
    delivery: 'Free delivery by Tomorrow',
    artType: 'beauty',
    colors: ['#0f172a', '#cbd5e1'],
    description:
      'Clinical daily skincare kit containing 10% Niacinamide clarifying serum, 2% Salicylic Acid BHA cleanser, and Vitamin B5 oil-free moisturizer formulated with pure Aloe Vera juice.',
    highlights: [
      'Reduces Blemishes, Sebum Production & Enlarged Pores in 2 Weeks',
      'Formulated with DSM (Switzerland) Grade Niacinamide & Zinc PCA',
      '100% Fragrance-Free, Paraben-Free, Sulfate-Free & Non-Comedogenic',
      'Suitable for Oily, Combination & Acne-Prone Skin Types'
    ],
    specifications: {
      'Kit Contents': 'Serum (30ml) + Cleanser (100ml) + Moisturizer (50g)',
      'Key Actives': '10% Niacinamide, 1% Zinc, 2% Salicylic Acid, 10% Vit B5',
      'Skin Type': 'All Skin Types (Ideal for Oily/Acne-Prone)',
      Formulation: 'pH 5.5 - 6.5 Clinical Grade',
      'Shelf Life': '18 Months'
    }
  },
  {
    id: 20,
    name: 'Forest Essentials Soundarya Radiance Cream With 24K Gold & SPF25',
    brand: 'Forest Essentials',
    category: 'Beauty',
    price: 4850,
    originalPrice: 5400,
    discount: 10,
    rating: 4.8,
    reviews: 920,
    inStock: true,
    isFlashDeal: false,
    isTrending: false,
    isRecommended: true,
    delivery: 'Free delivery in 2 days',
    artType: 'beauty',
    colors: ['#b45309', '#fde68a'],
    description:
      'An iconic Ayurvedic day cream blending precious 24-Karat Gold Bhasma, pure cow’s ghee, saffron, and sweet almond oil to firm, illuminate, and protect skin with natural SPF 25.',
    highlights: [
      'Infused with Authentic Ayurvedic 24K Swarna Bhasma & Kashmiri Saffron',
      'Boosts Collagen Elasticity & Imparts Luminous Golden Glow',
      'Natural Broad-Spectrum SPF 25 Protection from Yashad Bhasma',
      '100% Cruelty-Free Ayurvedic Formulation'
    ],
    specifications: {
      Volume: '50 g Glass Jar',
      'Key Ingredients': '24K Gold Bhasma, Saffron, Ashwagandha, Ghee',
      SPF: 'SPF 25 Natural Mineral',
      'Skin Type': 'Normal to Dry / Mature Skin',
      Origin: 'Uttarakhand, India'
    }
  },
  {
    id: 21,
    name: 'Dyson Supersonic Hair Dryer (Prussian Blue & Rich Copper)',
    brand: 'Dyson',
    category: 'Beauty',
    price: 29900,
    originalPrice: 36900,
    discount: 19,
    rating: 4.8,
    reviews: 1130,
    inStock: true,
    isFlashDeal: false,
    isTrending: true,
    isRecommended: false,
    delivery: 'Free delivery by Tomorrow',
    artType: 'beauty',
    colors: ['#1e3a8a', '#d97706'],
    description:
      'Engineered to protect hair from extreme heat damage with fast drying and controlled styling. Includes 5 magnetic styling attachments including the Flyaway smoother.',
    highlights: [
      'Dyson Digital Motor V9 Spins at up to 110,000 rpm',
      'Intelligent Heat Control Measures Air Temperature Over 40 Times a Second',
      'Includes 5 Magnetic Attachments (Flyaway, Diffuser, Gentle Air, Concentrator, Comb)',
      'Increases Smoothness by 75% and Shine by up to 132%'
    ],
    specifications: {
      Power: '1600 Watts',
      'Airflow Speed': '3 Precise Speed Settings + 4 Heat Settings',
      'Cord Length': '2.8 Metres Salon Grade',
      Weight: '659 g',
      Warranty: '2 Years Dyson India Warranty'
    }
  },
  {
    id: 22,
    name: 'Blue Tokai Coffee Roasters Attikan Estate Single Origin (1kg Whole Bean)',
    brand: 'Blue Tokai',
    category: 'Grocery',
    price: 1250,
    originalPrice: 1600,
    discount: 22,
    rating: 4.8,
    reviews: 1950,
    inStock: true,
    isFlashDeal: false,
    isTrending: true,
    isRecommended: true,
    delivery: 'Free delivery in 2 days',
    artType: 'grocery',
    colors: ['#0f766e', '#5eead4'],
    description:
      'Grown in the Biligiriranga Hills of Karnataka at 1650m elevation, Attikan Estate is our bestselling medium-dark roast with sweet notes of dark chocolate, roasted almonds, and fig.',
    highlights: [
      '100% Single-Estate Arabica Coffee · Freshly Roasted to Order',
      'Tasting Notes: Dark Chocolate, Fig & Roasted Almonds (Low Acidity)',
      'Medium-Dark Roast · Ideal for Espresso, Moka Pot, French Press & Pour Over',
      'Nitrogen-Flushed One-Way Degassing Valve Pouch'
    ],
    specifications: {
      Weight: '1000 g (1 kg Value Pack)',
      'Roast Level': 'Medium-Dark Roast',
      Estate: 'Attikan Estate, Biligiriranga Hills (Karnataka)',
      Altitude: '1650 Metres ASL',
      'Bean Type': '100% Specialty Arabica'
    }
  },
  {
    id: 23,
    name: 'Happilo Premium Californian Almonds, Cashews & Pistachios Gift Box (1.2kg)',
    brand: 'Happilo',
    category: 'Grocery',
    price: 1099,
    originalPrice: 1899,
    discount: 42,
    rating: 4.5,
    reviews: 3210,
    inStock: true,
    isFlashDeal: true,
    isTrending: false,
    isRecommended: false,
    delivery: 'Free delivery by Tomorrow',
    artType: 'grocery',
    colors: ['#047857', '#fbbf24'],
    description:
      'Handpicked Nonpareil California almonds, W240 King Goan cashews, and roasted Iranian pistachios packed in airtight vacuum-sealed jars for crunch and daily nutrition.',
    highlights: [
      'Contains 400g California Almonds + 400g W240 Whole Cashews + 400g Iranian Pistachios',
      'Rich in Plant Protein, Omega-3 Fatty Acids, Vitamin E & Dietary Fiber',
      'Zero Cholesterol, Zero Trans Fat & No Artificial Preservatives',
      'Packed in Reusable Airtight Food-Grade PET Jars'
    ],
    specifications: {
      'Net Weight': '1.2 kg (3 x 400g Jars)',
      Protein: '21g per 100g Serving',
      Certification: 'FSSAI Certified & Non-GMO',
      'Shelf Life': '9 Months from Packaging'
    }
  },
  {
    id: 24,
    name: 'Organic India Wild Forest Raw Unprocessed Multiflora Honey (2 x 500g)',
    brand: 'Organic India',
    category: 'Grocery',
    price: 699,
    originalPrice: 990,
    discount: 29,
    rating: 4.6,
    reviews: 1540,
    inStock: true,
    isFlashDeal: false,
    isTrending: false,
    isRecommended: true,
    delivery: 'Free delivery in 2 days',
    artType: 'grocery',
    colors: ['#d97706', '#fde047'],
    description:
      'Sustainably harvested from pristine Himalayan forest beehives, NMR-tested 100% pure raw unpasteurized honey rich in natural enzymes, pollen, and antioxidants.',
    highlights: [
      'NMR Tested for Zero Sugar Adulteration & Zero Antibiotics',
      'Unpasteurized & Unheated to Preserve Live Enzymes & Bee Pollen',
      'Ethically Wild-Harvested from Himalayan Multiflora Forests',
      'Pack of 2 Wide-Mouth Glass Jars (500g Each)'
    ],
    specifications: {
      Quantity: '1 kg (2 x 500g Glass Jars)',
      Certification: 'USDA Organic, India Organic & NMR Tested',
      Source: 'Himalayan Forest Multiflora',
      'Shelf Life': '24 Months'
    }
  },
  {
    id: 25,
    name: 'SG Sunny Tonny Classic Grade 2 English Willow Cricket Bat (Short Handle)',
    brand: 'SG Cricket',
    category: 'Sports',
    price: 11499,
    originalPrice: 16999,
    discount: 32,
    rating: 4.7,
    reviews: 480,
    inStock: true,
    isFlashDeal: false,
    isTrending: true,
    isRecommended: true,
    delivery: 'Free delivery in 2 days',
    artType: 'sports',
    colors: ['#0369a1', '#facc15'],
    description:
      'Hand-crafted in Meerut from seasoned Grade 2 English Willow featuring 7–9 straight grains, thick 40mm edges, a pronounced sweet spot, and a Sarawak cane handle.',
    highlights: [
      'Select Seasoned Grade 2 English Willow (7 to 9 Straight Clear Grains)',
      'Massive 39–40mm Edge Profile with Mid-to-Low Swell for All-Round Strokeplay',
      '9-Piece Imported Sarawak Cane Handle for Superior Shock Absorption',
      'Includes Padded Full-Length Bat Cover & Factory Knocked-In Toe Guard'
    ],
    specifications: {
      Willow: 'Grade 2 English Willow (Nurtured in UK)',
      Weight: '1160 – 1190 grams (Medium Light Pick-Up)',
      Handle: 'Short Handle (Sarawak Cane with Cork Inserts)',
      'Edge Thickness': '39 - 40 mm',
      Origin: 'Meerut, Uttar Pradesh'
    }
  },
  {
    id: 26,
    name: 'Cultsport Adjustable Dial Dumbbell Set (2.5kg to 24kg Pair with Stand)',
    brand: 'Cultsport',
    category: 'Sports',
    price: 13999,
    originalPrice: 24999,
    discount: 44,
    rating: 4.6,
    reviews: 820,
    inStock: true,
    isFlashDeal: true,
    isTrending: false,
    isRecommended: true,
    delivery: 'Free delivery in 3 days',
    artType: 'sports',
    colors: ['#0f172a', '#ef4444'],
    description:
      'Replace 15 sets of weights with a single turn of a dial. Rapid 2-second weight adjustment from 2.5 kg to 24 kg per dumbbell with anti-slip knurled steel grip and docking tray.',
    highlights: [
      '15 Weight Increments in 1 Compact Dumbbell (2.5 kg to 24 kg)',
      'One-Handed Turn-Dial Mechanism Changes Weight in 2 Seconds',
      'Silicon-Coated High-Density Cast Iron Plates for Quiet Home Workouts',
      'Safety Interlock Prevents Plates from Disengaging Mid-Set'
    ],
    specifications: {
      'Weight Range': '2.5 kg to 24 kg (15 Settings)',
      Material: 'High-Carbon Steel + Polyamide Coating',
      'Tray Dimensions': '43 x 22 x 24 cm',
      Warranty: '1 Year Cultsport Replacement Warranty'
    }
  },
  {
    id: 27,
    name: 'Yonex Astrox 99 Play Strung Carbon Graphite Badminton Racquet',
    brand: 'Yonex',
    category: 'Sports',
    price: 2799,
    originalPrice: 4490,
    discount: 38,
    rating: 4.5,
    reviews: 1690,
    inStock: true,
    isFlashDeal: false,
    isTrending: false,
    isRecommended: false,
    delivery: 'Free delivery by Tomorrow',
    artType: 'sports',
    colors: ['#dc2626', '#1e293b'],
    description:
      'Designed for steep, devastating smashes with Yonex’s Rotational Generator System, Isometric head frame for a 7% larger sweet spot, and Power Assist Bumper.',
    highlights: [
      'Full High-Modulus Graphite Frame & Shaft (4U / 83 Grams)',
      'Head-Heavy Balance with Rotational Generator Counterbalance Theory',
      'Isometric Square Frame Expands Sweet Spot in All Directions',
      'Pre-Strung at 24 lbs + Full Zippered Racquet Cover Included'
    ],
    specifications: {
      Weight: '4U (Avg. 83g)',
      Balance: 'Head Heavy (Smash Focused)',
      Flex: 'Medium Flexible',
      'Max Tension': 'Up to 28 lbs',
      Material: 'HM Graphite'
    }
  },
  {
    id: 28,
    name: 'Designing Data-Intensive Applications by Martin Kleppmann (Indian Edition)',
    brand: 'O’Reilly Media',
    category: 'Books',
    price: 1399,
    originalPrice: 1999,
    discount: 30,
    rating: 4.9,
    reviews: 3120,
    inStock: true,
    isFlashDeal: false,
    isTrending: true,
    isRecommended: true,
    delivery: 'Free delivery by Tomorrow',
    artType: 'book',
    colors: ['#0f766e', '#f8fafc'],
    description:
      'The definitive engineering guide to the big ideas behind reliable, scalable, and maintainable distributed systems, databases, stream processing, and consensus algorithms.',
    highlights: [
      'Unabridged Shroff / O’Reilly Indian Print Edition on Acid-Free Paper',
      'Covers Replication, Partitioning, Transactions, Consensus & Batch/Stream Processing',
      'Essential Reference for Software Architects, Backend Engineers & Systems Interviews',
      'Includes Detailed Architectural Maps & Chapter Bibliographies'
    ],
    specifications: {
      Author: 'Martin Kleppmann',
      Publisher: 'Shroff Publishers / O’Reilly (616 Pages)',
      Binding: 'Premium Paperback',
      Language: 'English',
      ISBN: '978-9352135240'
    }
  },
  {
    id: 29,
    name: 'The Psychology of Money & Same as Ever Boxset by Morgan Housel (Hardcover)',
    brand: 'Jaico Publishing',
    category: 'Books',
    price: 649,
    originalPrice: 1099,
    discount: 41,
    rating: 4.8,
    reviews: 8450,
    inStock: true,
    isFlashDeal: true,
    isTrending: true,
    isRecommended: false,
    delivery: 'Free delivery by Tomorrow',
    artType: 'book',
    colors: ['#1e293b', '#eab308'],
    description:
      'Collector’s 2-book hardcover slipcase edition featuring Morgan Housel’s timeless lessons on wealth, greed, happiness, risk, and human behavior that never changes.',
    highlights: [
      '2-Volume Collector Hardcover Set in Foil-Stamped Slipcase',
      'Over 5 Million Copies Sold Worldwide · #1 Personal Finance Bestseller',
      '42 Short, Actionable Stories on Compounding, Risk & Long-Term Thinking',
      'Smyth-Sewn Binding with Ribbon Bookmark'
    ],
    specifications: {
      Author: 'Morgan Housel',
      Format: '2 Hardcover Books in Slipcase (560 Pages Total)',
      Language: 'English',
      Publisher: 'Jaico Publishing House'
    }
  },
  {
    id: 30,
    name: 'India After Gandhi: The History of the World’s Largest Democracy (Revised)',
    brand: 'Picador India',
    category: 'Books',
    price: 599,
    originalPrice: 999,
    discount: 40,
    rating: 4.8,
    reviews: 2410,
    inStock: true,
    isFlashDeal: false,
    isTrending: false,
    isRecommended: true,
    delivery: 'Free delivery in 2 days',
    artType: 'book',
    colors: ['#991b1b', '#fcd34d'],
    description:
      'Ramachandra Guha’s magisterial, updated third edition chronicling modern Indian history, constitutional democracy, economic reforms, and cultural diversity since 1947.',
    highlights: [
      'Revised & Expanded 3rd Anniversary Edition (960 Pages)',
      'Includes 32 Pages of Archival Photographs & Maps',
      'Winner of the Sahitya Akademi Award · Economist Book of the Year',
      'Comprehensive Index and Primary Source Notes'
    ],
    specifications: {
      Author: 'Ramachandra Guha',
      Pages: '960 Pages',
      Format: 'Trade Paperback',
      Publisher: 'Picador India'
    }
  },
  {
    id: 31,
    name: 'Seiko 5 Sports Automatic Mechanical Watch (Sunburst Navy, SRPD51K1)',
    brand: 'Seiko',
    category: 'Accessories',
    price: 21500,
    originalPrice: 27000,
    discount: 20,
    rating: 4.8,
    reviews: 690,
    inStock: true,
    isFlashDeal: false,
    isTrending: true,
    isRecommended: true,
    delivery: 'Free delivery by Tomorrow',
    artType: 'watch',
    colors: ['#1e3a8a', '#94a3b8'],
    primaryPhoto: '/src/assets/images/promo_fashion_essentials_1791269874633.jpg',
    description:
      'Powered by the in-house Seiko Caliber 4R36 24-jewel automatic movement with 41-hour power reserve, exhibition see-through caseback, LumiBrite hands, and 100m water resistance.',
    highlights: [
      'In-House Caliber 4R36 Automatic with Manual Winding & Hacking Seconds',
      '42.5mm Brushed 316L Stainless Steel Case with Unidirectional Rotating Bezel',
      'Hardlex Crystal Front & Exhibition Screw-Down Transparent Caseback',
      '10 Bar (100m) Water Resistance · Day-Date Complication at 3 O’Clock'
    ],
    specifications: {
      Movement: 'Seiko 4R36 Automatic (24 Jewels, 41h Reserve)',
      'Case Diameter': '42.5 mm (Thickness: 13.4 mm)',
      'Water Resistance': '100 Metres (10 ATM)',
      Crystal: 'Hardlex Mineral Crystal',
      Warranty: '2 Years Seiko India Official Warranty'
    }
  },
  {
    id: 32,
    name: 'Ray-Ban Clubmaster Classic Polarized Sunglasses (Tortoise & Gold)',
    brand: 'Ray-Ban',
    category: 'Accessories',
    price: 7890,
    originalPrice: 11290,
    discount: 30,
    rating: 4.6,
    reviews: 1120,
    inStock: true,
    isFlashDeal: true,
    isTrending: false,
    isRecommended: true,
    delivery: 'Free delivery by Tomorrow',
    artType: 'bag',
    colors: ['#451a03', '#eab308'],
    description:
      'Timeless 1950s browline silhouette crafted in Italian acetate and gold-tone metal, fitted with G-15 green polarized crystal glass lenses that block 99% of reflected glare.',
    highlights: [
      'G-15 Polarized Crystal Glass Lenses with 100% UVA/UVB Protection',
      'Authentic Italian Mazzucchelli Acetate Browline & Gold Metal Rim',
      'Adjustable Silicone Nose Pads for All-Day Comfort',
      'Includes Leather Snap Case, Microfiber Cloth & Authenticity Certificate'
    ],
    specifications: {
      'Lens Width': '51 mm (Bridge: 21 mm, Temple: 145 mm)',
      'Lens Material': 'Polarized Mineral Crystal Glass',
      'Frame Material': 'Acetate & Gold-Plated Metal',
      Origin: 'Made in Italy (Luxottica)',
      Warranty: '2 Years Ray-Ban India Warranty'
    }
  },
  {
    id: 33,
    name: 'Nappa Dori Handcrafted Full-Grain Leather Laptop Messenger Bag',
    brand: 'Nappa Dori',
    category: 'Accessories',
    price: 8499,
    originalPrice: 12500,
    discount: 32,
    rating: 4.7,
    reviews: 340,
    inStock: true,
    isFlashDeal: false,
    isTrending: false,
    isRecommended: true,
    delivery: 'Free delivery in 2 days',
    artType: 'bag',
    colors: ['#78350f', '#d97706'],
    description:
      'Hand-stitched in full-grain vegetable-tanned harness leather with solid antique brass hardware, padded 16-inch laptop compartment, and a trolley pass-through strap.',
    highlights: [
      '100% Full-Grain Vegetable-Tanned Indian Harness Leather',
      'Padded Micro-Suede Compartment Fits Laptops up to 16 Inches',
      'Solid Cast Antique Brass Buckles, YKK Metal Zippers & Detachable Shoulder Strap',
      'Rear Luggage Pass-Through Sleeve for Seamless Airport Travel'
    ],
    specifications: {
      Material: '100% Full-Grain Harness Leather & Cotton Twill Lining',
      Compatibility: 'Up to 16-inch MacBook Pro / Laptops',
      Dimensions: '40 x 30 x 9.5 cm',
      Hardware: 'Solid Antique Brass',
      Warranty: '1 Year Craftsmanship Warranty'
    }
  },
  {
    id: 34,
    name: 'Apple Watch Series 10 GPS (46mm Jet Black Aluminum Case, Sport Loop)',
    brand: 'Apple',
    category: 'Accessories',
    price: 44900,
    originalPrice: 49900,
    discount: 10,
    rating: 4.9,
    reviews: 1280,
    inStock: true,
    isFlashDeal: false,
    isTrending: true,
    isRecommended: true,
    delivery: 'Free delivery by Tomorrow',
    artType: 'watch',
    colors: ['#0f172a', '#38bdf8'],
    description:
      'The thinnest Apple Watch ever with our biggest, most advanced wide-angle OLED display, sleep apnea notifications, ECG app, water temperature sensor, and faster charging.',
    highlights: [
      'Wide-Angle Always-On Retina OLED Display (Up to 40% Brighter at an Angle)',
      'S10 SiP with 4-Core Neural Engine & Double Tap Gesture',
      'ECG App, Blood Oxygen, Heart Rate Notifications & Sleep Tracking',
      'Fast Charge: 0 to 80% in About 30 Minutes · 50m Water Resistant'
    ],
    specifications: {
      'Case Size': '46 mm (9.7 mm Thin Profile)',
      Processor: 'S10 SiP 64-bit Dual-Core',
      Sensors: 'Electrical Heart (ECG), Optical Heart, Depth & Water Temp',
      Battery: 'Up to 18 Hours (36 Hours Low Power Mode)',
      Warranty: '1 Year Apple India Warranty'
    }
  }
];

export const products = rawProducts.map((item) => {
  const gallery = createProductGallery(
    item.artType,
    item.colors[0],
    item.colors[1],
    item.brand,
    item.primaryPhoto || null
  );

  return {
    ...item,
    image: gallery.image,
    images: gallery.images,
    offers: [
      'Bank Offer: 10% Instant Discount up to ₹2,500 on HDFC & ICICI Bank Credit Cards',
      'No Cost EMI: Starting at ₹' + Math.max(199, Math.round(item.price / 6)).toLocaleString('en-IN') + '/month on major cards',
      'Partner Offer: Get GST Invoice and save up to 18% on business purchases',
      'Cashback: Flat ₹150 cashback on UPI payments above ₹999'
    ],
    userReviews: [
      {
        id: `rev-${item.id}-1`,
        author: 'Aarav Mehta',
        city: 'Mumbai',
        rating: 5,
        date: '14 Sep 2026',
        verified: true,
        title: 'Authentic product and super fast next-day delivery',
        comment: `Bought the ${item.name} during the deal. Build quality is top-notch, packaging was sealed with brand hologram, and performance exceeds expectations for the price.`
      },
      {
        id: `rev-${item.id}-2`,
        author: 'Priya Nair',
        city: 'Bengaluru',
        rating: 4,
        date: '28 Aug 2026',
        verified: true,
        title: 'Great value for money',
        comment: `${item.brand} never disappoints. Been using this daily for three weeks now and everything works smoothly as described in the specifications.`
      },
      {
        id: `rev-${item.id}-3`,
        author: 'Rohan Kulkarni',
        city: 'Pune',
        rating: 5,
        date: '09 Aug 2026',
        verified: true,
        title: 'Highly recommended in this category',
        comment: 'Compared several options before picking this one on NovaMart. The bank discount and quick delivery made it an unbeatable purchase.'
      }
    ]
  };
});

export const initialMockOrders = [
  {
    id: 'ORD-904821',
    date: '02 Oct 2026',
    deliveryDate: 'Delivered on 03 Oct 2026',
    status: 'Delivered',
    paymentMethod: 'UPI (Google Pay)',
    totalAmount: 26990,
    address: 'Flat 402, Skylark Residency, Indiranagar 100ft Road, Bengaluru - 560038',
    items: [
      {
        id: 6,
        name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
        brand: 'Sony',
        price: 26990,
        quantity: 1,
        image: products[5].image
      }
    ]
  },
  {
    id: 'ORD-883410',
    date: '04 Oct 2026',
    deliveryDate: 'Arriving by Tomorrow, 8 PM',
    status: 'Shipped',
    paymentMethod: 'Credit Card (HDFC EMI)',
    totalAmount: 16499,
    address: 'Flat 402, Skylark Residency, Indiranagar 100ft Road, Bengaluru - 560038',
    items: [
      {
        id: 15,
        name: 'DeLonghi Dedica Arte 15-Bar Manual Espresso Coffee Maker',
        brand: 'DeLonghi',
        price: 16499,
        quantity: 1,
        image: products[14].image
      }
    ]
  },
  {
    id: 'ORD-879104',
    date: '05 Oct 2026',
    deliveryDate: 'Estimated by 08 Oct 2026',
    status: 'Processing',
    paymentMethod: 'Cash on Delivery',
    totalAmount: 2449,
    address: 'Tower B, Cyber Greens Corporate Park, DLF Phase 3, Gurugram - 122002',
    items: [
      {
        id: 22,
        name: 'Blue Tokai Coffee Roasters Attikan Estate Single Origin (1kg Whole Bean)',
        brand: 'Blue Tokai',
        price: 1250,
        quantity: 1,
        image: products[21].image
      },
      {
        id: 19,
        name: 'Minimalist 10% Niacinamide + 1% Zinc Face Serum Trio Kit',
        brand: 'Minimalist',
        price: 1199,
        quantity: 1,
        image: products[18].image
      }
    ]
  },
  {
    id: 'ORD-812059',
    date: '18 Sep 2026',
    deliveryDate: 'Cancelled on 19 Sep 2026 · Refund Completed',
    status: 'Cancelled',
    paymentMethod: 'UPI',
    totalAmount: 2399,
    address: 'Flat 402, Skylark Residency, Indiranagar 100ft Road, Bengaluru - 560038',
    items: [
      {
        id: 14,
        name: "Levi's 511 Slim Fit Selvedge Stretch Denim Jeans",
        brand: "Levi's",
        price: 2399,
        quantity: 1,
        image: products[13].image
      }
    ]
  }
];
