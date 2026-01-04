// src/components/home/Hero.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Zap, Star, TrendingUp, Users } from 'lucide-react';
import { getWhatsAppNumber } from '../../api/api';

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [loading, setLoading] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState(null);

  const animatedTexts = [
    "Premium Online Tools",
    "Software Subscriptions",
    "Digital Products",
    "Best Prices Guaranteed"
  ];

  const popularTools = [
    "Canva Pro", "Adobe Creative Cloud", "Grammarly Premium", 
    "ChatGPT Plus", "Microsoft 365", "Figma Pro"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % animatedTexts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchWhatsappNumber();
  }, []);

  const fetchWhatsappNumber = async () => {
    try {
      const number = await getWhatsAppNumber();
      setWhatsappNumber(number);
    } catch (err) {
      console.error('Error fetching WhatsApp number:', err);
    }
  };

  const handleWhatsAppOrder = async () => {
    try {
      setLoading(true);
      let number = whatsappNumber;
      if (!number) {
        number = await getWhatsAppNumber();
        setWhatsappNumber(number);
      }
      const cleanNumber = number.replace('+', '');
      const message = "Hello Toolsology! I want to buy premium tools. Please share your catalog.";
      const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    } catch (err) {
      alert('Unable to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-b from-white to-[#F3F4F6]">
      {/* Simple Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#1E3A8A]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-[#FACC15]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Animated Text Showcase */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] mb-6">
              Get 
              <span className="relative mx-4">
                <span className="relative z-10 inline-block min-w-[300px]">
                  <span className="text-[#1E3A8A] font-black block h-20 overflow-hidden">
                    <div 
                      className="transition-all duration-500 ease-in-out"
                      style={{ transform: `translateY(-${currentText * 100}%)` }}
                    >
                      {animatedTexts.map((text, index) => (
                        <div key={index} className="h-20 flex items-center justify-center">
                          {text}
                        </div>
                      ))}
                    </div>
                  </span>
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FACC15] to-transparent"></span>
              </span>
              At Wholesale Prices
            </h1>
          </div>

          {/* Description */}
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            We are Pakistan's leading reseller of premium online tools, software subscriptions, 
            and digital products. Get genuine licenses with instant delivery.
          </p>

          {/* Popular Tools Scroll */}
          <div className="mb-12 overflow-hidden">
            <div className="flex animate-scroll">
              {[...popularTools, ...popularTools].map((tool, index) => (
                <div 
                  key={index} 
                  className="flex items-center mx-4 px-6 py-3 bg-white rounded-full border border-[#D1D5DB] shadow-sm whitespace-nowrap"
                >
                  <Star className="w-4 h-4 text-[#FACC15] fill-current mr-2" />
                  <span className="font-medium text-[#111827]">{tool}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              to="/products"
              className="group bg-[#1E3A8A] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#1E3A8A]/90 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              <ShoppingCart className="w-6 h-6 mr-3" />
              <span>Browse All Tools</span>
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            
            <button
              onClick={handleWhatsAppOrder}
              disabled={loading}
              className="group border-2 border-[#1E3A8A] text-[#1E3A8A] px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#1E3A8A]/5 transition-all duration-300 inline-flex items-center justify-center"
            >
              <Zap className="w-6 h-6 mr-3 group-hover:animate-pulse" />
              {loading ? 'Connecting...' : 'Order via WhatsApp'}
              {!loading && <span className="ml-3 group-hover:animate-bounce">📱</span>}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-[#1E3A8A] flex items-center justify-center">
                <TrendingUp className="w-8 h-8 mr-2" />
                5K+
              </div>
              <div className="text-gray-600 mt-2">Happy Customers</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-[#1E3A8A] flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 mr-2" />
                50+
              </div>
              <div className="text-gray-600 mt-2">Tools Available</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-[#1E3A8A] flex items-center justify-center">
                <Zap className="w-8 h-8 mr-2" />
                5 min
              </div>
              <div className="text-gray-600 mt-2">Delivery Time</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-[#1E3A8A] flex items-center justify-center">
                <Users className="w-8 h-8 mr-2" />
                24/7
              </div>
              <div className="text-gray-600 mt-2">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Hero;