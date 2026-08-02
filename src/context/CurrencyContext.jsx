import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CurrencyContext = createContext(null);
const STORAGE_KEY = "toolsology_currency";
const RAW_API = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? window.location.origin : "http://127.0.0.1:8000/");
const API_BASE = (RAW_API.endsWith("/") ? RAW_API.slice(0, -1) : RAW_API).replace(/\/api$/, "");

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState(() => localStorage.getItem(STORAGE_KEY) || "PKR");
  const [rate, setRate] = useState(280);

  useEffect(() => {
    fetch(`${API_BASE}/api/payments/currency/config/`)
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => {
        const next = Number(data.usd_to_pkr_rate);
        if (Number.isFinite(next) && next > 0) setRate(next);
      })
      .catch(() => {});
  }, []);

  function setCurrency(next) {
    const value = next === "USD" ? "USD" : "PKR";
    localStorage.setItem(STORAGE_KEY, value);
    setCurrencyState(value);
  }

  function convert(pkr) {
    const value = Number(pkr || 0);
    return currency === "USD" ? value / rate : value;
  }

  function format(pkr, options = {}) {
    if (pkr === null || pkr === undefined || pkr === "") return "—";
    const value = Number(pkr);
    if (!Number.isFinite(value)) return "—";
    if (currency === "USD") {
      return `$${(value / rate).toFixed(options.usdDecimals ?? 2)}`;
    }
    return `PKR ${Math.ceil(value).toLocaleString()}`;
  }

  const value = useMemo(() => ({ currency, setCurrency, rate, convert, format }), [currency, rate]);
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const value = useContext(CurrencyContext);
  if (!value) throw new Error("useCurrency must be used inside CurrencyProvider");
  return value;
}

export function CurrencyToggle({ dark = false }) {
  const { currency, setCurrency } = useCurrency();
  return (
    <div className={`inline-flex rounded-lg border p-1 ${dark ? "border-white/20 bg-white/5" : "border-gray-200 bg-gray-50"}`} aria-label="Select currency">
      {["PKR", "USD"].map((item) => (
        <button key={item} type="button" onClick={() => setCurrency(item)}
          className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${currency === item ? "bg-[#1E3A8A] text-white shadow-sm" : dark ? "text-gray-300" : "text-gray-500"}`}>
          {item === "USD" ? "$" : "PKR"}
        </button>
      ))}
    </div>
  );
}
