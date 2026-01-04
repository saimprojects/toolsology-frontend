// src/styles/theme.js
export const colors = {
  // Primary Colors (Based on your requirements)
  primary: {
    purple: '#6B21A8',      // Logo Purple (Main)
    purpleLight: '#8B5CF6', // Lighter Purple
    purpleDark: '#5B21B6',  // Darker Purple
    yellow: '#F59E0B',      // Accent Yellow
    yellowLight: '#FBBF24', // Light Yellow
    black: '#111827',       // Main Black
    white: '#FFFFFF',       // Pure White
  },
  
  // Backgrounds
  backgrounds: {
    light: '#FFFFFF',
    dark: '#0F172A',
    purpleBg: '#FAF5FF',
    grayBg: '#F9FAFB',
  },
  
  // Text Colors
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    light: '#9CA3AF',
    white: '#FFFFFF',
    purple: '#6B21A8',
    yellow: '#F59E0B',
  }
};

// Tailwind Configuration
export const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        'brand-purple': '#6B21A8',
        'brand-purple-light': '#8B5CF6',
        'brand-purple-dark': '#5B21B6',
        'brand-yellow': '#F59E0B',
        'brand-yellow-light': '#FBBF24',
        'brand-black': '#111827',
        'brand-white': '#FFFFFF',
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #6B21A8 0%, #8B5CF6 100%)',
        'gradient-yellow': 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
        'gradient-dark': 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    }
  }
};