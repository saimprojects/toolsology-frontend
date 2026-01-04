// src/pages/NotFound.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Cpu, Database, Palette, Smartphone, Zap, ArrowRight, Sparkles } from 'lucide-react';

const NotFound = () => {
  const [bounceCount, setBounceCount] = useState(0);
  const [floating, setFloating] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);

  const popularProducts = [
    { 
      id: 1, 
      name: 'Development Tools', 
      icon: Cpu,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      id: 2, 
      name: 'Database Software', 
      icon: Database,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      id: 3, 
      name: 'Design Software', 
      icon: Palette,
      color: 'from-pink-500 to-pink-600'
    },
    { 
      id: 4, 
      name: 'Mobile Apps', 
      icon: Smartphone,
      color: 'from-green-500 to-green-600'
    }
  ];

  useEffect(() => {
    // Bouncing effect for 404 text
    const bounceInterval = setInterval(() => {
      setBounceCount(prev => prev + 1);
    }, 2000);

    // Floating effect toggle
    const floatInterval = setInterval(() => {
      setFloating(prev => !prev);
    }, 3000);

    // Rotate active product
    const productInterval = setInterval(() => {
      setActiveProduct(prev => (prev + 1) % popularProducts.length);
    }, 2500);

    return () => {
      clearInterval(bounceInterval);
      clearInterval(floatInterval);
      clearInterval(productInterval);
    };
  }, []);

  const getBounceStyle = (index) => {
    const delays = ['0ms', '100ms', '200ms', '300ms'];
    return {
      animation: `bounce 1s infinite ${delays[index]}`,
      animationDelay: delays[index],
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating Numbers */}
        <div className={`absolute top-20 left-10 transition-transform duration-3000 ${floating ? 'translate-y-4' : '-translate-y-4'}`}>
          <span className="text-6xl text-purple-200 font-bold opacity-30">4</span>
        </div>
        <div className={`absolute top-40 right-20 transition-transform duration-3000 ${floating ? '-translate-y-4' : 'translate-y-4'}`}>
          <span className="text-8xl text-orange-200 font-bold opacity-30">0</span>
        </div>
        <div className={`absolute bottom-40 left-20 transition-transform duration-3000 ${floating ? 'translate-y-6' : '-translate-y-6'}`}>
          <span className="text-7xl text-blue-200 font-bold opacity-30">4</span>
        </div>

        {/* Animated Shapes */}
        <div className="absolute top-1/4 left-1/3 animate-spin-slow">
          <div className="w-16 h-16 border-4 border-purple-300 rounded-full opacity-20"></div>
        </div>
        <div className="absolute bottom-1/3 right-1/4 animate-spin-slow-reverse">
          <div className="w-12 h-12 border-4 border-orange-300 rounded-full opacity-20"></div>
        </div>

        {/* Pulsing Dots */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-purple-400 rounded-full opacity-20 animate-pulse"
            style={{
              top: `${20 + i * 10}%`,
              left: `${10 + i * 10}%`,
              animationDelay: `${i * 200}ms`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Main 404 Animation */}
        <div className="relative mb-8">
          {/* Glowing Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          
          <div className="relative">
            {/* 404 Numbers with individual bounce */}
            <div className="flex items-center justify-center space-x-4 md:space-x-8">
              {['4', '0', '4'].map((num, index) => (
                <div
                  key={index}
                  className="relative"
                  style={getBounceStyle(index)}
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative text-[180px] md:text-[250px] font-bold text-gray-200 select-none">
                    {num}
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Emoji */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`text-8xl md:text-9xl transition-transform duration-1000 ${floating ? 'translate-y-4' : '-translate-y-4'}`}>
                {bounceCount % 2 === 0 ? '😕' : '🤔'}
              </div>
            </div>
          </div>
        </div>

        {/* Message with Animation */}
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-purple-100 mb-6 animate-pulse">
            <Sparkles className="w-4 h-4 text-orange-500 mr-2" />
            <span className="text-sm font-medium text-orange-700">Oops! Page Not Found</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-slide-up">
            Lost in Digital Space
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
            The page you're looking for seems to have wandered off into the digital void. 
            But don't worry, we've got amazing software tools waiting for you!
          </p>

          {/* Animated Search Bar */}
          <div className="max-w-md mx-auto mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-pulse" />
              <input
                type="text"
                placeholder="Search software tools..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-300"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-500 hover:text-orange-600 transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Popular Products with Animation */}
        <div className="w-full max-w-6xl mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center animate-slide-up" style={{ animationDelay: '300ms' }}>
            Popular <span className="gradient-text">Software</span> You Might Like
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularProducts.map((product, index) => (
              <Link
                key={product.id}
                to={`/products?category=${product.name.toLowerCase().replace(' ', '-')}`}
                className={`group relative rounded-2xl border-2 p-4 transition-all duration-500 hover:-translate-y-2 ${
                  activeProduct === index
                    ? 'border-orange-500 shadow-xl scale-105'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${product.color} rounded-2xl blur opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                
                <div className="relative">
                  <div className={`h-12 w-12 bg-gradient-to-r ${product.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                    <product.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                      {product.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>

                {/* Pulsing indicator for active product */}
                {activeProduct === index && (
                  <div className="absolute -top-2 -right-2">
                    <div className="h-4 w-4 bg-orange-500 rounded-full animate-ping"></div>
                    <div className="absolute top-0 right-0 h-4 w-4 bg-orange-500 rounded-full"></div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Action Buttons with Hover Effects */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link
            to="/"
            className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-500 hover:scale-105 inline-flex items-center justify-center animate-slide-up"
            style={{ animationDelay: '400ms' }}
          >
            <Home className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            <span>Back to Homepage</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </Link>
          
          <Link
            to="/products"
            className="group relative overflow-hidden border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-500 hover:scale-105 inline-flex items-center justify-center animate-slide-up"
            style={{ animationDelay: '500ms' }}
          >
            <Zap className="w-5 h-5 mr-2 group-hover:rotate-45 transition-transform" />
            <span>Browse All Software</span>
            <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
          </Link>
        </div>

        {/* Animated Decorative Elements */}
        <div className="mt-12">
          <div className="flex justify-center space-x-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-3 w-3 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 150}ms`,
                  animationDuration: '1.5s',
                }}
              ></div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <div className="inline-flex items-center text-gray-500 text-sm">
              <span className="animate-pulse">•</span>
              <span className="mx-2">Still lost?</span>
              <span className="animate-pulse">•</span>
              <span className="mx-2">Try our search</span>
              <span className="animate-pulse">•</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional CSS animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 25s linear infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #F97316 0%, #6B21A8 50%, #F59E0B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
};

export default NotFound;   