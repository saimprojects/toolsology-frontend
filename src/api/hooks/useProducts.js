// src/api/hooks/useProducts.js
import { useState, useEffect } from 'react';
import { getProducts } from '../api';

export const useProducts = (options = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { categoryId, featured = false, limit = null } = options;

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let data = await getProducts();
        
        // Apply filters if provided
        if (categoryId) {
          data = data.filter(product => 
            product.categories?.some(cat => cat.id === categoryId)
          );
        }
        
        if (featured) {
          data = data.filter(product => product.is_featured);
        }
        
        if (limit) {
          data = data.slice(0, limit);
        }
        
        if (mounted) {
          setProducts(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || 'Failed to fetch products');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, [categoryId, featured, limit]);

  return { products, loading, error };
};

// Usage in components:
// const { products, loading, error } = useProducts({ featured: true, limit: 4 });