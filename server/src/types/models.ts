export interface Merchant {
  id: string;
  name: string;
  business_name: string;
  business_type: string;
  email: string;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  merchant_id: string;
  name: string;
  category: string;
  selling_price: number;
  cost_price: number;
  stock_quantity: number;
  reorder_level: number;
  unit: string;
  created_at: string;
  updated_at: string;
}

export type PaymentMethod = 'UPI' | 'Cash' | 'Card' | 'NetBanking' | 'Wallet';
export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'refunded';

export interface Transaction {
  id: string;
  merchant_id: string;
  transaction_reference: string;
  total_amount: number;
  payment_method: PaymentMethod;
  status: TransactionStatus;
  transaction_date: string;
  created_at: string;
}

export interface TransactionItem {
  id: string;
  transaction_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  unit_cost: number;
  subtotal: number;
}

export interface Expense {
  id: string;
  merchant_id: string;
  category: string;
  description: string | null;
  amount: number;
  expense_date: string;
  due_date: string | null;
  created_at: string;
}

export type AlertType = 'low_stock' | 'cash_flow' | 'sales_spike' | 'payment_pending' | 'general';
export type AlertStatus = 'active' | 'dismissed' | 'resolved';

export interface BusinessAlert {
  id: string;
  merchant_id: string;
  alert_type: AlertType;
  title: string;
  message: string;
  status: AlertStatus;
  created_at: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

export interface ChatRequest {
  message: string;
  merchantId?: string;
  conversationHistory?: ChatMessage[];
  context?: {
    currentPage?: string;
  };
}

