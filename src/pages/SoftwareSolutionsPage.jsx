// src/pages/ServicesPage.jsx - Rename to SoftwareSolutionsPage.jsx
import React from 'react';
import { 
  Download, 
  Shield, 
  Zap, 
  Clock,
  CheckCircle,
  ArrowRight,
  Cpu,
  Database,
  Palette,
  BarChart3,
  Smartphone,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SoftwareSolutionsPage = () => {
  const solutions = [
    {
      icon: Cpu,
      title: 'Premium Software Bundles',
      description: 'Complete software packages with all essential tools',
      features: ['Multiple tools in one', 'Volume discounts', 'Priority support'],
      price: 'Starting from Rs. 15,000',
      duration: 'Lifetime License',
      popular: true
    },
    {
      icon: Download,
      title: 'Single Software License',
      description: 'Individual software tools with full features',
      features: ['Single product license', 'Regular updates', 'Basic support'],
      price: 'Starting from Rs. 5,000',
      duration: 'Lifetime Access',
      popular: true
    },
    {
      icon: Shield,
      title: 'Enterprise Solutions',
      description: 'Custom software solutions for businesses',
      features: ['Custom development', 'White-label options', 'Dedicated support'],
      price: 'Custom Pricing',
      duration: 'Annual License'
    }
  ];

  const softwareTypes = [
    {
      icon: Database,
      title: 'Database Management',
      description: 'Advanced database tools and utilities'
    },
    {
      icon: Palette,
      title: 'Design Software',
      description: 'Creative and design tools'
    },
    {
      icon: BarChart3,
      title: 'Analytics Tools',
      description: 'Data analysis and reporting software'
    },
    {
      icon: Smartphone,
      title: 'Mobile Applications',
      description: 'Premium mobile apps and utilities'
    },
    {
      icon: Globe,
      title: 'Web Tools',
      description: 'Web development and optimization software'
    },
    {
      icon: Shield,
      title: 'Security Software',
      description: 'Security and protection tools'
    }
  ];

  const benefits = [
    {
      title: "Lifetime License",
      description: "One-time payment, use forever"
    },
    {
      title: "Regular Updates",
      description: "Free updates for lifetime"
    },
    {
      title: "Premium Support",
      description: "24/7 technical support"
    },
    {
      title: "Money Back Guarantee",
      description: "30-day refund policy"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-brand-purple to-purple-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-24 relative">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Premium <span className="text-yellow-300">Software Solutions</span>
            </h1>
            
            <p className="text-xl text-purple-100 mb-10 max-w-3xl">
              High-quality digital tools and software solutions designed to boost 
              your productivity and business efficiency.
            </p>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span>Lifetime License</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span>Instant Download</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Software Solutions */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="gradient-text">Software Packages</span>
            </h2>
            <p className="text-lg text-gray-600">
              Choose from our premium software solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div 
                key={index}
                className={`relative rounded-3xl border-2 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  solution.popular 
                    ? 'border-yellow-500 bg-gradient-to-b from-white to-yellow-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                {solution.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 ${
                  solution.popular 
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' 
                    : 'bg-gradient-to-r from-brand-purple to-purple-600'
                }`}>
                  <solution.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{solution.title}</h3>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                
                <div className="space-y-3 mb-8">
                  {solution.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-bold text-gray-900">
                      {solution.price}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{solution.duration}</span>
                    </div>
                  </div>
                  
                  <Link 
                    to="/contact"
                    className={`w-full py-3 rounded-xl font-bold text-center block ${
                      solution.popular
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 hover:shadow-lg hover:shadow-yellow-200'
                        : 'bg-gradient-to-r from-brand-purple to-purple-600 text-white hover:shadow-lg hover:shadow-purple-200'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Software Types */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Software <span className="gradient-text">Categories</span>
            </h2>
            <p className="text-lg text-gray-600">
              Browse our premium software by category
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {softwareTypes.map((software, index) => (
              <Link
                key={index}
                to={`/products?category=${software.title.toLowerCase().replace(' ', '-')}`}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-12 w-12 bg-gradient-to-r from-brand-purple to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <software.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{software.title}</h3>
                <p className="text-gray-600 mb-4">{software.description}</p>
                
                <div className="text-brand-purple font-semibold text-sm hover:underline flex items-center">
                  Browse Software
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-r from-brand-purple to-purple-700 rounded-3xl p-8 md:p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Why Choose <span className="text-yellow-300">Bunny Tools</span>
            </h2>
            <p className="text-purple-200">
              The benefits of choosing our premium software solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="text-4xl mb-4">
                  {index === 0 && "🎯"}
                  {index === 1 && "🔄"}
                  {index === 2 && "💬"}
                  {index === 3 && "💰"}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-yellow-50 to-purple-50 rounded-3xl p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Boost Your Productivity?
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Get the right software tools for your needs. Browse our collection 
            or contact us for custom solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products"
              className="group relative bg-gradient-to-r from-brand-purple to-purple-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center"
            >
              <span>Browse All Software</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/contact"
              className="border-2 border-brand-purple text-brand-purple px-10 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors"
            >
              Contact for Custom Solution
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareSolutionsPage;