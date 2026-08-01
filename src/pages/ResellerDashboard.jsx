// src/pages/ResellerDashboard.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  isLoggedIn, clearTokens, getMe, topupWallet, walletPurchase,
  getResellerProducts, getTransactions, getPaymentMethods,
} from "../api/reseller";

export default function ResellerDashboard() {
  const nav = useNavigate();
  const [me, setMe] = useState(null);
  const [products, setProducts] = useState([]);
  const [methods, setMethods] = useState([]);
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);

  const [trx, setTrx] = useState("");
  const [msg, setMsg] = useState(null); // {type, text}
  const [delivered, setDelivered] = useState(null);

  const refresh = useCallback(async () => {
    const [m, p, pm, t] = await Promise.all([
      getMe(), getResellerProducts(), getPaymentMethods(), getTransactions(),
    ]);
    setMe(m); setProducts(p); setMethods(pm); setTxns(t);
  }, []);

  useEffect(() => {
    if (!isLoggedIn()) { nav("/reseller/login"); return; }
    refresh().catch(() => nav("/reseller/login")).finally(() => setLoading(false));
  }, [nav, refresh]);

  async function doTopup(e) {
    e.preventDefault();
    setMsg(null);
    try {
      await topupWallet(trx.trim());
      setTrx("");
      setMsg({ type: "ok", text: "Wallet topped up!" });
      await refresh();
    } catch (err) {
      setMsg({ type: "err", text: err.message });
    }
  }

  async function buy(product) {
    setMsg(null); setDelivered(null);
    try {
      const order = await walletPurchase({ product_id: product.id });
      if (order.status === "completed") {
        setDelivered(order.delivered_accounts || []);
        setMsg({ type: "ok", text: `Purchased ${product.title}.` });
      } else {
        setMsg({ type: "err", text: `Order ${order.status}. ${order.error_message || ""}` });
      }
      await refresh();
    } catch (err) {
      setMsg({ type: "err", text: err.message });
    }
  }

  function logout() { clearTokens(); nav("/reseller/login"); }

  if (loading) return <div className="max-w-4xl mx-auto p-10 text-center">Loading…</div>;

  const activated = me?.can_operate;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reseller Dashboard</h1>
          <p className="text-gray-500 text-sm">Hi {me?.username}</p>
        </div>
        <button onClick={logout} className="text-sm text-gray-500 hover:text-red-600">Logout</button>
      </div>

      {/* Wallet */}
      <div className="bg-[#1E3A8A] text-white rounded-xl p-5 mb-6">
        <div className="text-sm opacity-80">Wallet balance</div>
        <div className="text-3xl font-bold">Rs {me?.wallet_balance}</div>
        <div className="text-sm mt-1">
          {activated ? "✓ Active" : `Deposit at least Rs ${me?.min_deposit} to activate`}
        </div>
      </div>

      {msg && (
        <div className={`rounded-lg p-3 mb-4 text-sm ${msg.type === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {msg.text}
        </div>
      )}

      {delivered && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 mb-6">
          <h3 className="font-semibold text-green-800 mb-2">Your account(s):</h3>
          {delivered.map((a, i) => (
            <div key={i} className="bg-white rounded p-2 mb-2 text-sm">
              <div>User: {a.username}</div>
              <div>Pass: {a.password}</div>
              {a.verify_email && <div>Verify: {a.verify_email}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Deposit / top-up */}
      <div className="border rounded-xl p-5 mb-8">
        <h2 className="font-semibold mb-3">Add funds to wallet</h2>
        <div className="space-y-2 mb-3">
          {methods.map((m) => (
            <div key={m.id} className="flex items-center gap-3 text-sm">
              {m.icon && <img src={m.icon} alt="" className="h-6 w-6 object-contain" />}
              <span className="font-medium">{m.name}:</span>
              <span className="font-mono">{m.account_number}</span>
              <span className="text-gray-500">({m.account_title})</span>
            </div>
          ))}
        </div>
        <form onSubmit={doTopup} className="flex gap-2">
          <input className="flex-1 border rounded-lg px-3 py-2" placeholder="Enter your Transaction ID (TID)"
            value={trx} onChange={(e) => setTrx(e.target.value)} />
          <button className="bg-[#1E3A8A] text-white px-5 rounded-lg font-semibold">Verify & add</button>
        </form>
      </div>

      {/* Products */}
      <h2 className="font-semibold mb-3">Products (reseller price)</h2>
      {!activated && (
        <p className="text-sm text-yellow-700 mb-3">Activate your wallet to start buying.</p>
      )}
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {products.map((p) => (
          <div key={p.id} className="border rounded-xl p-4 flex items-center gap-3">
            {p.main_image && <img src={p.main_image} alt="" className="h-14 w-14 object-cover rounded" />}
            <div className="flex-1">
              <div className="font-semibold">{p.title}</div>
              <div className="text-[#1E3A8A] font-bold">Rs {p.price}</div>
              <div className="text-xs text-gray-500">{p.in_stock ? "In stock" : "Out of stock"}</div>
            </div>
            <button
              disabled={!activated || !p.in_stock}
              onClick={() => buy(p)}
              className="bg-[#1E3A8A] text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-40"
            >
              Buy
            </button>
          </div>
        ))}
        {products.length === 0 && <p className="text-gray-500 text-sm">No products available yet.</p>}
      </div>

      {/* Transactions */}
      <h2 className="font-semibold mb-3">Recent transactions</h2>
      <div className="border rounded-xl divide-y">
        {txns.length === 0 && <div className="p-4 text-sm text-gray-500">No transactions yet.</div>}
        {txns.map((t) => (
          <div key={t.id} className="p-3 flex justify-between text-sm">
            <span className="capitalize">{t.kind} <span className="text-gray-400">{t.note}</span></span>
            <span className={Number(t.amount) < 0 ? "text-red-600" : "text-green-600"}>
              {Number(t.amount) < 0 ? "" : "+"}{t.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
