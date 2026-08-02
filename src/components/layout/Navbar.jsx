// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, ShoppingCart, Home, Package, Star, Users, Info, Store, LogIn, UserPlus, User, LogOut } from 'lucide-react';
import { getWhatsAppNumber } from '../../api/api';
import { isLoggedIn, clearTokens } from '../../api/customer';
import { CurrencyToggle } from '../../context/CurrencyContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchWhatsAppNumber();
  }, []);

  const fetchWhatsAppNumber = async () => {
    try {
      const number = await getWhatsAppNumber();
      setWhatsappNumber(number);
    } catch (error) {
      console.error('Error fetching WhatsApp number:', error);
      setWhatsappNumber('+919876543210');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Tools', path: '/products', icon: Package },
    { name: 'About', path: '/about', icon: Info },
  ];

  const handleWhatsAppOrder = () => {
    if (!whatsappNumber) {
      alert('WhatsApp number not available. Please try again later.');
      return;
    }

    const message = encodeURIComponent("Hello Toolsology! I want to order premium tools.");
    const cleanNumber = whatsappNumber.replace('+', '');
    const url = `https://wa.me/${cleanNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  const handleCommunityClick = () => {
    const communityUrl = 'https://chat.whatsapp.com/CqZxGEjRmLg4jNPhVKrwtA';
    window.open(communityUrl, '_blank');
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg border-b border-[#D1D5DB] py-3' : 'bg-white py-4'
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#1E3A8A] to-[#FACC15] rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-gradient-to-br from-[#1E3A8A] to-[#2D4A9C] h-12 w-12 rounded-lg flex items-center justify-center">
                <div className="text-white font-bold text-xl">T</div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-[#111827] tracking-tight">
                <span className="text-[#1E3A8A]">Tools</span>
                <span className="text-[#FACC15]">ology</span>
              </span>
              <span className="text-xs text-gray-500 -mt-1">Premium Tools Reseller</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative flex items-center space-x-2 font-medium transition-all duration-200 px-4 py-2 rounded-lg ${
                    location.pathname === link.path
                      ? 'bg-[#1E3A8A] text-white'
                      : 'text-[#111827] hover:bg-[#F3F4F6]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                  {location.pathname === link.path && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-[#FACC15] rounded-full"></span>
                  )}
                </Link>
              );
            })}
            
            {/* Reseller Panel */}
            <Link
              to="/reseller"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium border-2 border-[#1E3A8A] transition-colors ${
                location.pathname.startsWith('/reseller')
                  ? 'bg-[#1E3A8A] text-white'
                  : 'text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Reseller Panel</span>
            </Link>

            {/* Our Team Button */}
            <button
              onClick={handleCommunityClick}
              className="flex items-center space-x-2 bg-[#FACC15] text-[#111827] px-4 py-2 rounded-lg font-medium hover:bg-[#FACC15]/90 transition-colors group"
            >
              <Users className="w-4 h-4" />
              <span>Our Team</span>
            </button>
          </div>

          {/* Desktop Action Buttons — customer auth */}
          <div className="hidden lg:flex items-center space-x-3">
            <CurrencyToggle />
            {isLoggedIn() ? (
              <>
                <Link to="/account"
                  className="flex items-center space-x-2 text-[#111827] hover:text-[#1E3A8A] font-medium px-3 py-2">
                  <User className="w-5 h-5" />
                  <span>My Account</span>
                </Link>
                <button
                  onClick={() => { clearTokens(); window.location.href = "/"; }}
                  className="flex items-center space-x-2 text-gray-500 hover:text-red-600 font-medium px-3 py-2">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login"
                  className="flex items-center space-x-2 text-[#1E3A8A] font-semibold px-4 py-2 rounded-lg border-2 border-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white transition-colors">
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </Link>
                <Link to="/signup"
                  className="flex items-center space-x-2 bg-[#1E3A8A] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#1E3A8A]/90 transition-all">
                  <UserPlus className="w-5 h-5" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#111827] hover:text-[#1E3A8A] transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-[#D1D5DB] pt-4">
            <div className="flex flex-col space-y-3">
              <div className="px-4"><CurrencyToggle /></div>
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium ${
                      location.pathname === link.path
                        ? 'bg-[#1E3A8A] text-white'
                        : 'text-[#111827] hover:bg-[#F3F4F6]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
              
              {/* Reseller Panel - Mobile */}
              <Link
                to="/reseller"
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium border-2 border-[#1E3A8A] ${
                  location.pathname.startsWith('/reseller')
                    ? 'bg-[#1E3A8A] text-white'
                    : 'text-[#1E3A8A]'
                }`}
              >
                <Store className="w-5 h-5" />
                <span>Reseller Panel</span>
              </Link>

              {/* Our Team Button - Mobile */}
              <button
                onClick={() => {
                  handleCommunityClick();
                  setIsOpen(false);
                }}
                className="flex items-center space-x-3 bg-[#FACC15] text-[#111827] px-4 py-3 rounded-lg font-medium"
              >
                <Users className="w-5 h-5" />
                <span>Our Team</span>
              </button>
              
              {/* Customer auth - Mobile */}
              {isLoggedIn() ? (
                <>
                  <Link to="/account" onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-[#111827] hover:bg-[#F3F4F6]">
                    <User className="w-5 h-5" />
                    <span>My Account</span>
                  </Link>
                  <button
                    onClick={() => { clearTokens(); setIsOpen(false); window.location.href = "/"; }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-red-600">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold text-[#1E3A8A] border-2 border-[#1E3A8A]">
                    <LogIn className="w-5 h-5" />
                    <span>Login</span>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 bg-[#1E3A8A] text-white px-4 py-3 rounded-lg font-semibold">
                    <UserPlus className="w-5 h-5" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
