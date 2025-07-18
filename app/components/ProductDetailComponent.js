"use client";

import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { addToBasket } from '../redux/slices/basketSlice';

function ProductDetailComponent({ product }) {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [zoomStyle, setZoomStyle] = useState({});
  const zoomRef = useRef(null);
  const containerRef = useRef(null);

  const addItemToBasket = () => {
    dispatch(addToBasket(product));
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = zoomRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const bgX = (x / width) * 100;
    const bgY = (y / height) * 100;

    setZoomStyle({
      left: `${x}px`,
      top: `${y}px`,
      backgroundPosition: `${bgX}% ${bgY}%`,
      backgroundSize: '200%',
      display: 'block',
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      display: 'none',
    });
  };

  useEffect(() => {
    const handleMouseMoveOutside = (e) => {
      const containerRect = containerRef.current.getBoundingClientRect();
      if (
        e.clientX < containerRect.left ||
        e.clientX > containerRect.right ||
        e.clientY < containerRect.top ||
        e.clientY > containerRect.bottom
      ) {
        handleMouseLeave();
      }
    };

    window.addEventListener('mousemove', handleMouseMoveOutside);
    return () => window.removeEventListener('mousemove', handleMouseMoveOutside);
  }, []);

  return (
    <div className="bg-gray-100 p-4">
      <div className="max-w-8xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Section: Thumbnails and Main Image */}
          <div className="flex flex-col items-center md:w-1/3" ref={containerRef}>
            <div
              className="relative mb-4"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              ref={zoomRef}
            >
              {/* Dotted Grid Overlay */}
              <div
                className="absolute z-10 pointer-events-none"
                style={{
                  left: zoomStyle.left,
                  top: zoomStyle.top,
                  display: zoomStyle.display,
                  width: "80%",
                  height: "40%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "rgba(255, 155, 0, 0.3)", // Yellow tint background
                  backgroundImage: "radial-gradient(circle, #ffc107 1px, transparent 1px)",
                  backgroundSize: "3px 3px", // Increased dot spacing for visibility
                  borderRadius: '1px',
                  cursor: 'none',
                  transition: 'all 0.1s ease',
                }}
              />
              <Image
                src={selectedImage}
                height={600}
                width={600}
                objectFit="contain"
                alt={product.title}
                className="rounded-lg"
              />
            </div>
            <div className="flex space-x-5 mt-16">
              {/* Thumbnails */}
              {product.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  height={50}
                  width={60}
                  objectFit="contain"
                  alt={`Thumbnail ${index + 1}`}
                  className={`cursor-pointer mb-2 border p-1 ${
                    selectedImage === image ? 'border-slate-100' : 'border-slate-30'
                  }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Zoomed Image Section */}
          <div
            className={`transition-all duration-300 ease-in-out md:w-3/5 ${zoomStyle.display === 'block' ? 'block' : 'hidden'}`}
            style={{ 
              display: zoomStyle.display === 'block' ? 'block' : 'none',
              position: 'relative',
              zIndex: 10,
              marginLeft: '20px',
              height: '600px', // Fixed height to match main image
            }}
          >
            <div
              className="w-full h-full bg-white rounded-lg shadow-md"
              style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundPosition: zoomStyle.backgroundPosition,
                backgroundSize: zoomStyle.backgroundSize,
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>

          {/* Right Section: Product Details */}
         <div 
  className={`transition-all duration-500 ease-in-out md:w-2/3 md:pl-10 ${zoomStyle.display === 'block' ? 'hidden' : 'block'}`}
  style={{
    transition: 'all 0.5s ease',
    backgroundImage: `
      radial-gradient(ellipse 600px 400px at 30% 20%, rgba(59, 130, 246, 0.006) 0%, transparent 50%),
      radial-gradient(ellipse 400px 300px at 80% 80%, rgba(147, 51, 234, 0.004) 0%, transparent 50%),
      radial-gradient(ellipse 300px 200px at 10% 70%, rgba(34, 197, 94, 0.003) 0%, transparent 50%),
      linear-gradient(135deg, transparent 0%, rgba(156, 163, 175, 0.002) 20%, transparent 40%, rgba(229, 231, 235, 0.004) 60%, transparent 80%)
    `
  }}
>
  {/* Product Title */}
  <h1 className="text-xl font-light text-gray-800 mb-3 leading-relaxed tracking-wide">
    {product.title}
  </h1>
  
  {/* Rating Section */}
  <div className="flex items-center mb-3">
    <div className="flex items-center mr-3">
      {Array(5)
        .fill()
        .map((_, i) => (
          <StarIcon 
            key={i} 
            className={`h-3 w-3 ${i < Math.round(product.rating.rate) ? 'text-yellow-300/80' : 'text-gray-200/60'}`}
          />
        ))}
    </div>
    <span className="text-[10px] font-light text-gray-400 tracking-wider">
      {product.rating.count} reviews
    </span>
  </div>
  
  {/* Price Section */}
  <div className="flex items-baseline space-x-2 mb-4">
    <div className="flex items-baseline space-x-1">
      <span className="text-sm font-light text-gray-400">$</span>
      <span className="text-2xl font-extralight text-gray-900 tracking-tight">
        {product.price}
      </span>
      <span className="text-[10px] font-light text-gray-400 uppercase tracking-wider">
        USD
      </span>
    </div>
    <div className="flex items-baseline space-x-1">
      <span className="text-[10px] font-light text-gray-300">$</span>
      <span className="text-sm font-light text-gray-300 line-through tracking-tight">
        {product.price}
      </span>
    </div>
  </div>
  
  {/* Description */}
  <p className="text-[12px] text-gray-600/90 mb-5 leading-relaxed font-light mr-6 line-clamp-4">
    {product.description}
  </p>
  
  {/* Action Buttons */}
  <div className="flex space-x-3">
    <button
      onClick={addItemToBasket}
      className="bg-gray-50/80 hover:bg-gray-100/80 text-gray-700 font-light text-sm py-2.5 px-5 rounded-md transition-all duration-300 border border-gray-200/50 hover:border-gray-300/50 backdrop-blur-sm flex-1"
    >
      Add to Cart
    </button>
    <button 
      className="bg-gray-100/80 hover:bg-gray-200/80 text-gray-800 font-light text-sm py-2.5 px-5 rounded-md transition-all duration-300 border border-gray-300/50 hover:border-gray-400/50 backdrop-blur-sm flex-1"
    >
      Buy Now
    </button>
  </div>
</div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailComponent;