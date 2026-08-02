import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BadgeCheck, Globe2, ShieldCheck, Zap } from "lucide-react";

const signals = ["AI tools", "Design software", "VPN access", "Business subscriptions", "Reseller pricing"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white border-b border-zinc-800">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="relative max-w-7xl mx-auto px-5 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <span className="h-2 w-2 rounded-full bg-white animate-pulse" /> Pakistan's trusted premium digital tools store
        </div>
        <div className="grid lg:grid-cols-[1fr_360px] gap-14 items-end">
          <div>
            <h1 className="text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.86] tracking-[-0.07em] font-black max-w-5xl">
              Premium tools.<br/><span className="text-zinc-500">Without premium prices.</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mt-9 leading-relaxed">
              Buy genuine AI tools, software subscriptions and digital products in Pakistan—or pay internationally with Binance. Instant delivery, human support.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-9">
              <Link to="/products" className="inline-flex items-center justify-center gap-2 bg-white text-black rounded-full px-7 py-4 font-bold hover:bg-zinc-200 transition">Explore premium tools <ArrowUpRight className="w-5 h-5" /></Link>
              <Link to="/reseller" className="inline-flex items-center justify-center gap-2 border border-zinc-700 rounded-full px-7 py-4 font-semibold hover:bg-zinc-900 transition">Start reselling</Link>
            </div>
          </div>
          <div className="bg-white text-black rounded-[2rem] p-7 shadow-2xl">
            <div className="text-xs uppercase tracking-[.2em] text-zinc-500">Why Toolsology</div>
            <div className="space-y-5 mt-6">
              <div className="flex gap-3"><Zap className="w-5 h-5"/><div><b>Instant fulfilment</b><p className="text-sm text-zinc-500">Automated delivery after verification.</p></div></div>
              <div className="flex gap-3"><ShieldCheck className="w-5 h-5"/><div><b>Secure checkout</b><p className="text-sm text-zinc-500">Local banks and Binance payments.</p></div></div>
              <div className="flex gap-3"><BadgeCheck className="w-5 h-5"/><div><b>Verified support</b><p className="text-sm text-zinc-500">Real people when you need help.</p></div></div>
              <div className="flex gap-3"><Globe2 className="w-5 h-5"/><div><b>Built for everyone</b><p className="text-sm text-zinc-500">Pakistan first, available worldwide.</p></div></div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-16 pt-8 border-t border-zinc-800">
          {signals.map((item) => <span key={item} className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300">{item}</span>)}
        </div>
      </div>
    </section>
  );
}
