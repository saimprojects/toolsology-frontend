// src/pages/reseller/Settings.jsx
import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { clearTokens } from "../../api/reseller";
import { useCurrency } from "../../context/CurrencyContext";

export default function Settings() {
  const { format } = useCurrency();
  const { me } = useOutletContext();
  const nav = useNavigate();

  function logout() { clearTokens(); nav("/reseller/login"); }

  const Row = ({ label, value }) => (
    <div className="flex justify-between py-3 border-b last:border-0 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="bg-white border rounded-xl p-5 mb-6">
        <h2 className="font-semibold mb-2">Account</h2>
        <Row label="Username" value={me?.username} />
        <Row label="Phone" value={me?.phone || "—"} />
        <Row label="Status" value={me?.can_operate ? "Active" : "Not activated"} />
      </div>

      <div className="bg-white border rounded-xl p-5 mb-6">
        <h2 className="font-semibold mb-2">Wallet</h2>
        <Row label="Balance" value={format(me?.wallet_balance)} />
        <Row label="Minimum deposit" value={format(me?.min_deposit)} />
        <Row label="Payment mode"
          value={me?.wallet_required ? "Wallet required" : "Wallet or account"} />
      </div>

      <button onClick={logout}
        className="bg-red-50 text-red-600 border border-red-200 px-5 py-2.5 rounded-lg font-semibold">
        Logout
      </button>
    </div>
  );
}
