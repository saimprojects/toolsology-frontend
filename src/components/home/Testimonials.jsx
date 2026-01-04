// src/components/home/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Users, Heart, ThumbsUp, Award } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const testimonials = [
    {
      name: "Hira Malik",
      role: "Graphic Designer",
      content: "Very reliable service. Got my Canva Pro and Adobe subscription instantly. Customer support is super helpful.",
      rating: 5,
      tool: "Canva Pro + Adobe CC"
    },
    {
      name: "Sara Khan",
      role: "Content Creator",
      content: "Affordable prices and genuine accounts. I've been using their tools for months without any issues. Best reseller!",
      rating: 5,
      tool: "ChatGPT Plus"
    },
    {
      name: "Ali Hassan",
      role: "Digital Marketer",
      content: "Got Grammarly Premium and SEMrush at unbelievable prices. Delivery was instant and support is always available.",
      rating: 5,
      tool: "Grammarly + SEMrush"
    },
    {
      name: "Fatima Ahmed",
      role: "YouTube Creator",
      content: "Bought VidIQ and TubeBuddy from here. Instant delivery and 100% genuine access. Highly recommended!",
      rating: 5,
      tool: "VidIQ + TubeBuddy"
    },
    {
      name: "Omar Sheikh",
      role: "Web Developer",
      content: "Perfect place for premium tools. Got GitHub Copilot and Figma Pro at wholesale prices. Very satisfied!",
      rating: 5,
      tool: "GitHub Copilot"
    }
  ];

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Generate avatar colors based on name
  const getAvatarColor = (name) => {
    const colors = [
      'bg-gradient-to-br from-[#1E3A8A] to-[#2D4A9C]',
      'bg-gradient-to-br from-[#FACC15] to-[#FBBF24]',
      'bg-gradient-to-br from-[#111827] to-[#374151]',
      'bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6]'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section className="py-20 bg-[#F3F4F6]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#FACC15]/20 border border-[#FACC15]/30 mb-6">
            <Users className="w-4 h-4 text-[#111827] mr-2" />
            <span className="text-sm font-medium text-[#111827]">Happy Customers</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">
            Trusted By <span className="text-[#1E3A8A]">Thousands</span>
          </h2>
          
          <p className="text-lg text-gray-600">
            See what our customers say about their experience with Toolsology
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div 
            className="bg-white rounded-2xl border border-[#D1D5DB] p-8 md:p-12 relative shadow-lg"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            {/* Quote Icon */}
            <Quote className="absolute top-6 right-6 w-8 h-8 text-[#FACC15] opacity-20" />

            <div className="relative">
              {/* Customer Info */}
              <div className="flex items-center mb-6">
                <div className={`h-14 w-14 ${getAvatarColor(testimonials[activeIndex].name)} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                  {getInitials(testimonials[activeIndex].name)}
                </div>
                <div className="ml-4">
                  <div className="flex items-center gap-2">
                    <div className="font-bold text-[#111827] text-lg">
                      {testimonials[activeIndex].name}
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className="w-4 h-4 text-[#FACC15] fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-gray-600">{testimonials[activeIndex].role}</div>
                  <div className="text-sm text-[#1E3A8A] font-medium mt-1">
                    Purchased: {testimonials[activeIndex].tool}
                  </div>
                </div>
              </div>

              {/* Content */}
              <blockquote className="text-xl md:text-2xl font-medium text-[#111827] mb-8 leading-relaxed pl-4 border-l-4 border-[#FACC15]">
                "{testimonials[activeIndex].content}"
              </blockquote>

              {/* Verified Badge */}
              <div className="flex items-center text-sm text-green-600">
                <ThumbsUp className="w-4 h-4 mr-2" />
                <span className="font-medium">Verified Purchase</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute bottom-6 right-6 flex gap-2">
              <button
                onClick={prevSlide}
                className="h-10 w-10 bg-[#F3F4F6] border border-[#D1D5DB] rounded-full flex items-center justify-center text-[#111827] hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A] transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="h-10 w-10 bg-[#F3F4F6] border border-[#D1D5DB] rounded-full flex items-center justify-center text-[#111827] hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A] transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-8 bg-[#1E3A8A]' 
                    : 'w-2 bg-[#D1D5DB] hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Small Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl border border-[#D1D5DB] p-6 hover:border-[#1E3A8A] transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`h-10 w-10 ${getAvatarColor(testimonial.name)} rounded-full flex items-center justify-center text-white font-bold`}>
                    {getInitials(testimonial.name)}
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold text-[#111827]">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className="w-4 h-4 text-[#FACC15] fill-current"
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">"{testimonial.content}"</p>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-[#1E3A8A] font-medium bg-[#1E3A8A]/10 px-3 py-1 rounded-full">
                  {testimonial.tool}
                </div>
                <Heart className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-[#1E3A8A] to-[#2D4A9C] rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="relative">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#FACC15] p-2 rounded-lg">
                <Users className="w-5 h-5 text-[#111827]" />
              </div>
              <div className="text-4xl font-bold text-white mb-2 mt-4">5000+</div>
              <div className="text-[#D1D5DB]">Happy Customers</div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#FACC15] p-2 rounded-lg">
                <Star className="w-5 h-5 text-[#111827]" />
              </div>
              <div className="text-4xl font-bold text-white mb-2 mt-4">4.9/5</div>
              <div className="text-[#D1D5DB]">Average Rating</div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#FACC15] p-2 rounded-lg">
                <ThumbsUp className="w-5 h-5 text-[#111827]" />
              </div>
              <div className="text-4xl font-bold text-white mb-2 mt-4">99%</div>
              <div className="text-[#D1D5DB]">Satisfaction Rate</div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#FACC15] p-2 rounded-lg">
                <Award className="w-5 h-5 text-[#111827]" />
              </div>
              <div className="text-4xl font-bold text-white mb-2 mt-4">50+</div>
              <div className="text-[#D1D5DB]">Premium Tools</div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <div className="inline-flex items-center text-[#FACC15] text-sm font-medium">
              <div className="w-2 h-2 bg-[#FACC15] rounded-full mr-2 animate-pulse"></div>
              Trusted by professionals across India
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;