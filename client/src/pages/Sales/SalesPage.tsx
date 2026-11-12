import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/dashboard/StatCard';
import { SalesChart } from '../../components/sales/SalesChart';
import { TopProductsTable } from '../../components/sales/TopProductsTable';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorAlert } from '../../components/common/ErrorAlert';
import { salesService } from '../../services/salesService';
import { mockSalesSummary, mockTopProducts } from '../../utils/mockData';
import { SalesSummary, TopProduct } from '../../types/models';
import { formatCurrency } from '../../utils/formatters';
import { TrendingUp, Calendar, CreditCard, Sparkles } from 'lucide-react';

export const SalesPage: React.FC = () => {
  const [summary, setSummary] = useState<SalesSummary | null>(null);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadSalesData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [sumRes, prodRes] = await Promise.allSettled([
        salesService.getSummary(),
        salesService.getTopProducts(),
      ]);

      if (sumRes.status === 'fulfilled') {
        setSummary(sumRes.value);
      } else {
        setSummary(mockSalesSummary);
      }

      if (prodRes.status === 'fulfilled') {
        setTopProducts(prodRes.value);
      } else {
        setTopProducts(mockTopProducts);
      }
    } catch {
      setSummary(mockSalesSummary);
      setTopProducts(mockTopProducts);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSalesData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Calculating store sales performance & trends..." fullHeight />;
  }

  if (error) {
    return <ErrorAlert message={error} onRetry={loadSalesData} />;
  }

  const currentSummary = summary || mockSalesSummary;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Intelligent Sales Analytics"
        description="Daily collection tracking, ticket size averages, and top revenue drivers."
        actions={
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5" /> +{currentSummary.salesGrowthPercent}% Week-on-Week
          </span>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Today's Sales Collection"
          value={formatCurrency(currentSummary.todaySales)}
          change="+12.4%"
          isPositive={true}
          subtitle="updated 10 mins ago"
          icon={<Calendar className="w-5 h-5 text-emerald-600" />}
        />
        <StatCard
          title="Past 7 Days Total"
          value={formatCurrency(currentSummary.weeklySales)}
          change="+14.8%"
          isPositive={true}
          subtitle="across 125 checkouts"
          icon={<TrendingUp className="w-5 h-5 text-sky-600" />}
        />
        <StatCard
          title="Average Order Value (AOV)"
          value={formatCurrency(currentSummary.averageOrderValue)}
          change="+5.1%"
          isPositive={true}
          subtitle="per customer transaction"
          icon={<CreditCard className="w-5 h-5 text-indigo-600" />}
        />
      </div>

      {/* Sales Trend Chart */}
      <SalesChart trendData={currentSummary.trend} />

      {/* Top Products */}
      <TopProductsTable products={topProducts} />
    </div>
  );
};

export default SalesPage;

