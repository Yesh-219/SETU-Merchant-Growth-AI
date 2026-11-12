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

export class InventoryService {
  public static async getInventoryList(merchantId?: string): Promise<InventoryItem[]> {
    return [
      { id: 'prod-001', name: 'Aashirvaad Atta 10kg', category: 'Staples', stockQuantity: 6, reorderLevel: 10, unit: 'bag', sellingPrice: 460, costPrice: 402, status: 'low_stock' },
      { id: 'prod-002', name: 'Tata Salt 1kg', category: 'Staples', stockQuantity: 45, reorderLevel: 20, unit: 'packet', sellingPrice: 28, costPrice: 23, status: 'optimal' },
      { id: 'prod-003', name: 'Fortune Sunflower Oil 1L', category: 'Edible Oils', stockQuantity: 4, reorderLevel: 15, unit: 'bottle', sellingPrice: 145, costPrice: 131, status: 'low_stock' },
      { id: 'prod-004', name: 'Amul Butter 500g', category: 'Dairy', stockQuantity: 18, reorderLevel: 12, unit: 'pack', sellingPrice: 280, costPrice: 240, status: 'optimal' },
      { id: 'prod-005', name: 'Toor Dal Premium 1kg', category: 'Pulses', stockQuantity: 2, reorderLevel: 12, unit: 'kg', sellingPrice: 180, costPrice: 155, status: 'low_stock' },
    ];
  }

  public static async getRecommendations(merchantId?: string): Promise<InventoryRecommendation[]> {
    return [
      {
        productId: 'prod-003',
        productName: 'Fortune Sunflower Oil 1L',
        currentStock: 4,
        suggestedReorderQuantity: 30,
        estimatedCost: 3930,
        reason: 'Fast mover with festival weekend approaching. Expected stockout within 48 hours.',
        urgency: 'high',
      },
      {
        productId: 'prod-005',
        productName: 'Toor Dal Premium 1kg',
        currentStock: 2,
        suggestedReorderQuantity: 25,
        estimatedCost: 3875,
        reason: 'Daily essential below critical reorder threshold of 12 units.',
        urgency: 'high',
      },
      {
        productId: 'prod-001',
        productName: 'Aashirvaad Atta 10kg',
        currentStock: 6,
        suggestedReorderQuantity: 20,
        estimatedCost: 8040,
        reason: 'Highest revenue generator currently at 60% of safety stock.',
        urgency: 'medium',
      },
    ];
  }
}

