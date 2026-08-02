// src/pages/CheckoutPage.jsx — retail instant-pay checkout (login required)
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { ShieldCheck, Copy, CheckCircle2, ArrowRight } from "lucide-react";
import {
  isLoggedIn, getProduct, getRetailOffers, getPaymentMethods, getBinanceConfig, retailCheckout,
} from "../api/customer";
import { useCurrency } from "../context/CurrencyContext";
import GearLoader from "../components/layout/GearLoader";

export default function CheckoutPage() {
  const { currency, format } = useCurrency();
  const { id } = useParams();
  const nav = useNavigate();
  const [params] = useSearchParams();
  const productId = Number(id);
  const offerId = params.get("offer");
  const requestedPayment = params.get("payment");

  const [product, setProduct] = useState(null);
  const [offer, setOffer] = useState(null);
  const [methods, setMethods] = useState([]);
  const [binance, setBinance] = useState({ enabled: false });
  const [binanceMode, setBinanceMode] = useState("binance");
  const paymentType = requestedPayment === "local"
    ? "local"
    : requestedPayment === "binance"
      ? binanceMode
      : currency === "USD" ? binanceMode : "local";
  const [loading, setLoading] = useState(true);

  const [trx, setTrx] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) { nav(`/login?next=${encodeURIComponent(`/checkout/${productId}?offer=${offerId}`)}`); return; }
    Promise.all([getProduct(productId), getRetailOffers(productId), getPaymentMethods(), getBinanceConfig()])
      .then(([p, offers, pm, bc]) => {
        setProduct(p);
        setOffer(offers.find((o) => o.offer_id === offerId) || offers[0] || null);
        setMethods(pm);
        setBinance(bc);
        if (!bc.wallet_enabled && bc.pay_id_enabled) setBinanceMode("binance_id");
      })
      .finally(() => setLoading(false));
  }, [productId, offerId, nav]);

  async function submit(e) {
    e.preventDefault();
    setError(""); setResult(null);
    if (!offer) { setError("No plan selected."); return; }
    if (paymentType !== "local" && !binance.enabled) { setError("Binance payment is not available right now. Please select PKR."); return; }
    if (!trx.trim()) { setError("Please enter your Transaction ID (TID)."); return; }
    setSubmitting(true);
    try {
      const data = await retailCheckout({
        product_id: productId, offer_id: offer.offer_id, quantity: 1,
        trx_id: trx.trim(), customer_email: email.trim(), payment_type: paymentType,
      });
      setResult(data);
    } catch (err) { setError(err.message); }
    finally { setSubmitting(false); }
  }

  function copy(text, key) {
    navigator.clipboard?.writeText(text);
    setCopied(key); setTimeout(() => setCopied(""), 1500);
  }

  if (loading) return <div className="container mx-auto px-4 py-20 flex justify-center text-[#1E3A8A]"><GearLoader size="lg" /></div>;
  if (!product) return <div className="container mx-auto px-4 py-20 text-center">Product not found.</div>;

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <h1 className="text-3xl font-bold text-[#111827] mb-1">Checkout</h1>
      <p className="text-gray-600 mb-8">
        {product.title}{offer ? ` · ${offer.label}` : ""} —{" "}
        <span className="font-bold text-[#1E3A8A]">{format(offer?.price)}</span>
      </p>

      {/* Success */}
      {result && result.status === "completed" && (
        <div className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 text-green-700 font-semibold mb-4">
            <CheckCircle2 className="w-6 h-6" /> Payment verified — delivered!
          </div>
          {result.delivered_accounts?.map((a, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 mb-3 text-sm space-y-1">
              {a.details && Object.keys(a.details).length > 0 ? (
                Object.entries(a.details).map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center">
                    <span><span className="text-gray-500">{k}:</span> {v}</span>
                    <button onClick={() => copy(String(v), `${i}-${k}`)} className="text-gray-400 hover:text-[#1E3A8A]">
                      {copied === `${i}-${k}` ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <span><span className="text-gray-500">Username:</span> {a.username}</span>
                    <button onClick={() => copy(a.username, `u${i}`)} className="text-gray-400 hover:text-[#1E3A8A]">
                      {copied === `u${i}` ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span><span className="text-gray-500">Password:</span> {a.password}</span>
                    <button onClick={() => copy(a.password, `p${i}`)} className="text-gray-400 hover:text-[#1E3A8A]">
                      {copied === `p${i}` ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  {a.verify_email && <div><span className="text-gray-500">Verify:</span> {a.verify_email}</div>}
                </>
              )}
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
          <div className="mb-5 rounded-lg bg-gray-50 border p-3 text-sm">
            {paymentType !== "local" ? "International payment · Binance" : "Pakistan payment · Bank / wallet"}
          </div>
          {paymentType !== "local" && binance.wallet_enabled && binance.pay_id_enabled && (
            <div className="grid grid-cols-2 gap-2 mb-5">
              <button type="button" onClick={() => { setBinanceMode("binance"); setTrx(""); }} className={`rounded-lg border-2 p-3 text-sm font-semibold ${binanceMode === "binance" ? "border-yellow-500 bg-yellow-50" : "border-gray-200"}`}>Wallet address</button>
              <button type="button" onClick={() => { setBinanceMode("binance_id"); setTrx(""); }} className={`rounded-lg border-2 p-3 text-sm font-semibold ${binanceMode === "binance_id" ? "border-yellow-500 bg-yellow-50" : "border-gray-200"}`}>Binance ID</button>
            </div>
          )}
          {/* Step 1 */}
          <h2 className="font-semibold text-lg mb-3">1. Send payment</h2>
          <div className="space-y-2 mb-6">
            {paymentType === "local" && methods.length === 0 && <p className="text-gray-400 text-sm">No payment methods configured yet.</p>}
            {paymentType === "local" && methods.map((m) => (
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
            {paymentType === "binance" && binance.wallet_enabled && (
              <div className="border border-yellow-300 bg-yellow-50 rounded-lg p-4 text-sm space-y-1">
                <div className="font-bold">Binance deposit</div>
                <div>Send exactly <b>{(Math.ceil((Number(offer?.price || 0) / Number(binance.pkr_per_coin)) * 100) / 100).toFixed(2)} {binance.coin}</b></div>
                <div>Network: <b>{binance.network}</b></div>
                <div className="font-mono break-all">{binance.address}</div>
                <button type="button" onClick={() => copy(binance.address, "binance-address")} className="text-[#1E3A8A] font-semibold">
                  {copied === "binance-address" ? "Copied!" : "Copy address"}
                </button>
                <p className="text-red-600 text-xs pt-1">Use only {binance.coin} on {binance.network}. A wrong network can permanently lose funds.</p>
              </div>
            )}
            {paymentType === "binance_id" && binance.pay_id_enabled && (
              <div className="border border-yellow-300 bg-yellow-50 rounded-lg p-4 text-sm space-y-1">
                <div className="font-bold">Binance ID transfer</div>
                <div>Send exactly <b>{(Math.ceil((Number(offer?.price || 0) / Number(binance.pkr_per_coin)) * 100) / 100).toFixed(2)} {binance.coin}</b></div>
                <div>Binance ID: <b className="font-mono">{binance.pay_id}</b></div>
                <button type="button" onClick={() => copy(binance.pay_id, "binance-pay-id")} className="text-[#1E3A8A] font-semibold">{copied === "binance-pay-id" ? "Copied!" : "Copy Binance ID"}</button>
                <p className="text-xs text-gray-600 pt-1">After payment, copy the Transaction ID from Binance Pay history and enter it below.</p>
              </div>
            )}
            {paymentType !== "local" && !binance.enabled && <p className="text-red-600 text-sm">Binance payment is currently unavailable. Select PKR from the navbar.</p>}
          </div>

          {/* Step 2 */}
          <h2 className="font-semibold text-lg mb-3">2. Verify your payment</h2>
          <form onSubmit={submit} className="space-y-3">
            <input className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#1E3A8A]/30 outline-none"
              placeholder={paymentType === "binance_id" ? "Binance Pay Transaction ID" : paymentType === "binance" ? "Binance blockchain TxID" : "Transaction ID (TID)"} value={trx} onChange={(e) => setTrx(e.target.value)} />
            <input className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#1E3A8A]/30 outline-none"
              type="email" placeholder="Email (optional, for delivery)" value={email} onChange={(e) => setEmail(e.target.value)} />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button disabled={submitting}
              className="w-full bg-[#1E3A8A] text-white rounded-lg py-3 font-bold hover:bg-[#1E3A8A]/90 disabled:opacity-60">
              {submitting ? <GearLoader size="sm" label="Verifying payment" /> : `Verify & get instantly — ${format(offer?.price)}`}
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
