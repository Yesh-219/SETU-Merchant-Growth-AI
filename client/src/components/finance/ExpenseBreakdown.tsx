import React from 'react';
import { Card } from '../common/Card';
import { FinanceSummary } from '../../types/models';
import { formatCurrency } from '../../utils/formatters';

interface ExpenseBreakdownProps {
  summary: FinanceSummary;
}

export const ExpenseBreakdown: React.FC<ExpenseBreakdownProps> = ({ summary }) => {
  return (
    <Card title="P&L Summary (Last 30 Days)" subtitle="Revenue versus costs and operating overhead">
      <div className="space-y-3 text-xs pt-1">
        <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
          <span className="text-slate-600 font-medium">Gross Sales Revenue</span>
          <span className="font-bold text-slate-900">{formatCurrency(summary.revenue)}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
          <span className="text-slate-600 font-medium">Cost of Goods Sold (COGS)</span>
          <span className="font-semibold text-rose-600">-{formatCurrency(summary.costOfGoodsSold)}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-slate-100 bg-slate-50 px-2 rounded">
          <span className="text-slate-800 font-bold">Gross Profit ({summary.grossMarginPercent}%)</span>
          <span className="font-bold text-slate-900">{formatCurrency(summary.grossProfit)}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
          <span className="text-slate-600 font-medium">Store Operating Expenses</span>
          <span className="font-semibold text-rose-600">-{formatCurrency(summary.operatingExpenses)}</span>
        </div>
        <div className="flex justify-between items-center py-2 bg-emerald-50/70 border border-emerald-200 px-3 rounded-lg text-emerald-900">
          <span className="font-bold text-sm">Net Store Profit ({summary.netMarginPercent}%)</span>
          <span className="font-extrabold text-sm">{formatCurrency(summary.netProfit)}</span>
        </div>
      </div>
    </Card>
  );
};

