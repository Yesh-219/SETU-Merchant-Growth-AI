import React from 'react';
import { AlertTriangle, TrendingUp, Clock, Info } from 'lucide-react';
import { BusinessAlert } from '../../types/models';

interface AlertBannerProps {
  alerts: BusinessAlert[];
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  const getAlertIcon = (type: BusinessAlert['alert_type']) => {
    switch (type) {
      case 'low_stock':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'payment_pending':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'sales_spike':
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      default:
        return <Info className="w-4 h-4 text-slate-600" />;
    }
  };

  const getAlertBadgeClass = (type: BusinessAlert['alert_type']) => {
    switch (type) {
      case 'low_stock':
        return 'bg-amber-50 border-amber-200 text-amber-900';
      case 'payment_pending':
        return 'bg-blue-50 border-blue-200 text-blue-900';
      case 'sales_spike':
        return 'bg-emerald-50 border-emerald-200 text-emerald-900';
      default:
        return 'bg-slate-50 border-slate-200 text-slate-900';
    }
  };

  return (
    <div className="space-y-2 mb-6">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`flex items-start gap-3 p-3.5 rounded-xl border text-xs ${getAlertBadgeClass(
            alert.alert_type
          )}`}
        >
          <div className="mt-0.5">{getAlertIcon(alert.alert_type)}</div>
          <div className="flex-1">
            <span className="font-semibold mr-2">{alert.title}:</span>
            <span>{alert.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

