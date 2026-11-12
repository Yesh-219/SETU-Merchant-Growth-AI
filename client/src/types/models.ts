export interface Merchant {
  id: string;
  name: string;
  businessName: string;
  businessType: string;
  email: string;
  phone?: string;
}

export interface DashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  lowStockItemsCount: number;
  netProfit: number;
  period: string;
  recentTransactionsCount: number;
  activeAlertsCount: number;
}

export interface SalesTrendItem {
  date: string;
  amount: number;
  orderCount: number;
}

export interface SalesSummary {
  todaySales: number;
  weeklySales: number;
  monthlySales: number;
  averageOrderValue: number;
  salesGrowthPercent: number;
  trend: SalesTrendItem[];
}

export interface TopProduct {
  productId: string;
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
  marginPercent: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stockQuantity: number;
  reorderLevel: number;
  unit: string;
  sellingPrice: number;
  costPrice: number;
  status: 'optimal' | 'low_stock' | 'out_of_stock' | 'overstocked';
}

export interface InventoryRecommendation {
  productId: string;
  productName: string;
  currentStock: number;
  suggestedReorderQuantity: number;
  estimatedCost: number;
  reason: string;
  urgency: 'high' | 'medium' | 'low';
}

export interface FinanceSummary {
  revenue: number;
  costOfGoodsSold: number;
  grossProfit: number;
  grossMarginPercent: number;
  operatingExpenses: number;
  netProfit: number;
  netMarginPercent: number;
  projectedCashFlowNext7Days: number;
  upcomingPayables: Array<{ title: string; amount: number; dueDate: string }>;
}

export interface BusinessAlert {
  id: string;
  merchant_id: string;
  alert_type: 'low_stock' | 'cash_flow' | 'sales_spike' | 'payment_pending' | 'general';
  title: string;
  message: string;
  status: 'active' | 'dismissed' | 'resolved';
  created_at: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedActions?: string[];
  insights?: {
    category: 'inventory' | 'sales' | 'finance' | 'general';
    metric?: string;
  };
}

