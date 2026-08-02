import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, Store } from "lucide-react";
import { loginReseller } from "../api/reseller";
import GearLoader from "../components/layout/GearLoader";

export default function ResellerLogin() {
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  async function submit(event) {
    event.preventDefault(); setError(""); setBusy(true);
    try { await loginReseller(form); nav("/reseller/app"); }
    catch { setError("Invalid username or password."); }
    finally { setBusy(false); }
  }

  return (
    <div className="min-h-[650px] bg-black px-4 py-12 text-white sm:py-20">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 shadow-2xl lg:grid-cols-2">
        <div className="hidden flex-col justify-between border-r border-zinc-800 p-10 lg:flex">
          <div>
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black"><Store className="h-6 w-6" /></div>
            <h2 className="text-4xl font-bold tracking-tight">Your reseller business, in one place.</h2>
            <p className="mt-4 leading-7 text-zinc-400">Access wholesale products, instant fulfilment, wallet payments and developer API tools.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-400"><ShieldCheck className="h-5 w-5 text-white" /> Secure partner access</div>
        </div>
        <div className="p-6 sm:p-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">Partner portal</p>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mb-8 text-sm text-zinc-400">Sign in to manage your reseller wallet and orders.</p>
          <form onSubmit={submit} className="space-y-4">
            <label className="block text-sm font-medium text-zinc-300">Username<input className="mt-2 w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white" placeholder="Enter your username" value={form.username} onChange={set("username")} required /></label>
            <label className="block text-sm font-medium text-zinc-300">Password<input className="mt-2 w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white" type="password" placeholder="Enter your password" value={form.password} onChange={set("password")} required /></label>
            {error && <p className="rounded-xl border border-red-900 bg-red-950/50 p-3 text-sm text-red-300">{error}</p>}
            <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 font-bold text-black hover:bg-zinc-200 disabled:opacity-60">{busy ? <GearLoader size="sm" label="Signing in" /> : <>Sign in <ArrowRight className="h-4 w-4" /></>}</button>
          </form>
          <p className="mt-6 text-sm text-zinc-500">New here? <Link to="/reseller/signup" className="font-semibold text-white hover:underline">Create an account</Link></p>
        </div>
      </div>
    </div>
  );
}
