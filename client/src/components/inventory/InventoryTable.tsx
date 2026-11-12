import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { InventoryItem } from '../../types/models';
import { formatCurrency } from '../../utils/formatters';

interface InventoryTableProps {
  items: InventoryItem[];
}

export const InventoryTable: React.FC<InventoryTableProps> = ({ items }) => {
  const getStatusBadge = (status: InventoryItem['status'], stock: number, reorder: number) => {
    if (stock <= 0) {
      return <Badge variant="danger">Out of Stock</Badge>;
    }
    if (stock <= reorder) {
      return <Badge variant="warning">Low Stock</Badge>;
    }
    return <Badge variant="success">Optimal</Badge>;
  };

  return (
    <Card title="Current Stock Status" subtitle="Monitored in real-time with reorder thresholds">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-medium">
              <th className="pb-2.5">Item Name</th>
              <th className="pb-2.5">Category</th>
              <th className="pb-2.5 text-right">In Stock</th>
              <th className="pb-2.5 text-right">Reorder Level</th>
              <th className="pb-2.5 text-right">Price</th>
              <th className="pb-2.5 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/70">
                <td className="py-2.5 font-semibold text-slate-900">{item.name}</td>
                <td className="py-2.5 text-slate-500">{item.category}</td>
                <td className="py-2.5 text-right font-bold text-slate-800">
                  {item.stockQuantity} <span className="text-slate-400 font-normal">{item.unit}</span>
                </td>
                <td className="py-2.5 text-right text-slate-500">{item.reorderLevel}</td>
                <td className="py-2.5 text-right font-semibold text-slate-900">
                  {formatCurrency(item.sellingPrice)}
                </td>
                <td className="py-2.5 text-center">
                  {getStatusBadge(item.status, item.stockQuantity, item.reorderLevel)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

