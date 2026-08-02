// src/pages/CustomerAccount.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, LogOut, Copy, CheckCircle2 } from "lucide-react";
import { isLoggedIn, clearTokens, getMe, getMyOrders } from "../api/customer";
import { useCurrency } from "../context/CurrencyContext";
import Seo from "../components/layout/Seo";

const badge = {
  completed: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
  needs_review: "bg-yellow-100 text-yellow-700",
  pending: "bg-gray-100 text-gray-600",
};

export default function CustomerAccount() {
  const { format } = useCurrency();
  const nav = useNavigate();
  const [me, setMe] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) { nav("/login?next=/account"); return; }
    Promise.all([getMe(), getMyOrders()])
      .then(([m, o]) => { setMe(m); setOrders(o); })
      .catch(() => nav("/login?next=/account"))
      .finally(() => setLoading(false));
  }, [nav]);

  function logout() { clearTokens(); nav("/"); }
  function copy(text, key) {
    navigator.clipboard?.writeText(text);
    setCopied(key); setTimeout(() => setCopied(""), 1500);
  }

  if (loading) return <div className="min-h-screen bg-black px-4 py-20 text-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-black px-4 py-12 text-white">
      <Seo title="My Account" description="Manage your Toolsology orders and delivered accounts." noindex />
      <div className="mx-auto max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">My Account</h1>
          <p className="text-zinc-400">Hi {me?.username} — your orders and credentials</p>
        </div>
        <button onClick={logout}
          className="flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-white hover:text-white">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
        <Package className="w-5 h-5 text-white" /> Order history
      </h2>

      {orders.length === 0 && (
        <div className="bg-white border border-zinc-200 rounded-2xl p-8 text-center text-zinc-500">
          No orders yet. Your purchases will appear here.
        </div>
      )}

      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="bg-white text-black border border-zinc-200 rounded-2xl p-5 shadow-xl shadow-black/20">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-semibold text-[#111827]">{o.product_title}</div>
                <div className="text-xs text-gray-500">
                  Order #{o.id} · {format(o.sell_amount_pkr)} · {new Date(o.created_at).toLocaleString()}
                </div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${badge[o.status] || ""}`}>
                {o.status}
              </span>
            </div>

            {o.delivered_accounts?.length > 0 && (
              <div className="space-y-2">
                {o.delivered_accounts.map((a, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-3 text-sm space-y-1">
                    {a.details && Object.keys(a.details).length > 0 ? (
                      Object.entries(a.details).map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between">
                          <span><span className="text-gray-500">{k}:</span> {v}</span>
                          <button onClick={() => copy(String(v), `${o.id}-${i}-${k}`)} className="text-gray-400 hover:text-[#1E3A8A]">
                            {copied === `${o.id}-${i}-${k}` ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <span><span className="text-gray-500">Username:</span> {a.username}</span>
                          <button onClick={() => copy(a.username, `u${o.id}-${i}`)} className="text-gray-400 hover:text-[#1E3A8A]">
                            {copied === `u${o.id}-${i}` ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span><span className="text-gray-500">Password:</span> {a.password}</span>
                          <button onClick={() => copy(a.password, `p${o.id}-${i}`)} className="text-gray-400 hover:text-[#1E3A8A]">
                            {copied === `p${o.id}-${i}` ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        {a.verify_email && (
                          <div><span className="text-gray-500">Verify email:</span> {a.verify_email}</div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
