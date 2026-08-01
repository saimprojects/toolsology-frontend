// src/pages/CheckoutPage.jsx — retail instant-pay checkout (login required)
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Copy, CheckCircle2, ArrowRight } from "lucide-react";
import {
  isLoggedIn, getStoreProduct, getPaymentMethods, retailCheckout,
} from "../api/customer";

export default function CheckoutPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const productId = Number(id);

  const [product, setProduct] = useState(null);
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [trx, setTrx] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) { nav(`/login?next=/checkout/${productId}`); return; }
    Promise.all([getStoreProduct(productId), getPaymentMethods()])
      .then(([p, pm]) => { setProduct(p); setMethods(pm); })
      .finally(() => setLoading(false));
  }, [productId, nav]);

  const idem = useMemo(() => `${productId}-${trx.trim().toUpperCase()}`, [productId, trx]);

  async function submit(e) {
    e.preventDefault();
    setError(""); setResult(null);
    if (!trx.trim()) { setError("Please enter your Transaction ID (TID)."); return; }
    setSubmitting(true);
    try {
      const data = await retailCheckout({
        product_id: productId, quantity: 1, trx_id: trx.trim(),
        customer_email: email.trim(),
      });
      setResult(data);
    } catch (err) { setError(err.message); }
    finally { setSubmitting(false); }
  }

  function copy(text, key) {
    navigator.clipboard?.writeText(text);
    setCopied(key); setTimeout(() => setCopied(""), 1500);
  }

  if (loading) return <div className="container mx-auto px-4 py-20 text-center">Loading…</div>;
  if (!product) return <div className="container mx-auto px-4 py-20 text-center">Product not found.</div>;

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <h1 className="text-3xl font-bold text-[#111827] mb-1">Checkout</h1>
      <p className="text-gray-600 mb-8">
        {product.title} — <span className="font-bold text-[#1E3A8A]">Rs {product.price}</span>
      </p>

      {/* Success */}
      {result && result.status === "completed" && (
        <div className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 text-green-700 font-semibold mb-4">
            <CheckCircle2 className="w-6 h-6" /> Payment verified — delivered!
          </div>
          {result.delivered_accounts?.map((a, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 mb-3 text-sm">
              <div className="flex justify-between items-center">
                <span><span className="text-gray-500">Username:</span> {a.username}</span>
                <button onClick={() => copy(a.username, `u${i}`)} className="text-gray-400 hover:text-[#1E3A8A]">
                  {copied === `u${i}` ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span><span className="text-gray-500">Password:</span> {a.password}</span>
                <button onClick={() => copy(a.password, `p${i}`)} className="text-gray-400 hover:text-[#1E3A8A]">
                  {copied === `p${i}` ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {a.verify_email && <div className="mt-1"><span className="text-gray-500">Verify:</span> {a.verify_email}</div>}
            </div>
          ))}
          <Link to="/account" className="inline-flex items-center gap-1 text-[#1E3A8A] font-semibold mt-2">
            View in My Account <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {result && result.status !== "completed" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-yellow-800">
          Payment received but order is <b>{result.status}</b>. We'll deliver shortly — order #{result.id}. {result.error_message}
        </div>
      )}

      {!result && (
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          {/* Step 1 */}
          <h2 className="font-semibold text-lg mb-3">1. Send payment</h2>
          <div className="space-y-2 mb-6">
            {methods.length === 0 && <p className="text-gray-400 text-sm">No payment methods configured yet.</p>}
            {methods.map((m) => (
              <div key={m.id} className="flex items-center gap-3 border rounded-lg p-3">
                {m.icon && <img src={m.icon} alt={m.name} className="h-8 w-8 object-contain" />}
                <div className="text-sm">
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-gray-700">{m.account_title}</div>
                  <div className="font-mono text-[#111827]">{m.account_number}</div>
                  {m.instructions && <div className="text-gray-500 text-xs mt-1">{m.instructions}</div>}
                </div>
              </div>
            ))}
          </div>

          {/* Step 2 */}
          <h2 className="font-semibold text-lg mb-3">2. Verify your payment</h2>
          <form onSubmit={submit} className="space-y-3">
            <input className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#1E3A8A]/30 outline-none"
              placeholder="Transaction ID (TID)" value={trx} onChange={(e) => setTrx(e.target.value)} />
            <input className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#1E3A8A]/30 outline-none"
              type="email" placeholder="Email (optional, for delivery)" value={email} onChange={(e) => setEmail(e.target.value)} />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button disabled={submitting}
              className="w-full bg-[#1E3A8A] text-white rounded-lg py-3 font-bold hover:bg-[#1E3A8A]/90 disabled:opacity-60">
              {submitting ? "Verifying…" : `Verify & get instantly — Rs ${product.price}`}
            </button>
            <div className="flex items-center justify-center text-xs text-gray-500 gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1E3A8A]" /> Just paid? If it says “not found yet”, wait a few seconds and retry.
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
