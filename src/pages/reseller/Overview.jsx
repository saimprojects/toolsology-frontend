// src/pages/reseller/Overview.jsx
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getPaymentMethods, getBinanceConfig, topupWallet, getTransactions } from "../../api/reseller";
import { useCurrency } from "../../context/CurrencyContext";
import GearLoader from "../../components/layout/GearLoader";
import { Lock, ArrowUp } from "lucide-react";

export default function Overview() {
  const { format } = useCurrency();
  const { me, refresh } = useOutletContext();
  const [methods, setMethods] = useState([]);
  const [txns, setTxns] = useState([]);
  const [trx, setTrx] = useState("");
  const [binance, setBinance] = useState({ enabled: false });
  const [binanceMode, setBinanceMode] = useState("binance");
  const [paymentChannel, setPaymentChannel] = useState("local");
  const paymentType = paymentChannel === "local" ? "local" : binanceMode;
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const minDeposit = Number(me?.min_deposit || 0);
  const walletBalance = Number(me?.wallet_balance || 0);
  const remainingDeposit = Math.max(0, minDeposit - walletBalance);

  async function load() {
    const [pm, t, bc] = await Promise.all([getPaymentMethods(), getTransactions(), getBinanceConfig()]);
    setMethods(pm); setTxns(t); setBinance(bc);
    if (!bc.wallet_enabled && bc.pay_id_enabled) setBinanceMode("binance_id");
  }
  useEffect(() => { load(); }, []);

  async function doTopup(e) {
    e.preventDefault();
    setMsg(null);
    if (busy) return;
    setBusy(true);
    try {
      await topupWallet(trx.trim(), paymentType);
      setTrx("");
      setMsg({ ok: true, text: "Wallet topped up!" });
      await refresh(); await load();
    } catch (err) {
      setMsg({ ok: false, text: err.message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Overview</h1>

      <div className="bg-[#1E3A8A] text-white rounded-xl p-6 mb-6">
        <div className="text-sm opacity-80">Wallet balance</div>
        <div className="text-3xl font-bold">{format(me?.wallet_balance)}</div>
        <div className="text-sm mt-1">
          {me?.can_operate ? "✓ Panel active" : `Deposit ${format(me?.min_deposit)} to activate`}
        </div>
      </div>

      {msg && (
        <div className={`rounded-lg p-3 mb-4 text-sm ${msg.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {msg.text}
        </div>
      )}

      <div className="bg-white border rounded-xl p-5 mb-6">
        <h2 className="font-semibold mb-3">Add funds</h2>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button type="button" onClick={() => setPaymentChannel("local")} className={`rounded-xl border-2 p-3 text-left font-semibold ${paymentChannel === "local" ? "border-black bg-black text-white" : "border-zinc-200"}`}>Pakistani banks<span className="block text-xs font-normal opacity-70">Bank, JazzCash & wallet</span></button>
          <button type="button" onClick={() => setPaymentChannel("binance")} className={`rounded-xl border-2 p-3 text-left font-semibold ${paymentChannel === "binance" ? "border-black bg-black text-white" : "border-zinc-200"}`}>Binance<span className="block text-xs font-normal opacity-70">International payment</span></button>
        </div>
        {paymentChannel === "binance" && binance.wallet_enabled && binance.pay_id_enabled && <div className="flex gap-2 mb-3"><button type="button" onClick={() => setBinanceMode("binance")} className={`border rounded-lg px-3 py-2 text-sm ${binanceMode === "binance" ? "border-yellow-500 bg-yellow-50 text-black" : ""}`}>Wallet address</button><button type="button" onClick={() => setBinanceMode("binance_id")} className={`border rounded-lg px-3 py-2 text-sm ${binanceMode === "binance_id" ? "border-yellow-500 bg-yellow-50 text-black" : ""}`}>Binance ID</button></div>}
        <div className="space-y-1.5 mb-3 text-sm">
          {paymentType === "local" && methods.map((m) => (
            <div key={m.id} className="flex items-center gap-2">
              {m.icon && <img src={m.icon} alt="" className="h-5 w-5 object-contain" />}
              <span className="font-medium">{m.name}:</span>
              <span className="font-mono">{m.account_number}</span>
              <span className="text-gray-500">({m.account_title})</span>
            </div>
          ))}
          {paymentType === "local" && methods.length === 0 && <p className="text-gray-400">No payment methods yet.</p>}
          {paymentType === "binance" && binance.wallet_enabled && <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3"><b>{binance.coin} · {binance.network}</b><div className="font-mono break-all">{binance.address}</div><div className="text-gray-500 mt-1">Wallet credit rate: {format(binance.pkr_per_coin)} per {binance.coin}</div></div>}
          {paymentType === "binance_id" && binance.pay_id_enabled && <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3"><b>Binance ID · {binance.coin}</b><div className="font-mono">{binance.pay_id}</div><div className="text-gray-500 mt-1">Enter the Binance Pay Transaction ID after sending.</div></div>}
          {paymentChannel === "binance" && !binance.enabled && <p className="text-red-600">Binance is currently unavailable.</p>}
        </div>
        <form onSubmit={doTopup} className="flex gap-2">
          <input className="flex-1 border rounded-lg px-3 py-2" placeholder={paymentType === "binance_id" ? "Binance Pay Transaction ID" : paymentType === "binance" ? "Binance blockchain TxID" : "Transaction ID (TID)"}
            value={trx} onChange={(e) => setTrx(e.target.value)} />
          <button disabled={busy} className="bg-[#1E3A8A] text-white px-5 rounded-lg font-semibold disabled:opacity-60 min-w-32">
            {busy ? <GearLoader size="sm" label="Verifying" /> : "Verify & add"}
          </button>
        </form>
      </div>

      {!me?.can_operate ? (
        <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-black text-white">
            <Lock className="h-9 w-9" />
          </div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-zinc-400">Reseller panel locked</p>
          <h2 className="text-3xl font-bold tracking-tight text-black">Deposit {format(me?.min_deposit)} to activate</h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-500">Products, orders, settings and API access unlock automatically as soon as your verified wallet deposits reach <b className="text-black">{format(me?.min_deposit)}</b>.</p>
          {walletBalance > 0 && <p className="mt-3 text-sm font-semibold text-black">Remaining to unlock: {format(remainingDeposit)}</p>}
          <button type="button" onClick={() => window.scrollTo({ top: 260, behavior: "smooth" })} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-bold text-white hover:bg-zinc-800"><ArrowUp className="h-4 w-4" /> Deposit now</button>
        </div>
      ) : (
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
      )}
    </div>
  );
}
