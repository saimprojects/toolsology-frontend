// src/pages/CheckoutPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getPaymentMethods,
  getStoreProducts,
  retailCheckout,
} from "../api/api";

export default function CheckoutPage() {
  const { id } = useParams();
  const productId = Number(id);

  const [methods, setMethods] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [trxId, setTrxId] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [pm, products] = await Promise.all([
        getPaymentMethods(),
        getStoreProducts(),
      ]);
      if (!alive) return;
      setMethods(pm);
      setProduct(products.find((p) => Number(p.id) === productId) || null);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [productId]);

  // Stable idempotency key per (product, trx) so retries don't double-charge.
  const idempotencyKey = useMemo(
    () => `${productId}-${trxId.trim().toUpperCase()}`,
    [productId, trxId]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);
    if (!trxId.trim()) {
      setError("Please enter your Transaction ID (TID).");
      return;
    }
    setSubmitting(true);
    try {
      const data = await retailCheckout({
        product_id: productId,
        quantity: 1,
        trx_id: trxId.trim(),
        customer_email: email.trim(),
        idempotency_key: idempotencyKey,
      });
      setResult(data);
    } catch (err) {
      setError(err.message || "Verification failed.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <div className="max-w-2xl mx-auto p-8 text-center">Loading…</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-1">Checkout</h1>
      {product && (
        <p className="text-gray-600 mb-6">
          {product.title} —{" "}
          <span className="font-semibold text-gray-900">Rs {product.price}</span>
        </p>
      )}

      {/* Success */}
      {result && result.status === "completed" && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-5 mb-6">
          <h2 className="font-semibold text-green-800 mb-3">
            Payment verified — your account(s):
          </h2>
          {result.delivered_accounts?.map((a, i) => (
            <div key={i} className="bg-white rounded p-3 mb-2 text-sm">
              <div><span className="text-gray-500">Username:</span> {a.username}</div>
              <div><span className="text-gray-500">Password:</span> {a.password}</div>
              {a.verify_email && (
                <div><span className="text-gray-500">Verify email:</span> {a.verify_email}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Non-completed order states (needs review / failed) */}
      {result && result.status !== "completed" && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-5 mb-6 text-yellow-800">
          Payment received, but the order is <b>{result.status}</b>. Please contact
          support with order #{result.id}. {result.error_message}
        </div>
      )}

      {!result && (
        <>
          {/* Where to pay */}
          <div className="mb-6">
            <h2 className="font-semibold mb-3">1. Send payment to:</h2>
            <div className="space-y-3">
              {methods.length === 0 && (
                <p className="text-gray-500 text-sm">No payment methods configured yet.</p>
              )}
              {methods.map((m) => (
                <div key={m.id} className="flex items-center gap-3 border rounded-lg p-3">
                  {m.icon && (
                    <img src={m.icon} alt={m.name} className="h-8 w-8 object-contain" />
                  )}
                  <div className="text-sm">
                    <div className="font-semibold">{m.name}</div>
                    <div className="text-gray-700">{m.account_title}</div>
                    <div className="text-gray-900 font-mono">{m.account_number}</div>
                    {m.instructions && (
                      <div className="text-gray-500 mt-1">{m.instructions}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verify form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="font-semibold">2. Enter your Transaction ID (TID):</h2>
            <input
              type="text"
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              placeholder="e.g. 1234567890"
              className="w-full border rounded-lg px-3 py-2"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional, for delivery)"
              className="w-full border rounded-lg px-3 py-2"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white rounded-lg py-2.5 font-semibold disabled:opacity-60"
            >
              {submitting ? "Verifying…" : "Verify payment & get account"}
            </button>
            <p className="text-xs text-gray-500">
              Just paid? If it says “not found yet”, wait a few seconds and try again.
            </p>
          </form>
        </>
      )}

      <div className="mt-8">
        <Link to="/products" className="text-blue-600 text-sm">← Back to products</Link>
      </div>
    </div>
  );
}
