// src/components/products/BuyNowModal.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, CreditCard, MessageCircle, Zap, Building2, Coins, ChevronDown } from "lucide-react";
import { isLoggedIn } from "../../api/customer";
import { useCurrency } from "../../context/CurrencyContext";

export default function BuyNowModal({ open, onClose, product, offer, onWhatsApp }) {
  const nav = useNavigate();
  const { format, setCurrency } = useCurrency();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  useEffect(() => {
    if (!open) setShowPaymentOptions(false);
  }, [open]);
  if (!open) return null;

  function choosePayment(payment) {
    if (!offer) return;
    setCurrency(payment === "binance" ? "USD" : "PKR");
    const next = `/checkout/${product.id}?offer=${offer.offer_id}&payment=${payment}`;
    if (!isLoggedIn()) {
      nav(`/login?next=${encodeURIComponent(next)}`);
    } else {
      nav(next);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-[#111827]">Complete your purchase</h3>
        <p className="text-gray-500 text-sm mb-1">{product.title}</p>
        {offer && (
          <p className="text-[#1E3A8A] font-bold mb-5">{format(offer.price)} · {offer.label}</p>
        )}

        <button onClick={() => setShowPaymentOptions((value) => !value)}
          className="w-full text-left border-2 border-[#1E3A8A] rounded-xl p-4 mb-3 hover:bg-[#1E3A8A]/5 transition group">
          <div className="flex items-center gap-3">
            <div className="bg-[#1E3A8A] h-10 w-10 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-[#1E3A8A] flex items-center gap-1">
                Auto Pay · Instant Purchase <Zap className="w-4 h-4 text-[#FACC15]" />
              </div>
              <div className="text-xs text-gray-500">Choose Pakistani banks or Binance</div>
            </div>
            <ChevronDown className={`ml-auto w-5 h-5 text-[#1E3A8A] transition-transform ${showPaymentOptions ? "rotate-180" : ""}`} />
          </div>
        </button>

        {showPaymentOptions && (
          <div className="grid sm:grid-cols-2 gap-3 mb-3 -mt-1 p-3 rounded-xl bg-gray-50 border">
            <button type="button" onClick={() => choosePayment("local")}
              className="text-left bg-white border-2 border-gray-200 hover:border-[#1E3A8A] rounded-xl p-3 transition">
              <Building2 className="w-6 h-6 text-[#1E3A8A] mb-2" />
              <div className="font-semibold text-[#111827]">Pakistani Banks</div>
              <div className="text-xs text-gray-500 mt-1">Bank, JazzCash, Easypaisa · PKR</div>
            </button>
            <button type="button" onClick={() => choosePayment("binance")}
              className="text-left bg-white border-2 border-gray-200 hover:border-yellow-500 rounded-xl p-3 transition">
              <Coins className="w-6 h-6 text-yellow-500 mb-2" />
              <div className="font-semibold text-[#111827]">Binance</div>
              <div className="text-xs text-gray-500 mt-1">Wallet address or Binance ID · USDT</div>
            </button>
          </div>
        )}

        <button onClick={onWhatsApp}
          className="w-full text-left border-2 border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 h-10 w-10 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-[#111827]">Order on WhatsApp</div>
              <div className="text-xs text-gray-500">Manual · No account needed</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
