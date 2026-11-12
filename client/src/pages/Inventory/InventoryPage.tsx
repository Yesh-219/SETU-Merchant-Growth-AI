import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { InventoryTable } from '../../components/inventory/InventoryTable';
import { StockAlertBadge } from '../../components/inventory/StockAlertBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorAlert } from '../../components/common/ErrorAlert';
import { inventoryService } from '../../services/inventoryService';
import { mockInventoryItems, mockInventoryRecommendations } from '../../utils/mockData';
import { InventoryItem, InventoryRecommendation } from '../../types/models';
import { Button } from '../../components/common/Button';
import { Plus, RefreshCw } from 'lucide-react';

export const InventoryPage: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [recommendations, setRecommendations] = useState<InventoryRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadInventory = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [itemsRes, recsRes] = await Promise.allSettled([
        inventoryService.getInventory(),
        inventoryService.getRecommendations(),
      ]);

      if (itemsRes.status === 'fulfilled') {
        setItems(itemsRes.value);
      } else {
        setItems(mockInventoryItems);
      }

      if (recsRes.status === 'fulfilled') {
        setRecommendations(recsRes.value);
      } else {
        setRecommendations(mockInventoryRecommendations);
      }
    } catch {
      setItems(mockInventoryItems);
      setRecommendations(mockInventoryRecommendations);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Scanning stock quantities against reorder thresholds..." fullHeight />;
  }

  if (error) {
    return <ErrorAlert message={error} onRetry={loadInventory} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Inventory & Demand Forecasting"
        description="Prevent stockouts, reduce dead capital, and automate replenishment with predictive alerts."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadInventory}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Refresh
            </Button>
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
              Add New Product
            </Button>
          </div>
        }
      />

      {/* AI Recommendations */}
      <StockAlertBadge recommendations={recommendations} />

      {/* Stock Table */}
      <InventoryTable items={items} />
    </div>
  );
};

export default InventoryPage;

