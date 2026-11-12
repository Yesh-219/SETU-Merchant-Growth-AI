import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { CashFlowCard } from '../../components/finance/CashFlowCard';
import { ExpenseBreakdown } from '../../components/finance/ExpenseBreakdown';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorAlert } from '../../components/common/ErrorAlert';
import { financeService } from '../../services/financeService';
import { mockFinanceSummary } from '../../utils/mockData';
import { FinanceSummary } from '../../types/models';
import { Button } from '../../components/common/Button';
import { PlusCircle, Download } from 'lucide-react';

export const FinancePage: React.FC = () => {
  const [summary, setSummary] = useState<FinanceSummary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadFinanceData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await financeService.getSummary();
      setSummary(data);
    } catch {
      setSummary(mockFinanceSummary);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFinanceData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Calculating gross profit, expenses, and cash flow forecasts..." fullHeight />;
  }

  if (error) {
    return <ErrorAlert message={error} onRetry={loadFinanceData} />;
  }

  const currentSummary = summary || mockFinanceSummary;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Merchant Profit & Cash Flow Intelligence"
        description="Clear margin visibility, expense bookkeeping, and automated liquidity forecasting."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
              Export P&L Report
            </Button>
            <Button variant="primary" size="sm" leftIcon={<PlusCircle className="w-3.5 h-3.5" />}>
              Log Store Expense
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CashFlowCard summary={currentSummary} />
        <ExpenseBreakdown summary={currentSummary} />
      </div>
    </div>
  );
};

export default FinancePage;

