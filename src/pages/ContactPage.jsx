// src/pages/ContactPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Shield, 
  Zap, 
  Star, 
  CheckCircle, 
  Copy,
  ExternalLink,
  Users
} from 'lucide-react';
import { getWhatsAppNumber } from '../api/api';

const ContactPage = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    fetchWhatsAppNumber();
  }, []);

  const fetchWhatsAppNumber = async () => {
    try {
      setIsLoading(true);
      const number = await getWhatsAppNumber();
      setWhatsappNumber(number);
    } catch (error) {
      console.error('Error fetching WhatsApp number:', error);
      setWhatsappNumber('+923001234567');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Clock,
      title: 'Instant Response',
      description: 'Get replies within 5-10 minutes'
    },
    {
      icon: Shield,
      title: 'Secure Purchase',
      description: 'Safe and verified transactions'
    },
    {
      icon: Zap,
      title: 'Quick Delivery',
      description: 'Tools delivered in minutes'
    },
    {
      icon: Star,
      title: 'Expert Support',
      description: 'Guided tool selection'
    }
  ];

  const handleWhatsAppClick = () => {
    if (!whatsappNumber) {
      alert('WhatsApp number is not available. Please try again.');
      return;
    }

    const defaultMessage = message || "Hello Toolsology! I need help choosing premium tools.";
    const encodedMessage = encodeURIComponent(defaultMessage);
    const url = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedMessage}`;
    
    window.open(url, '_blank');
  };

  const handleCopyNumber = () => {
    if (!whatsappNumber) return;
    
    navigator.clipboard.writeText(whatsappNumber);
    setCopied(true);
    setShowCopied(true);
    
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
    
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const contactMethods = [
    {
      title: 'WhatsApp Support',
      description: 'Fastest way to order tools',
      icon: MessageCircle,
      action: 'Chat Now',
      color: 'bg-green-500',
      onClick: handleWhatsAppClick
    },
    {
      title: 'Phone Call',
      description: 'For urgent inquiries',
      icon: Phone,
      action: 'Call Now',
      color: 'bg-blue-500',
      onClick: () => window.location.href = 'tel:+923001234567'
    },
    {
      title: 'Email Support',
      description: 'For detailed queries',
      icon: Mail,
      action: 'Send Email',
      color: 'bg-purple-500',
      onClick: () => window.location.href = 'mailto:support@toolsology.com'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[#1E3A8A]/10 rounded-full mb-6">
            <MessageCircle className="w-4 h-4 text-[#1E3A8A] mr-2" />
            <span className="text-sm font-medium text-[#1E3A8A]">Contact Support</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">
            Get Instant Support for <span className="text-[#1E3A8A]">Premium Tools</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Contact us via WhatsApp for quick tool purchases, price quotes, and expert guidance. 
            We're here to help you choose the right tools for your needs.
          </p>
        </div>

        {/* Main Contact Section */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Left Side - Contact Form & Info */}
            <div className="space-y-8">
              {/* WhatsApp Section */}
              <div className="bg-white rounded-xl border border-[#D1D5DB] p-6">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#111827]">WhatsApp Order & Support</h2>
                    <p className="text-gray-600">Fastest way to buy tools</p>
                  </div>
                </div>

                {/* WhatsApp Number Display */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp Number
                  </label>
                  <div className="flex items-center">
                    {isLoading ? (
                      <div className="animate-pulse bg-gray-200 h-12 w-full rounded-lg"></div>
                    ) : (
                      <>
                        <div className="flex-1 bg-[#F3F4F6] border border-[#D1D5DB] rounded-lg px-4 py-3 font-mono">
                          {whatsappNumber}
                        </div>
                        <button
                          onClick={handleCopyNumber}
                          className="ml-3 flex items-center bg-[#1E3A8A] text-white px-4 py-3 rounded-lg font-medium hover:bg-[#1E3A8A]/90 transition-colors"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Message Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message (Optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent resize-none"
                    placeholder="Example: I need Canva Pro and ChatGPT Plus..."
                  />
                </div>

                {/* WhatsApp Button */}
                <button
                  onClick={handleWhatsAppClick}
                  disabled={isLoading || !whatsappNumber}
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {isLoading ? 'Loading...' : 'Open WhatsApp'}
                </button>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-xl border border-[#D1D5DB] p-6">
                <h3 className="text-xl font-bold text-[#111827] mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-[#1E3A8A]/10 rounded-lg flex items-center justify-center mr-3">
                      <Phone className="w-5 h-5 text-[#1E3A8A]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Phone</div>
                      <div className="font-medium">+92 300 1234567</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-[#1E3A8A]/10 rounded-lg flex items-center justify-center mr-3">
                      <Mail className="w-5 h-5 text-[#1E3A8A]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Email</div>
                      <div className="font-medium">support@toolsology.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-[#1E3A8A]/10 rounded-lg flex items-center justify-center mr-3">
                      <MapPin className="w-5 h-5 text-[#1E3A8A]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Location</div>
                      <div className="font-medium">Pakistan</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-[#1E3A8A]/10 rounded-lg flex items-center justify-center mr-3">
                      <Clock className="w-5 h-5 text-[#1E3A8A]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Support Hours</div>
                      <div className="font-medium">24/7 WhatsApp Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Features & Stats */}
            <div className="space-y-8">
              {/* Features Grid */}
              <div className="bg-white rounded-xl border border-[#D1D5DB] p-6">
                <h3 className="text-xl font-bold text-[#111827] mb-6">Why Contact Us</h3>
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="p-4 bg-[#F3F4F6] rounded-lg border border-[#D1D5DB]">
                      <div className="h-10 w-10 bg-[#1E3A8A] rounded-lg flex items-center justify-center mb-3">
                        <feature.icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-semibold text-[#111827] mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact Methods */}
              <div className="bg-white rounded-xl border border-[#D1D5DB] p-6">
                <h3 className="text-xl font-bold text-[#111827] mb-6">Quick Contact</h3>
                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <button
                      key={index}
                      onClick={method.onClick}
                      className="w-full flex items-center justify-between p-4 bg-[#F3F4F6] rounded-lg hover:bg-[#E5E7EB] transition-colors border border-[#D1D5DB]"
                    >
                      <div className="flex items-center">
                        <div className={`h-10 w-10 ${method.color} rounded-lg flex items-center justify-center mr-3`}>
                          <method.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-[#111827]">{method.title}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                      </div>
                      <div className="text-[#1E3A8A] font-medium">{method.action}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2D4A9C] rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-6">Our Support Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">5 min</div>
                    <div className="text-sm text-white/80">Avg. Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">24/7</div>
                    <div className="text-sm text-white/80">Support Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">98%</div>
                    <div className="text-sm text-white/80">Satisfaction Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">5000+</div>
                    <div className="text-sm text-white/80">Happy Customers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl border border-[#D1D5DB] p-8 mb-16">
            <h2 className="text-2xl font-bold text-[#111827] text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: "How quickly do you respond on WhatsApp?",
                  a: "We typically respond within 5-10 minutes during business hours."
                },
                {
                  q: "Can I get a bulk discount on multiple tools?",
                  a: "Yes! Contact us via WhatsApp for special bulk pricing."
                },
                {
                  q: "Are the tools genuine and licensed?",
                  a: "Yes, all tools are 100% genuine with proper licenses."
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept bank transfer, Easypaisa, JazzCash, and card payments."
                },
                {
                  q: "How fast is tool delivery?",
                  a: "Most tools are delivered instantly within 5 minutes."
                },
                {
                  q: "Do you provide after-sales support?",
                  a: "Yes, we provide 24/7 support for all purchased tools."
                }
              ].map((faq, index) => (
                <div key={index} className="p-4 bg-[#F3F4F6] rounded-lg">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#1E3A8A] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-[#111827] mb-1">{faq.q}</h3>
                      <p className="text-gray-600 text-sm">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2D4A9C] rounded-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Premium Tools?</h2>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Contact us now via WhatsApp for instant support and the best prices on premium tools.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleWhatsAppClick}
                  disabled={isLoading || !whatsappNumber}
                  className="bg-[#FACC15] text-[#111827] px-8 py-3 rounded-lg font-bold hover:bg-[#FACC15]/90 transition-colors flex items-center justify-center disabled:bg-gray-400"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {isLoading ? 'Loading...' : 'Chat on WhatsApp'}
                </button>
                
                <button
                  onClick={handleCopyNumber}
                  className="bg-white/20 text-white px-8 py-3 rounded-lg font-bold hover:bg-white/30 transition-colors flex items-center justify-center"
                >
                  <Copy className="w-5 h-5 mr-2" />
                  Copy WhatsApp Number
                </button>
              </div>
              
              {showCopied && (
                <div className="mt-4 text-green-300 font-medium">
                  ✓ WhatsApp number copied to clipboard!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;