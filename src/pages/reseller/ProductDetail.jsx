// src/pages/reseller/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useOutletContext, Link } from "react-router-dom";
import {
  getProduct, getResellerOffers, getPaymentMethods, getBinanceConfig,
  walletPurchase, accountCheckout,
} from "../../api/reseller";
import { useCurrency } from "../../context/CurrencyContext";
import GearLoader from "../../components/layout/GearLoader";

export default function ProductDetail() {
  const { currency, format } = useCurrency();
  const { id } = useParams();
  const { me, refresh } = useOutletContext();
  const [product, setProduct] = useState(null);
  const [offers, setOffers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [methods, setMethods] = useState([]);
  const [binance, setBinance] = useState({ enabled: false });
  const [binanceMode, setBinanceMode] = useState("binance");
  const paymentType = currency === "USD" ? binanceMode : "local";
  const [loading, setLoading] = useState(true);

  const [expandedOffer, setExpandedOffer] = useState(null);
  const [mode, setMode] = useState(null); // 'choose' | 'wallet' | 'account'
  const [trx, setTrx] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [delivered, setDelivered] = useState(null);

  useEffect(() => {
    Promise.all([getProduct(id), getResellerOffers(id), getPaymentMethods(), getBinanceConfig()])
      .then(([p, ofs, pm, bc]) => {
        setProduct(p); setOffers(ofs); setMethods(pm);
        setBinance(bc);
        if (!bc.wallet_enabled && bc.pay_id_enabled) setBinanceMode("binance_id");
        setSelected(ofs.find((o) => o.in_stock) || null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  function handleResult(order) {
    if (order.status === "completed") setDelivered(order.delivered_accounts || []);
    else setError(`Order ${order.status}. ${order.error_message || ""}`);
  }

  async function payWallet() {
    setBusy(true); setError("");
    try {
      const order = await walletPurchase({ product_id: product.id, offer_id: selected.offer_id });
      handleResult(order); await refresh();
    } catch (e) { setError(e.message); } finally { setBusy(false); }
  }

  async function payAccount(e) {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      const order = await accountCheckout({ product_id: product.id, offer_id: selected.offer_id, trx_id: trx.trim(), payment_type: paymentType });
      handleResult(order);
    } catch (e) { setError(e.message); } finally { setBusy(false); }
  }

  if (loading) return <div className="py-10 flex justify-center text-[#1E3A8A]"><GearLoader size="lg" /></div>;
  if (!product) return <div className="py-10 text-center">Product not found.</div>;

  return (
    <div>
      <Link to="/reseller/app/products" className="text-sm text-[#1E3A8A]">← Products</Link>

      <div className="bg-white border rounded-xl p-6 mt-3">
        <div className="flex flex-col sm:flex-row gap-6">
          {product.main_image && (
            <img src={product.main_image} alt={product.title} className="h-48 w-48 object-cover rounded-lg" />
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{product.title}</h1>

            {/* Offer selection */}
            <div className="mt-4 space-y-2">
              {offers.length === 0 && <p className="text-gray-500 text-sm">No options available.</p>}
              {offers.map((o) => {
                const isSel = selected?.offer_id === o.offer_id;
                const isOpen = expandedOffer === o.offer_id;
                return (
                  <div key={o.offer_id}
                    className={`rounded-lg border-2 p-3 transition ${
                      isSel ? "border-[#1E3A8A] bg-[#1E3A8A]/5" : "border-gray-200 hover:border-[#1E3A8A]/50"
                    } ${o.in_stock ? "" : "opacity-50"}`}>
                    <div
                      onClick={() => o.in_stock && setSelected(o)}
                      className={`flex items-center justify-between ${o.in_stock ? "cursor-pointer" : "cursor-not-allowed"}`}>
                      <div>
                        <div className="font-semibold">{o.label}</div>
                        <div className={`text-xs ${o.in_stock ? "text-green-600" : "text-red-500"}`}>
                          {o.in_stock ? "In stock" : "Out of stock"}
                        </div>
                      </div>
                      <div className="font-bold text-[#1E3A8A]">{format(o.price)}</div>
                    </div>
                    {o.short_description && (
                      <>
                        <button type="button"
                          onClick={(e) => { e.stopPropagation(); setExpandedOffer(isOpen ? null : o.offer_id); }}
                          className="mt-2 text-xs font-medium text-[#1E3A8A]">
                          {isOpen ? "▲ Hide details" : "▼ View details"}
                        </button>
                        {isOpen && (
                          <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">{o.short_description}</p>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {selected && !delivered && (
              <button onClick={() => setMode("choose")}
                className="mt-4 bg-[#1E3A8A] text-white px-6 py-2.5 rounded-lg font-semibold">
                Buy — {format(selected.price)}
              </button>
            )}
          </div>
        </div>

        {product.description && (
          <div className="prose max-w-none mt-6 text-gray-700"
            dangerouslySetInnerHTML={{ __html: product.description }} />
        )}
      </div>

      {delivered && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mt-5">
          <h3 className="font-semibold text-green-800 mb-2">Purchased — your account(s):</h3>
          {delivered.map((a, i) => (
            <div key={i} className="bg-white rounded p-3 mb-2 text-sm space-y-0.5">
              {a.details && Object.keys(a.details).length > 0 ? (
                Object.entries(a.details).map(([k, v]) => (
                  <div key={k}>{k}: {v}</div>
                ))
              ) : (
                <>
                  <div>User: {a.username}</div>
                  <div>Pass: {a.password}</div>
                  {a.verify_email && <div>Verify: {a.verify_email}</div>}
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {mode && !delivered && selected && (
        <div className="bg-white border rounded-xl p-5 mt-5">
          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

          {mode === "choose" && (
            <div className="grid sm:grid-cols-2 gap-3">
              <button onClick={() => setMode("wallet")}
                className="border-2 border-[#1E3A8A] rounded-lg p-4 text-left hover:bg-blue-50">
                <div className="font-semibold text-[#1E3A8A]">Pay via Wallet</div>
                <div className="text-sm text-gray-500">Balance: {format(me?.wallet_balance)}</div>
              </button>
              <button onClick={() => setMode("account")}
                className="border-2 border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50">
                <div className="font-semibold">Pay via Account</div>
                <div className="text-sm text-gray-500">Bank / JazzCash + TID</div>
              </button>
            </div>
          )}

          {mode === "wallet" && (
            <div>
              <p className="mb-3 text-sm">Pay <b>{format(selected.price)}</b> ({selected.label}) from wallet (balance {format(me?.wallet_balance)}).</p>
              <button disabled={busy} onClick={payWallet}
                className="bg-[#1E3A8A] text-white px-6 py-2.5 rounded-lg font-semibold disabled:opacity-60">
                {busy ? <GearLoader size="sm" label="Processing" /> : "Confirm wallet payment"}
              </button>
              <button onClick={() => setMode("choose")} className="ml-3 text-sm text-gray-500">Back</button>
            </div>
          )}

          {mode === "account" && (
            <form onSubmit={payAccount}>
              <div className="text-sm bg-gray-50 border rounded-lg p-2 mb-3">{currency === "USD" ? "International payment · Binance" : "Pakistan payment · Bank / wallet"}</div>
              {currency === "USD" && binance.wallet_enabled && binance.pay_id_enabled && <div className="flex gap-2 mb-3"><button type="button" onClick={() => setBinanceMode("binance")} className={`border rounded-lg px-3 py-2 text-sm ${binanceMode === "binance" ? "border-yellow-500 bg-yellow-50" : ""}`}>Wallet address</button><button type="button" onClick={() => setBinanceMode("binance_id")} className={`border rounded-lg px-3 py-2 text-sm ${binanceMode === "binance_id" ? "border-yellow-500 bg-yellow-50" : ""}`}>Binance ID</button></div>}
              <p className="text-sm mb-2">Send <b>{format(selected.price)}</b> to:</p>
              <div className="space-y-1 text-sm mb-3">
                {paymentType === "local" && methods.map((m) => (
                  <div key={m.id} className="flex items-center gap-2">
                    {m.icon && <img src={m.icon} alt="" className="h-5 w-5 object-contain" />}
                    <span className="font-medium">{m.name}:</span>
                    <span className="font-mono">{m.account_number}</span>
                  </div>
                ))}
                {paymentType === "binance" && binance.wallet_enabled && <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3"><div>Send <b>{(Math.ceil((Number(selected.price) / Number(binance.pkr_per_coin)) * 100) / 100).toFixed(2)} {binance.coin}</b> via <b>{binance.network}</b></div><div className="font-mono break-all mt-1">{binance.address}</div></div>}
                {paymentType === "binance_id" && binance.pay_id_enabled && <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3"><div>Send <b>{(Math.ceil((Number(selected.price) / Number(binance.pkr_per_coin)) * 100) / 100).toFixed(2)} {binance.coin}</b> to Binance ID</div><div className="font-mono mt-1">{binance.pay_id}</div></div>}
                {currency === "USD" && !binance.enabled && <p className="text-red-600">Binance is unavailable. Select PKR from the currency toggle.</p>}
              </div>
              <input className="w-full border rounded-lg px-3 py-2 mb-3" placeholder={paymentType === "binance_id" ? "Binance Pay Transaction ID" : paymentType === "binance" ? "Binance blockchain TxID" : "Enter Transaction ID (TID)"}
                value={trx} onChange={(e) => setTrx(e.target.value)} />
              <button disabled={busy}
                className="bg-[#1E3A8A] text-white px-6 py-2.5 rounded-lg font-semibold disabled:opacity-60">
                {busy ? <GearLoader size="sm" label="Verifying payment" /> : "Verify & buy"}
              </button>
              <button type="button" onClick={() => setMode("choose")} className="ml-3 text-sm text-gray-500">Back</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
