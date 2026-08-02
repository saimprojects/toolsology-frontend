// src/pages/ResellerPanel.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Store, Wallet, ShieldCheck } from "lucide-react";

export default function ResellerPanel() {
  return (
    <div className="min-h-[620px] bg-black px-4 py-20 text-white">
      <div className="max-w-4xl mx-auto rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6 sm:p-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-white text-black h-11 w-11 rounded-xl flex items-center justify-center">
          <Store className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-bold text-white">Reseller Panel</h1>
      </div>

      <p className="text-zinc-400 mb-8">
        Wholesale rates, your own wallet, and instant delivery. Fund your wallet
        once and buy any tool at reseller price — no per-order hassle.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <div className="border border-zinc-700 bg-black rounded-2xl p-5">
          <Wallet className="w-6 h-6 text-white mb-4" />
          <div className="font-semibold">Prepaid Wallet</div>
          <p className="text-sm text-gray-500">Top up once, spend anytime.</p>
        </div>
        <div className="border border-zinc-700 bg-black rounded-2xl p-5">
          <ShieldCheck className="w-6 h-6 text-white mb-4" />
          <div className="font-semibold">Reseller Pricing</div>
          <p className="text-sm text-gray-500">Lower rates than retail.</p>
        </div>
        <div className="border border-zinc-700 bg-black rounded-2xl p-5">
          <Store className="w-6 h-6 text-white mb-4" />
          <div className="font-semibold">Instant Delivery</div>
          <p className="text-sm text-gray-500">Auto-fulfilled on purchase.</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          to="/reseller/signup"
          className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-zinc-200"
        >
          Create reseller account
        </Link>
        <Link
          to="/reseller/login"
          className="border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-black"
        >
          Login
        </Link>
      </div>

      <p className="text-xs text-gray-400 mt-6">
        A minimum wallet deposit is required to activate selling.
      </p>
      </div>
    </div>
  );
}
