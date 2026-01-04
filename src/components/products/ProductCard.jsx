// src/components/products/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Star, TrendingUp, Zap, Shield, Heart, ShoppingCart, Eye, Tag, Clock } from 'lucide-react';

function ProductCard({ product, featured = false }) {
  const mainImage =
    product.images && product.images.length > 0
      ? product.images[0].image
      : null;

  const discountPercentage = product.discount_percentage || 0;
  const isOnSale = discountPercentage > 0;
  const isFeatured = product.is_featured || featured;
  const isTrending = product.is_trending || false;

  // Calculate savings
  const savings = product.original_price 
    ? product.original_price - product.price 
    : 0;

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg border border-[#D1D5DB] hover:border-[#1E3A8A]">
      {/* Badges Container */}
      <div className="absolute top-3 left-3 z-10 space-y-2">
        {isOnSale && (
          <div className="bg-[#FACC15] text-[#111827] text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5">
            <Tag className="w-3 h-3" />
            {discountPercentage}% OFF
          </div>
        )}
        
        {isFeatured && (
          <div className="bg-[#1E3A8A] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </div>
        )}
        
        {isTrending && (
          <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2D4A9C] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3" />
            Trending
          </div>
        )}
      </div>

      {/* Quick Action Buttons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button className="w-9 h-9 rounded-lg bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors border border-[#D1D5DB]">
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>
        <Link 
          to={`/product/${product.id}`}
          className="w-9 h-9 rounded-lg bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors border border-[#D1D5DB]"
        >
          <Eye className="w-4 h-4 text-gray-600 hover:text-[#1E3A8A]" />
        </Link>
      </div>

      {/* Image Container */}
      <Link to={`/product/${product.id}`}>
        <div className="relative h-52 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          {mainImage ? (
            <>
              <img
                src={mainImage}
                alt={product.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23F3F4F6'/%3E%3Ctext x='50' y='60' text-anchor='middle' font-size='12' fill='%239CA3AF'%3ETool%3C/text%3E%3C/svg%3E";
                }}
              />
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-2">🛠️</div>
                <div className="text-sm font-medium">Tool Image</div>
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Categories */}
        {product.categories?.length > 0 && (
          <div className="flex items-center gap-2 mb-2">
            {product.categories.slice(0, 1).map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug || cat.id}`}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#1E3A8A]/10 text-[#1E3A8A] hover:bg-[#1E3A8A]/20 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
            {product.categories.length > 1 && (
              <span className="text-xs text-gray-500 font-medium">
                +{product.categories.length - 1} more
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-base font-bold text-[#111827] mb-2 line-clamp-2 hover:text-[#1E3A8A] transition-colors leading-tight">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < (product.rating || 4)
                      ? "text-[#FACC15] fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-1.5">
              ({product.review_count || 12})
            </span>
          </div>
        </div>

        {/* Short Description */}
        {product.short_description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.short_description}
          </p>
        )}

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center text-xs text-gray-600">
            <Clock className="w-3 h-3 mr-1.5 text-[#1E3A8A] flex-shrink-0" />
            <span className="truncate">Instant Delivery</span>
          </div>
          
          <div className="flex items-center text-xs text-gray-600">
            <Shield className="w-3 h-3 mr-1.5 text-[#1E3A8A] flex-shrink-0" />
            <span className="truncate">Genuine License</span>
          </div>
        </div>

        {/* Price & Actions Section */}
        <div className="pt-3 border-t border-[#D1D5DB]">
          {/* Price Row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-[#111827]">
                  {product.price !== null && product.price !== undefined
                    ? `PKR ${product.price.toLocaleString()}`
                    : "Contact for Price"}
                </span>
                
                {product.original_price && product.price < product.original_price && (
                  <span className="text-sm text-gray-500 line-through">
                    PKR {product.original_price.toLocaleString()}
                  </span>
                )}
              </div>
              
              {savings > 0 && (
                <span className="text-xs text-[#FACC15] font-medium mt-0.5">
                  Save PKR {savings.toLocaleString()}
                </span>
              )}
            </div>

            {/* Bestseller Badge */}
            {product.is_bestseller && (
              <span className="text-xs px-2.5 py-1 bg-[#FACC15]/20 text-[#111827] font-medium rounded-full flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                Popular
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Link
              to={`/product/${product.id}`}
              className="flex-1 bg-[#1E3A8A] text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-[#1E3A8A]/90 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              View Details
            </Link>
            <button className="w-11 bg-[#F3F4F6] text-gray-700 rounded-lg hover:bg-[#D1D5DB] transition-colors duration-300 flex items-center justify-center border border-[#D1D5DB]">
              <Heart className="w-4 h-4 hover:text-red-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Top Selling Badge */}
      {product.top_selling && (
        <div className="absolute -top-2 -right-2">
          <div className="bg-[#FACC15] text-[#111827] text-xs font-bold px-3 py-1 rounded-lg shadow-lg rotate-12">
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Top Selling
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;