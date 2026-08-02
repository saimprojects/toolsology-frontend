// src/pages/reseller/Orders.jsx
import React, { useEffect, useState } from "react";
import { getOrders } from "../../api/reseller";
import { useCurrency } from "../../context/CurrencyContext";

const badge = {
  completed: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
  needs_review: "bg-yellow-100 text-yellow-700",
  pending: "bg-gray-100 text-gray-600",
};

export default function Orders() {
  const { format } = useCurrency();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    getOrders().then(setOrders).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-10 text-center">Loading…</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <div className="bg-white border rounded-xl divide-y">
        {orders.length === 0 && <div className="p-5 text-gray-500 text-sm">No orders yet.</div>}
        {orders.map((o) => (
          <div key={o.id} className="p-4">
            <div className="flex items-center justify-between cursor-pointer"
              onClick={() => setOpenId(openId === o.id ? null : o.id)}>
              <div>
                <div className="font-semibold">{o.product_title}</div>
                <div className="text-xs text-gray-500">
                  #{o.id} · {format(o.sell_amount_pkr)} · {new Date(o.created_at).toLocaleString()}
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${badge[o.status] || ""}`}>
                {o.status}
              </span>
            </div>
            {openId === o.id && o.delivered_accounts?.length > 0 && (
              <div className="mt-3 space-y-2">
                {o.delivered_accounts.map((a, i) => (
                  <div key={i} className="bg-gray-50 rounded p-2 text-sm space-y-0.5">
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
            {openId === o.id && o.error_message && (
              <p className="mt-2 text-sm text-red-600">{o.error_message}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
