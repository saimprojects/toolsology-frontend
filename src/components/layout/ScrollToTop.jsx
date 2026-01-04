// src/components/layout/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 'instant' makes it jump immediately without animation
    });
    
    // Alternative: Using scrollTo with 0,0
    // window.scrollTo(0, 0);
  }, [pathname, search]); // Added search to dependencies for query parameter changes

  return null;
};

export default ScrollToTop;