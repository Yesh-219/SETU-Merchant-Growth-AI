import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Merchant } from '../types/models';

interface MerchantContextType {
  activeMerchant: Merchant;
  setActiveMerchant: (merchant: Merchant) => void;
  dateRange: string;
  setDateRange: (range: string) => void;
}

const defaultMerchant: Merchant = {
  id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  name: 'Ramesh Sharma',
  businessName: 'Lakshmi Provision Store',
  businessType: 'Kirana & General Store',
  email: 'ramesh.lakshmi@example.com',
  phone: '+91 98765 43210',
};

const MerchantContext = createContext<MerchantContextType | undefined>(undefined);

export const MerchantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeMerchant, setActiveMerchant] = useState<Merchant>(defaultMerchant);
  const [dateRange, setDateRange] = useState<string>('last_30_days');

  return (
    <MerchantContext.Provider
      value={{
        activeMerchant,
        setActiveMerchant,
        dateRange,
        setDateRange,
      }}
    >
      {children}
    </MerchantContext.Provider>
  );
};

export const useMerchant = (): MerchantContextType => {
  const context = useContext(MerchantContext);
  if (!context) {
    throw new Error('useMerchant must be used within a MerchantProvider');
  }
  return context;
};

