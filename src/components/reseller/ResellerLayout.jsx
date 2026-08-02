// src/components/reseller/ResellerLayout.jsx
import React, { useEffect, useState, useCallback } from "react";
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard, Package, Receipt, Settings as SettingsIcon,
  LogOut, Store, Menu, X, Code2,
} from "lucide-react";
import { isLoggedIn, clearTokens, getMe } from "../../api/reseller";
import { CurrencyToggle, useCurrency } from "../../context/CurrencyContext";

const links = [
  { to: "/reseller/app", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/reseller/app/products", label: "Products", icon: Package },
  { to: "/reseller/app/orders", label: "Orders", icon: Receipt },
  { to: "/reseller/app/settings", label: "Settings", icon: SettingsIcon },
  { to: "/reseller/app/developer", label: "API & Docs", icon: Code2 },
];

export default function ResellerLayout() {
  const { format } = useCurrency();
  const nav = useNavigate();
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const refresh = useCallback(async () => {
    const m = await getMe();
    setMe(m);
    return m;
  }, []);

  useEffect(() => {
    if (!isLoggedIn()) { nav("/reseller/login"); return; }
    refresh().catch(() => nav("/reseller/login")).finally(() => setLoading(false));
  }, [nav, refresh]);

  function logout() { clearTokens(); nav("/reseller/login"); }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  }

  const Sidebar = (
    <aside className="w-72 bg-black text-zinc-300 flex flex-col h-screen overflow-y-auto border-r border-zinc-800">
      <Link to="/" className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
        <div className="bg-white h-10 w-10 rounded-xl flex items-center justify-center">
          <Store className="w-5 h-5 text-black" />
        </div>
        <span className="font-black tracking-tight text-white">Toolsology <span className="text-zinc-500">Partner</span></span>
      </Link>

      <div className="px-5 py-4 border-b border-white/10">
        <div className="text-xs text-gray-400">Wallet balance</div>
        <div className="text-2xl font-black text-white tracking-tight">{format(me?.wallet_balance)}</div>
        <div className="mt-3"><CurrencyToggle dark /></div>
        <div className={`text-xs mt-1 ${me?.can_operate ? "text-green-400" : "text-yellow-400"}`}>
          {me?.can_operate ? "● Active" : "● Not activated"}
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                isActive ? "bg-white text-black" : "hover:bg-white/5"
              }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <button onClick={logout}
        className="flex items-center gap-3 px-5 py-4 text-sm text-gray-400 hover:text-red-400 border-t border-white/10">
        <LogOut className="w-4 h-4" /> Logout
      </button>
    </aside>
  );

  return (
    <div className="min-h-screen bg-zinc-100 flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-30 w-72">{Sidebar}</div>

      {/* Mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0">{Sidebar}</div>
        </div>
      )}

      <div className="flex-1 min-w-0 lg:ml-72">
        <div className="lg:hidden flex items-center justify-between bg-black text-white border-b border-zinc-800 px-4 py-3">
          <button onClick={() => setOpen(true)}><Menu className="w-6 h-6" /></button>
          <span className="font-semibold">Reseller Panel</span>
          <div className="flex items-center gap-2"><CurrencyToggle /><span className="text-sm">{format(me?.wallet_balance)}</span></div>
        </div>

        <main className="p-4 sm:p-8 max-w-6xl mx-auto">
          <Outlet context={{ me, refresh }} />
        </main>
      </div>
    </div>
  );
}
