import React, { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppNumber } from "../../api/api";

export default function WhatsAppButton() {
  const [whatsappNumber, setWhatsappNumber] = useState("+923001234567");
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    getWhatsAppNumber().then((number) => number && setWhatsappNumber(number)).catch(() => {});
    const handleScroll = () => {
      const current = window.scrollY;
      setIsVisible(!(current > lastScrollY.current && current > 180));
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleClick() {
    const message = encodeURIComponent("Hello Toolsology! I need help with a product or order.");
    window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${message}`, "_blank", "noopener,noreferrer");
    window.gtag?.("event", "whatsapp_click", { event_category: "engagement", event_label: "floating_support" });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group fixed bottom-5 right-4 z-50 flex items-center gap-3 rounded-full border border-zinc-700 bg-black p-2 pr-4 text-white shadow-2xl shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-500 sm:bottom-6 sm:right-6 ${isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-20 opacity-0"}`}
      aria-label="Chat with Toolsology on WhatsApp"
    >
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]">
        <MessageCircle className="h-6 w-6 fill-transparent text-white" strokeWidth={2.2} />
        <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-black bg-white" aria-hidden="true" />
      </span>
      <span className="text-left">
        <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">Support</span>
        <span className="block text-sm font-bold leading-5">Chat on WhatsApp</span>
      </span>
    </button>
  );
}
