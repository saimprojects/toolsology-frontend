// src/components/layout/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ fullScreen = false, size = 'lg', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="absolute inset-0 rounded-full border-4 border-gray-300"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-brand-purple border-r-brand-purple animate-spin"></div>
      </div>
      {text && <p className="mt-4 text-gray-600 font-medium">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
        <div className="text-center">
          {spinner}
          <p className="mt-4 text-sm text-gray-500">Toolsology</p>
        </div>
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;