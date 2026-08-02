import React, { useEffect, useState } from "react";
import { AlertTriangle, BookOpen, Check, Code2, Copy, KeyRound, Lock, Plus, RefreshCw, ShieldCheck, Trash2, Wallet } from "lucide-react";
import { createDeveloperKey, getDeveloperKeys, revokeDeveloperKey } from "../../api/reseller";

const base = "https://www.toolsology.shop/api/reseller/api/v1";
const curlHeaders = `-H "X-API-Key: tsk_live_YOUR_KEY"\\
  -H "Accept: application/json"`;

export default function Developer() {
  const [keys, setKeys] = useState([]);
  const [revealed, setRevealed] = useState("");
  const [copied, setCopied] = useState("");
  const [keyBusy, setKeyBusy] = useState(false);
  const load = () => getDeveloperKeys().then(setKeys);
  useEffect(() => { load(); }, []);

  async function create() { setKeyBusy(true); try { const data = await createDeveloperKey(`Key ${keys.length + 1}`); setRevealed(data.api_key); await load(); } finally { setKeyBusy(false); } }
  async function revoke(id) { if (!window.confirm("Revoke this API key? Applications using it will stop immediately.")) return; await revokeDeveloperKey(id); await load(); }
  function copy(value, id) { navigator.clipboard.writeText(value); setCopied(id); setTimeout(() => setCopied(""), 1500); }

  return <div className="space-y-7 pb-16">
    <div className="rounded-[2rem] bg-black p-7 text-white sm:p-10">
      <div className="flex items-center gap-2 text-sm text-zinc-400"><Code2 className="h-4 w-4"/> Developer platform</div>
      <h1 className="mt-4 text-4xl font-black tracking-[-.05em] sm:text-6xl">Reseller API guide.</h1>
      <p className="mt-4 max-w-3xl text-zinc-400">Connect your website, app or order system to Toolsology. Your server sends an order, your reseller wallet is charged and available credentials are returned automatically.</p>
      <div className="mt-7 flex flex-wrap gap-2 text-xs"><Badge>REST + JSON</Badge><Badge>Same-domain HTTPS</Badge><Badge>Wallet billing</Badge><Badge>Idempotent purchases</Badge></div>
    </div>

    <Section icon={KeyRound} title="1. Create and protect an API key" subtitle="An active reseller panel is required. You can keep up to three active keys.">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-2xl text-sm text-zinc-600">The complete secret is shown once only. Copy it immediately and store it in your server's environment variables—not frontend JavaScript, React, browser storage, GitHub or screenshots.</p><button disabled={keyBusy} onClick={create} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-5 py-2.5 font-semibold text-white disabled:opacity-60"><Plus className="h-4 w-4"/>{keyBusy ? "Creating..." : "Create key"}</button></div>
      {revealed && <div className="mt-5 rounded-2xl bg-zinc-950 p-5 text-white"><div className="mb-2 text-xs text-zinc-400">Copy this secret now—it cannot be revealed again.</div><div className="flex items-center gap-3"><code className="flex-1 break-all text-sm">{revealed}</code><CopyButton value={revealed} id="new" copied={copied} copy={copy}/></div></div>}
      <div className="mt-5 divide-y">{keys.length === 0 && <p className="py-5 text-sm text-zinc-500">No API keys yet.</p>}{keys.map((key) => <div key={key.id} className="flex items-center gap-4 py-4"><KeyRound className="h-5 w-5"/><div className="flex-1"><b>{key.name}</b><div className="font-mono text-sm text-zinc-500">{key.prefix}••••••••</div><div className="mt-1 text-xs text-zinc-400">Last used: {key.last_used_at ? new Date(key.last_used_at).toLocaleString() : "Never"}</div></div><span className={`rounded-full px-3 py-1 text-xs ${key.is_active ? "bg-green-50 text-green-700" : "bg-zinc-100 text-zinc-500"}`}>{key.is_active ? "Active" : "Revoked"}</span>{key.is_active && <button onClick={() => revoke(key.id)} className="p-2 text-zinc-400 hover:text-red-600" aria-label="Revoke key"><Trash2 className="h-4 w-4"/></button>}</div>)}</div>
    </Section>

    <Section icon={ShieldCheck} title="2. Authentication" subtitle="Every API request must be sent from your backend server.">
      <InfoGrid items={[["Base URL", base],["Authentication header", "X-API-Key: tsk_live_YOUR_KEY"],["Request format", "application/json"],["Money", "PKR decimal strings"]]} />
      <CodeBlock id="auth" copied={copied} copy={copy} code={`curl "${base}/products/" \\\n+  ${curlHeaders}`} />
      <Callout icon={Lock}>Never use this key inside browser-side fetch calls. Create a private endpoint on your own backend and call Toolsology from there.</Callout>
    </Section>

    <Section icon={BookOpen} title="3. Complete integration flow" subtitle="Always follow these four steps in order.">
      <ol className="grid gap-3 sm:grid-cols-4">{[["01","List products"],["02","Fetch live offers"],["03","Create purchase"],["04","Store/poll order"]].map(([n,t]) => <li key={n} className="rounded-2xl border border-zinc-200 p-4"><div className="text-xs font-black text-zinc-400">{n}</div><div className="mt-2 font-bold">{t}</div></li>)}</ol>
      <p className="mt-5 text-sm leading-6 text-zinc-600">Do not hard-code product IDs, prices or offer IDs. Product slugs are stable, but offer IDs, prices and stock can change. Fetch offers immediately before creating a purchase.</p>
    </Section>

    <Section title="4. API endpoints" subtitle="All endpoints below require X-API-Key.">
      <div className="space-y-6">
        <Endpoint method="GET" path="/products/" title="List reseller products" description="Returns active products with stable slug, current starting reseller price and stock state. Use the slug for the next request."
          request={`curl "${base}/products/" \\\n+  ${curlHeaders}`}
          response={`{
  "data": [
    {
      "id": 12,
      "slug": "chatgpt-plus",
      "name": "ChatGPT Plus",
      "price_pkr": "2261.00",
      "in_stock": true
    }
  ]
}`} copied={copied} copy={copy}/>

        <Endpoint method="GET" path="/products/{slug}/offers/" title="Get live plans/offers" description="Required before purchase. Select an in-stock offer_id. Slot products also return supported slot durations."
          request={`curl "${base}/products/chatgpt-plus/offers/" \\\n+  ${curlHeaders}`}
          response={`{
  "product": {"slug": "chatgpt-plus", "name": "ChatGPT Plus"},
  "data": [
    {
      "offer_id": "bot-12",
      "label": "1 Month Private Account",
      "description": "Full warranty",
      "price_pkr": "2261.00",
      "in_stock": true,
      "is_slot": false,
      "slot_durations": []
    }
  ]
}`} copied={copied} copy={copy}/>

        <Endpoint method="POST" path="/purchase/" title="Purchase from reseller wallet" description="Charges the current reseller price from your wallet and fulfils the exact selected offer. Send a new Idempotency-Key for each logical customer order."
          request={`curl -X POST "${base}/purchase/" \\\n+  ${curlHeaders} \\\n+  -H "Content-Type: application/json" \\\n+  -H "Idempotency-Key: order_yourshop_100045" \\\n+  -d '{
    "product_slug": "chatgpt-plus",
    "offer_id": "bot-12",
    "quantity": 1,
    "customer_email": "buyer@example.com"
  }'`}
          response={`{
  "id": 845,
  "status": "completed",
  "source": "bot",
  "quantity": 1,
  "sell_amount_pkr": "2261.00",
  "canboso_order_code": "...",
  "error_message": "",
  "delivered_accounts": [
    {
      "username": "customer@example.com",
      "password": "delivered-password",
      "verify_email": "",
      "details": {"Email": "customer@example.com", "Password": "delivered-password"},
      "delivered_at": "2026-08-02T12:00:00Z"
    }
  ]
}`} copied={copied} copy={copy}/>

        <Endpoint method="GET" path="/orders/" title="Retrieve latest 100 orders" description="Use for reconciliation and recovery if your server missed the original purchase response. Completed orders include delivered credentials."
          request={`curl "${base}/orders/" \\\n+  ${curlHeaders}`}
          response={`{
  "data": [
    {
      "id": 845,
      "product": "ChatGPT Plus",
      "product_slug": "chatgpt-plus",
      "status": "completed",
      "quantity": 1,
      "amount_pkr": "2261.00",
      "error_message": "",
      "delivered_accounts": [...],
      "created_at": "2026-08-02T12:00:00Z"
    }
  ]
}`} copied={copied} copy={copy}/>
      </div>
    </Section>

    <Section icon={RefreshCw} title="5. Idempotency and safe retries" subtitle="This prevents accidental double charging.">
      <div className="space-y-3 text-sm leading-6 text-zinc-600"><p>Generate one unique <code>Idempotency-Key</code> for each order in your system, for example <code>order_myshop_100045</code>. Save it before calling the API.</p><p>If the request times out, retry with the <b>same key</b>. Toolsology returns the existing order instead of charging twice. Never reuse that key for a different customer order.</p></div>
      <CodeBlock id="uuid" copied={copied} copy={copy} code={`// Node.js
const idempotencyKey = "order_" + yourOrderId;

// PHP
$idempotencyKey = "order_" . $yourOrderId;`} />
    </Section>

    <Section icon={Wallet} title="6. Wallet, pricing and stock rules" subtitle="Important behaviour for your storefront.">
      <ul className="grid gap-3 sm:grid-cols-2">{["All API prices are reseller prices in PKR.","The wallet must cover the complete order total.","Use price_pkr returned by the live offers endpoint.","Only purchase offers where in_stock is true.","Your panel must remain activated.","Promo codes do not apply to reseller API orders."].map(item => <li key={item} className="flex gap-3 rounded-xl bg-zinc-50 p-4 text-sm"><Check className="h-4 w-4 shrink-0"/>{item}</li>)}</ul>
    </Section>

    <Section icon={AlertTriangle} title="7. Statuses and error handling" subtitle="Handle the HTTP status and the JSON body.">
      <DataTable rows={[["200","Success; inspect order status."],["400","Invalid offer, out of stock, insufficient wallet, or missing idempotency key."],["401","Missing, invalid or revoked API key."],["403","Reseller panel is inactive/locked."],["404","Product slug or resource not found."],["500","Temporary server failure; retry safely with the same idempotency key."]]} />
      <h3 className="mb-3 mt-7 font-bold">Order statuses</h3>
      <DataTable rows={[["completed","Credentials are ready in delivered_accounts."],["pending","Order accepted and still processing; query orders again."],["needs_review","Result is ambiguous; do not create a new order. Contact support with order ID."],["failed","Fulfilment failed. Check error_message and reconcile before retrying."]]} />
      <CodeBlock id="error" copied={copied} copy={copy} code={`{
  "code": "insufficient_balance",
  "detail": "Insufficient wallet balance."
}`} />
    </Section>

    <Section icon={ShieldCheck} title="8. Production security checklist" subtitle="Complete this before accepting real customer orders.">
      <ul className="space-y-3">{["Keep the API key in server environment variables.","Never log API keys or delivered passwords.","Encrypt delivered credentials at rest and remove them after delivery where possible.","Use HTTPS on your own checkout and backend.","Validate quantity, product slug and selected offer on your server.","Use a database-backed idempotency key tied to your order ID.","Revoke and replace a key immediately if it is exposed.","Do not display raw API errors containing credentials to public users."].map(item => <li key={item} className="flex gap-3 text-sm text-zinc-600"><Check className="mt-0.5 h-4 w-4 shrink-0 text-black"/>{item}</li>)}</ul>
    </Section>

    <Section title="9. Minimal Node.js integration" subtitle="A complete server-side example.">
      <CodeBlock id="node" copied={copied} copy={copy} code={`const API_BASE = "${base}";
const API_KEY = process.env.TOOLSOLOGY_API_KEY;

async function toolsology(path, options = {}) {
  const response = await fetch(API_BASE + path, {
    ...options,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
      ...(options.headers || {})
    }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.detail || "Toolsology API error");
  return data;
}

const offers = await toolsology("/products/chatgpt-plus/offers/");
const offer = offers.data.find(item => item.in_stock);

const order = await toolsology("/purchase/", {
  method: "POST",
  headers: { "Idempotency-Key": "order_myshop_100045" },
  body: JSON.stringify({
    product_slug: "chatgpt-plus",
    offer_id: offer.offer_id,
    quantity: 1,
    customer_email: "buyer@example.com"
  })
});

if (order.status === "completed") {
  // Deliver order.delivered_accounts securely to your customer.
}`} />
    </Section>

    <Callout icon={ShieldCheck}>Recommended launch test: create a low-value test order, confirm wallet deduction, save the returned order ID, verify delivered credentials, retry once with the same Idempotency-Key, and confirm that no second charge occurs.</Callout>
  </div>;
}

function Badge({ children }) { return <span className="rounded-full border border-zinc-700 px-3 py-1.5 text-zinc-300">{children}</span>; }
function Section({ icon: Icon, title, subtitle, children }) { return <section className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8"><div className="flex gap-3">{Icon && <Icon className="mt-1 h-6 w-6 shrink-0"/>}<div><h2 className="text-2xl font-bold">{title}</h2>{subtitle && <p className="mt-1 text-zinc-500">{subtitle}</p>}</div></div><div className="mt-7">{children}</div></section>; }
function CopyButton({ value, id, copied, copy }) { return <button onClick={() => copy(value, id)} className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white" aria-label="Copy code">{copied === id ? <Check className="h-4 w-4"/> : <Copy className="h-4 w-4"/>}</button>; }
function CodeBlock({ code, id, copied, copy }) { return <div className="relative mt-4 overflow-hidden rounded-2xl bg-black text-zinc-200"><button onClick={() => copy(code, id)} className="absolute right-3 top-3 rounded-lg bg-white/10 p-2 hover:bg-white/20" aria-label="Copy example">{copied === id ? <Check className="h-4 w-4"/> : <Copy className="h-4 w-4"/>}</button><pre className="overflow-x-auto p-5 pr-14 text-xs leading-6">{code}</pre></div>; }
function Endpoint({ method, path, title, description, request, response, copied, copy }) { const id = method + path; return <div className="overflow-hidden rounded-2xl border border-zinc-200"><div className="flex flex-wrap items-center gap-3 bg-zinc-50 p-4"><span className="rounded bg-black px-2 py-1 text-xs font-black text-white">{method}</span><code className="break-all text-sm">{path}</code></div><div className="p-5"><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-zinc-600">{description}</p><div className="mt-4 text-xs font-bold uppercase tracking-wider text-zinc-400">Request</div><CodeBlock id={id+"req"} copied={copied} copy={copy} code={request}/><div className="mt-5 text-xs font-bold uppercase tracking-wider text-zinc-400">Example response</div><CodeBlock id={id+"res"} copied={copied} copy={copy} code={response}/></div></div>; }
function InfoGrid({ items }) { return <dl className="grid gap-3 sm:grid-cols-2">{items.map(([term,value]) => <div key={term} className="rounded-xl bg-zinc-50 p-4"><dt className="text-xs font-bold uppercase tracking-wider text-zinc-400">{term}</dt><dd className="mt-2 break-all font-mono text-sm">{value}</dd></div>)}</dl>; }
function Callout({ icon: Icon, children }) { return <div className="flex gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-sm leading-6 text-zinc-300"><Icon className="mt-0.5 h-5 w-5 shrink-0 text-white"/><div>{children}</div></div>; }
function DataTable({ rows }) { return <div className="overflow-hidden rounded-2xl border border-zinc-200">{rows.map(([key,value]) => <div key={key} className="grid grid-cols-[120px_1fr] border-b border-zinc-200 last:border-0"><code className="bg-zinc-50 p-3 font-bold">{key}</code><div className="p-3 text-sm text-zinc-600">{value}</div></div>)}</div>; }
