// src/components/ui/Button.jsx
import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-brand-purple to-purple-600 text-white hover:shadow-lg hover:shadow-purple-200 focus:ring-brand-purple',
    secondary: 'bg-gradient-to-r from-brand-yellow to-yellow-500 text-gray-900 hover:shadow-lg hover:shadow-yellow-200 focus:ring-yellow-500',
    outline: 'border-2 border-brand-purple text-brand-purple hover:bg-purple-50 focus:ring-brand-purple',
    ghost: 'text-gray-700 hover:text-brand-purple hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-200 focus:ring-red-500',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const classes = [
    baseClasses,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    className
  ].join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 className={`w-5 h-5 animate-spin ${iconPosition === 'left' ? 'mr-2' : 'ml-2'}`} />
      )}
      
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className="w-5 h-5 mr-2" />
      )}
      
      <span>{children}</span>
      
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-5 h-5 ml-2" />
      )}
    </button>
  );
};

export default Button;