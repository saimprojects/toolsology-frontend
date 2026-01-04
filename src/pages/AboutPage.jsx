// src/pages/AboutPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Award, 
  Globe, 
  TrendingUp,
  Users,
  Star,
  Zap,
  CheckCircle,
  Shield,
  MessageCircle,
  Clock,
  Download,
  ShoppingCart,
  Package,
  CreditCard,
  Headphones
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const [activeStat, setActiveStat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % achievements.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const achievements = [
    { icon: Package, value: "5000+", label: "Tools Sold", color: "from-[#1E3A8A] to-[#2D4A9C]" },
    { icon: Users, value: "5000+", label: "Happy Customers", color: "from-[#1E3A8A] to-[#2D4A9C]" },
    { icon: TrendingUp, value: "98%", label: "Satisfaction Rate", color: "from-[#1E3A8A] to-[#2D4A9C]" },
    { icon: Globe, value: "Pakistan", label: "Location", color: "from-[#1E3A8A] to-[#2D4A9C]" },
    { icon: Star, value: "4.9/5", label: "Average Rating", color: "from-[#FACC15] to-[#FBBF24]" },
    { icon: Zap, value: "5 min", label: "Avg Delivery", color: "from-[#FACC15] to-[#FBBF24]" }
  ];

  const popularTools = [
    {
      icon: ShoppingCart,
      title: 'Canva Pro',
      description: 'Graphic design tool',
      color: "bg-gradient-to-r from-green-500 to-teal-500"
    },
    {
      icon: ShoppingCart,
      title: 'ChatGPT Plus',
      description: 'AI assistant subscription',
      color: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      icon: ShoppingCart,
      title: 'Adobe Suite',
      description: 'Creative cloud tools',
      color: "bg-gradient-to-r from-red-500 to-orange-500"
    },
    {
      icon: ShoppingCart,
      title: 'Grammarly',
      description: 'Writing assistant',
      color: "bg-gradient-to-r from-blue-500 to-cyan-500"
    }
  ];

  const principles = [
    {
      title: "Best Prices",
      description: "Lowest rates for premium tools",
      icon: "💰",
      color: "bg-[#FACC15]/20"
    },
    {
      title: "Instant Delivery",
      description: "Tools delivered within 5 minutes",
      icon: "⚡",
      color: "bg-[#1E3A8A]/20"
    },
    {
      title: "Genuine Licenses",
      description: "100% authentic software only",
      icon: "✅",
      color: "bg-green-100"
    },
    {
      title: "24/7 Support",
      description: "Always available on WhatsApp",
      icon: "💬",
      color: "bg-blue-100"
    }
  ];

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent("Hello Toolsology! I want to learn more about your premium tools.");
    const url = `https://wa.me/923001234567?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#1E3A8A] to-[#2D4A9C]">
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left Content */}
              <div className="lg:w-1/2 text-white">
                <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full mb-6">
                  <Award className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Premium Tools Reseller</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  About <span className="text-[#FACC15]">Toolsology</span>
                </h1>
                
                <p className="text-xl text-white/90 mb-8">
                  Pakistan's leading reseller of premium online tools and software subscriptions
                </p>

                <div className="max-w-3xl">
                  <p className="text-lg text-white/80 mb-8 leading-relaxed">
                    Founded by Muhammad Saim, Toolsology provides genuine software licenses at wholesale prices. 
                    We specialize in instant delivery of premium tools with 24/7 WhatsApp support.
                  </p>
                </div>

                {/* Founder Info */}
                <div className="flex items-center space-x-4 mt-8 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="h-14 w-14 bg-gradient-to-br from-[#FACC15] to-[#FBBF24] rounded-xl flex items-center justify-center font-bold text-[#111827]">
                    MS
                  </div>
                  <div>
                    <div className="font-bold text-lg">Muhammad Saim</div>
                    <div className="text-white/80">CEO & Founder</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Profile Image */}
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#FACC15] to-[#1E3A8A] rounded-2xl blur-xl opacity-30"></div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <img 
                      src="https://res.cloudinary.com/dxommxt6d/image/upload/v1767509276/Saim_smxepz.webp" 
                      alt="Muhammad Saim - CEO & Founder of Toolsology" 
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%231E3A8A'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='24' fill='%23FACC15'%3EMuhammad Saim%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  
                  {/* Floating Badges */}
                  <div className="absolute -top-4 -right-4 bg-[#FACC15] text-[#111827] px-4 py-2 rounded-lg shadow-xl">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span className="text-sm font-bold">Founder</span>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 bg-white text-[#111827] px-4 py-2 rounded-lg shadow-xl">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm font-bold">Est. 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              onClick={() => setActiveStat(index)}
              className={`bg-white rounded-xl border border-[#D1D5DB] p-4 text-center transform transition-all duration-300 cursor-pointer hover:shadow-lg ${
                activeStat === index 
                  ? 'border-[#1E3A8A] shadow-lg' 
                  : 'hover:border-[#1E3A8A]'
              }`}
            >
              <div className={`h-12 w-12 bg-gradient-to-r ${achievement.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <achievement.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-xl font-bold text-[#111827] mb-1">{achievement.value}</div>
              <div className="text-xs text-gray-600">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-6">
              Our <span className="text-[#1E3A8A]">Journey</span>
            </h2>
            
            <div className="space-y-4 text-gray-600">
              <p className="text-lg">
                Toolsology was founded by Muhammad Saim with a simple vision: to make premium 
                software tools accessible and affordable for everyone in Pakistan.
              </p>
              
              <p>
                We started as a small WhatsApp-based service and have grown into Pakistan's 
                trusted reseller of premium online tools. Our focus has always been on 
                providing genuine licenses at the best possible prices.
              </p>
              
              <p>
                What makes us different is our commitment to instant delivery and round-the-clock 
                support. We understand that when you need a tool, you need it NOW.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-[#1E3A8A]/10 rounded-lg">
                <Download className="w-4 h-4 text-[#1E3A8A] mr-2" />
                <span className="font-medium">Instant Delivery</span>
              </div>
              <div className="flex items-center p-3 bg-[#1E3A8A]/10 rounded-lg">
                <Shield className="w-4 h-4 text-[#1E3A8A] mr-2" />
                <span className="font-medium">Genuine Licenses</span>
              </div>
              <div className="flex items-center p-3 bg-[#1E3A8A]/10 rounded-lg">
                <MessageCircle className="w-4 h-4 text-[#1E3A8A] mr-2" />
                <span className="font-medium">24/7 WhatsApp Support</span>
              </div>
              <div className="flex items-center p-3 bg-[#1E3A8A]/10 rounded-lg">
                <CreditCard className="w-4 h-4 text-[#1E3A8A] mr-2" />
                <span className="font-medium">Best Prices</span>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div>
            <div className="bg-gradient-to-br from-[#1E3A8A] to-[#2D4A9C] rounded-xl p-8 text-white">
              <div className="text-center">
                <Target className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg mb-6">
                  To provide premium online tools at wholesale prices with instant delivery 
                  and exceptional support to empower individuals and businesses across Pakistan.
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-lg">
                  <Star className="w-4 h-4 mr-2" />
                  <span>Trusted Since 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Tools */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-3xl font-bold text-[#111827] mb-4">
              Popular <span className="text-[#1E3A8A]">Tools</span> We Sell
            </h2>
            <p className="text-gray-600">
              Some of our most requested premium tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTools.map((tool, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl border border-[#D1D5DB] p-5 hover:border-[#1E3A8A] transition-colors hover:shadow-lg"
              >
                <div className={`h-12 w-12 ${tool.color} rounded-lg flex items-center justify-center mb-4`}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-[#111827] mb-2">{tool.title}</h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Principles */}
        <div className="bg-white rounded-xl border border-[#D1D5DB] p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#111827] mb-4">
              Our <span className="text-[#1E3A8A]">Principles</span>
            </h2>
            <p className="text-gray-600">
              The values that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <div 
                key={index}
                className={`p-5 rounded-xl border border-[#D1D5DB] ${principle.color} hover:shadow-md transition-shadow`}
              >
                <div className="text-3xl mb-3">{principle.icon}</div>
                <h3 className="text-lg font-bold text-[#111827] mb-2">{principle.title}</h3>
                <p className="text-gray-600 text-sm">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How We Work */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-3xl font-bold text-[#111827] mb-4">
              How We <span className="text-[#1E3A8A]">Work</span>
            </h2>
            <p className="text-gray-600">
              Simple process for getting premium tools
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2D4A9C] rounded-xl p-8 text-white">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <div className="text-xl font-bold">1</div>
                </div>
                <h3 className="font-bold mb-2">Contact via WhatsApp</h3>
                <p className="text-white/80 text-sm">Tell us which tool you need</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <div className="text-xl font-bold">2</div>
                </div>
                <h3 className="font-bold mb-2">Get Best Price</h3>
                <p className="text-white/80 text-sm">We share the lowest price</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <div className="text-xl font-bold">3</div>
                </div>
                <h3 className="font-bold mb-2">Make Payment</h3>
                <p className="text-white/80 text-sm">Pay via Easypaisa/Bank/Card</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <div className="text-xl font-bold">4</div>
                </div>
                <h3 className="font-bold mb-2">Instant Delivery</h3>
                <p className="text-white/80 text-sm">Get tool within 5 minutes</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2D4A9C] rounded-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Premium Tools?</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Contact us now on WhatsApp for instant support and the best prices
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleWhatsAppContact}
                className="bg-[#FACC15] text-[#111827] px-8 py-3 rounded-lg font-bold hover:bg-[#FACC15]/90 transition-colors flex items-center justify-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </button>
              
              <Link 
                to="/products"
                className="bg-white/20 text-white px-8 py-3 rounded-lg font-bold hover:bg-white/30 transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Browse All Tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;