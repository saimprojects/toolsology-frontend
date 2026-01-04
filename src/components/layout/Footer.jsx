// src/components/layout/Footer.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  Shield,
  Zap,
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Cpu,
  Database,
  Palette,
  Smartphone,
  CheckCircle,
  FileText,
  ShoppingBag,
  Users,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { getWhatsAppNumber } from '../../api/api';

const Footer = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchWhatsAppNumber();
  }, []);

  const fetchWhatsAppNumber = async () => {
    try {
      setLoading(true);
      const number = await getWhatsAppNumber();
      setWhatsappNumber(number);
    } catch (error) {
      console.error('Error fetching WhatsApp number:', error);
      setWhatsappNumber('+923131471263');
    } finally {
      setLoading(false);
    }
  };

  const popularTools = [
    { name: 'Canva Pro', href: '/products', icon: Palette },
    { name: 'ChatGPT Plus', href: '/products', icon: Cpu },
    { name: 'Adobe Suite', href: '/products', icon: Database },
    { name: 'Microsoft 365', href: '/products', icon: Smartphone },
  ];

  const footerLinks = {
    'Company': [
      { name: 'About Us', href: '/about', icon: Users },
      { name: 'All Tools', href: '/products', icon: ShoppingBag },
      { name: 'Contact', href: '/contact', icon: MessageCircle },
    ],
    'Legal': [
      { name: 'Refund Policy', href: '/refund-policy', icon: FileText },
    ]
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const features = [
    {
      icon: Clock,
      title: 'Instant Delivery',
      description: 'Within 5 minutes'
    },
    {
      icon: Shield,
      title: '100% Safe',
      description: 'Genuine licenses'
    },
    {
      icon: Zap,
      title: 'Best Prices',
      description: 'Lowest rates'
    },
    {
      icon: MessageCircle,
      title: '24/7 Support',
      description: 'Always available'
    }
  ];

  const handleWhatsAppClick = () => {
    if (!whatsappNumber) {
      alert('WhatsApp number not available. Please try again.');
      return;
    }

    const message = encodeURIComponent("Hello Toolsology! I need help with tools selection.");
    const url = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <footer className="bg-[#111827] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  <span className="text-[#1E3A8A]">Tools</span>
                  <span className="text-[#FACC15]">ology</span>
                </h2>
                <p className="text-gray-400 text-sm">Premium Tools Reseller</p>
              </div>
            </Link>
            
            <p className="text-gray-400 mb-8 max-w-md">
              Your trusted source for premium online tools and software subscriptions. 
              Get genuine licenses at wholesale prices with instant delivery.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#1E3A8A]/20 rounded-lg">
                  <Phone className="w-4 h-4 text-[#FACC15]" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">WhatsApp Number</div>
                  {loading ? (
                    <div className="animate-pulse bg-gray-800 h-5 w-40 rounded"></div>
                  ) : (
                    <div className="font-medium">{whatsappNumber}</div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#1E3A8A]/20 rounded-lg">
                  <Mail className="w-4 h-4 text-[#FACC15]" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="font-medium">support@toolsology.com</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#1E3A8A]/20 rounded-lg">
                  <MapPin className="w-4 h-4 text-[#FACC15]" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Based in</div>
                  <div className="font-medium">Pakistan</div>
                </div>
              </div>
            </div>
            
            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppClick}
              className="bg-gradient-to-r from-[#1E3A8A] to-[#2D4A9C] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#1E3A8A]/20 transition-all flex items-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat on WhatsApp
            </button>
          </div>

          {/* Popular Tools Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Popular Tools</h3>
            <ul className="space-y-3">
              {popularTools.map((tool) => (
                <li key={tool.name}>
                  <Link
                    to={tool.href}
                    className="text-gray-400 hover:text-[#FACC15] transition-colors flex items-center group"
                  >
                    {tool.icon && (
                      <tool.icon className="w-4 h-4 mr-2 text-gray-500 group-hover:text-[#FACC15]" />
                    )}
                    <span>{tool.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {Object.entries(footerLinks).flatMap(([category, links]) =>
                links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-[#FACC15] transition-colors flex items-center group"
                    >
                      {link.icon && (
                        <link.icon className="w-4 h-4 mr-2 text-gray-500 group-hover:text-[#FACC15]" />
                      )}
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-6 text-center">Why Choose Toolsology</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="h-12 w-12 bg-[#1E3A8A] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <CheckCircle className="w-4 h-4 text-[#FACC15] mr-2" />
              <p className="text-gray-400 text-sm">
                © {currentYear} Toolsology. All rights reserved.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="h-10 w-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#1E3A8A] hover:text-white transition-all"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-col md:flex-row items-center justify-between mt-6">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-gray-400 text-sm">Payment Methods:</span>
              <div className="flex space-x-2">
                <div className="h-6 w-10 bg-gray-800 rounded flex items-center justify-center text-xs font-medium">UPI</div>
                <div className="h-6 w-10 bg-gray-800 rounded flex items-center justify-center text-xs font-medium">Card</div>
                <div className="h-6 w-10 bg-gray-800 rounded flex items-center justify-center text-xs font-medium">Bank</div>
              </div>
            </div>
            
            <Link 
              to="/refund-policy" 
              className="bg-[#1E3A8A]/20 border border-[#1E3A8A]/30 text-[#1E3A8A] text-sm px-4 py-2 rounded-lg hover:bg-[#1E3A8A]/30 transition-all flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Refund Policy
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-6">
            <div className="text-center">
              <div className="text-xl font-bold text-[#FACC15]">5000+</div>
              <div className="text-xs text-gray-400">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[#FACC15]">50+</div>
              <div className="text-xs text-gray-400">Premium Tools</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[#FACC15]">4.9/5</div>
              <div className="text-xs text-gray-400">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[#FACC15]">5 min</div>
              <div className="text-xs text-gray-400">Delivery</div>
            </div>
          </div>
        </div>

        {/* Final Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            Toolsology is a premium online tools reseller. All tools come with genuine licenses 
            and instant delivery. We provide the best prices for premium software subscriptions.
          </p>
          
          {/* WhatsApp CTA */}
          <div className="mt-6">
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center text-[#FACC15] hover:text-[#FACC15]/80 font-medium text-sm"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Need help? Click to chat on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;