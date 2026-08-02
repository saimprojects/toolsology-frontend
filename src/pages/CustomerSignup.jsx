import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, Eye, EyeOff, Sparkles } from "lucide-react";
import { registerCustomer } from "../api/customer";
import GearLoader from "../components/layout/GearLoader";

export default function CustomerSignup() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const next = params.get("next") || "/account";
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  async function submit(event) {
    event.preventDefault(); setError(""); setBusy(true);
    try { await registerCustomer(form); nav(next); }
    catch (err) { setError(err.message || "Could not create your account."); }
    finally { setBusy(false); }
  }

  return (
    <div className="min-h-[720px] bg-black px-4 py-12 text-white sm:py-20">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 shadow-2xl lg:grid-cols-[1.05fr_.95fr]">
        <div className="hidden flex-col justify-between border-r border-zinc-800 p-10 lg:flex">
          <div><div className="mb-8 inline-flex rounded-full border border-zinc-700 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-300"><Sparkles className="mr-2 h-4 w-4" /> Join Toolsology</div><h2 className="text-5xl font-bold tracking-tight">Buy smarter.<br />Get delivered faster.</h2><p className="mt-5 max-w-md leading-7 text-zinc-400">One secure account for digital subscriptions, instant credentials and order tracking.</p></div>
          <div className="space-y-3 text-sm text-zinc-300">{["Track every purchase", "Access delivered credentials", "Use local bank or Binance payments"].map((item) => <div key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />{item}</div>)}</div>
        </div>
        <div className="p-6 sm:p-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">New customer</p>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Create your account</h1>
          <p className="mb-8 text-sm text-zinc-400">Start purchasing premium digital tools securely.</p>
          <form onSubmit={submit} className="space-y-4">
            <input className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-white" placeholder="Username" value={form.username} onChange={set("username")} required autoComplete="username" />
            <input className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-white" type="email" placeholder="Email address" value={form.email} onChange={set("email")} required autoComplete="email" />
            <div className="relative"><input className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 pr-12 text-white outline-none placeholder:text-zinc-600 focus:border-white" type={showPassword ? "text" : "password"} placeholder="Password (minimum 6 characters)" value={form.password} onChange={set("password")} required minLength={6} autoComplete="new-password" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-zinc-500 hover:text-white" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div>
            {error && <p className="rounded-xl border border-red-900 bg-red-950/50 p-3 text-sm text-red-300">{error}</p>}
            <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 font-bold text-black hover:bg-zinc-200 disabled:opacity-60">{busy ? <GearLoader size="sm" label="Creating account" /> : <>Create free account <ArrowRight className="h-4 w-4" /></>}</button>
          </form>
          <p className="mt-6 text-sm text-zinc-500">Already registered? <Link to={`/login?next=${encodeURIComponent(next)}`} className="font-semibold text-white hover:underline">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
