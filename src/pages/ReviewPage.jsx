// src/pages/ReviewsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  MessageSquare, 
  Calendar, 
  User, 
  ShoppingBag, 
  ThumbsUp,
  Filter,
  ChevronDown,
  Search,
  Award,
  TrendingUp,
  Shield,
  CheckCircle
} from 'lucide-react';
import { getReviews, getProducts, getReviewStats } from '../api/api';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewStats, setReviewStats] = useState(null);

  // Filter states
  const [selectedProduct, setSelectedProduct] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAndSortReviews();
  }, [reviews, selectedProduct, ratingFilter, sortBy, searchQuery]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [reviewsData, productsData, statsData] = await Promise.all([
        getReviews(),
        getProducts(),
        getReviewStats()
      ]);
      setReviews(reviewsData);
      setProducts(productsData);
      setFilteredReviews(reviewsData);
      setReviewStats(statsData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message || 'Failed to load reviews');
      
      // Fallback: Sample data for testing
      const sampleReviews = getSampleReviews();
      const sampleProducts = await getProducts();
      setReviews(sampleReviews);
      setProducts(sampleProducts);
      setFilteredReviews(sampleReviews);
      setReviewStats(getSampleStats());
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortReviews = () => {
    let filtered = [...reviews];

    // Product filter
    if (selectedProduct) {
      filtered = filtered.filter(review => 
        review.product?.id?.toString() === selectedProduct
      );
    }

    // Rating filter
    if (ratingFilter > 0) {
      filtered = filtered.filter(review => review.rating >= ratingFilter);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(review =>
        review.comment?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.product?.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort reviews
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case 'highest':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case 'helpful':
        filtered.sort((a, b) => (b.helpful_count || 0) - (a.helpful_count || 0));
        break;
      default:
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    setFilteredReviews(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleResetFilters = () => {
    setSelectedProduct('');
    setRatingFilter(0);
    setSearchQuery('');
    setSortBy('newest');
    setShowFilters(false);
  };

  const handleHelpfulClick = (reviewId) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, helpful_count: (review.helpful_count || 0) + 1 }
        : review
    ));
  };

  // Pagination calculations
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (error && reviews.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <div className="text-6xl mb-6">😞</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Reviews</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={fetchData}
            className="bg-gradient-to-r from-brand-purple to-brand-purple-light text-white px-6 py-3 rounded-lg font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-brand-purple to-purple-700 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Customer Reviews</h1>
            <p className="text-lg text-purple-100 mb-8">
              Read what our customers have to say about our products. 
              Genuine feedback from real users.
            </p>
            
            {/* Overall Rating Stats */}
            {reviewStats && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold">{reviewStats.average_rating || '4.8'}</div>
                    <div className="flex justify-center mt-2">
                      {renderStars(reviewStats.average_rating || 5)}
                    </div>
                    <div className="text-sm text-purple-200 mt-1">
                      {reviewStats.total_reviews || reviews.length} Reviews
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map(star => {
                      const percentage = reviewStats.rating_distribution?.[star] || 0;
                      return (
                        <div key={star} className="flex items-center">
                          <div className="w-16 text-right mr-3">
                            <span className="text-sm">{star} stars</span>
                          </div>
                          <div className="w-48 bg-white/20 rounded-full h-2">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <div className="w-12 text-right ml-3">
                            <span className="text-sm">{percentage}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-8">
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Reviews
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search comments, products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                  />
                </div>
              </div>

              {/* Product Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Product
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                >
                  <option value="">All Products</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setRatingFilter(ratingFilter === rating ? 0 : rating)}
                      className={`flex items-center w-full p-2 rounded-lg ${ratingFilter === rating ? 'bg-purple-50 border border-brand-purple' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex mr-3">
                        {renderStars(rating)}
                      </div>
                      <span className="text-sm text-gray-600">& above</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                  <option value="helpful">Most Helpful</option>
                </select>
              </div>

              {/* Stats */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Reviews</span>
                    <span className="font-semibold">{filteredReviews.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Rating</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-semibold">
                        {reviews.length > 0 
                          ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
                          : '0.0'
                        }
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Products Reviewed</span>
                    <span className="font-semibold">
                      {[...new Set(reviews.map(r => r.product?.id))].length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleResetFilters}
                className="w-full mt-6 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200"
              >
                Reset All Filters
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Trust Our Reviews?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Verified Purchases</h4>
                    <p className="text-sm text-gray-600">All reviews are from verified customers</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">No Fake Reviews</h4>
                    <p className="text-sm text-gray-600">We strictly prohibit fake reviews</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="w-5 h-5 text-yellow-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Recent & Relevant</h4>
                    <p className="text-sm text-gray-600">Updated regularly with latest feedback</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-xl px-4 py-3 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  <span className="font-medium">Filters & Sorting</span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              {showFilters && (
                <div className="mt-4 bg-white border border-gray-300 rounded-xl p-4">
                  {/* Mobile filters content would go here */}
                </div>
              )}
            </div>

            {/* Review Count */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Customer Reviews ({filteredReviews.length})
              </h2>
              <p className="text-gray-600 mt-2">
                Read honest opinions from our valued customers
              </p>
            </div>

            {/* Reviews List */}
            {loading ? (
              <div className="space-y-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/6 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredReviews.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Reviews Found</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  No reviews match your current filters. Try adjusting your search criteria.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-gradient-to-r from-brand-purple to-brand-purple-light text-white px-8 py-3 rounded-xl font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {currentReviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                      {/* Review Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          {/* User Avatar */}
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mr-4">
                            {review.user?.avatar ? (
                              <img
                                src={review.user.avatar}
                                alt={review.user?.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <User className="w-6 h-6 text-brand-purple" />
                            )}
                          </div>
                          
                          <div>
                            <h4 className="font-bold text-gray-900">
                              {review.user?.name || 'Anonymous Customer'}
                              {review.is_verified && (
                                <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </span>
                              )}
                            </h4>
                            <div className="flex items-center mt-1">
                              <div className="flex mr-3">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(review.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Helpful Button */}
                        <button
                          onClick={() => handleHelpfulClick(review.id)}
                          className="flex items-center text-gray-600 hover:text-brand-purple"
                        >
                          <ThumbsUp className="w-5 h-5 mr-2" />
                          <span>Helpful ({review.helpful_count || 0})</span>
                        </button>
                      </div>

                      {/* Review Body */}
                      <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                      </div>

                      {/* Product Info */}
                      <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                        <div className="flex items-center">
                          {review.product?.images?.[0] && (
                            <img
                              src={review.product.images[0].image}
                              alt={review.product.title}
                              className="w-16 h-16 rounded-lg object-cover mr-4 border border-gray-200"
                            />
                          )}
                          <div>
                            <div className="flex items-center text-sm text-gray-600 mb-1">
                              <ShoppingBag className="w-4 h-4 mr-2" />
                              Product Reviewed:
                            </div>
                            <Link 
                              to={`/products/${review.product?.id}`}
                              className="font-medium text-brand-purple hover:text-purple-700"
                            >
                              {review.product?.title || 'Product not available'}
                            </Link>
                          </div>
                        </div>
                        
                        {/* Product Rating Summary */}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">{review.rating}.0</div>
                          <div className="flex justify-end mt-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-12">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-lg ${currentPage === pageNum 
                            ? 'bg-brand-purple text-white' 
                            : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Write Review CTA */}
            <div className="mt-12 bg-gradient-to-r from-brand-purple/10 to-blue-50 border border-purple-100 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Share Your Experience</h3>
                  <p className="text-gray-600">
                    Purchased one of our products? We'd love to hear your feedback!
                  </p>
                </div>
                <button className="mt-4 md:mt-0 bg-gradient-to-r from-brand-purple to-brand-purple-light text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg">
                  Write a Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sample data for testing when API is not ready
const getSampleReviews = () => {
  return [
    {
      id: 1,
      rating: 5,
      comment: "Excellent product! The ChatGPT Plus account works perfectly. Support was quick to respond when I had questions.",
      created_at: "2025-01-15T10:30:00Z",
      helpful_count: 24,
      is_verified: true,
      user: {
        name: "John Doe",
        avatar: null
      },
      product: {
        id: 3,
        title: "ChatGPT Plus – 1 Month Private Account",
        images: [
          { image: "http://res.cloudinary.com/dxommxt6d/image/upload/v1767184453/runn7ecv2die8wykcnvp.png" }
        ]
      }
    },
    {
      id: 2,
      rating: 4,
      comment: "Canva Pro is amazing for my design work. Only issue was initial setup took some time.",
      created_at: "2025-01-10T14:20:00Z",
      helpful_count: 12,
      is_verified: true,
      user: {
        name: "Sarah Johnson",
        avatar: null
      },
      product: {
        id: 2,
        title: "Canva Pro – 1 Year",
        images: [
          { image: "http://res.cloudinary.com/dxommxt6d/image/upload/v1767184269/znxburenjudygfdmpzxw.webp" }
        ]
      }
    },
    {
      id: 3,
      rating: 5,
      comment: "CapCut Pro works flawlessly! The premium features have taken my video editing to the next level.",
      created_at: "2025-01-05T09:15:00Z",
      helpful_count: 31,
      is_verified: true,
      user: {
        name: "Mike Chen",
        avatar: null
      },
      product: {
        id: 4,
        title: "CapCut Pro Monthly Private",
        images: [
          { image: "http://res.cloudinary.com/dxommxt6d/image/upload/v1767184555/zmrqvw7txeztmhimo7o4.webp" }
        ]
      }
    },
    // Add more sample reviews as needed
  ];
};

const getSampleStats = () => {
  return {
    average_rating: 4.8,
    total_reviews: 156,
    rating_distribution: {
      5: 75,
      4: 20,
      3: 4,
      2: 0.5,
      1: 0.5
    }
  };
};

export default ReviewsPage;