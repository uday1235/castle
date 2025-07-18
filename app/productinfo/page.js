"use client"
import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Star, Truck } from 'lucide-react';

// Mock Product Component (based on your provided code structure)
const Product = ({ id, title, price, description, category, image, onAddToBasket, onViewDetail }) => {
  const [rating] = useState(
    Math.floor(Math.random() * (5 - 1 + 1)) + 1
  );
  const [hasPrime] = useState(Math.random() < 0.5);

  return (
    <div 
      className="relative flex flex-col m-5 bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-300 p-6 rounded-lg border border-gray-100/30 overflow-hidden group"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 800px 600px at 50% 0%, rgba(59, 130, 246, 0.008) 0%, transparent 50%),
          radial-gradient(ellipse 600px 400px at 100% 100%, rgba(147, 51, 234, 0.006) 0%, transparent 50%),
          radial-gradient(ellipse 400px 300px at 0% 50%, rgba(34, 197, 94, 0.004) 0%, transparent 50%),
          linear-gradient(135deg, transparent 0%, rgba(156, 163, 175, 0.003) 20%, transparent 40%, rgba(229, 231, 235, 0.005) 60%, transparent 80%),
          linear-gradient(45deg, rgba(249, 250, 251, 0.01) 0%, transparent 25%, rgba(243, 244, 246, 0.008) 50%, transparent 75%)
        `
      }}
    >
      {/* Category */}
      <p className="absolute top-2 right-2 text-[10px] font-light text-gray-400/80 uppercase tracking-wider">
        {category}
      </p>

      {/* Product Image */}
      <div 
        onClick={() => onViewDetail(id)} 
        className="cursor-pointer mb-3 flex items-center justify-center"
      >
        <img 
          src={image} 
          height={200} 
          width={200} 
          className="object-contain filter brightness-[0.98] group-hover:scale-[1.02] transition-transform duration-500 h-48 w-48"
          alt={title}
        />
      </div>

      {/* Product Title */}
      <h4 className="text-sm font-normal text-gray-700 mb-2 line-clamp-2 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
        {title}
      </h4>

      {/* Rating Stars */}
      <div className="flex mb-2">
        {Array(5)
          .fill()
          .map((_, i) => (
            <Star 
              key={i} 
              className={`h-3 w-3 ${i < rating ? 'text-yellow-300/80 fill-current' : 'text-gray-200/60'}`}
            />
          ))}
      </div>

      {/* Description */}
      <p className="text-[11px] text-gray-500/90 line-clamp-2 mb-3 leading-relaxed font-light">
        {description}
      </p>

      {/* Price */}
      <div className="mb-3 flex items-baseline space-x-1">
        <span className="text-xs font-light text-gray-400">$</span>
        <span className="text-xl font-extralight text-gray-900 tracking-tight">{price}</span>
        <span className="text-[10px] font-light text-gray-400 uppercase tracking-wider">USD</span>
      </div>

      {/* Prime Delivery */}
      {hasPrime && (
        <div className="flex items-center space-x-1 mb-3 py-1 px-2 bg-blue-50/20 rounded-md">
          <Truck className="w-4 h-4 text-blue-600/80" />
          <p className="text-[10px] font-light text-blue-600/80">Free Next-day Delivery</p>
        </div>
      )}

      {/* Add to Basket Button */}
      <button 
        onClick={() => onAddToBasket({ id, title, price, rating, description, category, image, hasPrime })} 
        className="mt-auto w-full bg-gray-50/60 hover:bg-gray-100/70 text-gray-700 font-light text-sm py-2 px-4 rounded-md transition-all duration-300 border border-gray-200/40 hover:border-gray-300/50 backdrop-blur-sm"
      >
        Add to Basket
      </button>
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-8 mb-6">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center px-3 py-2 text-xs font-light text-white bg-black rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <ChevronLeft className="w-3 h-3 mr-1" />
        prev
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`px-3 py-2 text-xs font-light rounded-md transition-colors duration-200 ${
            page === currentPage
              ? 'bg-black text-white'
              : page === '...'
              ? 'text-gray-400 cursor-default bg-transparent'
              : 'text-gray-700 bg-gray-100 hover:bg-black hover:text-white'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center px-3 py-2 text-xs font-light text-white bg-black rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        next
        <ChevronRight className="w-3 h-3 ml-1" />
      </button>
    </div>
  );
};

// Main Product List Component with Pagination
const ProductListWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [basket, setBasket] = useState([]);
  const PRODUCTS_PER_PAGE = 8;

  // Mock product data - replace with your actual products
  const allProducts = [
    {
      id: 1,
      title: "Wireless Bluetooth Headphones with Noise Cancellation",
      price: 79.99,
      description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Smart Fitness Watch with Heart Rate Monitor",
      price: 199.99,
      description: "Advanced fitness tracking with GPS, heart rate monitoring, and smartphone notifications.",
      category: "Wearables",
      image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Ergonomic Office Chair with Lumbar Support",
      price: 299.99,
      description: "Comfortable office chair with adjustable height and excellent lumbar support for long work sessions.",
      category: "Furniture",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Professional Camera Lens 50mm f/1.8",
      price: 329.99,
      description: "High-quality prime lens perfect for portrait photography with beautiful bokeh effects.",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "Organic Cotton Bed Sheet Set",
      price: 89.99,
      description: "Luxurious 100% organic cotton sheets with deep pockets and wrinkle resistance.",
      category: "Home",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 6,
      title: "Stainless Steel Water Bottle",
      price: 24.99,
      description: "Insulated water bottle that keeps drinks cold for 24 hours and hot for 12 hours.",
      category: "Sports",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 7,
      title: "Wireless Charging Pad",
      price: 39.99,
      description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1609592806230-3d8c8e7a9a8c?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 8,
      title: "Bluetooth Portable Speaker",
      price: 59.99,
      description: "Compact waterproof speaker with 360-degree sound and 10-hour battery life.",
      category: "Audio",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 9,
      title: "Smart Home Security Camera",
      price: 149.99,
      description: "HD security camera with night vision, motion detection, and smartphone alerts.",
      category: "Security",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 10,
      title: "Gaming Mechanical Keyboard",
      price: 129.99,
      description: "RGB backlit mechanical keyboard with tactile switches and programmable keys.",
      category: "Gaming",
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 11,
      title: "Yoga Mat with Alignment Lines",
      price: 34.99,
      description: "Non-slip yoga mat with helpful alignment lines and carrying strap.",
      category: "Fitness",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 12,
      title: "LED Desk Lamp with USB Charging",
      price: 49.99,
      description: "Adjustable LED desk lamp with multiple brightness levels and built-in USB charging port.",
      category: "Office",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 13,
      title: "Ceramic Coffee Mug Set",
      price: 29.99,
      description: "Set of 4 handcrafted ceramic mugs perfect for coffee, tea, or hot chocolate.",
      category: "Kitchen",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 14,
      title: "Wireless Mouse with Ergonomic Design",
      price: 45.99,
      description: "Comfortable wireless mouse with precision tracking and long battery life.",
      category: "Computer",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 15,
      title: "Portable Phone Stand",
      price: 19.99,
      description: "Adjustable phone stand compatible with all smartphones and tablets.",
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 16,
      title: "Premium Leather Wallet",
      price: 69.99,
      description: "Genuine leather wallet with RFID blocking and multiple card slots.",
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 17,
      title: "Air Purifier with HEPA Filter",
      price: 179.99,
      description: "Quiet air purifier that removes 99.97% of airborne particles and allergens.",
      category: "Home",
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 18,
      title: "Resistance Bands Set",
      price: 25.99,
      description: "Complete set of resistance bands for strength training and physical therapy.",
      category: "Fitness",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center"
    }
  ];

  // Calculate pagination
  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return allProducts.slice(startIndex, endIndex);
  }, [currentPage, allProducts]);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of products section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle add to basket
  const handleAddToBasket = (product) => {
    setBasket(prev => [...prev, product]);
    console.log('Added to basket:', product);
  };

  // Handle view product detail
  const handleViewDetail = (productId) => {
    console.log('View product detail:', productId);
    // Implement your navigation logic here
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Static Carousel Section */}
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Products</h2>
        <p className="text-gray-600">Discover our handpicked selection of premium products</p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <Product
            key={product.id}
            {...product}
            onAddToBasket={handleAddToBasket}
            onViewDetail={handleViewDetail}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Results Info */}
      <div className="text-center text-sm text-gray-500 mb-8">
        Showing {((currentPage - 1) * PRODUCTS_PER_PAGE) + 1} to {Math.min(currentPage * PRODUCTS_PER_PAGE, allProducts.length)} of {allProducts.length} products
      </div>

      {/* Basket Count (for demo) */}
      {basket.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg">
          Basket: {basket.length} items
        </div>
      )}
    </div>
  );
};

export default ProductListWithPagination;