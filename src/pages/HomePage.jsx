// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/home/hero';
import ProductCard from '../components/products/ProductCard';
import Testimonials from '../components/home/Testimonials';
import { getProducts } from '../api/api';
import { 
  Sparkles, 
  TrendingUp, 
  Star, 
  Download, 
  Shield, 
  Zap, 
  Cpu,
  Clock,
  CheckCircle,
  Code,
  Database,
  Cloud,
  Lock
} from 'lucide-react';
//1000
const HomePage = () => {
  const [featuredTools, setFeaturedTools] = useState([]);
  const [trendingTools, setTrendingTools] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const products = await getProducts();
      
      // Featured tools (first 4)
      const featured = products.slice(0, 4);
      
      // Trending tools (next 4)
      const trending = products.slice(4, 8);
      
      // New releases (next 4)
      const newRelease = products.slice(8, 12);
      
      setFeaturedTools(featured);
      setTrendingTools(trending);
      setNewReleases(newRelease);
    } catch (error) {
      console.error('Error fetching tools:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Cloud,
      title: "Cloud Access",
      description: "Access tools from anywhere, anytime",
      color: "bg-gradient-to-br from-[#1E3A8A] to-[#2D4A9C]"
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Enterprise-grade security",
      color: "bg-gradient-to-br from-[#1E3A8A] to-[#2D4A9C]"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for maximum speed",
      color: "bg-gradient-to-br from-[#1E3A8A] to-[#2D4A9C]"
    },
    {
      icon: Database,
      title: "Regular Updates",
      description: "Always up-to-date features",
      color: "bg-gradient-to-br from-[#1E3A8A] to-[#2D4A9C]"
    }
  ];

  const stats = [
    { value: "10K+", label: "Active Subscribers", icon: TrendingUp },
    { value: "50+", label: "Premium Tools", icon: Code },
    { value: "99.9%", label: "Uptime", icon: Shield },
    { value: "24/7", label: "Tech Support", icon: Zap }
  ];

  return (
    <div className="fade-in bg-[#F3F4F6]">
      <Hero />
      
      {/* Featured Digital Tools */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#1E3A8A]/10 border border-[#D1D5DB] mb-4">
              <Sparkles className="w-4 h-4 text-[#1E3A8A] mr-2" />
              <span className="text-sm font-medium text-[#1E3A8A]">Premium Digital Tools</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">
              Top <span className="text-[#1E3A8A]">Premium Subscriptions</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access industry-leading digital tools with premium subscription plans
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-xl mb-4 border border-[#D1D5DB]"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredTools.map((tool) => (
                  <ProductCard key={tool.id} product={tool} featured={true} />
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link 
                  to="/products" 
                  className="inline-flex items-center bg-gradient-to-r from-[#1E3A8A] to-[#2D4A9C] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-[#1E3A8A]/20 transition-all hover:-translate-y-1"
                >
                  <span>View All Subscriptions</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why Choose Toolsology */}
      <section className="py-20 bg-gradient-to-b from-[#F3F4F6] to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">
              Why <span className="text-[#1E3A8A]">Toolsology</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Premium digital tool subscriptions with enterprise-level features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl border border-[#D1D5DB] p-6 text-center hover:shadow-lg transition-all hover:border-[#1E3A8A]/30 group"
              >
                <div className={`h-16 w-16 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-20 bg-gradient-to-r from-[#1E3A8A] to-[#2D4A9C]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="relative">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#FACC15] p-2 rounded-lg">
                    <Icon className="w-5 h-5 text-[#111827]" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 mt-4">{stat.value}</div>
                  <div className="text-[#D1D5DB] font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Tools Section */}
      {trendingTools.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#111827]">
                  <TrendingUp className="inline w-8 h-8 mr-3 text-[#FACC15]" />
                  Trending Digital Tools
                </h2>
                <p className="text-gray-600 mt-2">Most popular subscriptions this month</p>
              </div>
              <Link 
                to="/trending" 
                className="text-[#1E3A8A] font-semibold hover:text-[#2D4A9C] flex items-center"
              >
                See all trends
                <span className="ml-2">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingTools.map((tool) => (
                <ProductCard key={tool.id} product={tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-gradient-to-r from-[#1E3A8A]/5 to-[#FACC15]/5 rounded-2xl p-8 md:p-12 text-center border border-[#D1D5DB]">
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-white border border-[#D1D5DB] mb-6">
              <Lock className="w-4 h-4 text-[#1E3A8A] mr-2" />
              <span className="font-medium text-[#111827]">Secure Subscription</span>
            </div>
            
            <h2 className="text-4xl font-bold text-[#111827] mb-6">
              Unlock Premium Digital Tools
            </h2>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Get access to premium digital tools with our subscription plans. 
              No installation, no maintenance - just pure productivity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products"
                className="group relative bg-gradient-to-r from-[#1E3A8A] to-[#2D4A9C] text-white px-10 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-[#1E3A8A]/20 transition-all duration-300 inline-flex items-center justify-center"
              >
                <span>View Pricing Plans</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              
              <Link 
                to="/contact"
                className="border-2 border-[#1E3A8A] text-[#1E3A8A] px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#1E3A8A]/5 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
            
            <div className="flex items-center justify-center mt-8 text-sm text-gray-500">
              <Shield className="w-4 h-4 mr-2 text-[#1E3A8A]" />
              <span>All subscriptions include 30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
};

export default HomePage;