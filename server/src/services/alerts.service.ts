import { BusinessAlert } from '../types/models';

export class AlertsService {
  public static async getActiveAlerts(merchantId?: string): Promise<BusinessAlert[]> {
    return [
      {
        id: 'alt-001',
        merchant_id: merchantId || 'merchant-default-01',
        alert_type: 'low_stock',
        title: 'Critical Stock Alert: Toor Dal',
        message: 'Only 2 units remaining. Reorder suggested within 24 hours to avoid lost sales.',
        status: 'active',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: 'alt-002',
        merchant_id: merchantId || 'merchant-default-01',
        alert_type: 'payment_pending',
        title: 'Upcoming Supplier Payment Due',
        message: '₹15,400 due to Metro Cash & Carry on 20th Nov. Your current projected cash balance covers this safely.',
        status: 'active',
        created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
      },
      {
        id: 'alt-003',
        merchant_id: merchantId || 'merchant-default-01',
        alert_type: 'sales_spike',
        title: 'High Demand on Edible Oils',
        message: 'Oil sales rose 32% this week. Consider stocking 15 additional cartons before weekend rush.',
        status: 'active',
        created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
    ];
  }
}

