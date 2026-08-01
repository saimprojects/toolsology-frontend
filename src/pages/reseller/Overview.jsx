// src/pages/reseller/Overview.jsx
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getPaymentMethods, topupWallet, getTransactions } from "../../api/reseller";

export default function Overview() {
  const { me, refresh } = useOutletContext();
  const [methods, setMethods] = useState([]);
  const [txns, setTxns] = useState([]);
  const [trx, setTrx] = useState("");
  const [msg, setMsg] = useState(null);

  async function load() {
    const [pm, t] = await Promise.all([getPaymentMethods(), getTransactions()]);
    setMethods(pm); setTxns(t);
  }
  useEffect(() => { load(); }, []);

  async function doTopup(e) {
    e.preventDefault();
    setMsg(null);
    try {
      await topupWallet(trx.trim());
      setTrx("");
      setMsg({ ok: true, text: "Wallet topped up!" });
      await refresh(); await load();
    } catch (err) {
      setMsg({ ok: false, text: err.message });
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Overview</h1>

      <div className="bg-[#1E3A8A] text-white rounded-xl p-6 mb-6">
        <div className="text-sm opacity-80">Wallet balance</div>
        <div className="text-3xl font-bold">Rs {me?.wallet_balance}</div>
        <div className="text-sm mt-1">
          {me?.can_operate ? "✓ Panel active" : `Deposit Rs ${me?.min_deposit} to activate`}
        </div>
      </div>

      {msg && (
        <div className={`rounded-lg p-3 mb-4 text-sm ${msg.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {msg.text}
        </div>
      )}

      <div className="bg-white border rounded-xl p-5 mb-6">
        <h2 className="font-semibold mb-3">Add funds</h2>
        <div className="space-y-1.5 mb-3 text-sm">
          {methods.map((m) => (
            <div key={m.id} className="flex items-center gap-2">
              {m.icon && <img src={m.icon} alt="" className="h-5 w-5 object-contain" />}
              <span className="font-medium">{m.name}:</span>
              <span className="font-mono">{m.account_number}</span>
              <span className="text-gray-500">({m.account_title})</span>
            </div>
          ))}
          {methods.length === 0 && <p className="text-gray-400">No payment methods yet.</p>}
        </div>
        <form onSubmit={doTopup} className="flex gap-2">
          <input className="flex-1 border rounded-lg px-3 py-2" placeholder="Transaction ID (TID)"
            value={trx} onChange={(e) => setTrx(e.target.value)} />
          <button className="bg-[#1E3A8A] text-white px-5 rounded-lg font-semibold">Verify & add</button>
        </form>
      </div>

      <div className="bg-white border rounded-xl p-5">
        <h2 className="font-semibold mb-3">Recent transactions</h2>
        <div className="divide-y">
          {txns.length === 0 && <p className="text-gray-400 text-sm py-2">No transactions yet.</p>}
          {txns.map((t) => (
            <div key={t.id} className="py-2 flex justify-between text-sm">
              <span className="capitalize">{t.kind} <span className="text-gray-400">{t.note}</span></span>
              <span className={Number(t.amount) < 0 ? "text-red-600" : "text-green-600"}>
                {Number(t.amount) < 0 ? "" : "+"}{t.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
