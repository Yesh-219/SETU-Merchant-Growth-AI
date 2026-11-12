export interface SalesSummary {
  todaySales: number;
  weeklySales: number;
  monthlySales: number;
  averageOrderValue: number;
  salesGrowthPercent: number;
  trend: Array<{ date: string; amount: number; orderCount: number }>;
}

export interface TopProductSales {
  productId: string;
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
  marginPercent: number;
}

export class SalesService {
  public static async getSalesSummary(merchantId?: string): Promise<SalesSummary> {
    // Architecture placeholder - future implementation will aggregate transactions
    return {
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
  }

  public static async getTopProducts(merchantId?: string, limit = 5): Promise<TopProductSales[]> {
    return [
      { productId: 'prod-001', name: 'Aashirvaad Atta 10kg', category: 'Staples', unitsSold: 84, revenue: 38640, marginPercent: 12.5 },
      { productId: 'prod-002', name: 'Tata Salt 1kg', category: 'Staples', unitsSold: 142, revenue: 3976, marginPercent: 18.0 },
      { productId: 'prod-003', name: 'Fortune Sunflower Oil 1L', category: 'Edible Oils', unitsSold: 96, revenue: 13920, marginPercent: 9.4 },
      { productId: 'prod-004', name: 'Amul Butter 500g', category: 'Dairy', unitsSold: 65, revenue: 18200, marginPercent: 14.2 },
      { productId: 'prod-005', name: 'Maggi Noodles 4-Pack', category: 'Snacks', unitsSold: 110, revenue: 6600, marginPercent: 20.0 },
    ].slice(0, limit);
  }
}

