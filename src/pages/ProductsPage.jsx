// src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import { getAllProducts, getCategories } from '../api/api';
import { Filter, Grid, List, Search, Sliders, ChevronDown, Loader, ShoppingCart, Tag, TrendingUp, Zap } from 'lucide-react';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Simple load more pagination
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [allProducts, selectedCategory, priceRange, searchQuery, sortBy]);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [productsData, categoriesData] = await Promise.all([
        getAllProducts(),
        getCategories()
      ]);
      
      setAllProducts(productsData);
      setCategories(categoriesData);
      setFilteredProducts(productsData);
    } catch (err) {
      console.error("Error in fetchData:", err);
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...allProducts];

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.categories?.some(cat => cat.id.toString() === selectedCategory)
      );
    }

    // Price filter
    filtered = filtered.filter(product => {
      const price = parseFloat(product.price) || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price) || 0;
          const priceB = parseFloat(b.price) || 0;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price) || 0;
          const priceB = parseFloat(b.price) || 0;
          return priceB - priceA;
        });
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      default: // 'newest'
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    setFilteredProducts(filtered);
    setVisibleCount(12);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchParams(categoryId ? { category: categoryId } : {});
  };

  const handlePriceChange = (min, max) => {
    setPriceRange([min, max]);
  };

  const handleResetFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 10000]);
    setSearchQuery('');
    setSortBy('newest');
    setVisibleCount(12);
    setSearchParams({});
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Get currently visible products
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMoreProducts = visibleProducts.length < filteredProducts.length;

  const popularTools = [
    { name: 'Canva Pro', discount: 60 },
    { name: 'ChatGPT Plus', discount: 70 },
    { name: 'Adobe Suite', discount: 65 },
    { name: 'Grammarly', discount: 60 },
  ];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <div className="text-6xl mb-6">😞</div>
          <h2 className="text-2xl font-bold text-[#111827] mb-4">Error Loading Products</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={fetchData}
            className="bg-[#1E3A8A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1E3A8A]/90 hover:shadow-lg transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2D4A9C] text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full mb-6">
              <ShoppingCart className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Premium Tools Catalog</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium Online Tools</h1>
            <p className="text-lg text-white/80 mb-8">
              Browse our collection of premium software subscriptions at wholesale prices. 
              Get genuine licenses with instant delivery.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tools like Canva, ChatGPT, Adobe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
              />
            </div>

            {/* Popular Tools Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-sm text-white/80 mr-2">Popular:</span>
              {popularTools.map((tool, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(tool.name)}
                  className="inline-flex items-center px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tool.name} ({tool.discount}% OFF)
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-1/4">
            <ProductFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              onPriceChange={handlePriceChange}
              onReset={handleResetFilters}
              productsCount={filteredProducts.length}
              totalProducts={allProducts.length}
            />

            {/* Stats Box */}
            <div className="bg-white rounded-xl border border-[#D1D5DB] p-6 mt-6">
              <h3 className="font-bold text-[#111827] mb-4 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-[#1E3A8A]" />
                Why Buy From Us
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-[#1E3A8A] rounded-full mr-3"></div>
                  Instant delivery (5 minutes)
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-[#1E3A8A] rounded-full mr-3"></div>
                  Lowest prices guaranteed
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-[#1E3A8A] rounded-full mr-3"></div>
                  24/7 WhatsApp support
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-[#1E3A8A] rounded-full mr-3"></div>
                  Genuine licenses only
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-between bg-white border border-[#D1D5DB] rounded-xl px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <Sliders className="w-5 h-5 mr-2 text-[#1E3A8A]" />
                  <span className="font-medium">Filters & Sorting</span>
                </div>
                <span className="text-sm text-gray-600">
                  {filteredProducts.length} tools
                </span>
              </button>
              
              {showFilters && (
                <div className="mt-4 bg-white border border-[#D1D5DB] rounded-xl p-4">
                  <ProductFilters
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    priceRange={priceRange}
                    onPriceChange={handlePriceChange}
                    onReset={handleResetFilters}
                    productsCount={filteredProducts.length}
                    totalProducts={allProducts.length}
                  />
                </div>
              )}
            </div>

            {/* Toolbar */}
            <div className="bg-white rounded-xl border border-[#D1D5DB] p-4 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-bold text-[#111827]">{Math.min(visibleProducts.length, filteredProducts.length)}</span> of{' '}
                  <span className="font-bold text-[#111827]">{filteredProducts.length}</span> tools{' '}
                  <span className="text-gray-400">({allProducts.length} total)</span>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Sort Dropdown */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-white border border-[#D1D5DB] rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent text-sm"
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name">Name: A to Z</option>
                      </select>
                      <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* View Toggle */}
                  <div className="flex items-center border border-[#D1D5DB] rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#1E3A8A] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[#1E3A8A] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {loading ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-6"
              }>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 rounded-xl h-64 mb-4 border border-[#D1D5DB]"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-[#D1D5DB]">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-[#111827] mb-4">No Tools Found</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We couldn't find any tools matching your search. Try different keywords or categories.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleResetFilters}
                    className="bg-[#1E3A8A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1E3A8A]/90 hover:shadow-lg transition-all"
                  >
                    Reset All Filters
                  </button>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="border-2 border-[#1E3A8A] text-[#1E3A8A] px-8 py-3 rounded-lg font-semibold hover:bg-[#1E3A8A]/5 transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onViewDetails={() => handleViewDetails(product.id)} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMoreProducts && (
                  <div className="text-center mt-12">
                    <button
                      onClick={handleLoadMore}
                      className="bg-[#1E3A8A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1E3A8A]/90 hover:shadow-lg transition-all flex items-center justify-center mx-auto space-x-2 min-w-[200px]"
                    >
                      <span>Load More Tools</span>
                      <ChevronDown className="w-5 h-5" />
                    </button>
                    <p className="text-sm text-gray-500 mt-2">
                      Showing {visibleProducts.length} of {filteredProducts.length} tools
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="space-y-6">
                  {visibleProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="bg-white rounded-xl border border-[#D1D5DB] overflow-hidden hover:border-[#1E3A8A] transition-colors"
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Image */}
                        <div className="md:w-1/4 bg-gray-100">
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0].image}
                              alt={product.title}
                              className="w-full h-48 md:h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-48 md:h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <div className="text-gray-400 text-center">
                                <ShoppingCart className="w-12 h-12 mx-auto mb-2" />
                                <div className="text-sm">No Image</div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="md:w-3/4 p-6">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <div className="flex items-start justify-between mb-3">
                                <h3 className="text-xl font-bold text-[#111827]">{product.title}</h3>
                                <div className="text-right">
                                  <span className="text-2xl font-bold text-[#1E3A8A]">
                                    ₹{product.price || 'Contact'}
                                  </span>
                                  {product.original_price && (
                                    <div className="text-sm text-gray-500 line-through">
                                      ₹{product.original_price}
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Categories */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                {product.categories?.map(category => (
                                  <span
                                    key={category.id}
                                    className="px-3 py-1 bg-[#1E3A8A]/10 text-[#1E3A8A] text-sm rounded-full"
                                  >
                                    {category.name}
                                  </span>
                                ))}
                              </div>

                              {/* Description */}
                              <div 
                                className="text-gray-600 line-clamp-2 mb-6"
                                dangerouslySetInnerHTML={{ 
                                  __html: product.description?.substring(0, 200) + '...' || '' 
                                }}
                              />
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-500 flex items-center">
                                <Zap className="w-4 h-4 mr-1 text-[#FACC15]" />
                                Instant delivery
                              </div>
                              <button 
                                onClick={() => handleViewDetails(product.id)}
                                className="bg-[#1E3A8A] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#1E3A8A]/90 hover:shadow-lg transition-all"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Button for List View */}
                {hasMoreProducts && (
                  <div className="text-center mt-12">
                    <button
                      onClick={handleLoadMore}
                      className="bg-[#1E3A8A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1E3A8A]/90 hover:shadow-lg transition-all flex items-center justify-center mx-auto space-x-2 min-w-[200px]"
                    >
                      <span>Load More Tools</span>
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Show All Button */}
            {hasMoreProducts && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleCount(filteredProducts.length)}
                  className="text-[#1E3A8A] hover:text-[#2D4A9C] font-medium text-sm"
                >
                  Show all {filteredProducts.length} tools
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="container mx-auto px-4 mt-20 mb-8">
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2D4A9C] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need a Custom Tool Package?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            We can create custom bundles for teams and businesses. Get bulk discounts on multiple tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#FACC15] text-[#111827] px-8 py-3 rounded-lg font-bold hover:bg-[#FACC15]/90 hover:shadow-lg transition-all">
              Get Bulk Quote
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
              WhatsApp Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;