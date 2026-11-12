import React from 'react';
import { Card } from '../common/Card';
import { TopProduct } from '../../types/models';
import { formatCurrency, formatNumber } from '../../utils/formatters';

interface TopProductsTableProps {
  products: TopProduct[];
}

export const TopProductsTable: React.FC<TopProductsTableProps> = ({ products }) => {
  return (
    <Card title="Top Revenue Generating Products" subtitle="Ranked by gross sales volume">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-medium">
              <th className="pb-2.5">Product Name</th>
              <th className="pb-2.5">Category</th>
              <th className="pb-2.5 text-right">Units Sold</th>
              <th className="pb-2.5 text-right">Revenue</th>
              <th className="pb-2.5 text-right">Margin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((item) => (
              <tr key={item.productId} className="hover:bg-slate-50/70">
                <td className="py-2.5 font-semibold text-slate-900">{item.name}</td>
                <td className="py-2.5 text-slate-500">{item.category}</td>
                <td className="py-2.5 text-right font-medium text-slate-700">
                  {formatNumber(item.unitsSold)}
                </td>
                <td className="py-2.5 text-right font-bold text-slate-900">
                  {formatCurrency(item.revenue)}
                </td>
                <td className="py-2.5 text-right">
                  <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {item.marginPercent}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

