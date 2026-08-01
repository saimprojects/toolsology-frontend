// src/api/customer.js — customer (retail) auth + checkout with JWT.

const RAW = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/";
const BASE = RAW.endsWith("/") ? RAW.slice(0, -1) : RAW;

const ACCESS = "customer_access";
const REFRESH = "customer_refresh";

export function setTokens({ access, refresh }) {
  if (access) localStorage.setItem(ACCESS, access);
  if (refresh) localStorage.setItem(REFRESH, refresh);
}
export function getAccess() { return localStorage.getItem(ACCESS); }
export function clearTokens() { localStorage.removeItem(ACCESS); localStorage.removeItem(REFRESH); }
export function isLoggedIn() { return !!getAccess(); }
export function genKey() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return "idem-" + Date.now() + "-" + Math.random().toString(36).slice(2);
}

async function req(path, { method = "GET", body, auth = false } = {}) {
  const headers = { Accept: "application/json" };
  if (body) headers["Content-Type"] = "application/json";
  if (auth && getAccess()) headers["Authorization"] = `Bearer ${getAccess()}`;
  const res = await fetch(`${BASE}${path}`, {
    method, headers, body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || data.username?.[0] || `Error ${res.status}`);
  return data;
}

export async function registerCustomer(payload) {
  const data = await req("/api/customer/register/", { method: "POST", body: payload });
  setTokens(data);
  return data;
}
export async function loginCustomer({ username, password }) {
  const data = await req("/api/token/", { method: "POST", body: { username, password } });
  setTokens(data);
  return data;
}
export function getMe() { return req("/api/customer/me/", { auth: true }); }
export async function getMyOrders() {
  const data = await req("/api/customer/orders/", { auth: true });
  return data?.results || data || [];
}

// Offers (attached bot products, labeled) for a product — no bot names.
export async function getRetailOffers(productId) {
  const data = await req(`/api/sourcing/retail/products/${productId}/offers/`);
  return Array.isArray(data) ? data : (data?.results || []);
}

// Instant bank checkout (logged-in) — buys the CHOSEN offer.
export function retailCheckout({ product_id, offer_id, quantity = 1, trx_id, customer_email = "", slot_months = null }) {
  return req("/api/payments/checkout/retail/", {
    method: "POST",
    auth: true,
    body: { product_id, offer_id, quantity, trx_id, customer_email, slot_months, idempotency_key: genKey() },
  });
}

export async function getStoreProducts() {
  const data = await req("/api/sourcing/retail/products/");
  return data?.results || data || [];
}
export async function getStoreProduct(id) {
  const list = await getStoreProducts();
  return list.find((p) => Number(p.id) === Number(id)) || null;
}
export async function getPaymentMethods() {
  const data = await req("/api/payments/methods/");
  return data?.results || data || [];
}
