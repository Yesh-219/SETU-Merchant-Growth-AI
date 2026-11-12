import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { InventoryRecommendation } from '../../types/models';
import { formatCurrency } from '../../utils/formatters';
import { Sparkles, ShoppingCart } from 'lucide-react';

interface StockAlertBadgeProps {
  recommendations: InventoryRecommendation[];
}

export const StockAlertBadge: React.FC<StockAlertBadgeProps> = ({ recommendations }) => {
  return (
    <Card
      title="AI Demand & Restock Suggestions"
      subtitle="Predictive replenishment alerts based on historical velocity"
      action={
        <span className="inline-flex items-center gap-1 text-xs text-paytm-cyan font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> AI Powered
        </span>
      }
    >
      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div
            key={rec.productId}
            className="p-3.5 rounded-xl border border-amber-200/80 bg-amber-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-slate-900">{rec.productName}</span>
                <Badge variant={rec.urgency === 'high' ? 'danger' : 'warning'} size="sm">
                  {rec.urgency.toUpperCase()} URGENCY
                </Badge>
              </div>
              <p className="text-slate-600 leading-relaxed">{rec.reason}</p>
              <div className="flex items-center gap-4 mt-2 text-slate-500">
                <span>Current: <strong className="text-slate-800">{rec.currentStock} units</strong></span>
                <span>Suggested Reorder: <strong className="text-emerald-700">{rec.suggestedReorderQuantity} units</strong></span>
                <span>Est. Cost: <strong className="text-slate-800">{formatCurrency(rec.estimatedCost)}</strong></span>
              </div>
            </div>
            <div>
              <Button size="sm" variant="primary" leftIcon={<ShoppingCart className="w-3.5 h-3.5" />}>
                Create Order
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

