'use client';
import Image from "next/image";
import { useState } from "react";
import { Star, Truck } from "lucide-react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import { addToBasket } from "../redux/slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const [hasPrime] = useState(Math.random() < 0.5);

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };
    dispatch(addToBasket(product));
  };

  const viewProductDetail = () => {
    router.push(`/product/${id}`);
  };

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
      {/* Category - ultra subtle */}
      <p className="absolute top-2 right-2 text-[10px] font-light text-gray-400/80 uppercase tracking-wider">
        {category}
      </p>

      {/* Product Image */}
      <div 
        onClick={viewProductDetail} 
        className="cursor-pointer mb-3 flex items-center justify-center"
      >
        <Image 
          src={image} 
          height={200} 
          width={200} 
          objectFit="contain" 
          className="filter brightness-[0.98] group-hover:scale-[1.02] transition-transform duration-500"
          alt={title}
        />
      </div>

      {/* Product Title */}
      <h4 className="text-sm font-normal text-gray-700 mb-2 line-clamp-2 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
        {title}
      </h4>

      {/* Rating Stars - show all 5 with filled/empty */}
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

      {/* Price - modern real-world feel */}
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
        onClick={addItemToBasket} 
        className="mt-auto w-full bg-gray-50/60 hover:bg-gray-100/70 text-gray-700 font-light text-sm py-2 px-4 rounded-md transition-all duration-300 border border-gray-200/40 hover:border-gray-300/50 backdrop-blur-sm"
      >
        Add to Basket
      </button>
    </div>
  );
}

export default Product;