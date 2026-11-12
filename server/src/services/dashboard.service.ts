export interface DashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  lowStockItemsCount: number;
  netProfit: number;
  period: string;
  recentTransactionsCount: number;
  activeAlertsCount: number;
}

export class DashboardService {
  public static async getDashboardMetrics(merchantId?: string): Promise<DashboardMetrics> {
    // Architecture placeholder - future implementation will query Supabase
    return {
      totalRevenue: 284500,
      totalOrders: 432,
      lowStockItemsCount: 5,
      netProfit: 62400,
      period: 'Last 30 Days',
      recentTransactionsCount: 12,
      activeAlertsCount: 3,
    };
  }
}

