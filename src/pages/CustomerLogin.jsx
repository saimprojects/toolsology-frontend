// src/pages/CustomerLogin.jsx
import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { LogIn } from "lucide-react";
import { loginCustomer } from "../api/customer";

export default function CustomerLogin() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const next = params.get("next") || "/account";
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setError(""); setBusy(true);
    try { await loginCustomer(form); nav(next); }
    catch { setError("Invalid username or password."); }
    finally { setBusy(false); }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-[#1E3A8A] h-12 w-12 rounded-xl flex items-center justify-center mb-3">
            <LogIn className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#111827]">Welcome back</h1>
          <p className="text-gray-500 text-sm">Login to your account</p>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#1E3A8A]/30 outline-none"
            placeholder="Username" value={form.username} onChange={set("username")} required />
          <input className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#1E3A8A]/30 outline-none"
            type="password" placeholder="Password" value={form.password} onChange={set("password")} required />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button disabled={busy}
            className="w-full bg-[#1E3A8A] text-white rounded-lg py-3 font-semibold hover:bg-[#1E3A8A]/90 disabled:opacity-60">
            {busy ? "Logging in…" : "Login"}
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4 text-center">
          New here?{" "}
          <Link to={`/signup?next=${encodeURIComponent(next)}`} className="text-[#1E3A8A] font-semibold">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
