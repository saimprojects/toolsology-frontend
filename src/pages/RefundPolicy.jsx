// src/pages/RefundPolicy.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, Clock, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2D4A9C] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="flex items-center text-sm text-white/80 mb-8">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Refund Policy</span>
            </nav>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white/20 p-3 rounded-lg">
                <Shield className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Refund Policy</h1>
                <p className="text-white/80">Clear and fair policy for our customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Important Notice */}
          <div className="bg-gradient-to-r from-[#FACC15]/10 to-yellow-50 border-l-4 border-[#FACC15] rounded-r-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-[#111827] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-[#111827] mb-2">Important Notice</h3>
                <p className="text-gray-700">
                  Since our tools are digital products, all sales are final. Refunds are only issued if the tool doesn't work and our support team cannot fix it within 3 days of purchase.
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Policy Highlights */}
            <div className="lg:col-span-2 space-y-8">
              {/* Refund Eligibility */}
              <div className="bg-white rounded-xl border border-[#D1D5DB] p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#1E3A8A]/10 p-3 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-[#1E3A8A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#111827]">Refund Eligibility</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#1E3A8A] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      Tool access doesn't work after purchase
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#1E3A8A] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      Issue reported within 3 days of purchase
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#1E3A8A] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      Our support team cannot fix the issue within 48 hours
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#1E3A8A] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      You have provided all requested information for verification
                    </p>
                  </div>
                </div>
              </div>

              {/* Refund Process */}
              <div className="bg-white rounded-xl border border-[#D1D5DB] p-6">
                <h2 className="text-2xl font-bold text-[#111827] mb-6">Refund Process</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#1E3A8A] text-white font-bold w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold text-[#111827] mb-1">Report Issue</h3>
                      <p className="text-gray-600">
                        Contact us within 3 days via WhatsApp or email with your order details
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[#1E3A8A] text-white font-bold w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold text-[#111827] mb-1">Technical Support</h3>
                      <p className="text-gray-600">
                        Our team will try to resolve the issue within 48 hours
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[#1E3A8A] text-white font-bold w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold text-[#111827] mb-1">Refund Decision</h3>
                      <p className="text-gray-600">
                        If issue cannot be resolved, refund will be processed within 5 working days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-[#D1D5DB] p-6">
                <h3 className="text-xl font-bold text-[#111827] mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#1E3A8A]/10 p-2 rounded-lg">
                      <MessageCircle className="w-5 h-5 text-[#1E3A8A]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">WhatsApp Support</p>
                      <a 
                        href="https://wa.me/923131471263" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1E3A8A] hover:text-[#2D4A9C] font-medium"
                      >
                        +92 313 1471 263
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-[#1E3A8A]/10 p-2 rounded-lg">
                      <Mail className="w-5 h-5 text-[#1E3A8A]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a 
                        href="mailto:tesladigi@gmail.com" 
                        className="text-[#1E3A8A] hover:text-[#2D4A9C] font-medium"
                      >
                        saimpkf@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-[#1E3A8A]/10 p-2 rounded-lg">
                      <Clock className="w-5 h-5 text-[#1E3A8A]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Support Hours</p>
                      <p className="text-gray-900 font-medium">24/7 WhatsApp Support</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Dates */}
              <div className="bg-white rounded-xl border border-[#D1D5DB] p-6">
                <h3 className="text-xl font-bold text-[#111827] mb-4">Important Timeframes</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Issue Reporting</span>
                    <span className="bg-[#1E3A8A]/10 text-[#1E3A8A] px-3 py-1 rounded-full text-sm font-medium">
                      Within 3 days
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Support Response</span>
                    <span className="bg-[#FACC15]/20 text-[#111827] px-3 py-1 rounded-full text-sm font-medium">
                      Within 12 hours
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Refund Processing</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      5 working days
                    </span>
                  </div>
                </div>
              </div>

              {/* Non-Refundable */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#111827] mb-3">Non-Refundable</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Change of mind after purchase</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Purchased by mistake</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Not satisfied with tool features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Found cheaper price elsewhere</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Reported after 3 days of purchase</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl border border-[#D1D5DB] p-6 mb-8">
            <h2 className="text-2xl font-bold text-[#111827] mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-[#111827] mb-2">Can I get a refund if I change my mind?</h3>
                <p className="text-gray-600">
                  No. Since digital tools are delivered instantly, we don't offer refunds for change of mind or accidental purchases.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-[#111827] mb-2">What if the tool doesn't work?</h3>
                <p className="text-gray-600">
                  Contact us immediately via WhatsApp (+92 344 696 9962) within 3 days. Our team will try to fix the issue. If unresolved, you may get a refund.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-[#111827] mb-2">How long does refund processing take?</h3>
                <p className="text-gray-600">
                  Once approved, refunds take 5 working days. The actual time depends on your payment method.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">Can I transfer my tool to someone else?</h3>
                <p className="text-gray-600">
                  No. Digital tool licenses are non-transferable and tied to the original purchaser.
                </p>
              </div>
            </div>
          </div>

          {/* Final Note */}
          <div className="bg-[#1E3A8A]/5 rounded-xl border border-[#1E3A8A]/20 p-6 mb-8">
            <h3 className="font-bold text-[#111827] mb-3">Our Commitment</h3>
            <p className="text-gray-700">
              We strive to provide 100% working tools with genuine licenses. Most issues are resolved within 
              hours by our support team. We only consider refunds as a last resort when technical issues cannot be resolved.
            </p>
          </div>

          {/* Footer CTA */}
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center bg-[#1E3A8A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1E3A8A]/90 hover:shadow-lg transition-all"
              >
                Browse All Tools
              </Link>
              <a
                href="https://wa.me/923131471263"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#FACC15] text-[#111827] px-8 py-3 rounded-lg font-semibold hover:bg-[#FACC15]/90 transition-all"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Support
              </a>
            </div>
            <p className="text-gray-500 mt-4 text-sm">
              Last updated: January 2024 • Toolsology Refund Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;