// 📁 src/App.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/layout/WhatsAppButton";
import ScrollToTop from "./components/layout/ScrollToTop";
import LoadingSpinner from "./components/layout/LoadingSpinner";

// Pages
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import SoftwareSolutionsPage from "./pages/SoftwareSolutionsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import ReviewsPage from "./pages/ReviewPage";
import RefundPolicy from "./pages/RefundPolicy";
import CheckoutPage from "./pages/CheckoutPage";
import ResellerPanel from "./pages/ResellerPanel";
import ResellerSignup from "./pages/ResellerSignup";
import ResellerLogin from "./pages/ResellerLogin";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerSignup from "./pages/CustomerSignup";
import CustomerAccount from "./pages/CustomerAccount";

// Reseller panel (own layout)
import ResellerLayout from "./components/reseller/ResellerLayout";
import Overview from "./pages/reseller/Overview";
import ResellerProducts from "./pages/reseller/Products";
import ResellerProductDetail from "./pages/reseller/ProductDetail";
import ResellerOrders from "./pages/reseller/Orders";
import ResellerSettings from "./pages/reseller/Settings";

import useMetaPixel from "./api/hooks/useMetaPixel";
// Providers
import { ProductsProvider } from "./context/ProductsContext";
import { WhatsAppProvider } from "./context/WhatsAppContext";
import { CurrencyProvider } from "./context/CurrencyContext";

const RouteWrapper = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

function PixelTracker() {
  useMetaPixel();
  return null;
}

// Public marketing site (with navbar/footer/WhatsApp)
function MarketingLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <React.Suspense fallback={<LoadingSpinner fullScreen />}>
          <RouteWrapper>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout/:id" element={<CheckoutPage />} />
              <Route path="/solutions" element={<SoftwareSolutionsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              {/* Customer auth + account */}
              <Route path="/login" element={<CustomerLogin />} />
              <Route path="/signup" element={<CustomerSignup />} />
              <Route path="/account" element={<CustomerAccount />} />
              {/* Reseller public pages */}
              <Route path="/reseller" element={<ResellerPanel />} />
              <Route path="/reseller/signup" element={<ResellerSignup />} />
              <Route path="/reseller/login" element={<ResellerLogin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RouteWrapper>
        </React.Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <CurrencyProvider>
      <WhatsAppProvider>
        <ProductsProvider>
        <Router>
          <PixelTracker />
          <ScrollToTop />
          <Routes>
            {/* Reseller panel — self-contained layout, no marketing chrome */}
            <Route path="/reseller/app" element={<ResellerLayout />}>
              <Route index element={<Overview />} />
              <Route path="products" element={<ResellerProducts />} />
              <Route path="products/:id" element={<ResellerProductDetail />} />
              <Route path="orders" element={<ResellerOrders />} />
              <Route path="settings" element={<ResellerSettings />} />
            </Route>

            {/* Everything else — public marketing site */}
            <Route path="/*" element={<MarketingLayout />} />
          </Routes>
        </Router>
        </ProductsProvider>
      </WhatsAppProvider>
    </CurrencyProvider>
  );
}

export default App;
