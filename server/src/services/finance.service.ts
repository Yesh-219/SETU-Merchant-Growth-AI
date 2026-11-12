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

export class FinanceService {
  public static async getFinanceSummary(merchantId?: string): Promise<FinanceSummary> {
    return {
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
        { title: 'Wholesale Supplier (Metro Cash & Carry)', amount: 15400, dueDate: '2026-11-20' },
        { title: 'Store Rent', amount: 12000, dueDate: '2026-11-25' },
      ],
    };
  }
}

