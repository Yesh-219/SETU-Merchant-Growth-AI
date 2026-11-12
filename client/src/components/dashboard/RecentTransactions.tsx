import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { formatCurrency } from '../../utils/formatters';

interface TransactionPreview {
  id: string;
  reference: string;
  amount: number;
  paymentMethod: string;
  timeAgo: string;
  status: 'completed' | 'pending';
}

const defaultTransactions: TransactionPreview[] = [
  { id: '1', reference: 'TXN-PAYTM-20261112-001', amount: 673, paymentMethod: 'UPI', timeAgo: '2h ago', status: 'completed' },
  { id: '2', reference: 'TXN-CASH-20261112-002', amount: 173, paymentMethod: 'Cash', timeAgo: '3h ago', status: 'completed' },
  { id: '3', reference: 'TXN-PAYTM-20261112-003', amount: 1040, paymentMethod: 'UPI', timeAgo: '4h ago', status: 'completed' },
  { id: '4', reference: 'TXN-CARD-20261111-005', amount: 855, paymentMethod: 'Card', timeAgo: '1d ago', status: 'completed' },
];

export const RecentTransactions: React.FC = () => {
  return (
    <Card title="Recent Sales Transactions" subtitle="Live feed of store checkouts">
      <div className="divide-y divide-slate-100">
        {defaultTransactions.map((tx) => (
          <div key={tx.id} className="py-2.5 flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-slate-800">{tx.reference}</p>
              <p className="text-slate-400 mt-0.5">{tx.timeAgo} • {tx.paymentMethod}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-900">{formatCurrency(tx.amount)}</p>
              <Badge variant="success" size="sm" className="mt-0.5">
                {tx.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

