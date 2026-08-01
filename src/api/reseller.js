// src/api/reseller.js
// Reseller-panel API calls with JWT token handling.

const RAW = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/";
const BASE = RAW.endsWith("/") ? RAW.slice(0, -1) : RAW;

const ACCESS_KEY = "reseller_access";
const REFRESH_KEY = "reseller_refresh";

export function setTokens({ access, refresh }) {
  if (access) localStorage.setItem(ACCESS_KEY, access);
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
}
export function getAccess() {
  return localStorage.getItem(ACCESS_KEY);
}
export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}
export function isLoggedIn() {
  return !!getAccess();
}
export function genKey() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return "idem-" + Date.now() + "-" + Math.random().toString(36).slice(2);
}

async function req(path, { method = "GET", body, auth = false } = {}) {
  const headers = { Accept: "application/json" };
  if (body) headers["Content-Type"] = "application/json";
  if (auth) {
    const t = getAccess();
    if (t) headers["Authorization"] = `Bearer ${t}`;
  }
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.detail || data.username?.[0] || `Error ${res.status}`);
  }
  return data;
}

/* ---- Auth ---- */
export async function registerReseller(payload) {
  const data = await req("/api/reseller/register/", { method: "POST", body: payload });
  setTokens(data); // register returns access + refresh
  return data;
}
export async function loginReseller({ username, password }) {
  const data = await req("/api/token/", {
    method: "POST",
    body: { username, password },
  });
  setTokens(data);
  return data;
}

/* ---- Wallet + panel ---- */
export function getMe() {
  return req("/api/reseller/me/", { auth: true });
}
export function topupWallet(trx_id) {
  return req("/api/reseller/wallet/topup/", {
    method: "POST",
    auth: true,
    body: { trx_id },
  });
}
export function walletPurchase({ product_id, quantity = 1, customer_email = "", slot_months = null }) {
  return req("/api/reseller/wallet/purchase/", {
    method: "POST",
    auth: true,
    body: { product_id, quantity, customer_email, slot_months, idempotency_key: genKey() },
  });
}
export async function getResellerProducts() {
  const data = await req("/api/sourcing/reseller/products/", { auth: true });
  return data?.results || data || [];
}
export async function getTransactions() {
  const data = await req("/api/reseller/wallet/transactions/", { auth: true });
  return data?.results || data || [];
}
export async function getResellerProduct(id) {
  const list = await getResellerProducts();
  return list.find((p) => Number(p.id) === Number(id)) || null;
}
export async function getOrders() {
  const data = await req("/api/reseller/orders/", { auth: true });
  return data?.results || data || [];
}
// "Pay via account" (SMS trx) for resellers — reseller price, auth required.
export function accountCheckout({ product_id, quantity = 1, trx_id, customer_email = "", slot_months = null }) {
  return req("/api/payments/checkout/reseller/", {
    method: "POST",
    auth: true,
    body: { product_id, quantity, trx_id, customer_email, slot_months, idempotency_key: genKey() },
  });
}
export async function getPaymentMethods() {
  const data = await req("/api/payments/methods/");
  return data?.results || data || [];
}
