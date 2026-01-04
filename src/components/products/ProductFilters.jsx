// src/components/products/ProductFilters.jsx
import React, { useState } from 'react';
import { Filter, Tag, DollarSign, RefreshCw, Star, Check, TrendingUp, Zap, ChevronDown } from 'lucide-react';

const ProductFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  onReset,
  productsCount,
  totalProducts
}) => {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isSpecialOpen, setIsSpecialOpen] = useState(true);
  const [inStockOnly, setInStockOnly] = useState(true);
  const [bestSellersOnly, setBestSellersOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [instantDelivery, setInstantDelivery] = useState(false);

  const priceRanges = [
    { label: 'Under PKR 1,000', min: 0, max: 1000 },
    { label: 'PKR 1,000 - PKR 2,000', min: 1000, max: 2000 },
    { label: 'PKR 2,000 - PKR 5,000', min: 2000, max: 5000 },
    { label: 'PKR 5,000 - PKR 10,000', min: 5000, max: 10000 },
    { label: 'Over PKR 10,000', min: 10000, max: 50000 },
  ];

  const handlePriceSubmit = () => {
    onPriceChange(localPriceRange[0], localPriceRange[1]);
  };

  const handleResetAll = () => {
    setInStockOnly(true);
    setBestSellersOnly(false);
    setFeaturedOnly(false);
    setInstantDelivery(false);
    setLocalPriceRange([0, 50000]);
    onReset();
  };

  return (
    <div className="bg-white rounded-xl border border-[#D1D5DB] p-5 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#D1D5DB]">
        <div className="flex items-center">
          <Filter className="w-5 h-5 text-[#1E3A8A] mr-2" />
          <h3 className="text-lg font-bold text-[#111827]">Filters</h3>
        </div>
        <button
          onClick={handleResetAll}
          className="text-sm text-gray-600 hover:text-[#1E3A8A] flex items-center transition-colors hover:bg-[#F3F4F6] px-3 py-1 rounded-lg"
        >
          <RefreshCw className="w-4 h-4 mr-1" />
          Reset All
        </button>
      </div>

      {/* Products Count */}
      <div className="bg-[#1E3A8A]/5 rounded-lg p-4 mb-6 border border-[#D1D5DB]">
        <div className="text-sm text-gray-600 mb-1">Available Tools</div>
        <div className="flex items-baseline">
          <div className="text-2xl font-bold text-[#1E3A8A]">{productsCount}</div>
          <div className="text-gray-600 ml-2">out of {totalProducts} tools</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
          <div 
            className="bg-[#1E3A8A] h-2 rounded-full" 
            style={{ width: `${(productsCount / totalProducts) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-6 border border-[#D1D5DB] rounded-lg overflow-hidden">
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="w-full flex items-center justify-between p-4 bg-white hover:bg-[#F3F4F6] transition-colors"
        >
          <div className="flex items-center">
            <Tag className="w-5 h-5 text-[#1E3A8A] mr-3" />
            <span className="font-semibold text-[#111827]">Categories</span>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isCategoryOpen && (
          <div className="px-4 pb-4">
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              <button
                onClick={() => onCategoryChange('')}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all flex items-center justify-between ${
                  selectedCategory === ''
                    ? 'bg-[#1E3A8A] text-white'
                    : 'text-gray-700 hover:bg-[#F3F4F6] border border-transparent hover:border-[#D1D5DB]'
                }`}
              >
                <span className="font-medium">All Tools</span>
                {selectedCategory === '' && <Check className="w-4 h-4" />}
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id.toString())}
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-all flex items-center justify-between ${
                    selectedCategory === category.id.toString()
                      ? 'bg-[#1E3A8A] text-white'
                      : 'text-gray-700 hover:bg-[#F3F4F6] border border-transparent hover:border-[#D1D5DB]'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="truncate">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 bg-[#F3F4F6] text-gray-700 rounded-full">
                      {category.product_count || 0}
                    </span>
                    {selectedCategory === category.id.toString() && <Check className="w-4 h-4" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price Range Section */}
      <div className="mb-6 border border-[#D1D5DB] rounded-lg overflow-hidden">
        <button
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="w-full flex items-center justify-between p-4 bg-white hover:bg-[#F3F4F6] transition-colors"
        >
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-[#1E3A8A] mr-3" />
            <span className="font-semibold text-[#111827]">Price Range</span>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isPriceOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isPriceOpen && (
          <div className="px-4 pb-4">
            {/* Quick Price Filters */}
            <div className="space-y-2 mb-4">
              {priceRanges.map((range, index) => (
                <button
                  key={index}
                  onClick={() => onPriceChange(range.min, range.max)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all flex items-center justify-between ${
                    priceRange[0] === range.min && priceRange[1] === range.max
                      ? 'bg-[#1E3A8A] text-white'
                      : 'text-gray-700 hover:bg-[#F3F4F6] border border-transparent hover:border-[#D1D5DB]'
                  }`}
                >
                  <span>{range.label}</span>
                  {priceRange[0] === range.min && priceRange[1] === range.max && (
                    <Check className="w-4 h-4" />
                  )}
                </button>
              ))}
            </div>

            {/* Custom Price Range */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-[#111827]">Custom Range</div>
                <div className="text-sm text-[#1E3A8A] font-medium">
                  PKR {localPriceRange[0].toLocaleString()} - PKR {localPriceRange[1].toLocaleString()}
                </div>
              </div>

              <div className="relative pt-1 mb-3">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="500"
                  value={localPriceRange[0]}
                  onChange={(e) => setLocalPriceRange([parseInt(e.target.value), localPriceRange[1]])}
                  className="absolute w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1E3A8A] [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow"
                />
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="500"
                  value={localPriceRange[1]}
                  onChange={(e) => setLocalPriceRange([localPriceRange[0], parseInt(e.target.value)])}
                  className="absolute w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1E3A8A] [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow"
                />
                <div className="h-2 bg-gray-200 rounded-lg"></div>
              </div>

              <div className="flex items-center justify-between mt-1 text-xs text-gray-600 mb-3">
                <span>PKR 0</span>
                <span>PKR 50,000</span>
              </div>

              <button
                onClick={handlePriceSubmit}
                className="w-full bg-[#1E3A8A] text-white py-2.5 rounded-lg font-medium hover:bg-[#1E3A8A]/90 hover:shadow-md transition-all"
              >
                Apply Price Range
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Special Filters Section */}
      <div className="mb-6 border border-[#D1D5DB] rounded-lg overflow-hidden">
        <button
          onClick={() => setIsSpecialOpen(!isSpecialOpen)}
          className="w-full flex items-center justify-between p-4 bg-white hover:bg-[#F3F4F6] transition-colors"
        >
          <div className="flex items-center">
            <Star className="w-5 h-5 text-[#FACC15] mr-3" />
            <span className="font-semibold text-[#111827]">Special Filters</span>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isSpecialOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isSpecialOpen && (
          <div className="px-4 pb-4">
            <div className="space-y-3">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="sr-only" 
                  />
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                    inStockOnly 
                      ? 'bg-[#1E3A8A] border-[#1E3A8A]' 
                      : 'bg-white border-[#D1D5DB] group-hover:border-[#1E3A8A]'
                  }`}>
                    {inStockOnly && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <span className="ml-3 text-gray-700 font-medium">In Stock Only</span>
              </label>

              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={bestSellersOnly}
                    onChange={(e) => setBestSellersOnly(e.target.checked)}
                    className="sr-only" 
                  />
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                    bestSellersOnly 
                      ? 'bg-[#1E3A8A] border-[#1E3A8A]' 
                      : 'bg-white border-[#D1D5DB] group-hover:border-[#1E3A8A]'
                  }`}>
                    {bestSellersOnly && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <span className="ml-3 text-gray-700 font-medium flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-[#FACC15]" />
                  Best Sellers
                </span>
              </label>

              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={featuredOnly}
                    onChange={(e) => setFeaturedOnly(e.target.checked)}
                    className="sr-only" 
                  />
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                    featuredOnly 
                      ? 'bg-[#1E3A8A] border-[#1E3A8A]' 
                      : 'bg-white border-[#D1D5DB] group-hover:border-[#1E3A8A]'
                  }`}>
                    {featuredOnly && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <span className="ml-3 text-gray-700 font-medium flex items-center">
                  <Star className="w-4 h-4 mr-2 text-[#FACC15] fill-current" />
                  Featured Tools
                </span>
              </label>

              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={instantDelivery}
                    onChange={(e) => setInstantDelivery(e.target.checked)}
                    className="sr-only" 
                  />
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                    instantDelivery 
                      ? 'bg-[#1E3A8A] border-[#1E3A8A]' 
                      : 'bg-white border-[#D1D5DB] group-hover:border-[#1E3A8A]'
                  }`}>
                    {instantDelivery && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <span className="ml-3 text-gray-700 font-medium flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-[#FACC15]" />
                  Instant Delivery (5 min)
                </span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="bg-[#F3F4F6] rounded-lg p-4 mt-6">
        <h4 className="font-semibold text-[#111827] mb-3 text-sm">Quick Stats</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="text-lg font-bold text-[#1E3A8A]">
              {Math.round((productsCount / totalProducts) * 100)}%
            </div>
            <div className="text-xs text-gray-600">Available</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-[#FACC15]">
              {categories.filter(cat => cat.product_count > 0).length}
            </div>
            <div className="text-xs text-gray-600">Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;