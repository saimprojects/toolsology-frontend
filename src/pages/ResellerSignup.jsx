import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Store } from "lucide-react";
import { registerReseller } from "../api/reseller";
import GearLoader from "../components/layout/GearLoader";

export default function ResellerSignup() {
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  async function submit(event) {
    event.preventDefault(); setError(""); setBusy(true);
    try { await registerReseller(form); nav("/reseller/app"); }
    catch (err) { setError(err.message || "Signup failed."); }
    finally { setBusy(false); }
  }

  return (
    <div className="min-h-[720px] bg-black px-4 py-12 text-white sm:py-20">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 shadow-2xl lg:grid-cols-2">
        <div className="hidden flex-col justify-between border-r border-zinc-800 p-10 lg:flex">
          <div>
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black"><Store className="h-6 w-6" /></div>
            <h2 className="text-4xl font-bold tracking-tight">Start selling premium digital tools.</h2>
            <p className="mt-4 leading-7 text-zinc-400">Create your partner account and unlock reseller prices after wallet activation.</p>
          </div>
          <div className="space-y-3 text-sm text-zinc-300">{["Wholesale reseller pricing", "Instant account fulfilment", "Wallet and API access"].map((item) => <div key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />{item}</div>)}</div>
        </div>
        <div className="p-6 sm:p-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">Partner application</p>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Create reseller account</h1>
          <p className="mb-8 text-sm text-zinc-400">Set up your partner login in less than a minute.</p>
          <form onSubmit={submit} className="space-y-4">
            <input className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white" placeholder="Username" value={form.username} onChange={set("username")} required />
            <input className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white" type="email" placeholder="Business email" value={form.email} onChange={set("email")} required />
            <input className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white" placeholder="Phone / WhatsApp" value={form.phone} onChange={set("phone")} required />
            <input className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white" type="password" placeholder="Password (minimum 6 characters)" value={form.password} onChange={set("password")} required minLength={6} />
            {error && <p className="rounded-xl border border-red-900 bg-red-950/50 p-3 text-sm text-red-300">{error}</p>}
            <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 font-bold text-black hover:bg-zinc-200 disabled:opacity-60">{busy ? <GearLoader size="sm" label="Creating account" /> : <>Create partner account <ArrowRight className="h-4 w-4" /></>}</button>
          </form>
          <p className="mt-6 text-sm text-zinc-500">Already have an account? <Link to="/reseller/login" className="font-semibold text-white hover:underline">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
