// 📁 src/context/WhatsAppContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getWhatsAppNumber } from '../api/api';

const WhatsAppContext = createContext();

export const WhatsAppProvider = ({ children }) => {
  const [whatsappNumber, setWhatsappNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWhatsAppNumber = async () => {
    try {
      setLoading(true);
      const number = await getWhatsAppNumber();
      setWhatsappNumber(number);
      setError(null);
    } catch (err) {
      console.error('Error fetching WhatsApp number:', err);
      setError(err.message);
      // Fallback to default number if API fails
      setWhatsappNumber('+919876543210'); // Add your default number here
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWhatsAppNumber();
  }, []);

  const value = {
    whatsappNumber,
    loading,
    error,
    refetch: fetchWhatsAppNumber
  };

  return (
    <WhatsAppContext.Provider value={value}>
      {children}
    </WhatsAppContext.Provider>
  );
};

export const useWhatsApp = () => {
  const context = useContext(WhatsAppContext);
  if (!context) {
    throw new Error('useWhatsApp must be used within WhatsAppProvider');
  }
  return context;
};