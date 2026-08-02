// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star,
  ChevronRight,
  CheckCircle,
  Check,
  Zap,
  Shield,
  Clock,
  ShoppingCart,
  Tag,
  Users,
  TrendingUp,
  MessageCircle,
  Download,
  Infinity
} from 'lucide-react';
import ImageGallery from '../components/products/ImageGallery';
import ReviewList from '../components/products/ReviewList';
import ProductCard from '../components/products/ProductCard';
import BuyNowModal from '../components/products/BuyNowModal';
import { getProductById } from '../api/api';
import { getRetailOffers } from '../api/customer';
import { useCurrency } from '../context/CurrencyContext';
import { useProducts } from '../api/hooks/useProducts';
import { useWhatsApp } from '../context/WhatsAppContext';

const ProductDetail = () => {
  const { format } = useCurrency();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showBuy, setShowBuy] = useState(false);
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [offersLoading, setOffersLoading] = useState(true);
  const [expandedOffer, setExpandedOffer] = useState(null);

  useEffect(() => {
    let alive = true;
    setOffersLoading(true);
    getRetailOffers(id)
      .then((data) => {
        if (!alive) return;
        setOffers(data);
        setSelectedOffer(data.find((o) => o.in_stock) || null);
      })
      .finally(() => alive && setOffersLoading(false));
    return () => { alive = false; };
  }, [id]);

  const { whatsappNumber, loading: loadingWhatsapp } = useWhatsApp();
  const { products: allProducts } = useProducts();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && allProducts.length > 0) {
      const related = allProducts
        .filter(p => p.id !== product.id && p.categories?.[0]?.id === product.categories?.[0]?.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [product, allProducts]);

  useEffect(() => {
    if (product?.plans && product.plans.length > 0) {
      setSelectedPlan(product.plans[0]);
    }
  }, [product]);

  // NEW SCHEME: Plan decoding function
  const decodePlanDuration = (durationCode) => {
    if (!durationCode && durationCode !== 0) {
      return {
        displayDuration: '1 month',
        durationType: 'monthly',
        durationValue: 1,
        isLifetime: false
      };
    }
    
    const codeStr = String(durationCode);
    
    // Check for daily plan: starts with 9900
    if (codeStr.startsWith('9900')) {
      const days = parseInt(codeStr.substring(4)) || 30;
      return {
        displayDuration: `${days} days`,
        durationType: 'daily',
        durationValue: days,
        isLifetime: false
      };
    }
    
    // Check for yearly plan: starts with 9910
    if (codeStr.startsWith('9910')) {
      const years = parseInt(codeStr.substring(4)) || 1;
      return {
        displayDuration: `${years} year${years > 1 ? 's' : ''}`,
        durationType: 'yearly',
        durationValue: years,
        isLifetime: false
      };
    }
    
    // Check for lifetime plan: starts with 9920
    if (codeStr.startsWith('9920')) {
      return {
        displayDuration: 'Lifetime',
        durationType: 'lifetime',
        durationValue: 9999,
        isLifetime: true
      };
    }
    
    // Handle legacy codes for backward compatibility
    if (codeStr.startsWith('200')) {
      const years = parseInt(codeStr.substring(3)) || 1;
      return {
        displayDuration: `${years} year${years > 1 ? 's' : ''}`,
        durationType: 'yearly',
        durationValue: years,
        isLifetime: false
      };
    }
    
    if (codeStr.startsWith('100')) {
      const days = parseInt(codeStr.substring(3)) || 30;
      return {
        displayDuration: `${days} days`,
        durationType: 'daily',
        durationValue: days,
        isLifetime: false
      };
    }
    
    // Default monthly plan
    const months = parseInt(durationCode) || 1;
    return {
      displayDuration: `${months} month${months > 1 ? 's' : ''}`,
      durationType: 'monthly',
      durationValue: months,
      isLifetime: false
    };
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProductById(id);
      
      console.log('🎯 Product Data Received:', data);
      console.log('📊 Plans Data:', data.plans);
      
      // Format plans for display with NEW decoding logic
      if (data.plans && data.plans.length > 0) {
        data.plans = data.plans.map((plan, index) => {
          console.log(`📝 Processing Plan ${index + 1}:`, plan);
          
          // Use duration_months field from API
          const durationValue = plan.duration_months;
          console.log(`🔢 Duration Code: ${durationValue} (Type: ${typeof durationValue})`);
          
          const decodedDuration = decodePlanDuration(durationValue);
          console.log(`🎯 Decoded:`, decodedDuration);
          
          return {
            ...plan,
            displayDuration: decodedDuration.displayDuration,
            durationType: decodedDuration.durationType,
            durationValue: decodedDuration.durationValue,
            isLifetime: decodedDuration.isLifetime,
            originalDurationCode: durationValue // For debugging
          };
        });
        
        console.log('✅ Final Processed Plans:', data.plans);
      }
      
      setProduct(data);
    } catch (err) {
      console.error('❌ Error fetching product:', err);
      setError(err.message || 'Product not found');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = () => {
    if (!whatsappNumber) {
      alert('WhatsApp service is temporarily unavailable. Please try again in a moment.');
      return;
    }

    const offerLine = selectedOffer
      ? `📋 *Option:* ${selectedOffer.label}\n💰 *Price:* ${format(selectedOffer.price)}`
      : '';

    const message = `🛒 *ORDER REQUEST - TOOLSOLOGY* 🛒

📦 *Product:* ${product.title}
${offerLine}

✅ *Key Features:*
• Instant Digital Delivery
• Genuine License
• 24/7 WhatsApp Support
• Lifetime Updates

💳 *Payment Details:*
Please share payment options and delivery process.

Thank you!`;
    
    const cleanNumber = whatsappNumber.replace('+', '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
  };

  const handleContact = () => {
    if (!whatsappNumber) {
      alert('WhatsApp service is temporarily unavailable. Please try again in a moment.');
      return;
    }

    const message = `💬 *QUESTION ABOUT TOOL* 💬

Product: ${product.title}

I have a question about this tool. Please provide more details.`;
    const cleanNumber = whatsappNumber.replace('+', '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const getPlanIcon = (plan) => {
    switch (plan.durationType) {
      case 'daily': return Zap;
      case 'yearly': return TrendingUp;
      case 'lifetime': return Infinity;
      default: return Clock;
    }
  };

  const getPlanColor = (plan) => {
    switch (plan.durationType) {
      case 'daily': return 'text-[#FACC15]';
      case 'yearly': return 'text-[#1E3A8A]';
      case 'lifetime': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getPlanDescription = (plan) => {
    switch (plan.durationType) {
      case 'daily': 
        return `Pay for ${plan.durationValue} days of access`;
      case 'yearly': 
        return `Best value - ${plan.durationValue} year${plan.durationValue > 1 ? 's' : ''} access`;
      case 'lifetime':
        return `One-time payment, lifetime access`;
      default: 
        return `${plan.durationValue} month${plan.durationValue > 1 ? 's' : ''} access`;
    }
  };

  // Helper function to get plan price per duration
  const getPricePerDuration = (plan) => {
    if (plan.isLifetime) {
      return 'One-time payment';
    }
    
    const price = parseFloat(plan.price) || 0;
    
    switch (plan.durationType) {
      case 'daily':
        const dailyRate = (price / plan.durationValue).toFixed(2);
        return `≈ ${format(dailyRate)} / day`;
      case 'yearly':
        const yearlyRate = (price / plan.durationValue).toFixed(2);
        return `≈ ${format(yearlyRate)} / year`;
      default:
        return '';
    }
  };

  // Get plan badge text
  const getPlanBadge = (plan) => {
    switch (plan.durationType) {
      case 'daily': return 'Daily Plan';
      case 'yearly': return 'Yearly Plan';
      case 'lifetime': return 'Lifetime';
      default: return 'Monthly Plan';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="animate-pulse space-y-8">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <div className="h-4 w-40 bg-gray-200 rounded"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="h-[400px] bg-gray-200 rounded-xl"></div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-40"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded-lg w-56"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">😔</div>
          <h2 className="text-2xl font-bold text-[#111827] mb-4">Tool Not Found</h2>
          <p className="text-gray-600 mb-8">The tool you're looking for doesn't exist.</p>
          <Link 
            to="/products"
            className="inline-flex items-center bg-[#1E3A8A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1E3A8A]/90 hover:shadow-lg transition-all"
          >
            Browse All Tools
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F3F4F6]">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-8">
        <nav className="flex items-center text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-[#1E3A8A]">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/products" className="hover:text-[#1E3A8A]">Premium Tools</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-[#111827] font-medium truncate">{product.title}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="sticky top-24">
              {product.images && product.images.length > 0 ? (
                <ImageGallery images={product.images} />
              ) : (
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-[500px] flex items-center justify-center border border-[#D1D5DB]">
                  <div className="text-center">
                    <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No preview available</p>
                    <p className="text-sm text-gray-400">Premium digital tool</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Categories & Badges */}
            <div className="flex flex-wrap gap-2">
              {product.categories?.map(category => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  className="px-3 py-1 bg-[#1E3A8A]/10 text-[#1E3A8A] text-sm rounded-full hover:bg-[#1E3A8A]/20 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
              <span className="px-3 py-1 bg-green-100 text-green-600 text-sm rounded-full font-medium">
                Digital Tool
              </span>
              <span className="px-3 py-1 bg-[#FACC15]/20 text-[#111827] text-sm rounded-full font-medium">
                Instant Delivery
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#111827] leading-tight">
              {product.title}
            </h1>

            {/* Rating & Stats */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-5 h-5 ${
                      i < (product.rating || 4) 
                        ? 'text-[#FACC15] fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">
                  {product.rating || 4}.0 ({product.reviews?.length || 0} reviews)
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-1" />
                <span>{product.downloads || 1250}+ bought</span>
              </div>
              <div className="flex items-center text-green-600 font-medium">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>Bestseller</span>
              </div>
            </div>

            {/* Offers (attached bot products — bot names hidden) */}
            <div className="bg-white rounded-xl border border-[#D1D5DB] p-6">
              <h3 className="text-xl font-bold text-[#111827] mb-4">Choose an option</h3>
              {offersLoading ? (
                <p className="text-gray-500">Loading options…</p>
              ) : offers.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  Online purchase isn't set up for this tool yet — please use “Order on WhatsApp”.
                </p>
              ) : (
                <div className="space-y-3">
                  {offers.map((o) => {
                    const isSel = selectedOffer?.offer_id === o.offer_id;
                    const isOpen = expandedOffer === o.offer_id;
                    return (
                      <div
                        key={o.offer_id}
                        className={`rounded-xl border-2 p-4 transition ${
                          isSel ? 'border-[#1E3A8A] bg-[#1E3A8A]/5' : 'border-[#D1D5DB] hover:border-[#1E3A8A]/50'
                        } ${o.in_stock ? '' : 'opacity-50'}`}
                      >
                        <div
                          onClick={() => o.in_stock && setSelectedOffer(o)}
                          className={`flex items-center justify-between ${o.in_stock ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                        >
                          <div>
                            <div className="font-bold text-[#111827]">{o.label}</div>
                            <div className={`text-xs ${o.in_stock ? 'text-green-600' : 'text-red-500'}`}>
                              {o.in_stock ? 'In stock' : 'Out of stock'}
                            </div>
                          </div>
                          <div className="text-lg font-bold text-[#1E3A8A]">{format(o.price)}</div>
                        </div>

                        {o.short_description && (
                          <>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setExpandedOffer(isOpen ? null : o.offer_id); }}
                              className="mt-2 text-xs font-medium text-[#1E3A8A]"
                            >
                              {isOpen ? '▲ Hide details' : '▼ View details'}
                            </button>
                            {isOpen && (
                              <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">
                                {o.short_description}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {selectedOffer && (
                <button
                  onClick={() => setShowBuy(true)}
                  className="w-full mt-5 bg-[#1E3A8A] text-white py-3 rounded-lg font-bold hover:bg-[#1E3A8A]/90 hover:shadow-lg transition-all flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Buy Now - {format(selectedOffer.price)}
                </button>
              )}
              <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
                <Shield className="w-3 h-3 mr-1 text-[#1E3A8A]" />
                <span>Secure payment • Instant delivery</span>
              </div>
            </div>

            {/* Plan Selection Section (legacy — permanently disabled) */}
            {false && product.plans && product.plans.length > 0 && (
              <div className="bg-white rounded-xl border border-[#D1D5DB] p-6">
                <h3 className="text-xl font-bold text-[#111827] mb-6">Choose Your Plan</h3>
                
                {/* Debug Info (Remove in production) */}
                {/* <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
                  <p className="font-semibold text-yellow-800">Debug Info:</p>
                  {product.plans.map((plan, idx) => (
                    <p key={idx} className="text-yellow-700">
                      Plan {idx+1}: {plan.title} → Code: {plan.originalDurationCode} → Display: {plan.displayDuration}
                    </p>
                  ))}
                </div> */}
                
                <div className="space-y-4 mb-6">
                  {product.plans.map((plan) => {
                    const PlanIcon = getPlanIcon(plan);
                    const isSelected = selectedPlan?.id === plan.id;
                    const description = getPlanDescription(plan);
                    const pricePerDuration = getPricePerDuration(plan);
                    const badgeText = getPlanBadge(plan);
                    
                    return (
                      <div
                        key={plan.id}
                        onClick={() => handlePlanSelect(plan)}
                        className={`relative cursor-pointer rounded-xl border-2 p-5 transition-all duration-300 hover:shadow-md ${
                          isSelected 
                            ? 'border-[#1E3A8A] bg-[#1E3A8A]/5 shadow-sm' 
                            : 'border-[#D1D5DB] bg-white hover:border-[#1E3A8A]/50'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute -top-2 -right-2 bg-[#1E3A8A] text-white w-7 h-7 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                        
                        {/* Plan Badge */}
                        <div className="absolute -top-2 left-4">
                          <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                            plan.durationType === 'lifetime' 
                              ? 'bg-green-100 text-green-800'
                              : plan.durationType === 'yearly'
                              ? 'bg-blue-100 text-blue-800'
                              : plan.durationType === 'daily'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {badgeText}
                          </span>
                        </div>
                        
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-full">
                            <div className="flex items-center mb-2">
                              <PlanIcon className={`w-5 h-5 mr-2 ${getPlanColor(plan)}`} />
                              <h4 className="font-bold text-[#111827] text-lg">{plan.title}</h4>
                            </div>
                            <p className="text-sm text-gray-500 mb-3">{description}</p>
                            
                            <div className="bg-gray-50 p-3 rounded-lg mb-3">
                              <div className="flex items-baseline justify-between">
                                <div>
                                  <span className="text-2xl font-bold text-[#111827]">{format(plan.price)}</span>
                                  <span className="text-gray-500 ml-2">
                                    / {plan.displayDuration}
                                  </span>
                                </div>
                                {plan.isLifetime && (
                                  <span className="text-sm font-bold text-green-600">
                                    🔥 BEST DEAL
                                  </span>
                                )}
                              </div>
                              {pricePerDuration && (
                                <p className="text-sm text-gray-500 mt-1">
                                  {pricePerDuration}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Full access</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Shield className="w-4 h-4 text-[#1E3A8A] mr-2" />
                            <span>Genuine license</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-[#FACC15] mr-2" />
                            <span>Instant delivery</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Selected Plan Summary */}
                {selectedPlan && (
                  <div className="bg-gradient-to-r from-[#1E3A8A]/5 to-white rounded-lg p-5 border border-[#D1D5DB]">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-[#111827]">Selected Plan</h4>
                        <p className="text-gray-600">{selectedPlan.title}</p>
                        <p className="text-sm text-gray-500">{getPlanDescription(selectedPlan)}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-[#111827]">{format(selectedPlan.price)}</div>
                        <div className="text-sm text-gray-500">
                          {selectedPlan.displayDuration} access
                        </div>
                        {getPricePerDuration(selectedPlan) && (
                          <div className="text-xs text-green-600 font-medium">
                            {getPricePerDuration(selectedPlan)}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setShowBuy(true)}
                      className="w-full bg-[#1E3A8A] text-white py-3 rounded-lg font-bold hover:bg-[#1E3A8A]/90 hover:shadow-lg transition-all flex items-center justify-center"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Buy Now - {format(selectedPlan.price)}
                    </button>
                    
                    <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
                      <Shield className="w-3 h-3 mr-1 text-[#1E3A8A]" />
                      <span>Secure payment • 30-day satisfaction guarantee</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-xl border border-[#D1D5DB] p-6">
              <h3 className="text-xl font-bold text-[#111827] mb-4">About This Tool</h3>
              <div 
                className="prose max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: product.description || '' }}
              />
              
              {/* Key Features */}
              <div className="mt-6 pt-6 border-t border-[#D1D5DB]">
                <h4 className="font-bold text-[#111827] mb-3">Key Features</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Download className="w-4 h-4 text-[#1E3A8A] mr-2" />
                    <span>Instant delivery</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-[#1E3A8A] mr-2" />
                    <span>Genuine license</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MessageCircle className="w-4 h-4 text-[#1E3A8A] mr-2" />
                    <span>24/7 support</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-[#1E3A8A] mr-2" />
                    <span>Lifetime updates</span>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Support Card */}
            <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2D4A9C] rounded-xl p-6 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Need Help Choosing?</h3>
                  <p className="text-white/80">Chat with our tool experts on WhatsApp</p>
                </div>
                <MessageCircle className="w-8 h-8" />
              </div>
              <button
                onClick={handleContact}
                disabled={loadingWhatsapp}
                className="w-full bg-white text-[#111827] py-3 rounded-lg font-bold hover:bg-white/90 transition-colors flex items-center justify-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {loadingWhatsapp ? 'Loading...' : 'Chat on WhatsApp'}
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 bg-white rounded-xl border border-[#D1D5DB] p-6">
          <h2 className="text-2xl font-bold text-[#111827] mb-6">Customer Reviews</h2>
          
          {product.reviews && product.reviews.length > 0 ? (
            <ReviewList reviews={product.reviews} />
          ) : (
            <div className="text-center py-8">
              <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#111827] mb-2">No Reviews Yet</h3>
              <p className="text-gray-600">Be the first to review this tool</p>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#111827] mb-6">Similar Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      <BuyNowModal
        open={showBuy}
        onClose={() => setShowBuy(false)}
        product={product}
        offer={selectedOffer}
        onWhatsApp={() => { setShowBuy(false); handlePurchase(); }}
      />
    </div>
  );
};

export default ProductDetail;
