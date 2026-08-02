import React, { useEffect, useState } from "react";
import { Check, Code2, Copy, KeyRound, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { createDeveloperKey, getDeveloperKeys, revokeDeveloperKey } from "../../api/reseller";

const base = "https://www.toolsology.shop/api/reseller/api/v1";

export default function Developer() {
  const [keys, setKeys] = useState([]);
  const [revealed, setRevealed] = useState("");
  const [copied, setCopied] = useState("");
  const load = () => getDeveloperKeys().then(setKeys);
  useEffect(() => { load(); }, []);
  async function create() { const data = await createDeveloperKey(`Key ${keys.length + 1}`); setRevealed(data.api_key); await load(); }
  async function revoke(id) { if (!window.confirm("Revoke this API key?")) return; await revokeDeveloperKey(id); await load(); }
  function copy(value, id) { navigator.clipboard.writeText(value); setCopied(id); setTimeout(() => setCopied(""), 1500); }
  return <div className="space-y-7">
    <div className="bg-black text-white rounded-[2rem] p-7 sm:p-10"><div className="flex items-center gap-2 text-zinc-400 text-sm"><Code2 className="w-4 h-4"/> Developer platform</div><h1 className="text-4xl sm:text-6xl font-black tracking-[-.05em] mt-4">Build on Toolsology.</h1><p className="text-zinc-400 mt-4 max-w-2xl">Sell from your own website while Toolsology handles wallet billing and automated fulfilment.</p></div>
    <section className="bg-white border border-zinc-200 rounded-3xl p-6"><div className="flex items-center justify-between"><div><h2 className="text-xl font-bold">API keys</h2><p className="text-sm text-zinc-500">Keys are shown only once. Keep them server-side.</p></div><button onClick={create} className="inline-flex items-center gap-2 bg-black text-white rounded-full px-5 py-2.5 font-semibold"><Plus className="w-4 h-4"/>Create key</button></div>
      {revealed && <div className="mt-5 rounded-2xl bg-zinc-950 text-white p-5"><div className="text-xs text-zinc-400 mb-2">Copy this key now</div><div className="flex items-center gap-3"><code className="break-all flex-1 text-sm">{revealed}</code><button onClick={() => copy(revealed, "new")}>{copied === "new" ? <Check/> : <Copy/>}</button></div></div>}
      <div className="divide-y mt-5">{keys.map((key) => <div key={key.id} className="py-4 flex items-center gap-4"><KeyRound className="w-5 h-5"/><div className="flex-1"><b>{key.name}</b><div className="text-sm text-zinc-500 font-mono">{key.prefix}••••••••</div></div><span className={`text-xs rounded-full px-3 py-1 ${key.is_active ? "bg-green-50 text-green-700" : "bg-zinc-100 text-zinc-500"}`}>{key.is_active ? "Active" : "Revoked"}</span>{key.is_active && <button onClick={() => revoke(key.id)} className="p-2 text-zinc-400 hover:text-red-600"><Trash2 className="w-4 h-4"/></button>}</div>)}</div>
    </section>
    <section className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8"><div className="flex gap-3"><ShieldCheck/><div><h2 className="text-2xl font-bold">Quick start</h2><p className="text-zinc-500">Send your API key in the <code>X-API-Key</code> header and a unique <code>Idempotency-Key</code> when purchasing.</p></div></div>
      <div className="mt-7 space-y-6">
        <Endpoint method="GET" path="/products/" description="List reseller products, slugs, stock and PKR prices." />
        <Endpoint method="POST" path="/purchase/" description="Purchase using your reseller wallet." body={'{\n  "product_slug": "chatgpt-plus",\n  "offer_id": "bot-12",\n  "quantity": 1,\n  "customer_email": "buyer@example.com"\n}'} />
        <Endpoint method="GET" path="/orders/" description="Retrieve your latest 100 API and panel orders." />
      </div>
    </section>
  </div>;
}

function Endpoint({ method, path, description, body }) {
  return <div className="border border-zinc-200 rounded-2xl overflow-hidden"><div className="flex items-center gap-3 p-4 bg-zinc-50"><span className="text-xs font-black bg-black text-white rounded px-2 py-1">{method}</span><code className="text-sm break-all">{base}{path}</code></div><div className="p-4"><p className="text-sm text-zinc-600">{description}</p>{body && <pre className="mt-4 bg-black text-zinc-200 rounded-xl p-4 overflow-x-auto text-xs">{body}</pre>}</div></div>;
}
