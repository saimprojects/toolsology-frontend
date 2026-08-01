// src/pages/ResellerPanel.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Store, Wallet, ShieldCheck } from "lucide-react";

export default function ResellerPanel() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-[#1E3A8A] text-white h-11 w-11 rounded-lg flex items-center justify-center">
          <Store className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-[#111827]">Reseller Panel</h1>
      </div>

      <p className="text-gray-600 mb-8">
        Wholesale rates, your own wallet, and instant delivery. Fund your wallet
        once and buy any tool at reseller price — no per-order hassle.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <div className="border rounded-xl p-4">
          <Wallet className="w-6 h-6 text-[#1E3A8A] mb-2" />
          <div className="font-semibold">Prepaid Wallet</div>
          <p className="text-sm text-gray-500">Top up once, spend anytime.</p>
        </div>
        <div className="border rounded-xl p-4">
          <ShieldCheck className="w-6 h-6 text-[#1E3A8A] mb-2" />
          <div className="font-semibold">Reseller Pricing</div>
          <p className="text-sm text-gray-500">Lower rates than retail.</p>
        </div>
        <div className="border rounded-xl p-4">
          <Store className="w-6 h-6 text-[#1E3A8A] mb-2" />
          <div className="font-semibold">Instant Delivery</div>
          <p className="text-sm text-gray-500">Auto-fulfilled on purchase.</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          to="/reseller/signup"
          className="bg-[#1E3A8A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1E3A8A]/90"
        >
          Create reseller account
        </Link>
        <Link
          to="/reseller/login"
          className="border-2 border-[#1E3A8A] text-[#1E3A8A] px-6 py-3 rounded-lg font-semibold hover:bg-[#1E3A8A] hover:text-white"
        >
          Login
        </Link>
      </div>

      <p className="text-xs text-gray-400 mt-6">
        A minimum wallet deposit is required to activate selling.
      </p>
    </div>
  );
}
