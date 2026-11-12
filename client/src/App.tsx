import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MerchantProvider } from './context/MerchantContext';
import { MainLayout } from './layouts/MainLayout';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { SalesPage } from './pages/Sales/SalesPage';
import { InventoryPage } from './pages/Inventory/InventoryPage';
import { FinancePage } from './pages/Finance/FinancePage';
import { AdvisorPage } from './pages/Advisor/AdvisorPage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';

export const App: React.FC = () => {
  return (
    <MerchantProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="sales" element={<SalesPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="finance" element={<FinancePage />} />
            <Route path="advisor" element={<AdvisorPage />} />
            <Route path="404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MerchantProvider>
  );
};

export default App;

