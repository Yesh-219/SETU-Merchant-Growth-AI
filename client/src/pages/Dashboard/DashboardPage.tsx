import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/dashboard/StatCard';
import { AlertBanner } from '../../components/dashboard/AlertBanner';
import { RecentTransactions } from '../../components/dashboard/RecentTransactions';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorAlert } from '../../components/common/ErrorAlert';
import { dashboardService } from '../../services/dashboardService';
import { mockDashboardMetrics, mockAlerts } from '../../utils/mockData';
import { DashboardMetrics, BusinessAlert } from '../../types/models';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { IndianRupee, ShoppingBag, AlertTriangle, Wallet, Bot, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [alerts, setAlerts] = useState<BusinessAlert[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Attempt live API call; fallback gracefully to mock data if backend isn't reached
      const [metricsData, alertsData] = await Promise.allSettled([
        dashboardService.getMetrics(),
        dashboardService.getAlerts(),
      ]);

      if (metricsData.status === 'fulfilled') {
        setMetrics(metricsData.value);
      } else {
        setMetrics(mockDashboardMetrics);
      }

      if (alertsData.status === 'fulfilled') {
        setAlerts(alertsData.value);
      } else {
        setAlerts(mockAlerts);
      }
    } catch (err: unknown) {
      console.warn('Backend not reachable; utilizing mock data for prototype demonstration.');
      setMetrics(mockDashboardMetrics);
      setAlerts(mockAlerts);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Aggregating merchant performance indicators..." fullHeight />;
  }

  if (error) {
    return <ErrorAlert message={error} onRetry={fetchDashboardData} />;
  }

  const currentMetrics = metrics || mockDashboardMetrics;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Merchant Growth Intelligence"
        description="Comprehensive real-time overview of store revenue, inventory health, and cash flow."
        actions={
          <Link
            to="/advisor"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-paytm-blue hover:bg-paytm-navy text-white text-xs font-semibold shadow-sm transition-all"
          >
            <Bot className="w-4 h-4 text-paytm-cyan" />
            <span>Consult AI Advisor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        }
      />

      {/* Active Business Alerts */}
      <AlertBanner alerts={alerts} />

      {/* Core KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="30-Day Gross Revenue"
          value={formatCurrency(currentMetrics.totalRevenue)}
          change="+14.8%"
          isPositive={true}
          subtitle="vs previous month"
          icon={<IndianRupee className="w-5 h-5 text-emerald-600" />}
        />
        <StatCard
          title="Total Store Orders"
          value={formatNumber(currentMetrics.totalOrders)}
          change="+8.2%"
          isPositive={true}
          subtitle="checkout events"
          icon={<ShoppingBag className="w-5 h-5 text-sky-600" />}
        />
        <StatCard
          title="Items Below Reorder"
          value={formatNumber(currentMetrics.lowStockItemsCount)}
          change="Action Required"
          isPositive={false}
          subtitle="restock suggested"
          icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
        />
        <StatCard
          title="Estimated Net Profit"
          value={formatCurrency(currentMetrics.netProfit)}
          change="21.9% Margin"
          isPositive={true}
          subtitle="after operating costs"
          icon={<Wallet className="w-5 h-5 text-indigo-600" />}
        />
      </div>

      {/* Grid: Live Transactions & Quick Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
        <div>
          <div className="rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-paytm-blue text-paytm-cyan flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">SETU Copilot Insights</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              "Your cooking oil category is experiencing a 32% demand surge. Restock 30 pouches of Fortune Sunflower Oil ahead of the weekend to capture an additional ₹4,350 in estimated sales."
            </p>
            <Link
              to="/advisor"
              className="text-xs font-bold text-paytm-blue hover:text-paytm-navy inline-flex items-center gap-1"
            >
              Ask SETU how to optimize margins <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

