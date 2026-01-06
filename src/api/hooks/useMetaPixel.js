// src/hooks/useMetaPixel.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useMetaPixel = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [location]);
};

export default useMetaPixel;
