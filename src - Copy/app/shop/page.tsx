'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Dữ liệu banner slides
const bannerSlides = [
  {
    id: 1,
    image: '/images/shop/banner_1.jpg',
    title: 'Overwatch 2: Invasion',
    description: 'Khám phá câu chuyện mới với các nhiệm vụ PvE',
    buttonText: 'Khám phá ngay',
    buttonLink: '/shop/bundles/invasion'
  },
  {
    id: 2,
    image: '/images/shop/banner_2.jpg',
    title: 'Skin Mới',
    description: 'Bộ sưu tập skin mới cho các anh hùng',
    buttonText: 'Xem tất cả',
    buttonLink: '/shop/skins'
  },
  {
    id: 3,
    image: '/images/shop/banner_3.jpg',
    title: 'Sự Kiện Đặc Biệt',
    description: 'Các gói ưu đãi và sự kiện đặc biệt',
    buttonText: 'Tham gia ngay',
    buttonLink: '/shop/events'
  }
];

// Dữ liệu sản phẩm mẫu
const products = [
  // Bundles
  {
    id: 1,
    name: 'Overwatch 2: Invasion Bundle',
    price: '$39.99',
    originalPrice: '$59.99',
    discount: '33%',
    image: '/images/shop/ow2_invasion_bundle.jpg',
    category: 'bundles',
    description: 'Includes Overwatch 2: Invasion Story Missions, Sojourn Legendary Skin, and more!',
    features: ['Story Missions', 'Legendary Skin', 'Premium Battle Pass'],
    rating: 4.8,
    reviews: 1245
  },
  {
    id: 2,
    name: 'Overwatch 2: Watchpoint Pack',
    price: '$39.99',
    image: '/images/shop/watchpoint_pack.jpg',
    category: 'bundles',
    description: 'Get instant access to Season 1 Premium Battle Pass, 2,000 Overwatch Coins, and more!',
    features: ['Premium Battle Pass', '2000 Coins', 'Exclusive Skins'],
    rating: 4.6,
    reviews: 892
  },
  {
    id: 3,
    name: 'Overwatch 2: Ultimate Battle Pass Bundle',
    price: '$29.99',
    image: '/images/shop/ultimate_battle_pass.jpg',
    category: 'bundles',
    description: 'Includes Premium Battle Pass, 20 Battle Pass Tier Skips, and more!',
    features: ['Premium Battle Pass', '20 Tier Skips', 'Exclusive Rewards'],
    rating: 4.7,
    reviews: 1567
  },
  // Skins
  {
    id: 4,
    name: 'Cyber Demon Genji',
    price: '$19.99',
    image: '/images/shop/skin_genji.jpg',
    category: 'skins',
    description: 'Legendary skin for Genji with unique effects and animations',
    features: ['Unique Effects', 'Custom Animations', 'Exclusive Voice Lines'],
    rating: 4.9,
    reviews: 2345
  },
  {
    id: 5,
    name: 'Mythic Mercy',
    price: '$24.99',
    image: '/images/shop/skin_mercy.jpg',
    category: 'skins',
    description: 'Mythic skin for Mercy with customizable options',
    features: ['Customizable Options', 'Unique Effects', 'Exclusive Emotes'],
    rating: 4.8,
    reviews: 1890
  },
  {
    id: 6,
    name: 'Dragon Slayer Reinhardt',
    price: '$19.99',
    image: '/images/shop/skin_reinhardt.jpg',
    category: 'skins',
    description: 'Legendary skin for Reinhardt with unique effects',
    features: ['Unique Effects', 'Custom Animations', 'Exclusive Voice Lines'],
    rating: 4.7,
    reviews: 1456
  },
  // Coins
  {
    id: 7,
    name: '500 Overwatch Coins',
    price: '$4.99',
    image: '/images/shop/coins_500.jpg',
    category: 'coins',
    description: '500 Overwatch Coins for in-game purchases',
    features: ['Instant Delivery', 'No Expiration', 'Universal Currency'],
    rating: 4.5,
    reviews: 3456
  },
  {
    id: 8,
    name: '1000 Overwatch Coins',
    price: '$9.99',
    image: '/images/shop/coins_1000.jpg',
    category: 'coins',
    description: '1000 Overwatch Coins for in-game purchases',
    features: ['Instant Delivery', 'No Expiration', 'Universal Currency'],
    rating: 4.6,
    reviews: 2789
  },
  {
    id: 9,
    name: '2200 Overwatch Coins',
    price: '$19.99',
    image: '/images/shop/coins_2200.jpg',
    category: 'coins',
    description: '2200 Overwatch Coins for in-game purchases',
    features: ['Instant Delivery', 'No Expiration', 'Universal Currency'],
    rating: 4.7,
    reviews: 1987
  }
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [showQuickView, setShowQuickView] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  const categories = [
    { id: 'all', name: 'Tất cả', icon: '🌟' },
    { id: 'bundles', name: 'Gói', icon: '🎁' },
    { id: 'skins', name: 'Skin', icon: '👕' },
    { id: 'coins', name: 'Tiền xu', icon: '💰' }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  // Auto play banner slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const addToCart = (productId: number) => {
    setCartItems([...cartItems, productId]);
    setShowCart(true);
    setTimeout(() => setShowCart(false), 3000);
  };

  // Handle scroll behavior for mobile nav
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setIsNavVisible(false);
      } else {
        // Scrolling up
        setIsNavVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#071323] to-[#050e1b] text-white">
      {/* Navigation Bar - Mobile Version */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0c2341]/90 to-[#071323]/90 backdrop-blur-md border-b border-white/10 md:hidden transition-transform duration-300 ${
        isNavVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="px-4 h-16 flex items-center justify-between">
          {/* Logo - Mobile */}
          <div className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="Overwatch Logo"
              width={32}
              height={32}
              className="hover:scale-110 transition-transform duration-300"
            />
            <span className="text-lg font-bold bg-gradient-to-r from-[#42abff] to-[#42abff]/80 bg-clip-text text-transparent">
              OW
            </span>
          </div>

          {/* Play Button - Mobile */}
          <button className="px-4 py-1.5 bg-gradient-to-r from-[#42abff] to-[#42abff]/80 rounded-full text-white text-sm font-bold hover:shadow-[0_0_20px_rgba(66,171,255,0.5)] hover:scale-105 transition-all duration-300 flex items-center space-x-1">
            <span>Chơi</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Navigation Bar - Desktop Version */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0c2341]/90 to-[#071323]/90 backdrop-blur-md border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo - Desktop */}
          <div className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="Overwatch Logo"
              width={40}
              height={40}
              className="hover:scale-110 transition-transform duration-300"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-[#42abff] to-[#42abff]/80 bg-clip-text text-transparent">
              OVERWATCH
            </span>
          </div>

          {/* Play Button - Desktop */}
          <button className="px-6 py-2 bg-gradient-to-r from-[#42abff] to-[#42abff]/80 rounded-full text-white font-bold hover:shadow-[0_0_20px_rgba(66,171,255,0.5)] hover:scale-105 transition-all duration-300 flex items-center space-x-2">
            <span>Chơi ngay</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section with Slider - Mobile */}
      <div className="relative h-[400px] w-full overflow-hidden mt-16 md:hidden">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4">
                <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-lg text-white/80 mb-6 animate-fade-in-delayed">
                  {slide.description}
                </p>
                <Link
                  href={slide.buttonLink}
                  className="inline-block px-6 py-3 bg-[#42abff] rounded-full text-white font-bold text-base hover:bg-[#42abff]/80 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(66,171,255,0.5)]"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slide Indicators - Mobile */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-[#42abff] scale-125 shadow-[0_0_10px_rgba(66,171,255,0.5)]'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Hero Section with Slider - Desktop */}
      <div className="relative h-[600px] w-full overflow-hidden mt-20 hidden md:block">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-3xl px-4">
                <h1 className="text-7xl font-bold text-white mb-6 animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-2xl text-white/80 mb-8 animate-fade-in-delayed">
                  {slide.description}
                </p>
                <Link
                  href={slide.buttonLink}
                  className="inline-block px-8 py-4 bg-[#42abff] rounded-full text-white font-bold text-lg hover:bg-[#42abff]/80 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(66,171,255,0.5)]"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-4">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-[#42abff] scale-125 shadow-[0_0_10px_rgba(66,171,255,0.5)]'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content - Mobile */}
      <div className="px-4 py-8 md:hidden">
        {/* Categories - Mobile */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-[#42abff] text-white shadow-[0_0_15px_rgba(66,171,255,0.3)]'
                  : 'bg-[#0c2341] text-white/70 hover:bg-[#0c2341]/80 hover:text-white'
              }`}
            >
              <span className="mr-1 text-sm">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid - Mobile */}
        <div className="grid grid-cols-1 gap-4">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-[#0c2341]/50 rounded-lg overflow-hidden hover:shadow-[0_0_20px_rgba(66,171,255,0.3)] transition-all duration-300 group relative"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image - Mobile */}
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                
                {/* Discount Badge - Mobile */}
                {product.originalPrice && (
                  <div className="absolute top-2 right-2 bg-[#42abff] text-white px-2 py-0.5 rounded-full text-xs font-bold">
                    -{product.discount}
                  </div>
                )}
              </div>

              {/* Product Info - Mobile */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <div className="flex items-center">
                    <span className="text-[#42abff] mr-1">★</span>
                    <span className="text-xs">{product.rating}</span>
                    <span className="text-xs text-white/50 ml-1">({product.reviews})</span>
                  </div>
                </div>
                
                <p className="text-white/70 text-sm mb-3">{product.description}</p>
                
                {/* Features - Mobile */}
                <div className="mb-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-xs text-white/70 mb-1">
                      <span className="text-[#42abff] mr-1">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Price and Buy Button - Mobile */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-[#42abff]">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-white/50 line-through text-sm ml-2">{product.originalPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="px-4 py-1.5 bg-[#42abff] rounded-full text-white text-sm font-medium hover:bg-[#42abff]/80 transition-colors group-hover:scale-105"
                  >
                    Mua
                  </button>
                </div>
              </div>

              {/* Quick View Overlay - Mobile */}
              {hoveredProduct === product.id && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setShowQuickView(product.id)}
                    className="px-4 py-1.5 bg-[#42abff] rounded-full text-white text-sm font-medium hover:bg-[#42abff]/80 transition-colors"
                  >
                    Xem nhanh
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content - Desktop */}
      <div className="max-w-7xl mx-auto px-4 py-12 hidden md:block">
        {/* Categories */}
        <div className="flex space-x-4 mb-12 overflow-x-auto pb-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-[#42abff] text-white shadow-[0_0_15px_rgba(66,171,255,0.3)]'
                  : 'bg-[#0c2341] text-white/70 hover:bg-[#0c2341]/80 hover:text-white'
              }`}
            >
              <span className="mr-2 text-lg">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-[#0c2341]/50 rounded-lg overflow-hidden hover:shadow-[0_0_20px_rgba(66,171,255,0.3)] transition-all duration-300 group relative"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div className="relative h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                
                {/* Discount Badge */}
                {product.originalPrice && (
                  <div className="absolute top-4 right-4 bg-[#42abff] text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{product.discount}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <div className="flex items-center">
                    <span className="text-[#42abff] mr-1">★</span>
                    <span className="text-sm">{product.rating}</span>
                    <span className="text-sm text-white/50 ml-1">({product.reviews})</span>
                  </div>
                </div>
                
                <p className="text-white/70 mb-4">{product.description}</p>
                
                {/* Features */}
                <div className="mb-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-white/70 mb-1">
                      <span className="text-[#42abff] mr-2">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Price and Buy Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-[#42abff]">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-white/50 line-through ml-2">{product.originalPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="px-6 py-2 bg-[#42abff] rounded-full text-white font-medium hover:bg-[#42abff]/80 transition-colors group-hover:scale-105"
                  >
                    Mua ngay
                  </button>
                </div>
              </div>

              {/* Quick View Overlay */}
              {hoveredProduct === product.id && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setShowQuickView(product.id)}
                    className="px-6 py-2 bg-[#42abff] rounded-full text-white font-medium hover:bg-[#42abff]/80 transition-colors"
                  >
                    Xem nhanh
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Cart Notification - Mobile */}
      {showCart && (
        <div className="fixed bottom-4 right-4 bg-[#42abff] text-white px-4 py-2 rounded-full text-sm shadow-lg animate-slide-up md:hidden">
          Đã thêm vào giỏ!
        </div>
      )}

      {/* Cart Notification - Desktop */}
      {showCart && (
        <div className="fixed bottom-8 right-8 bg-[#42abff] text-white px-6 py-3 rounded-full shadow-lg animate-slide-up hidden md:block">
          Đã thêm vào giỏ hàng!
        </div>
      )}

      {/* Quick View Modal - Mobile */}
      {showQuickView && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 md:hidden">
          <div className="bg-[#0c2341] rounded-lg p-4 w-full mx-4 relative">
            {/* Close Button - Mobile */}
            <button
              onClick={() => setShowQuickView(null)}
              className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content - Mobile */}
            <div className="flex flex-col">
              {/* Product Image - Mobile */}
              <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                <Image
                  src={products.find(p => p.id === showQuickView)?.image || ''}
                  alt={products.find(p => p.id === showQuickView)?.name || ''}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                
                {/* Discount Badge - Mobile */}
                {products.find(p => p.id === showQuickView)?.originalPrice && (
                  <div className="absolute top-2 right-2 bg-[#42abff] text-white px-2 py-0.5 rounded-full text-xs font-bold">
                    -{products.find(p => p.id === showQuickView)?.discount}
                  </div>
                )}
              </div>

              {/* Product Details - Mobile */}
              <div className="flex flex-col">
                <h2 className="text-xl font-bold mb-2">
                  {products.find(p => p.id === showQuickView)?.name}
                </h2>
                
                {/* Rating - Mobile */}
                <div className="flex items-center mb-2">
                  <div className="flex items-center mr-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(products.find(p => p.id === showQuickView)?.rating || 0)
                            ? 'text-[#42abff]'
                            : 'text-white/30'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-white/70">
                    ({products.find(p => p.id === showQuickView)?.reviews} đánh giá)
                  </span>
                </div>

                {/* Price - Mobile */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-[#42abff]">
                    {products.find(p => p.id === showQuickView)?.price}
                  </span>
                  {products.find(p => p.id === showQuickView)?.originalPrice && (
                    <span className="text-sm text-white/50 line-through ml-2">
                      {products.find(p => p.id === showQuickView)?.originalPrice}
                    </span>
                  )}
                </div>

                {/* Description - Mobile */}
                <p className="text-sm text-white/80 mb-4">
                  {products.find(p => p.id === showQuickView)?.description}
                </p>

                {/* Features - Mobile */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-2">Tính năng</h3>
                  <div className="space-y-1">
                    {products.find(p => p.id === showQuickView)?.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <span className="text-[#42abff] mr-1">✓</span>
                        <span className="text-white/70">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons - Mobile */}
                <div className="flex space-x-2 mt-auto">
                  <button
                    onClick={() => {
                      addToCart(showQuickView);
                      setShowQuickView(null);
                    }}
                    className="flex-1 px-4 py-2 bg-[#42abff] rounded-full text-white text-sm font-medium hover:bg-[#42abff]/80 transition-colors"
                  >
                    Thêm vào giỏ
                  </button>
                  <button className="flex-1 px-4 py-2 bg-transparent border border-[#42abff] rounded-full text-white text-sm font-medium hover:bg-[#42abff]/20 transition-colors">
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal - Desktop */}
      {showQuickView && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 hidden md:flex">
          <div className="bg-[#0c2341] rounded-lg p-8 max-w-4xl w-full mx-4 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowQuickView(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src={products.find(p => p.id === showQuickView)?.image || ''}
                  alt={products.find(p => p.id === showQuickView)?.name || ''}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                
                {/* Discount Badge */}
                {products.find(p => p.id === showQuickView)?.originalPrice && (
                  <div className="absolute top-4 right-4 bg-[#42abff] text-white px-4 py-2 rounded-full text-lg font-bold">
                    -{products.find(p => p.id === showQuickView)?.discount}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex flex-col">
                <h2 className="text-3xl font-bold mb-4">
                  {products.find(p => p.id === showQuickView)?.name}
                </h2>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < Math.floor(products.find(p => p.id === showQuickView)?.rating || 0)
                            ? 'text-[#42abff]'
                            : 'text-white/30'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-white/70">
                    ({products.find(p => p.id === showQuickView)?.reviews} đánh giá)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#42abff]">
                    {products.find(p => p.id === showQuickView)?.price}
                  </span>
                  {products.find(p => p.id === showQuickView)?.originalPrice && (
                    <span className="text-xl text-white/50 line-through ml-2">
                      {products.find(p => p.id === showQuickView)?.originalPrice}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-white/80 mb-6">
                  {products.find(p => p.id === showQuickView)?.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Tính năng</h3>
                  <div className="space-y-2">
                    {products.find(p => p.id === showQuickView)?.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-[#42abff] mr-2">✓</span>
                        <span className="text-white/70">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-auto">
                  <button
                    onClick={() => {
                      addToCart(showQuickView);
                      setShowQuickView(null);
                    }}
                    className="flex-1 px-6 py-3 bg-[#42abff] rounded-full text-white font-medium hover:bg-[#42abff]/80 transition-colors"
                  >
                    Thêm vào giỏ hàng
                  </button>
                  <button className="flex-1 px-6 py-3 bg-transparent border-2 border-[#42abff] rounded-full text-white font-medium hover:bg-[#42abff]/20 transition-colors">
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 