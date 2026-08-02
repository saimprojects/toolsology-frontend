import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import { loginCustomer } from "../api/customer";
import GearLoader from "../components/layout/GearLoader";

export default function CustomerLogin() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const next = params.get("next") || "/account";
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  async function submit(event) {
    event.preventDefault(); setError(""); setBusy(true);
    try { await loginCustomer(form); nav(next); }
    catch { setError("Invalid username or password."); }
    finally { setBusy(false); }
  }

  return (
    <div className="min-h-[680px] bg-black px-4 py-12 text-white sm:py-20">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 shadow-2xl lg:grid-cols-[1.05fr_.95fr]">
        <div className="hidden flex-col justify-between border-r border-zinc-800 p-10 lg:flex">
          <div><div className="mb-8 inline-flex rounded-full border border-zinc-700 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-300"><Sparkles className="mr-2 h-4 w-4" /> Customer access</div><h2 className="text-5xl font-bold tracking-tight">Your tools.<br />Ready when you are.</h2><p className="mt-5 max-w-md leading-7 text-zinc-400">Sign in to access delivered credentials, order history and secure purchase records.</p></div>
          <div className="grid grid-cols-2 gap-3 text-sm"><div className="rounded-2xl border border-zinc-800 p-4"><PackageCheck className="mb-3 h-5 w-5" />Instant delivery</div><div className="rounded-2xl border border-zinc-800 p-4"><ShieldCheck className="mb-3 h-5 w-5" />Secure account</div></div>
        </div>
        <div className="p-6 sm:p-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">Toolsology account</p>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mb-8 text-sm text-zinc-400">Enter your details to continue to your purchases.</p>
          <form onSubmit={submit} className="space-y-4">
            <label className="block text-sm font-medium text-zinc-300">Username<input className="mt-2 w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-white" placeholder="Enter your username" value={form.username} onChange={set("username")} required autoComplete="username" /></label>
            <label className="block text-sm font-medium text-zinc-300">Password<div className="relative mt-2"><input className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 pr-12 text-white outline-none placeholder:text-zinc-600 focus:border-white" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={form.password} onChange={set("password")} required autoComplete="current-password" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-zinc-500 hover:text-white" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div></label>
            {error && <p className="rounded-xl border border-red-900 bg-red-950/50 p-3 text-sm text-red-300">{error}</p>}
            <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 font-bold text-black hover:bg-zinc-200 disabled:opacity-60">{busy ? <GearLoader size="sm" label="Signing in" /> : <>Sign in securely <ArrowRight className="h-4 w-4" /></>}</button>
          </form>
          <p className="mt-6 text-sm text-zinc-500">New to Toolsology? <Link to={`/signup?next=${encodeURIComponent(next)}`} className="font-semibold text-white hover:underline">Create an account</Link></p>
        </div>
      </div>
    </div>
  );
}
