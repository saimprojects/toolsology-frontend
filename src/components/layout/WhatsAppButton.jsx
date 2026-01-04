// src/components/layout/WhatsAppButton.jsx
import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppNumber } from '../../api/api';

const WhatsAppButton = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('+923001234567');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    fetchWhatsAppNumber();
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const fetchWhatsAppNumber = async () => {
    try {
      const number = await getWhatsAppNumber();
      if (number) setWhatsappNumber(number);
    } catch (error) {
      console.error('Error fetching WhatsApp number:', error);
    }
  };

  const handleClick = () => {
    const message = encodeURIComponent("Hello Bunny Tools! I'm interested in your products.");
    const url = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`;
    window.open(url, '_blank');
    
    // Optional: Track click event
    if (window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        'event_category': 'engagement',
        'event_label': 'whatsapp_button'
      });
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
    }`}>
      <div className="relative">
        {/* Pulsing Ring Effect */}
        <div className="absolute -inset-4 bg-green-500 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute -inset-2 bg-green-400 rounded-full opacity-30 animate-pulse"></div>
        
        {/* Main Button */}
        <button
          onClick={handleClick}
          className="relative bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 group"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap">
            Chat with us
            <div className="absolute top-1/2 left-full -translate-y-1/2 border-8 border-transparent border-l-gray-900"></div>
          </div>
          
          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 bg-brand-yellow text-white text-xs w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
            1
          </div>
        </button>
      </div>
      
      {/* Additional Buttons (Optional) */}
      <div className="mt-3 space-y-2">
        <button
          onClick={() => window.open(`tel:${whatsappNumber}`, '_self')}
          className="bg-gradient-to-r from-brand-purple to-brand-purple-light text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 w-full"
        >
          <span>Chat Now</span>
        </button>
      </div>
    </div>
  );
};

export default WhatsAppButton;