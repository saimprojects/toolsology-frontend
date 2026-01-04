// src/api.js

// Read base URL from Vite env
// .env: VITE_API_URL=https://toolsology.up.railway.app/
const RAW_BASE_URL = import.meta.env.VITE_API_URL;

// Normalize: ensure it ends with single slash
function normalizeBaseUrl(url) {
  try {
    const u = new URL(url);
    // Ensure trailing slash
    return u.origin + (u.pathname.endsWith("/") ? u.pathname : u.pathname + "/");
  } catch (e) {
    // Fallback if env URL is invalid
    return "http://127.0.0.1:8000/";
  }
}

const API_BASE_URL = normalizeBaseUrl(RAW_BASE_URL);

// Join base + path safely (avoid double slashes)
function joinUrl(base, path) {
  if (!path) return base;
  // absolute pagination url
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}

async function request(path, options = {}) {
  const url = joinUrl(API_BASE_URL, path);

  const res = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
    },
  });

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    let message = `HTTP ${res.status} ${res.statusText}`;
    try {
      const text = await res.text();
      if (text) message = text.slice(0, 300);
    } catch (_) {}
    throw new Error(message);
  }

  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(
      `Expected JSON, got ${contentType}. Response: ${text.slice(0, 80)}`
    );
  }

  return res.json();
}

/* =========================
   API METHODS
   ========================= */

// Simple function for single page
export async function getProducts() {
  try {
    const data = await request("/api/products/");
    return data?.results || data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Function to get ALL products with pagination handling
export async function getAllProducts() {
  try {
    let allProducts = [];
    let currentUrl = "/api/products/";
    let page = 1;
    const maxPages = 5; // Safety limit

    while (currentUrl && page <= maxPages) {
      try {
        const data = await request(currentUrl);

        if (data && data.results && data.results.length > 0) {
          allProducts = [...allProducts, ...data.results];
          currentUrl = data.next; // can be absolute or relative

          if (!currentUrl) break;
          page++;
        } else {
          break;
        }
      } catch (pageError) {
        console.error(`Error fetching page ${page}:`, pageError);
        break;
      }
    }

    console.log(`Fetched ${allProducts.length} products from ${page - 1} pages`);
    return allProducts;
  } catch (error) {
    console.error("Error in getAllProducts:", error);

    // Fallback: Try to get at least one page
    try {
      const fallbackData = await request("/api/products/");
      return fallbackData?.results || fallbackData || [];
    } catch (fallbackError) {
      console.error("Fallback also failed:", fallbackError);
      return [];
    }
  }
}

export async function getProductById(id) {
  if (!id) throw new Error("Product ID is required");
  return request(`/api/products/${id}/`);
}

export async function getCategories() {
  try {
    const data = await request("/api/categories/");
    return data?.results || data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getWhatsAppNumber() {
  try {
    const data = await request("/api/whatsapp/");
    return data?.whatsapp_number || null;
  } catch (error) {
    console.error("Error fetching WhatsApp number:", error);
    return null;
  }
}

/* =========================
   REVIEWS API METHODS
   ========================= */

export async function getReviews() {
  try {
    const data = await request("/api/reviews/");
    return data?.results || data || [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export async function getReviewsByProduct(productId) {
  if (!productId) throw new Error("Product ID is required");
  try {
    const data = await request(`/api/reviews/?product=${productId}`);
    return data?.results || data || [];
  } catch (error) {
    console.error(`Error fetching reviews for product ${productId}:`, error);
    return [];
  }
}

export async function getReviewStats() {
  try {
    const data = await request("/api/review-stats/");
    return data;
  } catch (error) {
    console.warn("Review stats endpoint not available:", error.message);
    return null;
  }
}
