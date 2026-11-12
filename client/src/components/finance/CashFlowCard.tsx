import React from 'react';
import { Card } from '../common/Card';
import { FinanceSummary } from '../../types/models';
import { formatCurrency } from '../../utils/formatters';
import { Calendar, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface CashFlowCardProps {
  summary: FinanceSummary;
}

export const CashFlowCard: React.FC<CashFlowCardProps> = ({ summary }) => {
  return (
    <Card title="7-Day Cash Flow Forecast" subtitle="Predictive liquidity balance model">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Net Profit Margin</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{summary.netMarginPercent}%</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">
            {formatCurrency(summary.netProfit)} net gain
          </p>
        </div>

        <div className="p-4 rounded-xl bg-sky-50 border border-sky-100">
          <div className="flex items-center justify-between text-sky-700 mb-1">
            <span className="text-xs font-medium">Projected 7-Day Net Cash</span>
            <Wallet className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-2xl font-bold text-sky-950">
            {formatCurrency(summary.projectedCashFlowNext7Days)}
          </p>
          <p className="text-xs text-sky-600 font-semibold mt-1">Safe coverage for upcoming bills</p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        <h4 className="text-xs font-semibold uppercase text-slate-400 mb-2.5">
          Upcoming Payables & Invoices
        </h4>
        <div className="space-y-2">
          {summary.upcomingPayables.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50/70 text-xs border border-slate-100"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-slate-800">{item.title}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-900 mr-2">{formatCurrency(item.amount)}</span>
                <span className="text-slate-400">Due {item.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

