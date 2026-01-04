// src/components/products/ReviewList.jsx
import React from 'react';
import { Star, ThumbsUp, MessageCircle, CheckCircle, User, MapPin, Calendar } from 'lucide-react';

function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-[#D1D5DB]">
        <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[#111827] mb-2">No Reviews Yet</h3>
        <p className="text-gray-600 mb-6">Be the first to review this tool</p>
        <button className="inline-flex items-center bg-[#1E3A8A] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#1E3A8A]/90 transition-colors">
          <MessageCircle className="w-4 h-4 mr-2" />
          Write First Review
        </button>
      </div>
    );
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const ratingDistribution = Array(5).fill(0).map((_, i) => ({
    stars: 5 - i,
    count: reviews.filter(r => r.rating === 5 - i).length,
    percentage: (reviews.filter(r => r.rating === 5 - i).length / reviews.length) * 100
  }));

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-white rounded-xl border border-[#D1D5DB] p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Average Rating */}
          <div className="text-center md:text-left">
            <div className="text-5xl font-bold text-[#111827] mb-2">
              {getAverageRating()}
            </div>
            <div className="flex items-center justify-center md:justify-start mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(getAverageRating())
                      ? 'text-[#FACC15] fill-current'
                      : i < getAverageRating()
                      ? 'text-[#FACC15] fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-gray-600 text-sm">
              Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2 min-w-[200px]">
            {ratingDistribution.map((dist) => (
              <div key={dist.stars} className="flex items-center">
                <div className="flex items-center w-16">
                  <span className="text-sm text-[#111827] font-medium w-4">{dist.stars}</span>
                  <Star className="w-4 h-4 text-[#FACC15] fill-current ml-1" />
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden mx-3">
                  <div
                    className="h-full bg-[#1E3A8A] rounded-full"
                    style={{ width: `${dist.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-10 text-right">
                  {dist.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl border border-[#D1D5DB] p-5 hover:border-[#1E3A8A] transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div className="flex items-start space-x-3">
                {/* User Avatar */}
                <div className="h-10 w-10 bg-gradient-to-br from-[#1E3A8A] to-[#2D4A9C] rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                  {review.customer_name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                
                <div>
                  <div className="font-semibold text-[#111827] flex items-center gap-2">
                    {review.customer_name || 'Anonymous User'}
                    {review.verified_purchase && (
                      <span className="inline-flex items-center text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </span>
                    )}
                  </div>
                  
                  {/* Review Meta */}
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(review.created_at)}
                    </div>
                    {review.location && (
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {review.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Rating Stars */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-[#FACC15] fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-[#111827]">
                  {review.rating}/5
                </span>
              </div>
            </div>

            {/* Review Comment */}
            {review.comment && (
              <div className="mt-3">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {review.comment}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#D1D5DB]">
              <button className="flex items-center text-sm text-gray-600 hover:text-[#1E3A8A] transition-colors">
                <ThumbsUp className="w-4 h-4 mr-1.5" />
                Helpful ({review.helpful_count || 0})
              </button>
              
              {review.purchased_tool && (
                <div className="text-xs px-3 py-1 bg-[#1E3A8A]/10 text-[#1E3A8A] rounded-full">
                  Purchased: {review.purchased_tool}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load More / Write Review */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#D1D5DB]">
        <div className="text-sm text-gray-600">
          Showing {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
        </div>
        
        <div className="flex items-center gap-3">
          {reviews.length > 3 && (
            <button className="border border-[#D1D5DB] text-[#111827] px-5 py-2 rounded-lg font-medium hover:bg-[#F3F4F6] transition-colors">
              Load More Reviews
            </button>
          )}
          
          <button className="bg-[#1E3A8A] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#1E3A8A]/90 transition-colors flex items-center">
            <MessageCircle className="w-4 h-4 mr-2" />
            Write a Review
          </button>
        </div>
      </div>

      {/* Review Tips */}
      <div className="bg-[#F3F4F6] rounded-xl p-5 mt-6">
        <h4 className="font-semibold text-[#111827] mb-3 flex items-center">
          <CheckCircle className="w-4 h-4 text-[#1E3A8A] mr-2" />
          Tips for Writing Helpful Reviews
        </h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full mt-1.5 mr-3"></div>
            Mention which tool you purchased and how you're using it
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full mt-1.5 mr-3"></div>
            Share your experience with delivery and setup
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full mt-1.5 mr-3"></div>
            Be honest about what you liked and what could be improved
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full mt-1.5 mr-3"></div>
            Help other buyers make informed decisions
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ReviewList;