// src/pages/reseller/Products.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getResellerProducts } from "../../api/reseller";
import { useCurrency } from "../../context/CurrencyContext";

export default function Products() {
  const { format } = useCurrency();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResellerProducts().then(setProducts).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-10 text-center">Loading…</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <Link key={p.id} to={`/reseller/app/products/${p.id}`}
            className="bg-white border rounded-xl p-4 hover:shadow-md transition">
            {p.main_image && (
              <img src={p.main_image} alt={p.title} className="h-32 w-full object-cover rounded-lg mb-3" />
            )}
            <div className="font-semibold">{p.title}</div>
            <div className="text-[#1E3A8A] font-bold">{format(p.price)}</div>
            <div className={`text-xs mt-1 ${p.in_stock ? "text-green-600" : "text-red-500"}`}>
              {p.in_stock ? "In stock" : "Out of stock"}
            </div>
          </Link>
        ))}
        {products.length === 0 && <p className="text-gray-500">No products available yet.</p>}
      </div>
    </div>
  );
}
