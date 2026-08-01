// src/pages/reseller/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useOutletContext, Link } from "react-router-dom";
import {
  getResellerProduct, getPaymentMethods, walletPurchase, accountCheckout,
} from "../../api/reseller";

export default function ProductDetail() {
  const { id } = useParams();
  const { me, refresh } = useOutletContext();
  const [product, setProduct] = useState(null);
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [mode, setMode] = useState(null); // 'choose' | 'wallet' | 'account'
  const [trx, setTrx] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [delivered, setDelivered] = useState(null);

  useEffect(() => {
    Promise.all([getResellerProduct(id), getPaymentMethods()])
      .then(([p, pm]) => { setProduct(p); setMethods(pm); })
      .finally(() => setLoading(false));
  }, [id]);

  function handleResult(order) {
    if (order.status === "completed") {
      setDelivered(order.delivered_accounts || []);
    } else {
      setError(`Order ${order.status}. ${order.error_message || ""}`);
    }
  }

  async function payWallet() {
    setBusy(true); setError("");
    try {
      const order = await walletPurchase({ product_id: product.id });
      handleResult(order);
      await refresh();
    } catch (e) { setError(e.message); } finally { setBusy(false); }
  }

  async function payAccount(e) {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      const order = await accountCheckout({ product_id: product.id, trx_id: trx.trim() });
      handleResult(order);
    } catch (e) { setError(e.message); } finally { setBusy(false); }
  }

  if (loading) return <div className="py-10 text-center">Loading…</div>;
  if (!product) return <div className="py-10 text-center">Product not found.</div>;

  return (
    <div>
      <Link to="/reseller/app/products" className="text-sm text-[#1E3A8A]">← Products</Link>

      <div className="bg-white border rounded-xl p-6 mt-3">
        <div className="flex flex-col sm:flex-row gap-6">
          {product.main_image && (
            <img src={product.main_image} alt={product.title}
              className="h-48 w-48 object-cover rounded-lg" />
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <div className="text-2xl font-bold text-[#1E3A8A] mt-1">Rs {product.price}</div>
            <div className={`text-sm mt-1 ${product.in_stock ? "text-green-600" : "text-red-500"}`}>
              {product.in_stock ? "✓ In stock" : "Out of stock"}
            </div>

            {!delivered && (
              <button
                disabled={!product.in_stock}
                onClick={() => setMode("choose")}
                className="mt-4 bg-[#1E3A8A] text-white px-6 py-2.5 rounded-lg font-semibold disabled:opacity-40"
              >
                Buy Now
              </button>
            )}
          </div>
        </div>

        {product.description && (
          <div className="prose max-w-none mt-6 text-gray-700"
            dangerouslySetInnerHTML={{ __html: product.description }} />
        )}
      </div>

      {/* Delivered */}
      {delivered && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mt-5">
          <h3 className="font-semibold text-green-800 mb-2">Purchased — your account(s):</h3>
          {delivered.map((a, i) => (
            <div key={i} className="bg-white rounded p-3 mb-2 text-sm">
              <div>User: {a.username}</div>
              <div>Pass: {a.password}</div>
              {a.verify_email && <div>Verify: {a.verify_email}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Checkout choice */}
      {mode && !delivered && (
        <div className="bg-white border rounded-xl p-5 mt-5">
          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

          {mode === "choose" && (
            <div className="grid sm:grid-cols-2 gap-3">
              <button onClick={() => setMode("wallet")}
                className="border-2 border-[#1E3A8A] rounded-lg p-4 text-left hover:bg-blue-50">
                <div className="font-semibold text-[#1E3A8A]">Pay via Wallet</div>
                <div className="text-sm text-gray-500">Balance: Rs {me?.wallet_balance}</div>
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
              <p className="mb-3 text-sm">Pay <b>Rs {product.price}</b> from your wallet (balance Rs {me?.wallet_balance}).</p>
              <button disabled={busy} onClick={payWallet}
                className="bg-[#1E3A8A] text-white px-6 py-2.5 rounded-lg font-semibold disabled:opacity-60">
                {busy ? "Processing…" : "Confirm wallet payment"}
              </button>
              <button onClick={() => setMode("choose")} className="ml-3 text-sm text-gray-500">Back</button>
            </div>
          )}

          {mode === "account" && (
            <form onSubmit={payAccount}>
              <p className="text-sm mb-2">Send <b>Rs {product.price}</b> to:</p>
              <div className="space-y-1 text-sm mb-3">
                {methods.map((m) => (
                  <div key={m.id} className="flex items-center gap-2">
                    {m.icon && <img src={m.icon} alt="" className="h-5 w-5 object-contain" />}
                    <span className="font-medium">{m.name}:</span>
                    <span className="font-mono">{m.account_number}</span>
                  </div>
                ))}
              </div>
              <input className="w-full border rounded-lg px-3 py-2 mb-3" placeholder="Enter Transaction ID (TID)"
                value={trx} onChange={(e) => setTrx(e.target.value)} />
              <button disabled={busy}
                className="bg-[#1E3A8A] text-white px-6 py-2.5 rounded-lg font-semibold disabled:opacity-60">
                {busy ? "Verifying…" : "Verify & buy"}
              </button>
              <button type="button" onClick={() => setMode("choose")} className="ml-3 text-sm text-gray-500">Back</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
