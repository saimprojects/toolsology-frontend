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
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-2xl sm:p-8">
        <button onClick={onClose} className="absolute top-4 right-4 rounded-full bg-zinc-100 p-2 text-zinc-500 hover:bg-zinc-200 hover:text-black">
          <X className="w-5 h-5" />
        </button>

        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Secure checkout</p>
        <h3 className="text-2xl font-bold tracking-tight text-black">Complete your purchase</h3>
        <p className="text-gray-500 text-sm mb-1">{product.title}</p>
        {offer && (
          <p className="mb-5 font-bold text-black">{format(offer.price)} · {offer.label}</p>
        )}

        <button onClick={() => setShowPaymentOptions((value) => !value)}
          className="group mb-3 w-full rounded-2xl border-2 border-black p-4 text-left transition hover:bg-zinc-50">
          <div className="flex items-center gap-3">
            <div className="bg-black h-10 w-10 rounded-xl flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-black flex items-center gap-1">
                Auto Pay · Instant Purchase <Zap className="w-4 h-4 text-[#FACC15]" />
              </div>
              <div className="text-xs text-gray-500">Choose Pakistani banks or Binance</div>
            </div>
            <ChevronDown className={`ml-auto w-5 h-5 text-black transition-transform ${showPaymentOptions ? "rotate-180" : ""}`} />
          </div>
        </button>

        {showPaymentOptions && (
          <div className="grid sm:grid-cols-2 gap-3 mb-3 -mt-1 p-3 rounded-xl bg-gray-50 border">
            <button type="button" onClick={() => choosePayment("local")}
              className="text-left bg-white border-2 border-zinc-200 hover:border-black rounded-xl p-3 transition">
              <Building2 className="w-6 h-6 text-black mb-2" />
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
