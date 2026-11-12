import {
  DashboardMetrics,
  SalesSummary,
  TopProduct,
  InventoryItem,
  InventoryRecommendation,
  FinanceSummary,
  BusinessAlert,
} from '../types/models';

export const mockDashboardMetrics: DashboardMetrics = {
  totalRevenue: 284500,
  totalOrders: 432,
  lowStockItemsCount: 5,
  netProfit: 62400,
  period: 'Last 30 Days',
  recentTransactionsCount: 12,
  activeAlertsCount: 3,
};

export const mockSalesSummary: SalesSummary = {
  todaySales: 12450,
  weeklySales: 78900,
  monthlySales: 284500,
  averageOrderValue: 658,
  salesGrowthPercent: 14.8,
  trend: [
    { date: 'Mon', amount: 9200, orderCount: 15 },
    { date: 'Tue', amount: 11400, orderCount: 18 },
    { date: 'Wed', amount: 10800, orderCount: 17 },
    { date: 'Thu', amount: 13200, orderCount: 22 },
    { date: 'Fri', amount: 16500, orderCount: 28 },
    { date: 'Sat', amount: 18900, orderCount: 31 },
    { date: 'Sun', amount: 14700, orderCount: 24 },
  ],
};

export const mockTopProducts: TopProduct[] = [
  { productId: 'prod-001', name: 'Aashirvaad Atta 10kg', category: 'Staples', unitsSold: 84, revenue: 38640, marginPercent: 12.5 },
  { productId: 'prod-002', name: 'Tata Salt 1kg', category: 'Staples', unitsSold: 142, revenue: 3976, marginPercent: 18.0 },
  { productId: 'prod-003', name: 'Fortune Sunflower Oil 1L', category: 'Edible Oils', unitsSold: 96, revenue: 13920, marginPercent: 9.4 },
  { productId: 'prod-004', name: 'Amul Butter 500g', category: 'Dairy', unitsSold: 65, revenue: 18200, marginPercent: 14.2 },
  { productId: 'prod-005', name: 'Maggi Noodles 4-Pack', category: 'Snacks', unitsSold: 110, revenue: 6600, marginPercent: 20.0 },
];

export const mockInventoryItems: InventoryItem[] = [
  { id: 'prod-001', name: 'Aashirvaad Atta 10kg', category: 'Staples', stockQuantity: 6, reorderLevel: 10, unit: 'bag', sellingPrice: 460, costPrice: 402, status: 'low_stock' },
  { id: 'prod-002', name: 'Tata Salt 1kg', category: 'Staples', stockQuantity: 45, reorderLevel: 20, unit: 'packet', sellingPrice: 28, costPrice: 23, status: 'optimal' },
  { id: 'prod-003', name: 'Fortune Sunflower Oil 1L', category: 'Edible Oils', stockQuantity: 4, reorderLevel: 15, unit: 'pouch', sellingPrice: 145, costPrice: 131, status: 'low_stock' },
  { id: 'prod-004', name: 'Amul Butter 500g', category: 'Dairy', stockQuantity: 18, reorderLevel: 12, unit: 'pack', sellingPrice: 280, costPrice: 242, status: 'optimal' },
  { id: 'prod-005', name: 'Tata Toor Dal 1kg', category: 'Pulses', stockQuantity: 2, reorderLevel: 12, unit: 'kg', sellingPrice: 185, costPrice: 155, status: 'low_stock' },
];

export const mockInventoryRecommendations: InventoryRecommendation[] = [
  {
    productId: 'prod-003',
    productName: 'Fortune Sunflower Oil 1L',
    currentStock: 4,
    suggestedReorderQuantity: 30,
    estimatedCost: 3930,
    reason: 'Sales spike: 32% increase this week. High stockout probability within 48 hours.',
    urgency: 'high',
  },
  {
    productId: 'prod-005',
    productName: 'Tata Toor Dal 1kg',
    currentStock: 2,
    suggestedReorderQuantity: 25,
    estimatedCost: 3875,
    reason: 'Daily essential stock critical. Only 2 units remaining against 12 reorder threshold.',
    urgency: 'high',
  },
];

export const mockFinanceSummary: FinanceSummary = {
  revenue: 284500,
  costOfGoodsSold: 204800,
  grossProfit: 79700,
  grossMarginPercent: 28.0,
  operatingExpenses: 17300,
  netProfit: 62400,
  netMarginPercent: 21.9,
  projectedCashFlowNext7Days: 41200,
  upcomingPayables: [
    { title: 'Shop Electricity Bill', amount: 4800, dueDate: '2026-11-18' },
    { title: 'Metro Cash & Carry Wholesale', amount: 15400, dueDate: '2026-11-20' },
    { title: 'Store Monthly Rent', amount: 12000, dueDate: '2026-11-25' },
  ],
};

export const mockAlerts: BusinessAlert[] = [
  {
    id: 'alt-001',
    merchant_id: 'merchant-default-01',
    alert_type: 'low_stock',
    title: 'Critical Stock Alert: Toor Dal',
    message: 'Only 2 units remaining. Reorder suggested within 24 hours to prevent lost sales.',
    status: 'active',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'alt-002',
    merchant_id: 'merchant-default-01',
    alert_type: 'payment_pending',
    title: 'Upcoming Supplier Payment Due',
    message: '₹15,400 due to Metro Cash & Carry on 20th Nov. Your projected cash balance covers this safely.',
    status: 'active',
    created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
];

