"use client"

import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, Filter } from 'lucide-react';

const MercedesPartsCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);

      // Sample data with 50 Mercedes-Benz spare parts
  const parts = [
    // Engine Components
    { id: 1, name: 'Engine Oil Filter', price: 45.99, category: 'engine', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' }, 
    { id: 2, name: 'Air Filter Element', price: 32.50, category: 'engine', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' },
    { id: 3, name: 'Spark Plug Set', price: 89.99, category: 'engine', image: 'https://images.unsplash.com/photo-1632823469850-d4d29c4b3b3b?w=800&h=600&fit=crop' },
    { id: 4, name: 'Fuel Pump Assembly', price: 245.00, category: 'engine', image: 'https://images.unsplash.com/photo-1619732734245-f4c85c0d4b3b?w=800&h=600&fit=crop' },
    { id: 5, name: 'Timing Belt Kit', price: 156.75, category: 'engine', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop' },
    { id: 6, name: 'Radiator Assembly', price: 399.99, category: 'engine', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' },
    { id: 7, name: 'Thermostat Housing', price: 67.50, category: 'engine', image: 'https://images.unsplash.com/photo-1609830498458-1d5f3e6b3b3b?w=800&h=600&fit=crop' },
    { id: 8, name: 'Crankshaft Pulley', price: 123.99, category: 'engine', image: 'https://images.unsplash.com/photo-1632823469850-d4d29c4b3b3b?w=800&h=600&fit=crop' },
    { id: 9, name: 'Valve Cover Gasket', price: 78.25, category: 'engine', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop' },
    { id: 10, name: 'Exhaust Manifold', price: 234.50, category: 'engine', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' },

    // Brake System
    { id: 11, name: 'Brake Pad Set Front', price: 89.99, category: 'brakes', image: 'https://images.unsplash.com/photo-1632823469850-d4d29c4b3b3b?w=800&h=600&fit=crop' },
    { id: 12, name: 'Brake Disc Rotor', price: 156.75, category: 'brakes', image: 'https://images.unsplash.com/photo-1619732734245-f4c85c0d4b3b?w=800&h=600&fit=crop' },
    { id: 13, name: 'Brake Caliper', price: 245.00, category: 'brakes', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop' },
    { id: 14, name: 'Brake Master Cylinder', price: 189.99, category: 'brakes', image: 'https://images.unsplash.com/photo-1609830498458-1d5f3e6b3b3b?w=800&h=600&fit=crop' },
    { id: 15, name: 'Brake Fluid DOT 4', price: 23.50, category: 'brakes', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' },
    { id: 16, name: 'Brake Hose Kit', price: 67.99, category: 'brakes', image: 'https://images.unsplash.com/photo-1632823469850-d4d29c4b3b3b?w=800&h=600&fit=crop' },
    { id: 17, name: 'ABS Sensor', price: 134.75, category: 'brakes', image: 'https://images.unsplash.com/photo-1619732734245-f4c85c0d4b3b?w=800&h=600&fit=crop' },
    { id: 18, name: 'Brake Booster', price: 299.99, category: 'brakes', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop' },

    // Suspension & Steering
    { id: 19, name: 'Shock Absorber Front', price: 178.50, category: 'suspension', image: 'https://images.unsplash.com/photo-1609830498458-1d5f3e6b3b3b?w=800&h=600&fit=crop' },
    { id: 20, name: 'Coil Spring Set', price: 145.99, category: 'suspension', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' },
    { id: 21, name: 'Steering Rack', price: 456.75, category: 'suspension', image: 'https://images.unsplash.com/photo-1632823469850-d4d29c4b3b3b?w=800&h=600&fit=crop' },
    { id: 22, name: 'Control Arm Kit', price: 223.50, category: 'suspension', image: 'https://images.unsplash.com/photo-1619732734245-f4c85c0d4b3b?w=800&h=600&fit=crop' },
    { id: 23, name: 'Sway Bar Link', price: 89.99, category: 'suspension', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop' },
    { id: 24, name: 'Ball Joint Set', price: 167.25, category: 'suspension', image: 'https://images.unsplash.com/photo-1609830498458-1d5f3e6b3b3b?w=800&h=600&fit=crop' },
    { id: 25, name: 'Tie Rod End', price: 78.50, category: 'suspension', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' },

    // Electrical
    { id: 26, name: 'Headlight Assembly', price: 345.99, category: 'electrical', image: 'https://images.unsplash.com/photo-1632823469850-d4d29c4b3b3b?w=800&h=600&fit=crop' },
    { id: 27, name: 'Alternator', price: 289.50, category: 'electrical', image: 'https://images.unsplash.com/photo-1619732734245-f4c85c0d4b3b?w=800&h=600&fit=crop' },
    { id: 28, name: 'Starter Motor', price: 234.75, category: 'electrical', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop' },
    { id: 29, name: 'Battery 12V AGM', price: 189.99, category: 'electrical', image: 'https://images.unsplash.com/photo-1609830498458-1d5f3e6b3b3b?w=800&h=600&fit=crop' },
    { id: 30, name: 'Ignition Coil', price: 112.50, category: 'electrical', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' },
    { id: 31, name: 'Oxygen Sensor', price: 156.75, category: 'electrical', image: 'https://images.unsplash.com/photo-1632823469850-d4d29c4b3b3b?w=800&h=600&fit=crop' },
    { id: 32, name: 'ECU Module', price: 789.99, category: 'electrical', image: 'https://images.unsplash.com/photo-1619732734245-f4c85c0d4b3b?w=800&h=600&fit=crop' },

    // Body & Interior
    { id: 33, name: 'Door Handle Chrome', price: 89.99, category: 'body', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop' },
    { id: 34, name: 'Side Mirror Assembly', price: 167.50, category: 'body', image: 'https://images.unsplash.com/photo-1609830498458-1d5f3e6b3b3b?w=800&h=600&fit=crop' },
    { id: 35, name: 'Windshield Wipers', price: 45.75, category: 'body', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' },
    { id: 36, name: 'Grille Assembly', price: 234.99, category: 'body', image: 'https://images.unsplash.com/photo-1632823469850-d4d29c4b3b3b?w=800&h=600&fit=crop' },
    { id: 37, name: 'Taillight LED', price: 189.50, category: 'body', image: 'https://images.unsplash.com/photo-1619732734245-f4c85c0d4b3b?w=800&h=600&fit=crop' },
    { id: 38, name: 'Seat Cover Leather', price: 456.75, category: 'interior', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop' },
    { id: 39, name: 'Floor Mats Set', price: 123.50, category: 'interior', image: 'https://images.unsplash.com/photo-1609830498458-1d5f3e6b3b3b?w=800&h=600&fit=crop' },
    { id: 40, name: 'Dashboard Trim', price: 278.99, category: 'interior', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' },

    // Transmission
    { id: 41, name: 'Transmission Filter', price: 67.50, category: 'transmission', image: 'https://images.unsplash.com/photo-1632823469850-d4d29c4b3b3b?w=800&h=600&fit=crop' },
    { id: 42, name: 'CVT Fluid', price: 89.99, category: 'transmission', image: 'https://images.unsplash.com/photo-1619732734245-f4c85c0d4b3b?w=800&h=600&fit=crop' },
    { id: 43, name: 'Clutch Kit', price: 456.75, category: 'transmission', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop' },
    { id: 44, name: 'Drive Shaft', price: 234.50, category: 'transmission', image: 'https://images.unsplash.com/photo-1609830498458-1d5f3e6b3b3b?w=800&h=600&fit=crop' },

    // Cooling System
    { id: 45, name: 'Coolant Reservoir', price: 78.99, category: 'cooling', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' },
    { id: 46, name: 'Water Pump', price: 189.50, category: 'cooling', image: 'https://images.unsplash.com/photo-1632823469850-d4d29c4b3b3b?w=800&h=600&fit=crop' },
    { id: 47, name: 'Cooling Fan', price: 167.75, category: 'cooling', image: 'https://images.unsplash.com/photo-1619732734245-f4c85c0d4b3b?w=800&h=600&fit=crop' },
    { id: 48, name: 'Hose Clamp Set', price: 34.99, category: 'cooling', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop' },
    { id: 49, name: 'Radiator Cap', price: 23.50, category: 'cooling', image: 'https://images.unsplash.com/photo-1609830498458-1d5f3e6b3b3b?w=800&h=600&fit=crop' },
    { id: 50, name: 'Coolant Temperature Sensor', price: 56.75, category: 'cooling', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' }
  ];

  const categories = [
    { id: 'all', name: 'All Parts' },
    { id: 'engine', name: 'Engine' },
    { id: 'brakes', name: 'Brakes' },
    { id: 'suspension', name: 'Suspension' },
    { id: 'electrical', name: 'Electrical' },
    { id: 'body', name: 'Body & Exterior' },
    { id: 'interior', name: 'Interior' },
    { id: 'transmission', name: 'Transmission' },
    { id: 'cooling', name: 'Cooling System' }
  ];

  const filteredParts = parts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (part) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === part.id);
      if (existing) {
        return prev.map(item => 
          item.id === part.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...part, quantity: 1 }];
    });
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold">Mercedes-Benz</div>
            <div className="text-lg text-gray-300">Spare Parts Warehouse</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </div>
            <div className="text-sm">
              Cart: ${cartTotal.toFixed(2)}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search parts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Parts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredParts.map(part => (
            <div key={part.id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={part.image}
                  alt={part.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{part.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-blue-600">${part.price}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">{part.category}</span>
                </div>
                <button
                  onClick={() => addToCart(part)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredParts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No parts found matching your search.</div>
          </div>
        )}

        {/* Results Count */}
        <div className="mt-8 text-center text-gray-600">
          Showing {filteredParts.length} of {parts.length} parts
        </div>
      </div>

      {/* Cart Summary (if items in cart) */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
          <h3 className="font-semibold mb-2">Cart Summary</h3>
          <div className="space-y-1 text-sm">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default MercedesPartsCatalog;