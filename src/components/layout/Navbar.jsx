import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, LogIn, LogOut, Menu, Package, Store, User, X } from "lucide-react";
import { clearTokens, isLoggedIn } from "../../api/customer";
import { CurrencyToggle } from "../../context/CurrencyContext";

const links = [
  { label: "Tools", to: "/products", icon: Package },
  { label: "Guides", to: "/blog", icon: BookOpen },
  { label: "Resellers", to: "/reseller", icon: Store },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const active = (to) => location.pathname === to || (to !== "/" && location.pathname.startsWith(to));
  return (
    <header className="sticky top-0 z-50 bg-black/95 text-white backdrop-blur-xl border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Toolsology home">
          <span className="h-10 w-10 bg-white text-black rounded-xl grid place-items-center font-black text-xl">T</span>
          <span className="text-xl font-black tracking-[-0.04em]">Toolsology<span className="text-zinc-500">.</span></span>
        </Link>
        <nav className="hidden lg:flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-full p-1">
          {links.map(({ label, to, icon: Icon }) => <Link key={to} to={to} className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition ${active(to) ? "bg-white text-black" : "text-zinc-400 hover:text-white"}`}><Icon className="w-4 h-4" />{label}</Link>)}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <CurrencyToggle dark />
          {isLoggedIn() ? <><Link to="/account" className="inline-flex items-center gap-2 text-sm font-semibold"><User className="w-4 h-4"/>My account</Link><button onClick={() => { clearTokens(); window.location.href = "/"; }} className="p-2 text-zinc-500 hover:text-white" aria-label="Logout"><LogOut className="w-5 h-5"/></button></> : <Link to="/login" className="inline-flex items-center gap-2 bg-white text-black rounded-full px-5 py-2.5 text-sm font-bold"><LogIn className="w-4 h-4"/>Sign in</Link>}
        </div>
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
      </div>
      {open && <div className="lg:hidden px-5 pb-6 border-t border-zinc-800 pt-4 space-y-2">
        {links.map(({ label, to, icon: Icon }) => <Link key={to} to={to} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-zinc-900"><Icon className="w-5 h-5"/>{label}</Link>)}
        <div className="flex items-center justify-between px-4 py-3"><CurrencyToggle dark />{isLoggedIn() ? <Link to="/account" onClick={() => setOpen(false)}>My account</Link> : <Link to="/login" onClick={() => setOpen(false)}>Sign in</Link>}</div>
      </div>}
    </header>
  );
}
