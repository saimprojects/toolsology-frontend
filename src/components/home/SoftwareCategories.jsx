// src/components/home/SoftwareCategories.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Database, 
  Palette, 
  BarChart3, 
  Smartphone, 
  Globe,
  Shield,
  Zap,
  ArrowRight
} from 'lucide-react';

const SoftwareCategories = () => {
  const categories = [
    {
      icon: Code2,
      title: 'Development Tools',
      description: 'Advanced IDEs, code editors, and development software',
      count: '12 Products',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Database,
      title: 'Database Software',
      description: 'Powerful database management and optimization tools',
      count: '8 Products',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Palette,
      title: 'Design Software',
      description: 'Professional design and creative tools',
      count: '15 Products',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      icon: BarChart3,
      title: 'Analytics Tools',
      description: 'Data analysis and business intelligence software',
      count: '10 Products',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      description: 'Premium mobile applications and utilities',
      count: '20 Products',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Shield,
      title: 'Security Software',
      description: 'Advanced security and protection tools',
      count: '7 Products',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 border border-purple-100 mb-6">
            <Zap className="w-4 h-4 text-brand-purple mr-2" />
            <span className="text-sm font-medium text-brand-purple">Software Categories</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Browse by <span className="gradient-text">Category</span>
          </h2>
          
          <p className="text-lg text-gray-600">
            Discover premium software tools organized by category. 
            Find exactly what you need for your specific requirements.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => (
            <Link 
              key={index}
              to={`/products?category=${category.title.toLowerCase().replace(' ', '-')}`}
              className={`group relative rounded-2xl border border-gray-200 ${category.bgColor} p-6 hover:border-transparent hover:shadow-2xl transition-all duration-500 card-hover`}
            >
              {/* Icon */}
              <div className={`relative mb-6`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                <div className={`relative h-14 w-14 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center`}>
                  <category.icon className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>

              {/* Count */}
              <div className="flex items-center justify-between mt-6">
                <span className="text-sm font-medium text-gray-700">{category.count}</span>
                <div className="flex items-center text-sm font-semibold text-brand-purple group-hover:text-purple-700">
                  <span>Browse</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-purple to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          ))}
        </div>

        {/* All Categories CTA */}
        <div className="text-center">
          <Link 
            to="/products"
            className="inline-flex items-center border-2 border-brand-purple text-brand-purple px-8 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
          >
            <Globe className="w-5 h-5 mr-2" />
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SoftwareCategories;