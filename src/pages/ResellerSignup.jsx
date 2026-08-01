// src/pages/ResellerSignup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerReseller } from "../api/reseller";

export default function ResellerSignup() {
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await registerReseller(form);
      nav("/reseller/app");
    } catch (err) {
      setError(err.message || "Signup failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <h1 className="text-2xl font-bold mb-6">Create reseller account</h1>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Username"
          value={form.username} onChange={set("username")} required />
        <input className="w-full border rounded-lg px-3 py-2" type="email" placeholder="Email (optional)"
          value={form.email} onChange={set("email")} />
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Phone (optional)"
          value={form.phone} onChange={set("phone")} />
        <input className="w-full border rounded-lg px-3 py-2" type="password" placeholder="Password (min 6)"
          value={form.password} onChange={set("password")} required minLength={6} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button disabled={busy}
          className="w-full bg-[#1E3A8A] text-white rounded-lg py-2.5 font-semibold disabled:opacity-60">
          {busy ? "Creating…" : "Create account"}
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-4">
        Already have an account? <Link to="/reseller/login" className="text-[#1E3A8A] font-medium">Login</Link>
      </p>
    </div>
  );
}
