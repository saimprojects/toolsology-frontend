// src/pages/ResellerLogin.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginReseller } from "../api/reseller";

export default function ResellerLogin() {
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await loginReseller(form);
      nav("/reseller/app");
    } catch (err) {
      setError("Invalid username or password.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <h1 className="text-2xl font-bold mb-6">Reseller login</h1>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Username"
          value={form.username} onChange={set("username")} required />
        <input className="w-full border rounded-lg px-3 py-2" type="password" placeholder="Password"
          value={form.password} onChange={set("password")} required />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button disabled={busy}
          className="w-full bg-[#1E3A8A] text-white rounded-lg py-2.5 font-semibold disabled:opacity-60">
          {busy ? "Logging in…" : "Login"}
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-4">
        New here? <Link to="/reseller/signup" className="text-[#1E3A8A] font-medium">Create an account</Link>
      </p>
    </div>
  );
}
